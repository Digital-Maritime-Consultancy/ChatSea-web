import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a SmmpHeader. */
export interface ISmmpHeader {

    /** SmmpHeader control */
    control?: (Uint8Array|null);

    /** SmmpHeader payloadLen */
    payloadLen?: (number|null);

    /** SmmpHeader blockNum */
    blockNum?: (number|null);

    /** SmmpHeader totalBlocks */
    totalBlocks?: (number|null);

    /** SmmpHeader uuid */
    uuid?: (string|null);

    /** SmmpHeader curves */
    curves?: (Curve[]|null);
}

/** Represents a SmmpHeader. */
export class SmmpHeader implements ISmmpHeader {

    /**
     * Constructs a new SmmpHeader.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISmmpHeader);

    /** SmmpHeader control. */
    public control: Uint8Array;

    /** SmmpHeader payloadLen. */
    public payloadLen: number;

    /** SmmpHeader blockNum. */
    public blockNum?: (number|null);

    /** SmmpHeader totalBlocks. */
    public totalBlocks?: (number|null);

    /** SmmpHeader uuid. */
    public uuid: string;

    /** SmmpHeader curves. */
    public curves: Curve[];

    /** SmmpHeader _blockNum. */
    public _blockNum?: "blockNum";

    /** SmmpHeader _totalBlocks. */
    public _totalBlocks?: "totalBlocks";

    /**
     * Creates a new SmmpHeader instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SmmpHeader instance
     */
    public static create(properties?: ISmmpHeader): SmmpHeader;

    /**
     * Encodes the specified SmmpHeader message. Does not implicitly {@link SmmpHeader.verify|verify} messages.
     * @param message SmmpHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISmmpHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SmmpHeader message, length delimited. Does not implicitly {@link SmmpHeader.verify|verify} messages.
     * @param message SmmpHeader message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISmmpHeader, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SmmpHeader message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SmmpHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SmmpHeader;

    /**
     * Decodes a SmmpHeader message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SmmpHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SmmpHeader;

    /**
     * Verifies a SmmpHeader message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SmmpHeader message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SmmpHeader
     */
    public static fromObject(object: { [k: string]: any }): SmmpHeader;

    /**
     * Creates a plain object from a SmmpHeader message. Also converts values to other types if specified.
     * @param message SmmpHeader
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SmmpHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SmmpHeader to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SmmpHeader
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Curve enum. */
export enum Curve {
    unspecified = 0,
    secp256r1 = 1,
    secp384r1 = 2
}

/** Represents a SmmpMessage. */
export class SmmpMessage implements ISmmpMessage {

    /**
     * Constructs a new SmmpMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISmmpMessage);

    /** SmmpMessage header. */
    public header?: (ISmmpHeader|null);

    /** SmmpMessage data. */
    public data: Uint8Array;

    /**
     * Creates a new SmmpMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SmmpMessage instance
     */
    public static create(properties?: ISmmpMessage): SmmpMessage;

    /**
     * Encodes the specified SmmpMessage message. Does not implicitly {@link SmmpMessage.verify|verify} messages.
     * @param message SmmpMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISmmpMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SmmpMessage message, length delimited. Does not implicitly {@link SmmpMessage.verify|verify} messages.
     * @param message SmmpMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISmmpMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SmmpMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SmmpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SmmpMessage;

    /**
     * Decodes a SmmpMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SmmpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SmmpMessage;

    /**
     * Verifies a SmmpMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SmmpMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SmmpMessage
     */
    public static fromObject(object: { [k: string]: any }): SmmpMessage;

    /**
     * Creates a plain object from a SmmpMessage message. Also converts values to other types if specified.
     * @param message SmmpMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SmmpMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SmmpMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SmmpMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
