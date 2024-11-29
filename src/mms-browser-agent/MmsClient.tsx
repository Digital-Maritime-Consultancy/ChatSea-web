import { useContext, useEffect, useState } from "react";
import { Connect, Disconnect, Filter, MmtpMessage, MsgType, ProtocolMessage, ProtocolMessageType, Receive, Subscribe } from "../mms/mmtp";
import { v4 as uuidv4 } from "uuid";
import { appendMagicWord, createRemoteClient, decrypt, deriveSecretKey, FlagsEnum, getMmtpSendMrnMsg, getSmmpMessage, handleSegmentedMessage, hasAnyFlag, hasFlags, isSmmp, loadCertAndPrivateKeyFromFiles, RemoteClient, SegmentedMessage, signMessage, verifySignatureOnMessage } from "./core";
import { SmmpMessage } from "../mms/smmp";
import { Certificate } from "pkijs";
import { useConnectionState, useConnectionStateDispatch } from "../context/ConnectContext";
import {useMsgStateDispatch} from "../context/MessageContext";

function MmsClient() {
    const mrnStoreUrl = "https://mrn-store.dmc.international";
    const msrSecomSearchUrl = "https://msr.maritimeconnectivity.net/api/secom/v1/searchService";
    const connectionState = useConnectionState();
    const setConnectionState = useConnectionStateDispatch();
    const setMsgState = useMsgStateDispatch();
    const msgState = useMsgStateDispatch();
    const [reconnectToken, setReconnectToken] = useState("");
    const [ws, setWs] = useState<WebSocket>();
    const [authenticated, setAuthenticated] = useState(false);
    const [lastSentMessage, setLastSentMessage] = useState<MmtpMessage>();
    const [onSmmpSession, setOnSmmpSession] = useState<boolean>(false);
    let remoteClients = new Map<string, RemoteClient>();
    let segmentedMessages = new Map<string, SegmentedMessage>();
    let ongoingSmmpHandshakes = new Map<string, NodeJS.Timer>();

    const [certificate, setCertificate] = useState<Certificate>();
    const [privateKey, setPrivateKey] = useState<CryptoKey>();
    const [privateKeyEcdh, setPrivateKeyEcdh] = useState<CryptoKey>();
    const [certBytes, setCertBytes] = useState<BufferSource>();

    const [edgeRouter, setEdgeRouter] = useState<string>("");

    let ownMrn: string = "";
    useEffect(() => {
        if (!connectionState.connected && connectionState.wsUrl.length > 0 && connectionState.privateKeyEcdh && !connectionState.ws) {
            ownMrn = connectionState.mrn!;
            connect(connectionState.privateKeyEcdh);
        }
    }, [connectionState]);

    const disconnect = async () => {
        const disconnectMsg = MmtpMessage.create({
            msgType: MsgType.PROTOCOL_MESSAGE,
            uuid: uuidv4(),
            protocolMessage: ProtocolMessage.create({
                protocolMsgType: ProtocolMessageType.DISCONNECT_MESSAGE,
                disconnectMessage: Disconnect.create()
            })
        });

        let msgBlob = MmtpMessage.encode(disconnectMsg).finish();

        setLastSentMessage(disconnectMsg);
        ws!.send(msgBlob);
    }

    const connect = async (privateKeyEcdh: CryptoKey) => {
        let _ws: WebSocket;
        
        _ws = await new WebSocket(connectionState.wsUrl);
        _ws.onerror = function (event) {
            console.error("Failed to create WebSocket connection:", event);
        }
        _ws.onopen = function (event) {
            console.log("WebSocket connection established");
            setWs(_ws);
            setConnectionState({...connectionState, connected: true,
                ws: _ws,});
        }



        _ws.addEventListener("open", () => {
            let initialized = false;
            let certBytes: ArrayBuffer;

                _ws.onmessage = async (msgEvent) => {
                    console.log("Message received:", msgEvent.data);
                    const data = msgEvent.data as Blob;
                    const bytes = await data.arrayBuffer();
                    const mmtpMessage = MmtpMessage.decode(new Uint8Array(bytes));
                    console.log(mmtpMessage);
                    console.log(lastSentMessage);
                    if (mmtpMessage.msgType === MsgType.RESPONSE_MESSAGE && lastSentMessage && mmtpMessage.responseMessage?.responseToUuid !== lastSentMessage!.uuid) {
                        console.error("The UUID of the last sent message does not match the UUID being responded to");
                    }
                    if (!initialized) {
                        // do something
                        setReconnectToken(mmtpMessage.responseMessage!.reconnectToken!);

                        const subMsg = MmtpMessage.create({
                            msgType: MsgType.PROTOCOL_MESSAGE,
                            uuid: uuidv4(),
                            protocolMessage: ProtocolMessage.create({
                                protocolMsgType: ProtocolMessageType.SUBSCRIBE_MESSAGE,
                                subscribeMessage: Subscribe.create({
                                    directMessages: true
                                })
                            })
                        });
                        msgBlob = MmtpMessage.encode(subMsg).finish();

                        setLastSentMessage(subMsg);

                        _ws.send(msgBlob);
                        console.log("Sub to direct messages")

                        const svcsubMsg = MmtpMessage.create({
                            msgType: MsgType.PROTOCOL_MESSAGE,
                            uuid: uuidv4(),
                            protocolMessage: ProtocolMessage.create({
                                protocolMsgType: ProtocolMessageType.SUBSCRIBE_MESSAGE,
                                subscribeMessage: Subscribe.create({
                                    subject: 's-124'
                                })
                            })
                        });
                        msgBlob = MmtpMessage.encode(svcsubMsg).finish();

                        setLastSentMessage(svcsubMsg);

                        _ws.send(msgBlob);
                        console.log("Sub to S124 messages")

                        initialized = true;

                        if (ownMrn) {
                            await fetch(mrnStoreUrl + "/mrn", {
                                method: "POST",
                                body: JSON.stringify({mrn: ownMrn, edgeRouter: edgeRouter}),
                                mode: "cors",
                                headers: {"Content-Type": "application/json"}
                            });
                        }
                    } else {

                        if (mmtpMessage.msgType === MsgType.RESPONSE_MESSAGE) {
                            const msgs = mmtpMessage.responseMessage!.applicationMessages;
                            for (const msg of msgs!) {
                                const validSignature = await verifySignatureOnMessage(msg);

                                //Check if SMMP and in that case handle it as SMMP
                                let msgIsSmmp = await isSmmp(msg)
                                if (msgIsSmmp) {
                                    const smmpMessage = SmmpMessage.decode(new Uint8Array(msg.body!.subarray(4, msg.body!.length)));
                                    const flags: number = smmpMessage.header!.control![0]

                                    console.log("bef hasflags")
                                    //Handle cases of SMMP messages
                                    console.log("Flags:", flags)
                                    if (hasFlags(flags, [FlagsEnum.Handshake])) {
                                        console.log("aft hasflags")

                                        //Parse raw key from remote clients DER certificate
                                        const cert = Certificate.fromBER(smmpMessage.data);
                                        const rcPubKey = await cert.getPublicKey(
                                          {
                                              algorithm: {
                                                  algorithm: {
                                                      name: "ECDH",
                                                      namedCurve: "P-384",
                                                  },
                                                  usages: ["deriveKey"],
                                              },
                                          },
                                        )

                                        //Perform ECDH
                                        let conf = false
                                        let sharedKey = undefined;

                                        if (hasFlags(flags, [FlagsEnum.Confidentiality])) {
                                            sharedKey = await deriveSecretKey(privateKeyEcdh, rcPubKey)
                                            conf = true
                                        }
                                        let deliveryGuarantee = false
                                        if (hasFlags(flags, [FlagsEnum.DeliveryGuarantee])) {
                                            deliveryGuarantee = true
                                        }

                                        //Create a remote client instance we can keep track of
                                        const remoteClient = createRemoteClient(rcPubKey, sharedKey!, conf, deliveryGuarantee)

                                        //Store remote client in a map, identified by MRN
                                        remoteClients.set(msg.header!.sender!, remoteClient)

                                        // 2nd step handshake
                                        if (hasFlags(flags, [FlagsEnum.ACK])) {
                                            const handshakeRc = ongoingSmmpHandshakes.get(msg.header!.sender!)
                                            //Check if RC responded within time limit
                                            if (handshakeRc) {
                                                console.log("Remote client accepted initiation of SMMP session")
                                                let flags: FlagsEnum[] = [FlagsEnum.ACK]
                                                if (remoteClient.confidentiality) {
                                                    flags.push(FlagsEnum.Confidentiality)
                                                }
                                                if (remoteClient.deliveryAck) {
                                                    flags.push(FlagsEnum.DeliveryGuarantee)
                                                }

                                                let smmpAckLastMsg = getSmmpMessage(flags, 0, 1, uuidv4(), new Uint8Array(0))
                                                let smmpPayload = SmmpMessage.encode(smmpAckLastMsg).finish()
                                                const finalPayload = appendMagicWord(smmpPayload)
                                                let mmtpMsg = getMmtpSendMrnMsg(msg.header!.sender!, finalPayload)
                                                if (privateKey) {
                                                    let signedSendMsg = await signMessage(mmtpMsg, false, privateKey)
                                                    const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
                                                    setLastSentMessage(signedSendMsg);
                                                    _ws.send(toBeSent);
                                                    clearInterval(handshakeRc);
                                                    ongoingSmmpHandshakes.delete(msg.header!.sender!);
                                                    setOnSmmpSession(true);
                                                }

                                            }
                                            //Send last ACK
                                            // 1st step handshake
                                        } else {
                                            const handshakeRc = ongoingSmmpHandshakes.get(msg.header!.sender!)
                                            console.log("Remote client wants to initiate SMMP session")
                                            let flags: FlagsEnum[] = [FlagsEnum.Handshake, FlagsEnum.ACK]
                                            if (remoteClient.confidentiality) {
                                                flags.push(FlagsEnum.Confidentiality)
                                            }
                                            if (remoteClient.deliveryAck) {
                                                flags.push(FlagsEnum.DeliveryGuarantee)
                                            }

                                            let smmpAckMsg = getSmmpMessage(flags, 0, 1, uuidv4(), new Uint8Array(certBytes))
                                            const smmpPayload = SmmpMessage.encode(smmpAckMsg).finish()
                                            const finalPayload = appendMagicWord(smmpPayload)
                                            let mmtpMsg = getMmtpSendMrnMsg(msg.header!.sender!, finalPayload)
                                            if (privateKey) {
                                                let signedSendMsg = await signMessage(mmtpMsg, false, privateKey)
                                                const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
                                                setLastSentMessage(signedSendMsg);
                                                _ws.send(toBeSent);
                                            }
                                            //Send with ACK
                                        }
                                        // Case last part of three-way handshake, i.e. 3rd step of three-way handshake
                                        // This is indicated by the presence of any handshake flag apart from the ACK
                                    } else if (hasFlags(flags, [FlagsEnum.ACK]) &&
                                      hasAnyFlag(flags, [FlagsEnum.Confidentiality, FlagsEnum.DeliveryGuarantee, FlagsEnum.NonRepudiation])) {
                                        console.log("Last part of three-way-handshake ACK - SMMP session is now setup!")
                                        setOnSmmpSession(true);

                                        // Case - Reception of an ACK of a received message with delivery guarantee
                                    } else if (hasFlags(flags, [FlagsEnum.ACK])) {
                                        console.log("Msg with delivery guarantee was successfully received ")

                                        // Case regular reception of SMMP msg
                                    } else {
                                        //Get the remote client key
                                        const rc = remoteClients.get(msg.header!.sender!)!;

                                        //Decrypt message
                                        let plaintext = smmpMessage.data
                                        if (rc.confidentiality) {
                                            plaintext = await decrypt(rc.symKey, smmpMessage.data);
                                        }
                                        const segmented: boolean = (smmpMessage.header!.totalBlocks! > 1);

                                        if (segmented) {
                                            await handleSegmentedMessage(smmpMessage.header!, plaintext)
                                            const segMsg = (segmentedMessages.get(smmpMessage.header!.uuid!))! //undefined treated as false
                                            /*
                                            const segmentSpan: HTMLSpanElement | null = incomingArea.querySelector('span#newSpan');

                                            if (segmentSpan) {
                                                segmentSpan.remove()
                                            } else {
                                                if (incomingArea.textContent !== '') {
                                                    const lineBreak = document.createElement('br');
                                                    incomingArea.prepend(lineBreak);
                                                }
                                            }
                                            const newSpan = document.createElement("span");
                                            newSpan.id = "newSpan";
                                            newSpan.setAttribute("data-toggle", "tooltip");
                                            newSpan.innerHTML = `<b>Receiving segmented message block ${segMsg.receivedBlocks}/${segMsg.totalBlocks}</b>`;
                                            const date = new Date().toString();
                                            newSpan.title = `${date}`;

                                            incomingArea.prepend(newSpan);
                                            if (segMsg.receivedBlocks === segMsg.totalBlocks) {
                                                newSpan.remove()
                                                msg.body = segMsg.data
                                                showReceivedMessage(msg, validSignature)
                                            }
                                            */
                                        } else {
                                            //No segmentation so simply display the decrypted message
                                            console.log("msg bytes: ", plaintext)
                                            msg.body = plaintext
                                            //showReceivedMessage(msg, validSignature);
                                        }
                                    }
                                } else {
                                    console.log("MSG received")
                                    console.log("MSG received")
                                    if (msg.body && msg.header?.sender) {
                                        setMsgState({...msgState,
                                            mmtpMsgData: msg.body,
                                            senderMrn: msg.header!.sender!,
                                        });
                                    }
                                }
                            }
                        } else if (mmtpMessage.msgType === MsgType.PROTOCOL_MESSAGE && mmtpMessage.protocolMessage?.protocolMsgType === ProtocolMessageType.NOTIFY_MESSAGE) {
                            const notifyMsg = mmtpMessage.protocolMessage.notifyMessage!;
                            const uuids = notifyMsg.messageMetadata!.map(messageMetadata => messageMetadata.uuid);

                            const receive = MmtpMessage.create({
                                msgType: MsgType.PROTOCOL_MESSAGE,
                                uuid: uuidv4(),
                                protocolMessage: ProtocolMessage.create({
                                    protocolMsgType: ProtocolMessageType.RECEIVE_MESSAGE,
                                    receiveMessage: Receive.create({
                                        filter: Filter.create({
                                            messageUuids: uuids.filter((uuid): uuid is string => uuid !== null && uuid !== undefined)
                                        })
                                    })
                                })
                            });
                            msgBlob = MmtpMessage.encode(receive).finish();
                            setLastSentMessage(receive);
                            _ws.send(msgBlob);
                        }
                    }
                };

                const connectMsg = MmtpMessage.create({
                    msgType: MsgType.PROTOCOL_MESSAGE,
                    uuid: uuidv4(),
                    protocolMessage: ProtocolMessage.create({
                        protocolMsgType: ProtocolMessageType.CONNECT_MESSAGE,
                        connectMessage: Connect.create({})
                    })
                });
                if (ownMrn) {
                    connectMsg.protocolMessage!.connectMessage!.ownMrn = ownMrn;
                }
                if (reconnectToken) {
                    connectMsg.protocolMessage!.connectMessage!.reconnectToken = reconnectToken;
                }
                let msgBlob = MmtpMessage.encode(connectMsg).finish();

                setLastSentMessage(connectMsg);
                _ws.send(msgBlob);


            });

        _ws.addEventListener("close", async evt => {
            if (evt.code !== 1000) {
                alert("Connection to Edge Router closed unexpectedly: " + evt.reason);
            }
            if (ownMrn) {
                await fetch(mrnStoreUrl + "/mrn/" + ownMrn, {
                    method: "DELETE",
                    mode: "cors"
                });
            }
        });
        
    }

    return (
        <div>
        </div>
    );
}

export default MmsClient;