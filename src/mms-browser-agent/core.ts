import {
    ApplicationMessage,
    ApplicationMessageHeader, Connect, Disconnect,
    IApplicationMessage,
    MmtpMessage,
    MsgType,
    ProtocolMessage,
    ProtocolMessageType,
    Receive,
    Send, Subscribe,
} from "../mms/mmtp";
import {v4 as uuidv4} from "uuid";
import {Certificate} from "pkijs";
import {fromBER, Integer, Sequence} from "asn1js";
import {bufToBigint} from "bigint-conversion";
import {SmmpHeader, SmmpMessage} from "../mms/smmp";
import { CertBundle } from "../models/certBundle";

let state: { ws?: WebSocket; privateKey?: CryptoKey, ownMrn?: string } = {};

export const initLegacyDependencies = (deps: typeof state) => {
    state = deps;
};


interface ServiceProvider {
    mrn: string,
    certificates: Certificate[]
}

interface Subscription {
    subject: string,
    serviceProviders: ServiceProvider[]
}

const subscriptions: Map<string, Subscription> = new Map();


export async function isSmmp(msg: IApplicationMessage): Promise<boolean> {
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

export async function verifySignatureOnMessage(msg: IApplicationMessage): Promise<SignatureVerificationResponse> {
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
        // @ts-ignore
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

function extractFromPem(pemInput: string, inputType: string): ArrayBuffer {
    const b64 = pemInput.split(new RegExp(`-----BEGIN ${inputType}-----\r?\n?`))[1].split(`-----END ${inputType}-----`)[0];
    return str2ab(atob(b64));
}

export async function loadCertAndPrivateKeyFromFiles(certFile: File, privKeyFile: File): Promise<CertBundle> {
    if (!certFile || !privKeyFile) {
        alert("Please provide a certificate and private key file");
        throw new Error("No files provided");
    }
    let certificate: Certificate;
    let certBytes: BufferSource;
    let privateKey: CryptoKey;
    let privateKeyEcdh: CryptoKey;

    const certString = await certFile.text();
    if (certString.startsWith("-----BEGIN")) { // Is this PEM encoded?
        certBytes = extractFromPem(certString, "CERTIFICATE");
    } else { // Nope, it is probably just DER encoded then
        certBytes = await certFile.arrayBuffer();
    }

    const privKeyString = await privKeyFile.text();
    let privKeyBytes: ArrayBuffer;
    if (privKeyString.startsWith("-----BEGIN")) {
        privKeyBytes = extractFromPem(privKeyString, "PRIVATE KEY");
    } else {
        privKeyBytes = await privKeyFile.arrayBuffer();
    }

    certificate = Certificate.fromBER(certBytes!);
    privateKey = await crypto.subtle.importKey("pkcs8", privKeyBytes, {
        name: "ECDSA",
        namedCurve: "P-384"
    }, false, ["sign"]);
    privateKeyEcdh = await crypto.subtle.importKey("pkcs8", privKeyBytes, {
        name: "ECDH",
        namedCurve: "P-384"
    }, false, ["deriveKey"]);

    return {certificate, privateKey, privateKeyEcdh} as CertBundle;
}

export interface RemoteClient {
    pubKey : CryptoKey,
    symKey : CryptoKey,
    confidentiality : boolean,
    deliveryAck : boolean,
    nonRepudiation: boolean,
}

export interface SegmentedMessage {
    data : Uint8Array
    receivedBlocks : number
    totalBlocks : number
}


interface SignatureVerificationResponse {
    valid: boolean,
    signer?: string,
    serialNumber?: bigint
}

function bytesToBase64(bytes: Uint8Array): string {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}

export async function sendSubjectMsg(subj : string, body : Uint8Array, signingKey : CryptoKey, ws : WebSocket, mrn : string) {
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
                        sender: mrn,
                        bodySizeNumBytes: body.length,
                        subject: subj,
                    }),
                    body: body,
                })
            })
        })
    });

    if (signingKey) {
        let signedSendMsg = await signMessage(sendMsg, true, signingKey)
        console.log(signedSendMsg)

        const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
        if (ws) {
            ws.send(toBeSent);
        } else {
            console.log("Could not send message - No websocket")
        }
    } else {
        console.log("Could not send message - No signature key")
    }

}

export async function sendDirectMsg(body : Uint8Array, receiver : string, signingKey : CryptoKey, ws : WebSocket, mrn : string) {
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
                        sender: mrn,
                        bodySizeNumBytes: body.length,
                        recipients: {
                            recipients: [receiver]
                        },
                    }),
                    body: body,
                })
            })
        })
    });

    if (signingKey) {
        let signedSendMsg = await signMessage(sendMsg, false,signingKey)
        const toBeSent = MmtpMessage.encode(signedSendMsg).finish();
        if (ws) {
            ws.send(toBeSent);
        } else {
            console.log("Could not send message - No websocket")
        }
    } else {
        console.log("Could not send message - No signature key")
    }
}

export async function sendMsg(msg : MmtpMessage, ws : WebSocket) {
    const toBeSent = MmtpMessage.encode(msg).finish();
    if (ws) {
        ws.send(toBeSent);
        console.log("MMTP msg sent")
    } else {
        console.error("Could not send message - No Websocket connection")
    }
}

//Request to receive all pending messages from the edgerouter
export async function sendMsgReceive(ws : WebSocket) {
    const receive = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.RECEIVE_MESSAGE,
            receiveMessage: Receive.create({})
        })
    });
    const toBeSent = MmtpMessage.encode(receive).finish();
    if (ws) {
        ws.send(toBeSent);
    } else {
        console.log("Could not send message - No websocket")
    }
}

export async function sendSubOwnMrn(ownMrn : string, ws : WebSocket) {
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
    const toBeSent = MmtpMessage.encode(subMsg).finish();
    if (ws) {
        ws.send(toBeSent);
    } else {
        console.log("Could not send message - No websocket")
    }
}

export async function sendSubName(subjectName : string, ws : WebSocket) {
    const subMsg = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.SUBSCRIBE_MESSAGE,
            subscribeMessage: Subscribe.create({
                subject: subjectName
            })
        })
    });
    const toBeSent = MmtpMessage.encode(subMsg).finish();
    if (ws) {
        ws.send(toBeSent);
    } else {
        console.log("Could not send message - No websocket")
    }
}

export async function sendDisconnect(ws : WebSocket) {
    const subMsg = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.DISCONNECT_MESSAGE,
            disconnectMessage: Disconnect.create({})
        })
    });
    const toBeSent = MmtpMessage.encode(subMsg).finish();
    if (ws) {
        ws.send(toBeSent);
    } else {
        console.log("Could not send message - No websocket")
    }
}

//-------------Definition of SMMP guarantees---------------
export enum FlagsEnum {
    Handshake = 1 << 0,         // H (bit value 1)
    ACK = 1 << 1,               // A (bit value 2)
    Confidentiality = 1 << 2,   // C (bit value 4)
    DeliveryGuarantee = 1 << 3, // D (bit value 8)
    NonRepudiation = 1 << 4     // N (bit value 16)
}

export function setFlags(flags: FlagsEnum[]) : number {
    let result = 0
    for (const flag of flags) {
        result |= flag;
    }
    return result;
}

export function hasFlags(val : number, flags : FlagsEnum[]) : boolean {
    for (const flag  of flags) {
        if ((val&flag) === 0) {
            return false
        }
    }
    return true
}

export function hasAnyFlag(val : number, flags : FlagsEnum[]) : boolean {
    for (const flag  of flags) {
        if ((val&flag) !== 0) {
            return true
        }
    }
    return false
}

export function getSmmpMessage(flags : FlagsEnum[], blcNum : number, totalBlcs : number, smmpUuid : string, smmpData : Uint8Array) {
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


export async function signMessage(msg : MmtpMessage, subject : boolean, signKey : CryptoKey) {
    const appMsgHeader = msg.protocolMessage!.sendMessage!.applicationMessage!.header!
    const appMsg = msg.protocolMessage!.sendMessage!.applicationMessage!

    let uint8Arrays: Uint8Array[] = [];
    const encoder = new TextEncoder();

    if (subject) {
        uint8Arrays.push(encoder.encode(appMsgHeader.subject!));
    } else {
        uint8Arrays.push(encoder.encode(appMsgHeader.recipients!.recipients![0]));
    }

    // @ts-ignore
    uint8Arrays.push(encoder.encode(appMsgHeader.expires.toString()));
    uint8Arrays.push(encoder.encode(state.ownMrn));
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
    }, signKey, bytesToBeSigned));

    const r = signature.slice(0, signature.length / 2);
    const s = signature.slice(signature.length / 2, signature.length);

    let sequence = new Sequence();
    sequence.valueBlock.value.push(Integer.fromBigInt(bufToBigint(r)));
    sequence.valueBlock.value.push(Integer.fromBigInt(bufToBigint(s)));
    msg.protocolMessage!.sendMessage!.applicationMessage!.signature = new Uint8Array(sequence.toBER());

    return msg
}

//Factory Function to create a new RemoteClient
export const createRemoteClient = (pk: CryptoKey, sk: CryptoKey, conf: boolean, dAck: boolean): RemoteClient => {
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

export async function deriveSecretKey(privateKey : CryptoKey, publicKey : CryptoKey) {
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

export async function decrypt(secretKey : CryptoKey, data : Uint8Array) {
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

export function appendMagicWord(smmpPayload : Uint8Array) : Uint8Array {
    const magic = new Uint8Array([83, 77, 77, 80]);
    const finalPayload = new Uint8Array(magic.length + smmpPayload.length)
    finalPayload.set(magic, 0);
    finalPayload.set(smmpPayload, magic.length);
    return finalPayload
}

export function getConnectMsg(mrn : string ) {
    // Create the connect message with the provided MRN
    const connectMsg = MmtpMessage.create({
        msgType: MsgType.PROTOCOL_MESSAGE,
        uuid: uuidv4(),
        protocolMessage: ProtocolMessage.create({
            protocolMsgType: ProtocolMessageType.CONNECT_MESSAGE,
            connectMessage: Connect.create({
                ownMrn: mrn // Assign the given MRN
            })
        })
    });

    return connectMsg;
}

