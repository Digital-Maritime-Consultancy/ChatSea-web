/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SmmpHeader = $root.SmmpHeader = (() => {

    /**
     * Properties of a SmmpHeader.
     * @exports ISmmpHeader
     * @interface ISmmpHeader
     * @property {Uint8Array|null} [control] SmmpHeader control
     * @property {number|null} [payloadLen] SmmpHeader payloadLen
     * @property {number|null} [blockNum] SmmpHeader blockNum
     * @property {number|null} [totalBlocks] SmmpHeader totalBlocks
     * @property {string|null} [uuid] SmmpHeader uuid
     * @property {Array.<Curve>|null} [curves] SmmpHeader curves
     */

    /**
     * Constructs a new SmmpHeader.
     * @exports SmmpHeader
     * @classdesc Represents a SmmpHeader.
     * @implements ISmmpHeader
     * @constructor
     * @param {ISmmpHeader=} [properties] Properties to set
     */
    function SmmpHeader(properties) {
        this.curves = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SmmpHeader control.
     * @member {Uint8Array} control
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.control = $util.newBuffer([]);

    /**
     * SmmpHeader payloadLen.
     * @member {number} payloadLen
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.payloadLen = 0;

    /**
     * SmmpHeader blockNum.
     * @member {number|null|undefined} blockNum
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.blockNum = null;

    /**
     * SmmpHeader totalBlocks.
     * @member {number|null|undefined} totalBlocks
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.totalBlocks = null;

    /**
     * SmmpHeader uuid.
     * @member {string} uuid
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.uuid = "";

    /**
     * SmmpHeader curves.
     * @member {Array.<Curve>} curves
     * @memberof SmmpHeader
     * @instance
     */
    SmmpHeader.prototype.curves = $util.emptyArray;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * SmmpHeader _blockNum.
     * @member {"blockNum"|undefined} _blockNum
     * @memberof SmmpHeader
     * @instance
     */
    Object.defineProperty(SmmpHeader.prototype, "_blockNum", {
        get: $util.oneOfGetter($oneOfFields = ["blockNum"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * SmmpHeader _totalBlocks.
     * @member {"totalBlocks"|undefined} _totalBlocks
     * @memberof SmmpHeader
     * @instance
     */
    Object.defineProperty(SmmpHeader.prototype, "_totalBlocks", {
        get: $util.oneOfGetter($oneOfFields = ["totalBlocks"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new SmmpHeader instance using the specified properties.
     * @function create
     * @memberof SmmpHeader
     * @static
     * @param {ISmmpHeader=} [properties] Properties to set
     * @returns {SmmpHeader} SmmpHeader instance
     */
    SmmpHeader.create = function create(properties) {
        return new SmmpHeader(properties);
    };

    /**
     * Encodes the specified SmmpHeader message. Does not implicitly {@link SmmpHeader.verify|verify} messages.
     * @function encode
     * @memberof SmmpHeader
     * @static
     * @param {ISmmpHeader} message SmmpHeader message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SmmpHeader.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.control != null && Object.hasOwnProperty.call(message, "control"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.control);
        if (message.payloadLen != null && Object.hasOwnProperty.call(message, "payloadLen"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.payloadLen);
        if (message.blockNum != null && Object.hasOwnProperty.call(message, "blockNum"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.blockNum);
        if (message.totalBlocks != null && Object.hasOwnProperty.call(message, "totalBlocks"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.totalBlocks);
        if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.uuid);
        if (message.curves != null && message.curves.length) {
            writer.uint32(/* id 7, wireType 2 =*/58).fork();
            for (let i = 0; i < message.curves.length; ++i)
                writer.int32(message.curves[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified SmmpHeader message, length delimited. Does not implicitly {@link SmmpHeader.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SmmpHeader
     * @static
     * @param {ISmmpHeader} message SmmpHeader message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SmmpHeader.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SmmpHeader message from the specified reader or buffer.
     * @function decode
     * @memberof SmmpHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SmmpHeader} SmmpHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SmmpHeader.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SmmpHeader();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 2: {
                    message.control = reader.bytes();
                    break;
                }
            case 3: {
                    message.payloadLen = reader.uint32();
                    break;
                }
            case 4: {
                    message.blockNum = reader.uint32();
                    break;
                }
            case 5: {
                    message.totalBlocks = reader.uint32();
                    break;
                }
            case 6: {
                    message.uuid = reader.string();
                    break;
                }
            case 7: {
                    if (!(message.curves && message.curves.length))
                        message.curves = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.curves.push(reader.int32());
                    } else
                        message.curves.push(reader.int32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SmmpHeader message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SmmpHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SmmpHeader} SmmpHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SmmpHeader.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SmmpHeader message.
     * @function verify
     * @memberof SmmpHeader
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SmmpHeader.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.control != null && message.hasOwnProperty("control"))
            if (!(message.control && typeof message.control.length === "number" || $util.isString(message.control)))
                return "control: buffer expected";
        if (message.payloadLen != null && message.hasOwnProperty("payloadLen"))
            if (!$util.isInteger(message.payloadLen))
                return "payloadLen: integer expected";
        if (message.blockNum != null && message.hasOwnProperty("blockNum")) {
            properties._blockNum = 1;
            if (!$util.isInteger(message.blockNum))
                return "blockNum: integer expected";
        }
        if (message.totalBlocks != null && message.hasOwnProperty("totalBlocks")) {
            properties._totalBlocks = 1;
            if (!$util.isInteger(message.totalBlocks))
                return "totalBlocks: integer expected";
        }
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            if (!$util.isString(message.uuid))
                return "uuid: string expected";
        if (message.curves != null && message.hasOwnProperty("curves")) {
            if (!Array.isArray(message.curves))
                return "curves: array expected";
            for (let i = 0; i < message.curves.length; ++i)
                switch (message.curves[i]) {
                default:
                    return "curves: enum value[] expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
        }
        return null;
    };

    /**
     * Creates a SmmpHeader message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SmmpHeader
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SmmpHeader} SmmpHeader
     */
    SmmpHeader.fromObject = function fromObject(object) {
        if (object instanceof $root.SmmpHeader)
            return object;
        let message = new $root.SmmpHeader();
        if (object.control != null)
            if (typeof object.control === "string")
                $util.base64.decode(object.control, message.control = $util.newBuffer($util.base64.length(object.control)), 0);
            else if (object.control.length >= 0)
                message.control = object.control;
        if (object.payloadLen != null)
            message.payloadLen = object.payloadLen >>> 0;
        if (object.blockNum != null)
            message.blockNum = object.blockNum >>> 0;
        if (object.totalBlocks != null)
            message.totalBlocks = object.totalBlocks >>> 0;
        if (object.uuid != null)
            message.uuid = String(object.uuid);
        if (object.curves) {
            if (!Array.isArray(object.curves))
                throw TypeError(".SmmpHeader.curves: array expected");
            message.curves = [];
            for (let i = 0; i < object.curves.length; ++i)
                switch (object.curves[i]) {
                default:
                    if (typeof object.curves[i] === "number") {
                        message.curves[i] = object.curves[i];
                        break;
                    }
                case "unspecified":
                case 0:
                    message.curves[i] = 0;
                    break;
                case "secp256r1":
                case 1:
                    message.curves[i] = 1;
                    break;
                case "secp384r1":
                case 2:
                    message.curves[i] = 2;
                    break;
                }
        }
        return message;
    };

    /**
     * Creates a plain object from a SmmpHeader message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SmmpHeader
     * @static
     * @param {SmmpHeader} message SmmpHeader
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SmmpHeader.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.curves = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.control = "";
            else {
                object.control = [];
                if (options.bytes !== Array)
                    object.control = $util.newBuffer(object.control);
            }
            object.payloadLen = 0;
            object.uuid = "";
        }
        if (message.control != null && message.hasOwnProperty("control"))
            object.control = options.bytes === String ? $util.base64.encode(message.control, 0, message.control.length) : options.bytes === Array ? Array.prototype.slice.call(message.control) : message.control;
        if (message.payloadLen != null && message.hasOwnProperty("payloadLen"))
            object.payloadLen = message.payloadLen;
        if (message.blockNum != null && message.hasOwnProperty("blockNum")) {
            object.blockNum = message.blockNum;
            if (options.oneofs)
                object._blockNum = "blockNum";
        }
        if (message.totalBlocks != null && message.hasOwnProperty("totalBlocks")) {
            object.totalBlocks = message.totalBlocks;
            if (options.oneofs)
                object._totalBlocks = "totalBlocks";
        }
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            object.uuid = message.uuid;
        if (message.curves && message.curves.length) {
            object.curves = [];
            for (let j = 0; j < message.curves.length; ++j)
                object.curves[j] = options.enums === String ? $root.Curve[message.curves[j]] === undefined ? message.curves[j] : $root.Curve[message.curves[j]] : message.curves[j];
        }
        return object;
    };

    /**
     * Converts this SmmpHeader to JSON.
     * @function toJSON
     * @memberof SmmpHeader
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SmmpHeader.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SmmpHeader
     * @function getTypeUrl
     * @memberof SmmpHeader
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SmmpHeader.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SmmpHeader";
    };

    return SmmpHeader;
})();

/**
 * Curve enum.
 * @exports Curve
 * @enum {number}
 * @property {number} unspecified=0 unspecified value
 * @property {number} secp256r1=1 secp256r1 value
 * @property {number} secp384r1=2 secp384r1 value
 */
export const Curve = $root.Curve = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "unspecified"] = 0;
    values[valuesById[1] = "secp256r1"] = 1;
    values[valuesById[2] = "secp384r1"] = 2;
    return values;
})();

export const SmmpMessage = $root.SmmpMessage = (() => {

    /**
     * Properties of a SmmpMessage.
     * @exports ISmmpMessage
     * @interface ISmmpMessage
     * @property {ISmmpHeader|null} [header] SmmpMessage header
     * @property {Uint8Array|null} [data] SmmpMessage data
     */

    /**
     * Constructs a new SmmpMessage.
     * @exports SmmpMessage
     * @classdesc Represents a SmmpMessage.
     * @implements ISmmpMessage
     * @constructor
     * @param {ISmmpMessage=} [properties] Properties to set
     */
    function SmmpMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SmmpMessage header.
     * @member {ISmmpHeader|null|undefined} header
     * @memberof SmmpMessage
     * @instance
     */
    SmmpMessage.prototype.header = null;

    /**
     * SmmpMessage data.
     * @member {Uint8Array} data
     * @memberof SmmpMessage
     * @instance
     */
    SmmpMessage.prototype.data = $util.newBuffer([]);

    /**
     * Creates a new SmmpMessage instance using the specified properties.
     * @function create
     * @memberof SmmpMessage
     * @static
     * @param {ISmmpMessage=} [properties] Properties to set
     * @returns {SmmpMessage} SmmpMessage instance
     */
    SmmpMessage.create = function create(properties) {
        return new SmmpMessage(properties);
    };

    /**
     * Encodes the specified SmmpMessage message. Does not implicitly {@link SmmpMessage.verify|verify} messages.
     * @function encode
     * @memberof SmmpMessage
     * @static
     * @param {ISmmpMessage} message SmmpMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SmmpMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
            $root.SmmpHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
        return writer;
    };

    /**
     * Encodes the specified SmmpMessage message, length delimited. Does not implicitly {@link SmmpMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SmmpMessage
     * @static
     * @param {ISmmpMessage} message SmmpMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SmmpMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SmmpMessage message from the specified reader or buffer.
     * @function decode
     * @memberof SmmpMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SmmpMessage} SmmpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SmmpMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SmmpMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.header = $root.SmmpHeader.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.data = reader.bytes();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SmmpMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SmmpMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SmmpMessage} SmmpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SmmpMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SmmpMessage message.
     * @function verify
     * @memberof SmmpMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SmmpMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.header != null && message.hasOwnProperty("header")) {
            let error = $root.SmmpHeader.verify(message.header);
            if (error)
                return "header." + error;
        }
        if (message.data != null && message.hasOwnProperty("data"))
            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
        return null;
    };

    /**
     * Creates a SmmpMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SmmpMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SmmpMessage} SmmpMessage
     */
    SmmpMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.SmmpMessage)
            return object;
        let message = new $root.SmmpMessage();
        if (object.header != null) {
            if (typeof object.header !== "object")
                throw TypeError(".SmmpMessage.header: object expected");
            message.header = $root.SmmpHeader.fromObject(object.header);
        }
        if (object.data != null)
            if (typeof object.data === "string")
                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
            else if (object.data.length >= 0)
                message.data = object.data;
        return message;
    };

    /**
     * Creates a plain object from a SmmpMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SmmpMessage
     * @static
     * @param {SmmpMessage} message SmmpMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SmmpMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.header = null;
            if (options.bytes === String)
                object.data = "";
            else {
                object.data = [];
                if (options.bytes !== Array)
                    object.data = $util.newBuffer(object.data);
            }
        }
        if (message.header != null && message.hasOwnProperty("header"))
            object.header = $root.SmmpHeader.toObject(message.header, options);
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
        return object;
    };

    /**
     * Converts this SmmpMessage to JSON.
     * @function toJSON
     * @memberof SmmpMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SmmpMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SmmpMessage
     * @function getTypeUrl
     * @memberof SmmpMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SmmpMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SmmpMessage";
    };

    return SmmpMessage;
})();

export { $root as default };
