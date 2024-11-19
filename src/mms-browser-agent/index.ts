import {
    ApplicationMessage,
    ApplicationMessageHeader,
    Connect,
    Disconnect,
    Filter,
    IApplicationMessage,
    MmtpMessage,
    MsgType,
    ProtocolMessage,
    ProtocolMessageType,
    Receive,
    Recipients,
    Send,
    Subscribe,
    Unsubscribe
} from "../mms/mmtp";
import {v4 as uuidv4} from "uuid";
import "./styles.scss";
import "bootstrap";
import {Certificate} from "pkijs";
import {fromBER, Integer, Sequence} from "asn1js";
import {bufToBigint} from "bigint-conversion";
import {ResponseSearchObject} from "./SecomSearch";
import {ISmmpHeader, SmmpHeader, SmmpMessage} from "../mms/smmp";
import logo from './images/MCP-logo.png';

//To store the Agents/Clients own MRN loaded from the certificate
let ownMrn = "";

const SMMP_SEGMENTATION_THRESHOLD = 49 * 1024 //49 KiB
const connectContainer = document.getElementById("connectContainer") as HTMLDivElement;
const receiveContainer = document.getElementById("receiveContainer") as HTMLDivElement;
const urlInput = document.getElementById("edgeRouterAddr") as HTMLSelectElement;
const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement;

const connTypeSelect = document.getElementById("connectionTypeSelect") as HTMLSelectElement;
const certInputDiv = document.getElementById("certInputDiv") as HTMLDivElement;
const certFileInput = document.getElementById("certInput") as HTMLInputElement;
const privateKeyFileInput = document.getElementById("privateKeyInput") as HTMLInputElement;

const mrnH3 = document.getElementById("mrnH3") as HTMLTextAreaElement;

const msgContainer = document.getElementById("msgContainer") as HTMLDivElement;
const sendContainer = document.getElementById("sendContainer") as HTMLDivElement;
const msgArea = document.getElementById("msgArea") as HTMLTextAreaElement;
const receiverMrnSelect = document.getElementById("receiverMrn") as HTMLSelectElement;
const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const sendSmmpBtn = document.getElementById("sendSmmpBtn") as HTMLButtonElement;
const disconnectBtn = document.getElementById("disconnectBtn") as HTMLButtonElement;
const incomingArea = document.getElementById("incomingArea") as HTMLDivElement;

const subsList = document.getElementById("subscriptions") as HTMLUListElement;
const subjectSelect = document.getElementById("subjectSelect") as HTMLSelectElement;

//All SMMP relevant items
const smmpMenu = document.getElementById("smmpMenu") as HTMLDivElement
const smmpConnectBtn = document.getElementById("smmpConnectBtn") as HTMLButtonElement;
const downloadReceivedBtn = document.getElementById("downloadReceived") as HTMLButtonElement;

const mrnStoreUrl = "https://mrn-store.dmc.international";
const msrSecomSearchUrl = "https://msr.maritimeconnectivity.net/api/secom/v1/searchService";

const greenCheckMark = "\u2705";
const logoCol = document.getElementById("logoColumn") as HTMLDivElement;
const imgElement = document.createElement('img');
imgElement.src = logo;
imgElement.alt = 'MCP Logo';
imgElement.width = 100
imgElement.classList.add('mt-3', 'mb-3') //Margin to the top and bottom
logoCol.appendChild(imgElement);

interface Subject {
    value: string,
    name: string,
}

interface ServiceProvider {
    mrn: string,
    certificates: Certificate[]
}

interface Subscription {
    subject: string,
    serviceProviders: ServiceProvider[]
}

const subscriptions: Map<string, Subscription> = new Map();

let authenticated: boolean;
let connectionType: string;
connectionType = connTypeSelect.value;

connTypeSelect.addEventListener("change", () => {
    authenticated = connTypeSelect.value === "authenticated";
    connectionType = connTypeSelect.value;
    certInputDiv.hidden = !authenticated;
});

let certificate: Certificate;
let privateKey: CryptoKey;
let privateKeyEcdh : CryptoKey;

let ws: WebSocket;
let reconnectToken: string;
let lastSentMessage: MmtpMessage;
let remoteClients = new Map<string, RemoteClient>();
let segmentedMessages = new Map<string, SegmentedMessage>();
let ongoingSmmpHandshakes = new Map<string, NodeJS.Timer>();


connectBtn.addEventListener("click", async () => {
    if (!connectionType) {
        alert("Please choose a connection type");
        location.reload();
    }

    if (authenticated) {
        await loadCertAndPrivateKeyFromFiles();
        for (const rdn of certificate.subject.typesAndValues) {
            if (rdn.type === "0.9.2342.19200300.100.1.1") {
                ownMrn = rdn.value.valueBlock.value;
                mrnH3.innerHTML = "<strong>My MRN:</strong> " + ownMrn;
                mrnH3.hidden = false;
                break;
            }
        }
    }

    let wsUrl = urlInput.value;
    if (wsUrl === "") {
        alert("You need to choose an Edge Router to connect to!");
        location.reload();
    } else if (!wsUrl.startsWith("ws")) {
        wsUrl = "ws://" + wsUrl;
    }
    const edgeRouter = urlInput.options[urlInput.selectedIndex].textContent;

    ws = new WebSocket(wsUrl);

    ws.addEventListener("open", () => {
        let initialized = false;

        ws.onmessage = async (msgEvent) => {
            console.log("Message received:", msgEvent.data);
            const data = msgEvent.data as Blob;
            const bytes = await data.arrayBuffer();
            const mmtpMessage = MmtpMessage.decode(new Uint8Array(bytes));
            console.log(mmtpMessage);

            if (mmtpMessage.msgType === MsgType.RESPONSE_MESSAGE && mmtpMessage.responseMessage?.responseToUuid !== lastSentMessage.uuid) {
                console.error("The UUID of the last sent message does not match the UUID being responded to");
            }
            if (!initialized) {
                // do something
                connectContainer.hidden = true;
                msgContainer.hidden = false;
                reconnectToken = mmtpMessage.responseMessage!.reconnectToken!;

                if (authenticated) {
                    sendContainer.hidden = false;
                    smmpMenu.hidden = false;
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

                    lastSentMessage = subMsg;

                    ws.send(msgBlob);
                }
                initialized = true;

                disconnectBtn.addEventListener("click", () => {
                    disconnectBtn.disabled = true;
                    disconnectBtn.classList.add('active');
                    const disconnectMsg = MmtpMessage.create({
                        msgType: MsgType.PROTOCOL_MESSAGE,
                        uuid: uuidv4(),
                        protocolMessage: ProtocolMessage.create({
                            protocolMsgType: ProtocolMessageType.DISCONNECT_MESSAGE,
                            disconnectMessage: Disconnect.create()
                        })
                    });

                    msgBlob = MmtpMessage.encode(disconnectMsg).finish();

                    lastSentMessage = disconnectMsg;
                    ws.send(msgBlob);
                });

                if (ownMrn) {
                    await fetch(mrnStoreUrl + "/mrn", {
                        method: "POST",
                        body: JSON.stringify({mrn: ownMrn, edgeRouter: edgeRouter}),
                        mode: "cors",
                        headers: {"Content-Type": "application/json"}
                    });
                }

                disconnectBtn.hidden = false;
                receiveContainer.hidden = false;
            } else {
                if (mmtpMessage.msgType === MsgType.RESPONSE_MESSAGE) {
                    const msgs = mmtpMessage.responseMessage!.applicationMessages;
                    for (const msg of msgs!) {
                        const validSignature = await verifySignatureOnMessage(msg);

                        //Check if SMMP and in that case handle it as SMMP
                        let msgIsSmmp = await isSmmp(msg)
                        if (msgIsSmmp) {
                            const smmpMessage = SmmpMessage.decode(new Uint8Array(msg.body!.subarray(4,msg.body!.length)));
                            const flags : number = smmpMessage.header!.control![0]

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
                                        let flags : FlagsEnum[] = [FlagsEnum.ACK]
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
                                        let signedSendMsg = await signMessage(mmtpMsg, false)
                                        const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
                                        lastSentMessage = signedSendMsg;
                                        ws.send(toBeSent);
                                        clearInterval(handshakeRc);
                                        smmpConnectBtn.textContent = 'Connect SMMP';
                                        smmpConnectBtn.classList.remove('active');
                                        smmpConnectBtn.disabled = false;
                                        ongoingSmmpHandshakes.delete(msg.header!.sender!)
                                        showSmmpSessions(remoteClients)
                                    }
                                    //Send last ACK
                                // 1st step handshake
                                } else {
                                    const handshakeRc = ongoingSmmpHandshakes.get(msg.header!.sender!)
                                    console.log("Remote client wants to initiate SMMP session")
                                    let flags : FlagsEnum[] = [FlagsEnum.Handshake, FlagsEnum.ACK]
                                    if (remoteClient.confidentiality) {
                                        flags.push(FlagsEnum.Confidentiality)
                                    }
                                    if (remoteClient.deliveryAck) {
                                        flags.push(FlagsEnum.DeliveryGuarantee)
                                    }

                                    let smmpAckMsg =  getSmmpMessage(flags, 0, 1, uuidv4(), new Uint8Array(certBytes))
                                    const smmpPayload = SmmpMessage.encode(smmpAckMsg).finish()
                                    const finalPayload = appendMagicWord(smmpPayload)
                                    let mmtpMsg = getMmtpSendMrnMsg(msg.header!.sender!, finalPayload)
                                    let signedSendMsg = await signMessage(mmtpMsg, false)
                                    const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
                                    lastSentMessage = signedSendMsg;
                                    ws.send(toBeSent);
                                    //Send with ACK
                                }
                            // Case last part of three-way handshake, i.e. 3rd step of three-way handshake
                            // This is indicated by the presence of any handshake flag apart from the ACK
                            } else if (hasFlags(flags, [FlagsEnum.ACK]) &&
                                hasAnyFlag(flags, [FlagsEnum.Confidentiality, FlagsEnum.DeliveryGuarantee, FlagsEnum.NonRepudiation])) {
                                console.log("Last part of three-way-handshake ACK - SMMP session is now setup!")
                                showSmmpSessions(remoteClients)

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
                                   plaintext =  await decrypt(rc.symKey, smmpMessage.data);
                                }
                                const segmented : boolean = (smmpMessage.header!.totalBlocks! > 1);

                                if (segmented) {
                                    await handleSegmentedMessage(smmpMessage.header!, plaintext)
                                    const segMsg = (segmentedMessages.get(smmpMessage.header!.uuid!))! //undefined treated as false
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
                                } else {
                                    //No segmentation so simply display the decrypted message
                                    console.log("msg bytes: ", plaintext)
                                    msg.body = plaintext
                                    showReceivedMessage(msg, validSignature);
                                }
                            }
                        } else {
                            showReceivedMessage(msg, validSignature);
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
                    lastSentMessage = receive;
                    ws.send(msgBlob);
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

        lastSentMessage = connectMsg;
        ws.send(msgBlob);
    });

    ws.addEventListener("close", async evt => {
        if (evt.code !== 1000) {
            alert("Connection to Edge Router closed unexpectedly: " + evt.reason);
        }
        if (ownMrn) {
            await fetch(mrnStoreUrl + "/mrn/" + ownMrn, {
                method: "DELETE",
                mode: "cors"
            });
        }
        location.reload();
    });
});



async function isSmmp(msg: IApplicationMessage): Promise<boolean> {
    if (msg.body!.length < 4) { // Out of bounds check for SMMP magic word
        return false;
    }
    // Extract the first four bytes to check
    const toCheck = msg.body!.subarray(0, 4);
    // Uint8Array with the ASCII values for "SMMP"
    const magic = new Uint8Array([83, 77, 77, 80]);

    for (let i = 0; i < 4; i++) {
        if (toCheck[i] !== magic[i]) {
            return false;
        }
    }
    return true;
}



let certBytes: ArrayBuffer;
async function loadCertAndPrivateKeyFromFiles() {
    if (!certFileInput.files!.length || !privateKeyFileInput.files!.length) {
        alert("Please provide a certificate and private key file")
        location.reload()
    }

    const certString = await certFileInput.files![0].text();
    if (certString.startsWith("-----BEGIN")) { // Is this PEM encoded?
        certBytes = extractFromPem(certString, "CERTIFICATE");
    } else { // Nope, it is probably just DER encoded then
        certBytes = await certFileInput.files![0].arrayBuffer();
    }

    const privKeyString = await privateKeyFileInput.files![0].text();
    let privKeyBytes: ArrayBuffer;
    if (privKeyString.startsWith("-----BEGIN")) {
        privKeyBytes = extractFromPem(privKeyString, "PRIVATE KEY");
    } else {
        privKeyBytes = await privateKeyFileInput.files![0].arrayBuffer();
    }

    certificate = Certificate.fromBER(certBytes);
    console.log("Cert is", certificate)
    privateKey = await crypto.subtle.importKey("pkcs8", privKeyBytes, {
        name: "ECDSA",
        namedCurve: "P-384"
    }, false, ["sign"]);
    privateKeyEcdh = await crypto.subtle.importKey("pkcs8", privKeyBytes, {
        name: "ECDH",
        namedCurve: "P-384"
    }, false, ["deriveKey"]);

}

function extractFromPem(pemInput: string, inputType: string): ArrayBuffer {
    const b64 = pemInput.split(new RegExp(`-----BEGIN ${inputType}-----\r?\n?`))[1].split(`-----END ${inputType}-----`)[0];
    return str2ab(atob(b64));
}

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

const possibleSubscriptions: Subject[] = [
    {
        value: "urn:mrn:mcp:service:dk-dmi:weather_on_route",
        name: "Weather on route",
    },
    {
        value: "Boats",
        name: "Boats",
    },
    {
        value: "MCP",
        name: "MCP",
    },
    {
        value: "Weather",
        name: "Weather",
    },
    {
        value: "NW-AU",
        name: "NW from Australia"
    },
    {
        value: "s-124",
        name: "S124",
    },
    {
        value: "s-125",
        name: "S125",
    }
];

let encodedFile: Uint8Array | undefined;

interface Agent {
    mrn: string,
    edgeRouter: string,
}

interface RemoteClient {
    pubKey : CryptoKey,
    symKey : CryptoKey,
    confidentiality : boolean,
    deliveryAck : boolean,
    nonRepudiation: boolean,
}

interface SegmentedMessage {
    data : Uint8Array
    receivedBlocks : number
    totalBlocks : number
}

const mrnRadio = document.getElementById('mrn') as HTMLInputElement;
const subjectRadio = document.getElementById('subject') as HTMLInputElement;

mrnRadio.addEventListener('change', () => {
    if (mrnRadio.checked) {
        subjectSelect.hidden = true;
        receiverMrnSelect.hidden = false;
        fetch(mrnStoreUrl + "/mrns", {
            mode: "cors",
            method: "GET"
        })
            .then(resp => resp.json())
            .then((resp: Agent[]) => resp.forEach(agent => {
                console.log("Resp has length", resp.length)
                if (agent.mrn !== ownMrn && !mrnOptionExists(agent.mrn, receiverMrnSelect)) {
                    const mrnOption = document.createElement("option");
                    mrnOption.value = agent.mrn;
                    mrnOption.textContent = agent.mrn;
                    receiverMrnSelect.add(mrnOption);
                }
                console.log("Select is is: ", receiverMrnSelect)
                console.log("Select has options", receiverMrnSelect.options)
                remoteClients.forEach((rc, mrn) => {

                    //Check against existing from DOM model
                    console.log("Checking if elem already exists", mrn)
                    console.log("Compare with num options", receiverMrnSelect.options.length)
                    if (!mrnOptionExists(mrn, receiverMrnSelect)) {
                        console.log("Did not already exists")
                        const mrnOption = document.createElement("option");
                        mrnOption.value = mrn;
                        mrnOption.textContent = mrn;
                        receiverMrnSelect.add(mrnOption);
                    }
                })
            }));
        //Also add active SMMP Clients to the list - but only if not already there


    }
});

function mrnOptionExists(mrn : string, selectElem : HTMLSelectElement) {
    for (const option of Array.from(selectElem.options)) {
        console.log("Compare to ", option.value)
        if (option.value === mrn) {
            console.log("RETURN TRUE")
            return true
        }
    }
    return false
}



subjectRadio.addEventListener('change', () => {
    if (subjectRadio.checked) {
        receiverMrnSelect.hidden = true;
        receiverMrnSelect.innerHTML = "<option value=\"\">---Please select an MRN---</option>";
        subjectSelect.hidden = false;
        sendBtn.style.width = "100vw";
        sendSmmpBtn.hidden = true;
        sendBtn.textContent = "Send"
    }
});

let nwSubjectName: string;

possibleSubscriptions.forEach(ps => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const span = document.createElement("span");
    span.textContent = ps.name;
    span.classList.add("pe-2");
    li.appendChild(span);

    const subButton = document.createElement("button");
    subButton.classList.add("btn", "btn-primary");
    subButton.textContent = "Subscribe";
    li.appendChild(subButton);

    const unsubButton = document.createElement("button");
    unsubButton.classList.add("btn", "btn-danger");
    unsubButton.textContent = "Unsubscribe";
    unsubButton.hidden = true;
    li.appendChild(unsubButton);

    subButton.addEventListener("click", async () => {
        let subject = ps.value;
        if (ps.value === "NW-AU") {
            const auWkt = "POLYGON ((-257.167969 -26.902477, -242.753906 -14.774883, -227.285156 -7.885147, -206.71875 -12.21118, -203.027344 -36.597889, -213.222656 -47.872144, -250.488281 -39.504041, -257.167969 -26.902477))";
            const body = {
                query: {
                    dataProductType: "S124"
                },
                geometry: auWkt
            };
            const response = await fetch(msrSecomSearchUrl, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseSearchObject: ResponseSearchObject = await response.json();
            for (const sr of responseSearchObject.searchServiceResult) {
                if (sr.endpointUri.startsWith("urn:mrn")) { // this is an MMS subject
                    subject = sr.endpointUri;
                    nwSubjectName = subject;
                    const certs: Certificate[] = sr.certificates?.map(c => {
                        const pem = c.certificate;
                        const der = extractFromPem(pem, "CERTIFICATE");
                        return Certificate.fromBER(der);
                    }, []);
                    const serviceProvider: ServiceProvider = {
                        mrn: sr.instanceId,
                        certificates: certs
                    };
                    let subscription = subscriptions.get(subject);
                    if (!subscription) {
                        subscription = {
                            subject: subject,
                            serviceProviders: []
                        };
                    }
                    subscription.serviceProviders.push(serviceProvider);
                    subscriptions.set(subject, subscription);
                    // right now we just handle the first result we find
                    break;
                }
            }
        }
        const subMsg = MmtpMessage.create({
            uuid: uuidv4(),
            msgType: MsgType.PROTOCOL_MESSAGE,
            protocolMessage: ProtocolMessage.create({
                protocolMsgType: ProtocolMessageType.SUBSCRIBE_MESSAGE,
                subscribeMessage: Subscribe.create({
                    subject: subject
                })
            })
        });
        const subMsgBytes = MmtpMessage.encode(subMsg).finish();
        lastSentMessage = subMsg;
        ws.send(subMsgBytes);

        subButton.hidden = true;
        unsubButton.hidden = false;
    });

    unsubButton.addEventListener("click", () => {
        let subject = ps.value;
        if (subject === "NW-AU") {
            subject = nwSubjectName;
        }
        const unsubMsg = MmtpMessage.create({
            uuid: uuidv4(),
            msgType: MsgType.PROTOCOL_MESSAGE,
            protocolMessage: ProtocolMessage.create({
                protocolMsgType: ProtocolMessageType.UNSUBSCRIBE_MESSAGE,
                unsubscribeMessage: Unsubscribe.create({
                    subject: subject
                })
            })
        });
        const unsubMsgBytes = MmtpMessage.encode(unsubMsg).finish();
        lastSentMessage = unsubMsg;
        ws.send(unsubMsgBytes);

        unsubButton.hidden = true;
        subButton.hidden = false;
    });

    subsList.appendChild(li);

    const subjectOption = document.createElement("option");
    subjectOption.value = ps.value;
    subjectOption.textContent = ps.name;
    subjectSelect.appendChild(subjectOption);
});

interface SignatureVerificationResponse {
    valid: boolean,
    signer?: string,
    serialNumber?: bigint
}

async function verifySignatureOnMessage(msg: IApplicationMessage): Promise<SignatureVerificationResponse> {
    // Currently we only check subject-casts
    if (msg.header!.subject) {
        const signatureSequence = fromBER(msg.signature!).result as Sequence;
        let r = (signatureSequence.valueBlock.value.at(0) as Integer).valueBlock.valueHexView;
        if (r.length === 49) {
            r = r.subarray(1, r.length);
        }
        let s = (signatureSequence.valueBlock.value.at(1) as Integer).valueBlock.valueHexView;
        if (s.length === 49) {
            s = s.subarray(1, s.length);
        }
        const rawSignature = new Uint8Array(r.length + s.length);
        rawSignature.set(r, 0);
        rawSignature.set(s, r.length);

        const subject = msg.header!.subject;

        let uint8Arrays: Uint8Array[] = [];
        const textEncoder = new TextEncoder();
        uint8Arrays.push(textEncoder.encode(subject));
        uint8Arrays.push(textEncoder.encode(msg.header!.expires.toString(10)));
        uint8Arrays.push(textEncoder.encode(msg.header!.sender!));
        uint8Arrays.push(textEncoder.encode(msg.header!.bodySizeNumBytes!.toString()));
        uint8Arrays.push(msg.body!);

        let length = uint8Arrays.reduce((acc, a) => acc + a.length, 0);
        const bytesToBeVerified = new Uint8Array(length);
        let offset = 0;
        for (const array of uint8Arrays) {
            bytesToBeVerified.set(array, offset);
            offset += array.length;
        }

        const subscription = subscriptions.get(subject);
        if (subscription) {
            for (const serviceProvider of subscription.serviceProviders) {
                for (const certificate of serviceProvider.certificates) {
                    const publicKey = await certificate.getPublicKey();
                    const valid = await crypto.subtle.verify({
                        name: "ECDSA",
                        hash: "SHA-384"
                    }, publicKey, rawSignature, bytesToBeVerified);
                    if (valid) {
                        return {
                            valid: true,
                            signer: serviceProvider.mrn,
                            serialNumber: certificate.serialNumber.toBigInt()
                        };
                    }
                }
            }
        }
    }
    return {valid: false};
}

const fileBytesArray = new TextEncoder().encode("FILE"); // The bytes of the word "FILE"

function showReceivedMessage(msg: IApplicationMessage, signatureVerificationResponse: SignatureVerificationResponse) {
    const payload = msg.body;
    const decoder = new TextDecoder();
    const lineBreak = document.createElement('br');
    console.log(payload!.subarray(0, 4))

    if (arraysEqual(payload!.subarray(0, 4), fileBytesArray)) {
        for (let i = 4; i < payload!.length; i++) {
            if (arraysEqual(payload!.subarray(i, i + 4), fileBytesArray)) {
                const fileNameBytes = payload!.subarray(4, i);
                const fileName = decoder.decode(fileNameBytes);
                const content = payload!.subarray(i + 4);
                let newStr = ""

                const downloadLink = document.createElement("a");
                downloadLink.href = "#";
                downloadLink.textContent = fileName;
                downloadLink.onclick = (e) => {
                    let hidden_a = document.createElement('a');
                    hidden_a.setAttribute('href', 'data:application/octet-stream;base64,' + bytesToBase64(content));
                    hidden_a.setAttribute('download', fileName);
                    document.body.appendChild(hidden_a);
                    hidden_a.click();

                    e.preventDefault();
                };
                if (incomingArea.textContent !== '') {
                    incomingArea.prepend(lineBreak);
                }
                const textSpan = document.createElement("span");
                textSpan.setAttribute("data-toggle", "tooltip");
                textSpan.textContent = `${msg.header!.sender!} sent: `;
                const date = Date()
                textSpan.title = `${date}`
                incomingArea.prepend(textSpan)
                textSpan.append(downloadLink);
                downloadReceivedBtn.onclick = () => {
                    downloadLink.click();
                }
                downloadReceivedBtn.hidden = false
                break;
            }
        }
    } else {
        downloadReceivedBtn.hidden = true
        const text = decoder.decode(payload!);
        const textSpan = document.createElement("span");
        textSpan.setAttribute("data-toggle", "tooltip");
        textSpan.textContent = `${msg.header!.sender!} sent: ${text}`;
        const date = Date()
        textSpan.title = `${date}`
        if (incomingArea.textContent !== '') {
            incomingArea.prepend(lineBreak);
        }
        incomingArea.prepend(textSpan)
    }
    if (signatureVerificationResponse.valid) {
        const signatureStatusSpan = document.createElement("span");
        signatureStatusSpan.style.marginLeft = "4px";
        signatureStatusSpan.setAttribute("data-toggle", "tooltip");
        signatureStatusSpan.setAttribute("data-placement", "right");
        signatureStatusSpan.textContent = greenCheckMark;
        signatureStatusSpan.title = `The signature was successfully verified using certificate for ${signatureVerificationResponse.signer} with serial number ${signatureVerificationResponse.serialNumber!.toString()}`;

        if (incomingArea.textContent !== '') {
            incomingArea.prepend(lineBreak);
        }
        incomingArea.prepend(signatureStatusSpan);
    }
}

function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}

function bytesToBase64(bytes: Uint8Array): string {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}

sendBtn.addEventListener("click", async () => {
    if (!mrnRadio.checked && !subjectRadio.checked) {
        alert("You need to choose message type!");
    }
    let body: Uint8Array;
    if (encodedFile) {
        body = encodedFile;
    } else {
        const text = msgArea.value;
        const encoder = new TextEncoder();
        body = encoder.encode(text);
    }
    await sendMsg(body)
    const oldText = sendBtn.textContent
    setTimeout(() => {
        sendBtn.textContent = 'Sent';
        sendBtn.classList.remove('btn-primary');
        sendBtn.classList.add('btn-success');
        sendBtn.disabled = true;

        // Reset button after 3 seconds
        setTimeout(() => {
            sendBtn.textContent = oldText;
            sendBtn.classList.remove('btn-success');
            sendBtn.classList.add('btn-primary');
            sendBtn.disabled = false;
        }, 3000);
    }, 500);
    console.log("MSG SENT!")
    msgArea.value = "";
    encodedFile = undefined;
    loadedState.style.display = 'none';
    unloadedState.style.display = 'block';
});

async function sendMsg(body : Uint8Array) {

    // set expiration to be one hour from now
    const expires = new Date();
    expires.setTime(expires.getTime() + 3_600_000);

    const sendMsg = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.SEND_MESSAGE,
            sendMessage: Send.create({
                applicationMessage: ApplicationMessage.create({
                    header: ApplicationMessageHeader.create({
                        expires: Math.floor(expires.getTime() / 1000),
                        sender: ownMrn,
                        bodySizeNumBytes: body.length,
                    }),
                    body: body,
                })
            })
        })
    });
    let subjectCastMsg : boolean = false

    if (mrnRadio.checked) {
        const receiver = receiverMrnSelect.options[receiverMrnSelect.selectedIndex].value;
        sendMsg.protocolMessage!.sendMessage!.applicationMessage!.header!.recipients = Recipients.create({
            recipients: [receiver]
        });

    } else if (subjectRadio.checked) {
        sendMsg.protocolMessage!.sendMessage!.applicationMessage!.header!.subject = subjectSelect.options[subjectSelect.selectedIndex].value;
        subjectCastMsg = true
    }

    let signedSendMsg = await signMessage(sendMsg, subjectCastMsg)

    const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
    console.log("Sent MMTP message: ", signedSendMsg);
    lastSentMessage = signedSendMsg;
    ws.send(toBeSent);

}

sendSmmpBtn.addEventListener("click", async () => {
    const receiverMrn = receiverMrnSelect.options[receiverMrnSelect.selectedIndex].value;
    const rc = remoteClients.get(receiverMrn)!;

    //Get the images to be sent
    let body: Uint8Array;
    if (encodedFile) {
        body = encodedFile;
    } else {
        const text = msgArea.value;
        const encoder = new TextEncoder();
        body = encoder.encode(text);
    }
    let flags : FlagsEnum[] = []
    const smmpUuid = uuidv4()
    const msgSegments = Math.ceil(body.length / SMMP_SEGMENTATION_THRESHOLD + 1)
    console.log("MSG SEGMENTS: ", msgSegments)
    for (let i = 0; i < msgSegments; i++) {
        const segment = body.subarray(i*SMMP_SEGMENTATION_THRESHOLD, (i+1)*SMMP_SEGMENTATION_THRESHOLD) //Idx will be clamped
        console.log("Total segments", msgSegments)
        console.log("Cur segment", segment)
        const cipherSegment = await encrypt(rc.symKey, segment)
            const smmpMessage = getSmmpMessage(flags, i, msgSegments, smmpUuid, new Uint8Array(cipherSegment))
            console.log(smmpMessage)
            const smmpPayload = SmmpMessage.encode(smmpMessage).finish()
            await sendSmmpMsg(smmpPayload)
        }

    setTimeout(() => {
        sendSmmpBtn.textContent = 'Sent';
        sendSmmpBtn.classList.remove('btn-warning');
        sendSmmpBtn.classList.add('btn-success');
        sendSmmpBtn.disabled = true;

        // Reset button after 3 seconds
        setTimeout(() => {
            sendSmmpBtn.textContent = 'Send SMMP';
            sendSmmpBtn.classList.remove('btn-success');
            sendSmmpBtn.classList.add('btn-warning');
            sendSmmpBtn.disabled = false;
        }, 3000);
    }, 500);
});

//Caller should pass the smmp payload as argument to this function
async function sendSmmpMsg(body : Uint8Array) {
    const dataPayload = appendMagicWord(body)
    await sendMsg(dataPayload)
}

downloadReceivedBtn.addEventListener('click', async() => {
    setTimeout(() => {
        downloadReceivedBtn.textContent = 'Downloading...';
        downloadReceivedBtn.classList.add('active')
        downloadReceivedBtn.disabled = true;

        // Reset button after 3 seconds
        setTimeout(() => {
            downloadReceivedBtn.textContent = 'Download';
            downloadReceivedBtn.classList.remove('active');
            downloadReceivedBtn.disabled = false;
        }, 3000);
    }, 500);
})

//If SMMP is established with receiver, the user can choose to send message as either MMTP or SMMP
receiverMrnSelect.addEventListener("change", async () => {
    if (mrnRadio.checked && remoteClients.has(receiverMrnSelect.options[receiverMrnSelect.selectedIndex].value)) {
        sendBtn.style.width = "0.5";
        sendBtn.textContent = "Send MMTP";
        sendBtn.style.display = "inline-block";
        sendSmmpBtn.style.width = "0.5";
        sendSmmpBtn.hidden = false;
        sendSmmpBtn.style.display = "inline-block";
    } else {
        sendBtn.style.width = "100vw";
        sendSmmpBtn.hidden = true;
        sendBtn.textContent = "Send"
    }
})

smmpConnectBtn.addEventListener("click", async () => {
    const rcClientMrn = document.getElementById("rcClientMrn") as HTMLInputElement
    console.log(rcClientMrn.value)

    setTimeout(() => {
        smmpConnectBtn.textContent = 'Awaiting Remote Client...';
        smmpConnectBtn.classList.add('active')
        smmpConnectBtn.disabled = true;
    }, 500);

    let smmpMsg = getSmmpHandshakeMessage()
    const smmpPayload = SmmpMessage.encode(smmpMsg).finish()
    const finalPayload = appendMagicWord(smmpPayload)
    let mmtpMsg = getMmtpSendMrnMsg(rcClientMrn.value, finalPayload)

    let signedSendMsg = await signMessage(mmtpMsg, false)

    const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
    console.log("MMTP message: ", signedSendMsg);
    lastSentMessage = signedSendMsg;
    ws.send(toBeSent);

    //Button countdown
    let count = 15
    const countdownInterval = setInterval(() => {
        smmpConnectBtn.textContent = `Awaiting Remote Client...${count}`;
        count--;

        // When the countdown reaches 0, stop the interval and update the button text
        if (count< 0) {
            clearInterval(countdownInterval);
            smmpConnectBtn.textContent = 'No response received';
            setTimeout(() => {
                smmpConnectBtn.textContent = 'Connect SMMP';
                smmpConnectBtn.classList.remove('active');
                smmpConnectBtn.disabled = false;
                ongoingSmmpHandshakes.delete(rcClientMrn.value)
            }, 2000);
        }
    }, 1000); // 1000 milliseconds = 1 second
    ongoingSmmpHandshakes.set(rcClientMrn.value, countdownInterval)

    console.log("MSG SENT!")

    msgArea.value = "";
    encodedFile = undefined;
    loadedState.style.display = 'none';
    unloadedState.style.display = 'block';
});


//Message receive
const receiveBtn = document.getElementById("receiveBtn") as HTMLButtonElement;
receiveBtn.addEventListener("click", () => {
    setTimeout(() => {
        receiveBtn.textContent = 'Receiving...';
        receiveBtn.classList.add('active');
        receiveBtn.disabled = true;
        setTimeout(() => {
            receiveBtn.textContent = "Receive Messages";
            receiveBtn.classList.remove('active');
            receiveBtn.disabled = false;
        }, 3000);
    }, 500);
    const receive = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.RECEIVE_MESSAGE,
            receiveMessage: Receive.create({})
        })
    });
    const bytes = MmtpMessage.encode(receive).finish();
    lastSentMessage = receive;
    ws.send(bytes);
});

function encodeFile(fileName: string, data: Uint8Array): Uint8Array {
    const fileNameArray = new TextEncoder().encode("FILE" + fileName + "FILE");
    const mergedArray = new Uint8Array(fileNameArray.length + data.length);
    mergedArray.set(fileNameArray);
    mergedArray.set(data, fileNameArray.length);
    return mergedArray;
}

const fileInput = document.getElementById('fileInput')!;
fileInput.addEventListener("change", (event) => handleFiles(event), false);

function handleFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files!;
    const file: File = files[0];
    if (file) {
        file.arrayBuffer().then(buff => {
            let data = new Uint8Array(buff); // x is your uInt8Array
            // perform all required operations with x here.
            encodedFile = encodeFile(file.name, data);
            loadedState.style.display = 'block';
            unloadedState.style.display = 'none';
        });
    }
}

//-------------Definition of SMMP guarantees---------------
enum FlagsEnum {
    Handshake = 1 << 0,         // H (bit value 1)
    ACK = 1 << 1,               // A (bit value 2)
    Confidentiality = 1 << 2,   // C (bit value 4)
    DeliveryGuarantee = 1 << 3, // D (bit value 8)
    NonRepudiation = 1 << 4     // N (bit value 16)
}

function setFlags(flags: FlagsEnum[]) : number {
    let result = 0
    for (const flag of flags) {
        result |= flag;
    }
    return result;
}

function hasFlags(val : number, flags : FlagsEnum[]) : boolean {
    for (const flag  of flags) {
        if ((val&flag) === 0) {
            return false
        }
    }
    return true
}

function hasAnyFlag(val : number, flags : FlagsEnum[]) : boolean {
    for (const flag  of flags) {
        if ((val&flag) !== 0) {
            return true
        }
    }
    return false
}

function getMmtpSendMrnMsg(recipientMrn : string, body : Uint8Array) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 3_600_000);

    const sendMsg = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.SEND_MESSAGE,
            sendMessage: Send.create({
                applicationMessage: ApplicationMessage.create({
                    header: ApplicationMessageHeader.create({
                        expires: Math.floor(expires.getTime() / 1000),
                        sender: ownMrn,
                        bodySizeNumBytes: body.length,
                    }),
                    body: body,
                })
            })
        })
    });
    sendMsg.protocolMessage!.sendMessage!.applicationMessage!.header!.recipients = Recipients.create({
        recipients: [recipientMrn]
    });

    return sendMsg
}

function getSmmpMessage(flags : FlagsEnum[], blcNum : number, totalBlcs : number, smmpUuid : string, smmpData : Uint8Array) {
    let controlBits = setFlags(flags)

    //Due to an unsafe cast in the Go Implementation - TODO: This needs to be changed in both implementations
    const arr = new Uint8Array(1)
    arr[0] = controlBits
    console.log(arr.toString())

    return SmmpMessage.create({
        header: SmmpHeader.create({
            control : arr,
            blockNum : blcNum,
            totalBlocks : totalBlcs,
            payloadLen : smmpData.length,
            uuid : smmpUuid
        }),
        data : smmpData
    })
}

function getSmmpHandshakeMessage() {
    const flags : FlagsEnum[] = [FlagsEnum.Handshake, FlagsEnum.Confidentiality, FlagsEnum.DeliveryGuarantee]
    //Get the signing certificate
    return getSmmpMessage(flags, 0, 1, uuidv4(), new Uint8Array(certBytes))
}


async function signMessage(msg : MmtpMessage, subject : boolean) {
    const appMsgHeader = msg.protocolMessage!.sendMessage!.applicationMessage!.header!
    const appMsg = msg.protocolMessage!.sendMessage!.applicationMessage!

    let uint8Arrays: Uint8Array[] = [];
    const encoder = new TextEncoder();

    if (subject) {
        uint8Arrays.push(encoder.encode(appMsgHeader.subject!));
    } else {
        uint8Arrays.push(encoder.encode(appMsgHeader.recipients!.recipients![0]));
    }

    uint8Arrays.push(encoder.encode(appMsgHeader.expires.toString()));
    uint8Arrays.push(encoder.encode(ownMrn));
    uint8Arrays.push(encoder.encode(appMsg.body!.length.toString()));
    uint8Arrays.push(appMsg.body!);

    let length = uint8Arrays.reduce((acc, a) => acc + a.length, 0);

    let bytesToBeSigned = new Uint8Array(length);
    let offset = 0;
    for (const array of uint8Arrays) {
        bytesToBeSigned.set(array, offset);
        offset += array.length;
    }

    const signature = new Uint8Array(await crypto.subtle.sign({
        name: "ECDSA",
        hash: "SHA-384"
    }, privateKey, bytesToBeSigned));

    const r = signature.slice(0, signature.length / 2);
    const s = signature.slice(signature.length / 2, signature.length);

    let sequence = new Sequence();
    sequence.valueBlock.value.push(Integer.fromBigInt(bufToBigint(r)));
    sequence.valueBlock.value.push(Integer.fromBigInt(bufToBigint(s)));
    msg.protocolMessage!.sendMessage!.applicationMessage!.signature = new Uint8Array(sequence.toBER());

    return msg
}

//Factory Function to create a new RemoteClient
const createRemoteClient = (pk: CryptoKey, sk: CryptoKey, conf: boolean, dAck: boolean): RemoteClient => {
    return {
        pubKey: pk,
        symKey: sk,
        confidentiality: conf,
        deliveryAck: dAck,
        nonRepudiation: false,
    };
};

const createSegmentedMessage = (rb : number, tb : number, maxBlockSize : number): SegmentedMessage => {
    return {
        receivedBlocks : rb,
        totalBlocks : tb,
        data : new Uint8Array(tb * maxBlockSize)
    };
};

const loadedState = document.getElementById('file-state-loaded')!;
const unloadedState = document.getElementById('file-state-unloaded')!;

loadedState.style.display = 'none';
unloadedState.style.display = 'block';

//Derives a shared AES-CTR 256-bit key for session confidentiality
async function deriveSecretKey(privateKey : CryptoKey, publicKey : CryptoKey) {
    const privateKeyAlgorithm = privateKey.algorithm;
    const publicKeyAlgorithm = publicKey.algorithm;

    if (privateKeyAlgorithm.name !== 'ECDH') {
        throw new Error('Private key must be an ECDH key with P-384 curve');
    }

    if (publicKeyAlgorithm.name !== 'ECDH') {
        throw new Error('Public key must be an ECDH key with P-384 curve');
    }

    return await window.crypto.subtle.deriveKey(
        {
            name: "ECDH",
            public: publicKey,
        },
        privateKey,
        {
            name: "AES-CTR",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );
}

//Inspired from https://github.com/mdn/dom-examples/blob/main/web-crypto/derive-key/ecdh.js
//Note from  NIST SP800-38A standard the max number of blocks MAY NOT EXCEED 2^64
async function encrypt(secretKey : CryptoKey, data : Uint8Array) {
    let iv = window.crypto.getRandomValues(new Uint8Array(16));
    let ciphertext = await crypto.subtle.encrypt(
    {
        name: "AES-CTR",
        counter: iv,
        length: 64 //The length that should be incremented
        },
        secretKey,
        data,
    )
    //Regarding counter, The rightmost length bits of this block are used for the counter, and the rest is used for the nonce. For example, if length is set to 64, then the first half of counter is the nonce and the second half is used for the counter.
    // Convert ciphertext to Uint8Array and prepend the IV
    let ciphertextArray = new Uint8Array(ciphertext);
    let result = new Uint8Array(iv.length + ciphertextArray.length);
    result.set(iv);
    result.set(ciphertextArray, iv.length);

    return result;
}

async function decrypt(secretKey : CryptoKey, data : Uint8Array) {
    // Extract the IV from the beginning of the data
    let iv = data.slice(0, 16);
    let ciphertext = data.slice(16);

    // Decrypt the data using AES-CTR
    let decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: iv,
            length: 64, // The rightmost 64 bits are used for the counter
        },
        secretKey,
        ciphertext
    );
    return new Uint8Array(decrypted);
}

function appendMagicWord(smmpPayload : Uint8Array) : Uint8Array {
    const magic = new Uint8Array([83, 77, 77, 80]);
    const finalPayload = new Uint8Array(magic.length + smmpPayload.length)
    finalPayload.set(magic, 0);
    finalPayload.set(smmpPayload, magic.length);
    return finalPayload
}

function showSmmpSessions(sessions : Map<string,RemoteClient>) {
    const activeSmmpSessionsDiv = document.getElementById('activeSmmpSessions')!;
    activeSmmpSessionsDiv.innerHTML = ''; // Clear existing images

    if (sessions.size > 0) {
        const ul = document.createElement('ul');
        ul.classList.add('list-group');

        sessions.forEach((rc, mrn) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            // Create a div for the MRN span to keep it left-aligned
            const mrnDiv = document.createElement('div');
            const mrnSpan = document.createElement('span');
            mrnSpan.textContent = `${mrn}`;
            mrnDiv.appendChild(mrnSpan);
            li.appendChild(mrnDiv);

            // Create a div for the boolean values to keep th<em right-aligned
            const boolDiv = document.createElement('div');
            boolDiv.classList.add('d-flex', 'flex-grow-1', 'justify-content-end');

            const confSpan = document.createElement('span');
            confSpan.textContent = `C: ${rc.confidentiality}`;
            confSpan.classList.add('mx-1')
            boolDiv.appendChild(confSpan);

            const deliverySpan = document.createElement('span');
            deliverySpan.textContent = `D: ${rc.deliveryAck}`;
            deliverySpan.classList.add('mx-1')
            boolDiv.appendChild(deliverySpan);

            const nonrepudiationSpan = document.createElement('span');
            nonrepudiationSpan.textContent = `N: ${rc.nonRepudiation}`;
            nonrepudiationSpan.classList.add('mx-1')
            boolDiv.appendChild(nonrepudiationSpan);


            li.appendChild(boolDiv);

            const endDiv = document.createElement('div');
            endDiv.classList.add('ml-auto');
            const endSessionBtn = document.createElement('button');
            endSessionBtn.classList.add('btn', 'btn-danger', 'btn-sm')
            endSessionBtn.textContent = 'x'
            endSessionBtn.addEventListener('click', async () => {
                //TODO Send SMMP Close segment once defined in the protocol
                remoteClients.delete(mrn)
                endSessionBtn.disabled = true
                endSessionBtn.classList.add('active')
                setTimeout(() => {
                   li.remove()
                }, 2000);

            })

            endDiv.appendChild(endSessionBtn)

            li.appendChild(endDiv)

            // Append the list item to the list
            ul.appendChild(li);
        });
        activeSmmpSessionsDiv.appendChild(ul);
        activeSmmpSessionsDiv.hidden = false;
    }
}

async function handleSegmentedMessage(header : ISmmpHeader, plaintext : Uint8Array) {
    //If no entry exists, create one
    let segmentedMsg = segmentedMessages.get(header.uuid!);
    if (!segmentedMsg) {
        segmentedMsg = createSegmentedMessage(0, header.totalBlocks!, SMMP_SEGMENTATION_THRESHOLD)
        segmentedMessages.set(header.uuid!, segmentedMsg)
    }
    segmentedMsg.receivedBlocks++
    segmentedMsg.data.set(plaintext, header.blockNum! * SMMP_SEGMENTATION_THRESHOLD)
}

