import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of an ApplicationMessage. */
export interface IApplicationMessage {

    /** ApplicationMessage header */
    header?: (IApplicationMessageHeader|null);

    /** ApplicationMessage body */
    body?: (Uint8Array|null);

    /** ApplicationMessage signature */
    signature?: (Uint8Array|null);
}

/** Represents an ApplicationMessage. */
export class ApplicationMessage implements IApplicationMessage {

    /**
     * Constructs a new ApplicationMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApplicationMessage);

    /** ApplicationMessage header. */
    public header?: (IApplicationMessageHeader|null);

    /** ApplicationMessage body. */
    public body: Uint8Array;

    /** ApplicationMessage signature. */
    public signature: Uint8Array;

    /**
     * Creates a new ApplicationMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApplicationMessage instance
     */
    public static create(properties?: IApplicationMessage): ApplicationMessage;

    /**
     * Encodes the specified ApplicationMessage message. Does not implicitly {@link ApplicationMessage.verify|verify} messages.
     * @param message ApplicationMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApplicationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApplicationMessage message, length delimited. Does not implicitly {@link ApplicationMessage.verify|verify} messages.
     * @param message ApplicationMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApplicationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApplicationMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApplicationMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApplicationMessage;

    /**
     * Decodes an ApplicationMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApplicationMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApplicationMessage;

    /**
     * Verifies an ApplicationMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApplicationMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApplicationMessage
     */
    public static fromObject(object: { [k: string]: any }): ApplicationMessage;

    /**
     * Creates a plain object from an ApplicationMessage message. Also converts values to other types if specified.
     * @param message ApplicationMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApplicationMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApplicationMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ApplicationMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an ApplicationMessageHeader. */
export interface IApplicationMessageHeader {

    /** ApplicationMessageHeader subject */
    subject?: (string|null);

    /** ApplicationMessageHeader recipients */
    recipients?: (IRecipients|null);

    /** ApplicationMessageHeader expires */
    expires?: (number|Long|null);

    /** ApplicationMessageHeader sender */
    sender?: (string|null);

    /** ApplicationMessageHeader qosProfile */
    qosProfile?: (string|null);

    /** ApplicationMessageHeader bodySizeNumBytes */
    bodySizeNumBytes?: (number|null);
}

/** Represents an ApplicationMessageHeader. */
export class ApplicationMessageHeader implements IApplicationMessageHeader {

    /**
     * Constructs a new ApplicationMessageHeader.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApplicationMessageHeader);

    /** ApplicationMessageHeader subject. */
    public subject?: (string|null);

    /** ApplicationMessageHeader recipients. */
    public recipients?: (IRecipients|null);

    /** ApplicationMessageHeader expires. */
    public expires: (number|Long);

    /** ApplicationMessageHeader sender. */
    public sender: string;

    /** ApplicationMessageHeader qosProfile. */
    public qosProfile?: (string|null);

    /** ApplicationMessageHeader bodySizeNumBytes. */
    public bodySizeNumBytes: number;

    /** ApplicationMessageHeader SubjectOrRecipient. */
    public SubjectOrRecipient?: ("subject"|"recipients");

    /** ApplicationMessageHeader _qosProfile. */
    public _qosProfile?: "qosProfile";

    /**
     * Creates a new ApplicationMessageHeader instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApplicationMessageHeader instance
     */
    public static create(properties?: IApplicationMessageHeader): ApplicationMessageHeader;

    /**
     * Encodes the specified ApplicationMessageHeader message. Does not implicitly {@link ApplicationMessageHeader.verify|verify} messages.
     * @param message ApplicationMessageHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApplicationMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApplicationMessageHeader message, length delimited. Does not implicitly {@link ApplicationMessageHeader.verify|verify} messages.
     * @param message ApplicationMessageHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApplicationMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApplicationMessageHeader message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApplicationMessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApplicationMessageHeader;

    /**
     * Decodes an ApplicationMessageHeader message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApplicationMessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApplicationMessageHeader;

    /**
     * Verifies an ApplicationMessageHeader message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApplicationMessageHeader message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApplicationMessageHeader
     */
    public static fromObject(object: { [k: string]: any }): ApplicationMessageHeader;

    /**
     * Creates a plain object from an ApplicationMessageHeader message. Also converts values to other types if specified.
     * @param message ApplicationMessageHeader
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApplicationMessageHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApplicationMessageHeader to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ApplicationMessageHeader
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Recipients. */
export interface IRecipients {

    /** Recipients recipients */
    recipients?: (string[]|null);
}

/** Represents a Recipients. */
export class Recipients implements IRecipients {

    /**
     * Constructs a new Recipients.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRecipients);

    /** Recipients recipients. */
    public recipients: string[];

    /**
     * Creates a new Recipients instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Recipients instance
     */
    public static create(properties?: IRecipients): Recipients;

    /**
     * Encodes the specified Recipients message. Does not implicitly {@link Recipients.verify|verify} messages.
     * @param message Recipients message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRecipients, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Recipients message, length delimited. Does not implicitly {@link Recipients.verify|verify} messages.
     * @param message Recipients message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRecipients, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Recipients message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Recipients
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Recipients;

    /**
     * Decodes a Recipients message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Recipients
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Recipients;

    /**
     * Verifies a Recipients message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Recipients message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Recipients
     */
    public static fromObject(object: { [k: string]: any }): Recipients;

    /**
     * Creates a plain object from a Recipients message. Also converts values to other types if specified.
     * @param message Recipients
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Recipients, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Recipients to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Recipients
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a MmtpMessage. */
export interface IMmtpMessage {

    /** MmtpMessage msgType */
    msgType?: (MsgType|null);

    /** MmtpMessage uuid */
    uuid?: (string|null);

    /** MmtpMessage protocolMessage */
    protocolMessage?: (IProtocolMessage|null);

    /** MmtpMessage responseMessage */
    responseMessage?: (IResponseMessage|null);
}

/** Represents a MmtpMessage. */
export class MmtpMessage implements IMmtpMessage {

    /**
     * Constructs a new MmtpMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMmtpMessage);

    /** MmtpMessage msgType. */
    public msgType: MsgType;

    /** MmtpMessage uuid. */
    public uuid: string;

    /** MmtpMessage protocolMessage. */
    public protocolMessage?: (IProtocolMessage|null);

    /** MmtpMessage responseMessage. */
    public responseMessage?: (IResponseMessage|null);

    /** MmtpMessage body. */
    public body?: ("protocolMessage"|"responseMessage");

    /**
     * Creates a new MmtpMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MmtpMessage instance
     */
    public static create(properties?: IMmtpMessage): MmtpMessage;

    /**
     * Encodes the specified MmtpMessage message. Does not implicitly {@link MmtpMessage.verify|verify} messages.
     * @param message MmtpMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMmtpMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MmtpMessage message, length delimited. Does not implicitly {@link MmtpMessage.verify|verify} messages.
     * @param message MmtpMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMmtpMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MmtpMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MmtpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MmtpMessage;

    /**
     * Decodes a MmtpMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MmtpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MmtpMessage;

    /**
     * Verifies a MmtpMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MmtpMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MmtpMessage
     */
    public static fromObject(object: { [k: string]: any }): MmtpMessage;

    /**
     * Creates a plain object from a MmtpMessage message. Also converts values to other types if specified.
     * @param message MmtpMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MmtpMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MmtpMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MmtpMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** MsgType enum. */
export enum MsgType {
    UNSPECIFIED_MESSAGE = 0,
    PROTOCOL_MESSAGE = 1,
    RESPONSE_MESSAGE = 2
}

/** Properties of a ProtocolMessage. */
export interface IProtocolMessage {

    /** ProtocolMessage protocolMsgType */
    protocolMsgType?: (ProtocolMessageType|null);

    /** ProtocolMessage subscribeMessage */
    subscribeMessage?: (ISubscribe|null);

    /** ProtocolMessage unsubscribeMessage */
    unsubscribeMessage?: (IUnsubscribe|null);

    /** ProtocolMessage sendMessage */
    sendMessage?: (ISend|null);

    /** ProtocolMessage receiveMessage */
    receiveMessage?: (IReceive|null);

    /** ProtocolMessage fetchMessage */
    fetchMessage?: (IFetch|null);

    /** ProtocolMessage disconnectMessage */
    disconnectMessage?: (IDisconnect|null);

    /** ProtocolMessage connectMessage */
    connectMessage?: (IConnect|null);

    /** ProtocolMessage notifyMessage */
    notifyMessage?: (INotify|null);
}

/** Represents a ProtocolMessage. */
export class ProtocolMessage implements IProtocolMessage {

    /**
     * Constructs a new ProtocolMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProtocolMessage);

    /** ProtocolMessage protocolMsgType. */
    public protocolMsgType: ProtocolMessageType;

    /** ProtocolMessage subscribeMessage. */
    public subscribeMessage?: (ISubscribe|null);

    /** ProtocolMessage unsubscribeMessage. */
    public unsubscribeMessage?: (IUnsubscribe|null);

    /** ProtocolMessage sendMessage. */
    public sendMessage?: (ISend|null);

    /** ProtocolMessage receiveMessage. */
    public receiveMessage?: (IReceive|null);

    /** ProtocolMessage fetchMessage. */
    public fetchMessage?: (IFetch|null);

    /** ProtocolMessage disconnectMessage. */
    public disconnectMessage?: (IDisconnect|null);

    /** ProtocolMessage connectMessage. */
    public connectMessage?: (IConnect|null);

    /** ProtocolMessage notifyMessage. */
    public notifyMessage?: (INotify|null);

    /** ProtocolMessage body. */
    public body?: ("subscribeMessage"|"unsubscribeMessage"|"sendMessage"|"receiveMessage"|"fetchMessage"|"disconnectMessage"|"connectMessage"|"notifyMessage");

    /**
     * Creates a new ProtocolMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProtocolMessage instance
     */
    public static create(properties?: IProtocolMessage): ProtocolMessage;

    /**
     * Encodes the specified ProtocolMessage message. Does not implicitly {@link ProtocolMessage.verify|verify} messages.
     * @param message ProtocolMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProtocolMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ProtocolMessage message, length delimited. Does not implicitly {@link ProtocolMessage.verify|verify} messages.
     * @param message ProtocolMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProtocolMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ProtocolMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProtocolMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ProtocolMessage;

    /**
     * Decodes a ProtocolMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProtocolMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ProtocolMessage;

    /**
     * Verifies a ProtocolMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ProtocolMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProtocolMessage
     */
    public static fromObject(object: { [k: string]: any }): ProtocolMessage;

    /**
     * Creates a plain object from a ProtocolMessage message. Also converts values to other types if specified.
     * @param message ProtocolMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ProtocolMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ProtocolMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ProtocolMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** ProtocolMessageType enum. */
export enum ProtocolMessageType {
    UNSPECIFIED = 0,
    SUBSCRIBE_MESSAGE = 1,
    UNSUBSCRIBE_MESSAGE = 2,
    SEND_MESSAGE = 3,
    RECEIVE_MESSAGE = 4,
    FETCH_MESSAGE = 5,
    DISCONNECT_MESSAGE = 6,
    CONNECT_MESSAGE = 7,
    NOTIFY_MESSAGE = 8
}

/** Properties of a Subscribe. */
export interface ISubscribe {

    /** Subscribe subject */
    subject?: (string|null);

    /** Subscribe directMessages */
    directMessages?: (boolean|null);
}

/** Represents a Subscribe. */
export class Subscribe implements ISubscribe {

    /**
     * Constructs a new Subscribe.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISubscribe);

    /** Subscribe subject. */
    public subject?: (string|null);

    /** Subscribe directMessages. */
    public directMessages?: (boolean|null);

    /** Subscribe subjectOrDirectMessages. */
    public subjectOrDirectMessages?: ("subject"|"directMessages");

    /**
     * Creates a new Subscribe instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Subscribe instance
     */
    public static create(properties?: ISubscribe): Subscribe;

    /**
     * Encodes the specified Subscribe message. Does not implicitly {@link Subscribe.verify|verify} messages.
     * @param message Subscribe message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Subscribe message, length delimited. Does not implicitly {@link Subscribe.verify|verify} messages.
     * @param message Subscribe message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Subscribe message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Subscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Subscribe;

    /**
     * Decodes a Subscribe message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Subscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Subscribe;

    /**
     * Verifies a Subscribe message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Subscribe message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Subscribe
     */
    public static fromObject(object: { [k: string]: any }): Subscribe;

    /**
     * Creates a plain object from a Subscribe message. Also converts values to other types if specified.
     * @param message Subscribe
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Subscribe, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Subscribe to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Subscribe
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an Unsubscribe. */
export interface IUnsubscribe {

    /** Unsubscribe subject */
    subject?: (string|null);

    /** Unsubscribe directMessages */
    directMessages?: (boolean|null);
}

/** Represents an Unsubscribe. */
export class Unsubscribe implements IUnsubscribe {

    /**
     * Constructs a new Unsubscribe.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUnsubscribe);

    /** Unsubscribe subject. */
    public subject?: (string|null);

    /** Unsubscribe directMessages. */
    public directMessages?: (boolean|null);

    /** Unsubscribe subjectOrDirectMessages. */
    public subjectOrDirectMessages?: ("subject"|"directMessages");

    /**
     * Creates a new Unsubscribe instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Unsubscribe instance
     */
    public static create(properties?: IUnsubscribe): Unsubscribe;

    /**
     * Encodes the specified Unsubscribe message. Does not implicitly {@link Unsubscribe.verify|verify} messages.
     * @param message Unsubscribe message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUnsubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Unsubscribe message, length delimited. Does not implicitly {@link Unsubscribe.verify|verify} messages.
     * @param message Unsubscribe message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUnsubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Unsubscribe message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Unsubscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Unsubscribe;

    /**
     * Decodes an Unsubscribe message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Unsubscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Unsubscribe;

    /**
     * Verifies an Unsubscribe message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Unsubscribe message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Unsubscribe
     */
    public static fromObject(object: { [k: string]: any }): Unsubscribe;

    /**
     * Creates a plain object from an Unsubscribe message. Also converts values to other types if specified.
     * @param message Unsubscribe
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Unsubscribe, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Unsubscribe to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Unsubscribe
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Send. */
export interface ISend {

    /** Send applicationMessage */
    applicationMessage?: (IApplicationMessage|null);
}

/** Represents a Send. */
export class Send implements ISend {

    /**
     * Constructs a new Send.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISend);

    /** Send applicationMessage. */
    public applicationMessage?: (IApplicationMessage|null);

    /**
     * Creates a new Send instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Send instance
     */
    public static create(properties?: ISend): Send;

    /**
     * Encodes the specified Send message. Does not implicitly {@link Send.verify|verify} messages.
     * @param message Send message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Send message, length delimited. Does not implicitly {@link Send.verify|verify} messages.
     * @param message Send message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Send message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Send
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Send;

    /**
     * Decodes a Send message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Send
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Send;

    /**
     * Verifies a Send message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Send message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Send
     */
    public static fromObject(object: { [k: string]: any }): Send;

    /**
     * Creates a plain object from a Send message. Also converts values to other types if specified.
     * @param message Send
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Send, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Send to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Send
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Receive. */
export interface IReceive {

    /** Receive filter */
    filter?: (IFilter|null);
}

/** Represents a Receive. */
export class Receive implements IReceive {

    /**
     * Constructs a new Receive.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReceive);

    /** Receive filter. */
    public filter?: (IFilter|null);

    /** Receive _filter. */
    public _filter?: "filter";

    /**
     * Creates a new Receive instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Receive instance
     */
    public static create(properties?: IReceive): Receive;

    /**
     * Encodes the specified Receive message. Does not implicitly {@link Receive.verify|verify} messages.
     * @param message Receive message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReceive, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Receive message, length delimited. Does not implicitly {@link Receive.verify|verify} messages.
     * @param message Receive message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReceive, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Receive message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Receive
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Receive;

    /**
     * Decodes a Receive message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Receive
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Receive;

    /**
     * Verifies a Receive message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Receive message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Receive
     */
    public static fromObject(object: { [k: string]: any }): Receive;

    /**
     * Creates a plain object from a Receive message. Also converts values to other types if specified.
     * @param message Receive
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Receive, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Receive to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Receive
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Filter. */
export interface IFilter {

    /** Filter messageUuids */
    messageUuids?: (string[]|null);
}

/** Represents a Filter. */
export class Filter implements IFilter {

    /**
     * Constructs a new Filter.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFilter);

    /** Filter messageUuids. */
    public messageUuids: string[];

    /**
     * Creates a new Filter instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Filter instance
     */
    public static create(properties?: IFilter): Filter;

    /**
     * Encodes the specified Filter message. Does not implicitly {@link Filter.verify|verify} messages.
     * @param message Filter message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Filter message, length delimited. Does not implicitly {@link Filter.verify|verify} messages.
     * @param message Filter message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Filter message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Filter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Filter;

    /**
     * Decodes a Filter message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Filter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Filter;

    /**
     * Verifies a Filter message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Filter message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Filter
     */
    public static fromObject(object: { [k: string]: any }): Filter;

    /**
     * Creates a plain object from a Filter message. Also converts values to other types if specified.
     * @param message Filter
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Filter to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Filter
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Fetch. */
export interface IFetch {
}

/** Represents a Fetch. */
export class Fetch implements IFetch {

    /**
     * Constructs a new Fetch.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFetch);

    /**
     * Creates a new Fetch instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Fetch instance
     */
    public static create(properties?: IFetch): Fetch;

    /**
     * Encodes the specified Fetch message. Does not implicitly {@link Fetch.verify|verify} messages.
     * @param message Fetch message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFetch, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Fetch message, length delimited. Does not implicitly {@link Fetch.verify|verify} messages.
     * @param message Fetch message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFetch, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Fetch message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Fetch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Fetch;

    /**
     * Decodes a Fetch message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Fetch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Fetch;

    /**
     * Verifies a Fetch message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Fetch message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Fetch
     */
    public static fromObject(object: { [k: string]: any }): Fetch;

    /**
     * Creates a plain object from a Fetch message. Also converts values to other types if specified.
     * @param message Fetch
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Fetch, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Fetch to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Fetch
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Disconnect. */
export interface IDisconnect {
}

/** Represents a Disconnect. */
export class Disconnect implements IDisconnect {

    /**
     * Constructs a new Disconnect.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDisconnect);

    /**
     * Creates a new Disconnect instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Disconnect instance
     */
    public static create(properties?: IDisconnect): Disconnect;

    /**
     * Encodes the specified Disconnect message. Does not implicitly {@link Disconnect.verify|verify} messages.
     * @param message Disconnect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Disconnect.verify|verify} messages.
     * @param message Disconnect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Disconnect message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Disconnect;

    /**
     * Decodes a Disconnect message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Disconnect;

    /**
     * Verifies a Disconnect message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Disconnect
     */
    public static fromObject(object: { [k: string]: any }): Disconnect;

    /**
     * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
     * @param message Disconnect
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Disconnect to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Disconnect
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Connect. */
export interface IConnect {

    /** Connect ownMrn */
    ownMrn?: (string|null);

    /** Connect reconnectToken */
    reconnectToken?: (string|null);
}

/** Represents a Connect. */
export class Connect implements IConnect {

    /**
     * Constructs a new Connect.
     * @param [properties] Properties to set
     */
    constructor(properties?: IConnect);

    /** Connect ownMrn. */
    public ownMrn?: (string|null);

    /** Connect reconnectToken. */
    public reconnectToken?: (string|null);

    /** Connect _ownMrn. */
    public _ownMrn?: "ownMrn";

    /** Connect _reconnectToken. */
    public _reconnectToken?: "reconnectToken";

    /**
     * Creates a new Connect instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Connect instance
     */
    public static create(properties?: IConnect): Connect;

    /**
     * Encodes the specified Connect message. Does not implicitly {@link Connect.verify|verify} messages.
     * @param message Connect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IConnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Connect message, length delimited. Does not implicitly {@link Connect.verify|verify} messages.
     * @param message Connect message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IConnect, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Connect message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Connect;

    /**
     * Decodes a Connect message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Connect;

    /**
     * Verifies a Connect message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Connect message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Connect
     */
    public static fromObject(object: { [k: string]: any }): Connect;

    /**
     * Creates a plain object from a Connect message. Also converts values to other types if specified.
     * @param message Connect
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Connect, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Connect to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Connect
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Notify. */
export interface INotify {

    /** Notify messageMetadata */
    messageMetadata?: (IMessageMetadata[]|null);
}

/** Represents a Notify. */
export class Notify implements INotify {

    /**
     * Constructs a new Notify.
     * @param [properties] Properties to set
     */
    constructor(properties?: INotify);

    /** Notify messageMetadata. */
    public messageMetadata: IMessageMetadata[];

    /**
     * Creates a new Notify instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Notify instance
     */
    public static create(properties?: INotify): Notify;

    /**
     * Encodes the specified Notify message. Does not implicitly {@link Notify.verify|verify} messages.
     * @param message Notify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: INotify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Notify message, length delimited. Does not implicitly {@link Notify.verify|verify} messages.
     * @param message Notify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: INotify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Notify message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Notify;

    /**
     * Decodes a Notify message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Notify;

    /**
     * Verifies a Notify message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Notify message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Notify
     */
    public static fromObject(object: { [k: string]: any }): Notify;

    /**
     * Creates a plain object from a Notify message. Also converts values to other types if specified.
     * @param message Notify
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Notify, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Notify to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Notify
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a ResponseMessage. */
export interface IResponseMessage {

    /** ResponseMessage responseToUuid */
    responseToUuid?: (string|null);

    /** ResponseMessage response */
    response?: (ResponseEnum|null);

    /** ResponseMessage reasonText */
    reasonText?: (string|null);

    /** ResponseMessage messageMetadata */
    messageMetadata?: (IMessageMetadata[]|null);

    /** ResponseMessage applicationMessages */
    applicationMessages?: (IApplicationMessage[]|null);

    /** ResponseMessage reconnectToken */
    reconnectToken?: (string|null);
}

/** Represents a ResponseMessage. */
export class ResponseMessage implements IResponseMessage {

    /**
     * Constructs a new ResponseMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IResponseMessage);

    /** ResponseMessage responseToUuid. */
    public responseToUuid: string;

    /** ResponseMessage response. */
    public response: ResponseEnum;

    /** ResponseMessage reasonText. */
    public reasonText?: (string|null);

    /** ResponseMessage messageMetadata. */
    public messageMetadata: IMessageMetadata[];

    /** ResponseMessage applicationMessages. */
    public applicationMessages: IApplicationMessage[];

    /** ResponseMessage reconnectToken. */
    public reconnectToken?: (string|null);

    /** ResponseMessage _reasonText. */
    public _reasonText?: "reasonText";

    /** ResponseMessage _reconnectToken. */
    public _reconnectToken?: "reconnectToken";

    /**
     * Creates a new ResponseMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ResponseMessage instance
     */
    public static create(properties?: IResponseMessage): ResponseMessage;

    /**
     * Encodes the specified ResponseMessage message. Does not implicitly {@link ResponseMessage.verify|verify} messages.
     * @param message ResponseMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ResponseMessage message, length delimited. Does not implicitly {@link ResponseMessage.verify|verify} messages.
     * @param message ResponseMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ResponseMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ResponseMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ResponseMessage;

    /**
     * Decodes a ResponseMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ResponseMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ResponseMessage;

    /**
     * Verifies a ResponseMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ResponseMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ResponseMessage
     */
    public static fromObject(object: { [k: string]: any }): ResponseMessage;

    /**
     * Creates a plain object from a ResponseMessage message. Also converts values to other types if specified.
     * @param message ResponseMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ResponseMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ResponseMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ResponseMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** ResponseEnum enum. */
export enum ResponseEnum {
    UNSPECIFIED_RESPONSE = 0,
    GOOD = 1,
    ERROR = 2
}

/** Properties of a MessageMetadata. */
export interface IMessageMetadata {

    /** MessageMetadata uuid */
    uuid?: (string|null);

    /** MessageMetadata header */
    header?: (IApplicationMessageHeader|null);
}

/** Represents a MessageMetadata. */
export class MessageMetadata implements IMessageMetadata {

    /**
     * Constructs a new MessageMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessageMetadata);

    /** MessageMetadata uuid. */
    public uuid: string;

    /** MessageMetadata header. */
    public header?: (IApplicationMessageHeader|null);

    /**
     * Creates a new MessageMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageMetadata instance
     */
    public static create(properties?: IMessageMetadata): MessageMetadata;

    /**
     * Encodes the specified MessageMetadata message. Does not implicitly {@link MessageMetadata.verify|verify} messages.
     * @param message MessageMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MessageMetadata message, length delimited. Does not implicitly {@link MessageMetadata.verify|verify} messages.
     * @param message MessageMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MessageMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MessageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MessageMetadata;

    /**
     * Decodes a MessageMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MessageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MessageMetadata;

    /**
     * Verifies a MessageMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MessageMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageMetadata
     */
    public static fromObject(object: { [k: string]: any }): MessageMetadata;

    /**
     * Creates a plain object from a MessageMetadata message. Also converts values to other types if specified.
     * @param message MessageMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MessageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MessageMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MessageMetadata
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
