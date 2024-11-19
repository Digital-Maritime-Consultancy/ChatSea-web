/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ApplicationMessage = $root.ApplicationMessage = (() => {

    /**
     * Properties of an ApplicationMessage.
     * @name IApplicationMessage
     * @interface IApplicationMessage
     * @property {IApplicationMessageHeader|null} [header] ApplicationMessage header
     * @property {Uint8Array|null} [body] ApplicationMessage body
     * @property {Uint8Array|null} [signature] ApplicationMessage signature
     */

    /**
     * Constructs a new ApplicationMessage.
     * @name ApplicationMessage
     * @classdesc Represents an ApplicationMessage.
     * @implements IApplicationMessage
     * @constructor
     * @param {IApplicationMessage=} [properties] Properties to set
     */
    function ApplicationMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ApplicationMessage header.
     * @member {IApplicationMessageHeader|null|undefined} header
     * @memberof ApplicationMessage
     * @instance
     */
    ApplicationMessage.prototype.header = null;

    /**
     * ApplicationMessage body.
     * @member {Uint8Array} body
     * @memberof ApplicationMessage
     * @instance
     */
    ApplicationMessage.prototype.body = $util.newBuffer([]);

    /**
     * ApplicationMessage signature.
     * @member {Uint8Array} signature
     * @memberof ApplicationMessage
     * @instance
     */
    ApplicationMessage.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new ApplicationMessage instance using the specified properties.
     * @function create
     * @memberof ApplicationMessage
     * @static
     * @param {IApplicationMessage=} [properties] Properties to set
     * @returns {ApplicationMessage} ApplicationMessage instance
     */
    ApplicationMessage.create = function create(properties) {
        return new ApplicationMessage(properties);
    };

    /**
     * Encodes the specified ApplicationMessage message. Does not implicitly {@link ApplicationMessage.verify|verify} messages.
     * @function encode
     * @memberof ApplicationMessage
     * @static
     * @param {IApplicationMessage} message ApplicationMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
            $root.ApplicationMessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified ApplicationMessage message, length delimited. Does not implicitly {@link ApplicationMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ApplicationMessage
     * @static
     * @param {IApplicationMessage} message ApplicationMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ApplicationMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ApplicationMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ApplicationMessage} ApplicationMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApplicationMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.header = $root.ApplicationMessageHeader.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.body = reader.bytes();
                    break;
                }
            case 3: {
                    message.signature = reader.bytes();
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
     * Decodes an ApplicationMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ApplicationMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ApplicationMessage} ApplicationMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ApplicationMessage message.
     * @function verify
     * @memberof ApplicationMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ApplicationMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.header != null && message.hasOwnProperty("header")) {
            let error = $root.ApplicationMessageHeader.verify(message.header);
            if (error)
                return "header." + error;
        }
        if (message.body != null && message.hasOwnProperty("body"))
            if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                return "body: buffer expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates an ApplicationMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ApplicationMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ApplicationMessage} ApplicationMessage
     */
    ApplicationMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ApplicationMessage)
            return object;
        let message = new $root.ApplicationMessage();
        if (object.header != null) {
            if (typeof object.header !== "object")
                throw TypeError(".ApplicationMessage.header: object expected");
            message.header = $root.ApplicationMessageHeader.fromObject(object.header);
        }
        if (object.body != null)
            if (typeof object.body === "string")
                $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
            else if (object.body.length >= 0)
                message.body = object.body;
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from an ApplicationMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ApplicationMessage
     * @static
     * @param {ApplicationMessage} message ApplicationMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ApplicationMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.header = null;
            if (options.bytes === String)
                object.body = "";
            else {
                object.body = [];
                if (options.bytes !== Array)
                    object.body = $util.newBuffer(object.body);
            }
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.header != null && message.hasOwnProperty("header"))
            object.header = $root.ApplicationMessageHeader.toObject(message.header, options);
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this ApplicationMessage to JSON.
     * @function toJSON
     * @memberof ApplicationMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ApplicationMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ApplicationMessage
     * @function getTypeUrl
     * @memberof ApplicationMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ApplicationMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ApplicationMessage";
    };

    return ApplicationMessage;
})();

export const ApplicationMessageHeader = $root.ApplicationMessageHeader = (() => {

    /**
     * Properties of an ApplicationMessageHeader.
     * @name IApplicationMessageHeader
     * @interface IApplicationMessageHeader
     * @property {string|null} [subject] ApplicationMessageHeader subject
     * @property {IRecipients|null} [recipients] ApplicationMessageHeader recipients
     * @property {number|Long|null} [expires] ApplicationMessageHeader expires
     * @property {string|null} [sender] ApplicationMessageHeader sender
     * @property {string|null} [qosProfile] ApplicationMessageHeader qosProfile
     * @property {number|null} [bodySizeNumBytes] ApplicationMessageHeader bodySizeNumBytes
     */

    /**
     * Constructs a new ApplicationMessageHeader.
     * @name ApplicationMessageHeader
     * @classdesc Represents an ApplicationMessageHeader.
     * @implements IApplicationMessageHeader
     * @constructor
     * @param {IApplicationMessageHeader=} [properties] Properties to set
     */
    function ApplicationMessageHeader(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ApplicationMessageHeader subject.
     * @member {string|null|undefined} subject
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.subject = null;

    /**
     * ApplicationMessageHeader recipients.
     * @member {IRecipients|null|undefined} recipients
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.recipients = null;

    /**
     * ApplicationMessageHeader expires.
     * @member {number|Long} expires
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.expires = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ApplicationMessageHeader sender.
     * @member {string} sender
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.sender = "";

    /**
     * ApplicationMessageHeader qosProfile.
     * @member {string|null|undefined} qosProfile
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.qosProfile = null;

    /**
     * ApplicationMessageHeader bodySizeNumBytes.
     * @member {number} bodySizeNumBytes
     * @memberof ApplicationMessageHeader
     * @instance
     */
    ApplicationMessageHeader.prototype.bodySizeNumBytes = 0;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * ApplicationMessageHeader SubjectOrRecipient.
     * @member {"subject"|"recipients"|undefined} SubjectOrRecipient
     * @memberof ApplicationMessageHeader
     * @instance
     */
    Object.defineProperty(ApplicationMessageHeader.prototype, "SubjectOrRecipient", {
        get: $util.oneOfGetter($oneOfFields = ["subject", "recipients"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * ApplicationMessageHeader _qosProfile.
     * @member {"qosProfile"|undefined} _qosProfile
     * @memberof ApplicationMessageHeader
     * @instance
     */
    Object.defineProperty(ApplicationMessageHeader.prototype, "_qosProfile", {
        get: $util.oneOfGetter($oneOfFields = ["qosProfile"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ApplicationMessageHeader instance using the specified properties.
     * @function create
     * @memberof ApplicationMessageHeader
     * @static
     * @param {IApplicationMessageHeader=} [properties] Properties to set
     * @returns {ApplicationMessageHeader} ApplicationMessageHeader instance
     */
    ApplicationMessageHeader.create = function create(properties) {
        return new ApplicationMessageHeader(properties);
    };

    /**
     * Encodes the specified ApplicationMessageHeader message. Does not implicitly {@link ApplicationMessageHeader.verify|verify} messages.
     * @function encode
     * @memberof ApplicationMessageHeader
     * @static
     * @param {IApplicationMessageHeader} message ApplicationMessageHeader message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMessageHeader.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.subject);
        if (message.recipients != null && Object.hasOwnProperty.call(message, "recipients"))
            $root.Recipients.encode(message.recipients, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.expires != null && Object.hasOwnProperty.call(message, "expires"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.expires);
        if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.sender);
        if (message.qosProfile != null && Object.hasOwnProperty.call(message, "qosProfile"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.qosProfile);
        if (message.bodySizeNumBytes != null && Object.hasOwnProperty.call(message, "bodySizeNumBytes"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.bodySizeNumBytes);
        return writer;
    };

    /**
     * Encodes the specified ApplicationMessageHeader message, length delimited. Does not implicitly {@link ApplicationMessageHeader.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ApplicationMessageHeader
     * @static
     * @param {IApplicationMessageHeader} message ApplicationMessageHeader message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMessageHeader.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ApplicationMessageHeader message from the specified reader or buffer.
     * @function decode
     * @memberof ApplicationMessageHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ApplicationMessageHeader} ApplicationMessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMessageHeader.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApplicationMessageHeader();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.subject = reader.string();
                    break;
                }
            case 2: {
                    message.recipients = $root.Recipients.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.expires = reader.int64();
                    break;
                }
            case 4: {
                    message.sender = reader.string();
                    break;
                }
            case 5: {
                    message.qosProfile = reader.string();
                    break;
                }
            case 6: {
                    message.bodySizeNumBytes = reader.uint32();
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
     * Decodes an ApplicationMessageHeader message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ApplicationMessageHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ApplicationMessageHeader} ApplicationMessageHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMessageHeader.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ApplicationMessageHeader message.
     * @function verify
     * @memberof ApplicationMessageHeader
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ApplicationMessageHeader.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.subject != null && message.hasOwnProperty("subject")) {
            properties.SubjectOrRecipient = 1;
            if (!$util.isString(message.subject))
                return "subject: string expected";
        }
        if (message.recipients != null && message.hasOwnProperty("recipients")) {
            if (properties.SubjectOrRecipient === 1)
                return "SubjectOrRecipient: multiple values";
            properties.SubjectOrRecipient = 1;
            {
                let error = $root.Recipients.verify(message.recipients);
                if (error)
                    return "recipients." + error;
            }
        }
        if (message.expires != null && message.hasOwnProperty("expires"))
            if (!$util.isInteger(message.expires) && !(message.expires && $util.isInteger(message.expires.low) && $util.isInteger(message.expires.high)))
                return "expires: integer|Long expected";
        if (message.sender != null && message.hasOwnProperty("sender"))
            if (!$util.isString(message.sender))
                return "sender: string expected";
        if (message.qosProfile != null && message.hasOwnProperty("qosProfile")) {
            properties._qosProfile = 1;
            if (!$util.isString(message.qosProfile))
                return "qosProfile: string expected";
        }
        if (message.bodySizeNumBytes != null && message.hasOwnProperty("bodySizeNumBytes"))
            if (!$util.isInteger(message.bodySizeNumBytes))
                return "bodySizeNumBytes: integer expected";
        return null;
    };

    /**
     * Creates an ApplicationMessageHeader message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ApplicationMessageHeader
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ApplicationMessageHeader} ApplicationMessageHeader
     */
    ApplicationMessageHeader.fromObject = function fromObject(object) {
        if (object instanceof $root.ApplicationMessageHeader)
            return object;
        let message = new $root.ApplicationMessageHeader();
        if (object.subject != null)
            message.subject = String(object.subject);
        if (object.recipients != null) {
            if (typeof object.recipients !== "object")
                throw TypeError(".ApplicationMessageHeader.recipients: object expected");
            message.recipients = $root.Recipients.fromObject(object.recipients);
        }
        if (object.expires != null)
            if ($util.Long)
                (message.expires = $util.Long.fromValue(object.expires)).unsigned = false;
            else if (typeof object.expires === "string")
                message.expires = parseInt(object.expires, 10);
            else if (typeof object.expires === "number")
                message.expires = object.expires;
            else if (typeof object.expires === "object")
                message.expires = new $util.LongBits(object.expires.low >>> 0, object.expires.high >>> 0).toNumber();
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.qosProfile != null)
            message.qosProfile = String(object.qosProfile);
        if (object.bodySizeNumBytes != null)
            message.bodySizeNumBytes = object.bodySizeNumBytes >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an ApplicationMessageHeader message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ApplicationMessageHeader
     * @static
     * @param {ApplicationMessageHeader} message ApplicationMessageHeader
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ApplicationMessageHeader.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.expires = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expires = options.longs === String ? "0" : 0;
            object.sender = "";
            object.bodySizeNumBytes = 0;
        }
        if (message.subject != null && message.hasOwnProperty("subject")) {
            object.subject = message.subject;
            if (options.oneofs)
                object.SubjectOrRecipient = "subject";
        }
        if (message.recipients != null && message.hasOwnProperty("recipients")) {
            object.recipients = $root.Recipients.toObject(message.recipients, options);
            if (options.oneofs)
                object.SubjectOrRecipient = "recipients";
        }
        if (message.expires != null && message.hasOwnProperty("expires"))
            if (typeof message.expires === "number")
                object.expires = options.longs === String ? String(message.expires) : message.expires;
            else
                object.expires = options.longs === String ? $util.Long.prototype.toString.call(message.expires) : options.longs === Number ? new $util.LongBits(message.expires.low >>> 0, message.expires.high >>> 0).toNumber() : message.expires;
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.qosProfile != null && message.hasOwnProperty("qosProfile")) {
            object.qosProfile = message.qosProfile;
            if (options.oneofs)
                object._qosProfile = "qosProfile";
        }
        if (message.bodySizeNumBytes != null && message.hasOwnProperty("bodySizeNumBytes"))
            object.bodySizeNumBytes = message.bodySizeNumBytes;
        return object;
    };

    /**
     * Converts this ApplicationMessageHeader to JSON.
     * @function toJSON
     * @memberof ApplicationMessageHeader
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ApplicationMessageHeader.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ApplicationMessageHeader
     * @function getTypeUrl
     * @memberof ApplicationMessageHeader
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ApplicationMessageHeader.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ApplicationMessageHeader";
    };

    return ApplicationMessageHeader;
})();

export const Recipients = $root.Recipients = (() => {

    /**
     * Properties of a Recipients.
     * @name IRecipients
     * @interface IRecipients
     * @property {Array.<string>|null} [recipients] Recipients recipients
     */

    /**
     * Constructs a new Recipients.
     * @name Recipients
     * @classdesc Represents a Recipients.
     * @implements IRecipients
     * @constructor
     * @param {IRecipients=} [properties] Properties to set
     */
    function Recipients(properties) {
        this.recipients = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Recipients recipients.
     * @member {Array.<string>} recipients
     * @memberof Recipients
     * @instance
     */
    Recipients.prototype.recipients = $util.emptyArray;

    /**
     * Creates a new Recipients instance using the specified properties.
     * @function create
     * @memberof Recipients
     * @static
     * @param {IRecipients=} [properties] Properties to set
     * @returns {Recipients} Recipients instance
     */
    Recipients.create = function create(properties) {
        return new Recipients(properties);
    };

    /**
     * Encodes the specified Recipients message. Does not implicitly {@link Recipients.verify|verify} messages.
     * @function encode
     * @memberof Recipients
     * @static
     * @param {IRecipients} message Recipients message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Recipients.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.recipients != null && message.recipients.length)
            for (let i = 0; i < message.recipients.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.recipients[i]);
        return writer;
    };

    /**
     * Encodes the specified Recipients message, length delimited. Does not implicitly {@link Recipients.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Recipients
     * @static
     * @param {IRecipients} message Recipients message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Recipients.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Recipients message from the specified reader or buffer.
     * @function decode
     * @memberof Recipients
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Recipients} Recipients
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Recipients.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Recipients();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.recipients && message.recipients.length))
                        message.recipients = [];
                    message.recipients.push(reader.string());
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
     * Decodes a Recipients message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Recipients
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Recipients} Recipients
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Recipients.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Recipients message.
     * @function verify
     * @memberof Recipients
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Recipients.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.recipients != null && message.hasOwnProperty("recipients")) {
            if (!Array.isArray(message.recipients))
                return "recipients: array expected";
            for (let i = 0; i < message.recipients.length; ++i)
                if (!$util.isString(message.recipients[i]))
                    return "recipients: string[] expected";
        }
        return null;
    };

    /**
     * Creates a Recipients message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Recipients
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Recipients} Recipients
     */
    Recipients.fromObject = function fromObject(object) {
        if (object instanceof $root.Recipients)
            return object;
        let message = new $root.Recipients();
        if (object.recipients) {
            if (!Array.isArray(object.recipients))
                throw TypeError(".Recipients.recipients: array expected");
            message.recipients = [];
            for (let i = 0; i < object.recipients.length; ++i)
                message.recipients[i] = String(object.recipients[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Recipients message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Recipients
     * @static
     * @param {Recipients} message Recipients
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Recipients.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.recipients = [];
        if (message.recipients && message.recipients.length) {
            object.recipients = [];
            for (let j = 0; j < message.recipients.length; ++j)
                object.recipients[j] = message.recipients[j];
        }
        return object;
    };

    /**
     * Converts this Recipients to JSON.
     * @function toJSON
     * @memberof Recipients
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Recipients.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Recipients
     * @function getTypeUrl
     * @memberof Recipients
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Recipients.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Recipients";
    };

    return Recipients;
})();

export const MmtpMessage = $root.MmtpMessage = (() => {

    /**
     * Properties of a MmtpMessage.
     * @name IMmtpMessage
     * @interface IMmtpMessage
     * @property {MsgType|null} [msgType] MmtpMessage msgType
     * @property {string|null} [uuid] MmtpMessage uuid
     * @property {IProtocolMessage|null} [protocolMessage] MmtpMessage protocolMessage
     * @property {IResponseMessage|null} [responseMessage] MmtpMessage responseMessage
     */

    /**
     * Constructs a new MmtpMessage.
     * @name MmtpMessage
     * @classdesc Represents a MmtpMessage.
     * @implements IMmtpMessage
     * @constructor
     * @param {IMmtpMessage=} [properties] Properties to set
     */
    function MmtpMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MmtpMessage msgType.
     * @member {MsgType} msgType
     * @memberof MmtpMessage
     * @instance
     */
    MmtpMessage.prototype.msgType = 0;

    /**
     * MmtpMessage uuid.
     * @member {string} uuid
     * @memberof MmtpMessage
     * @instance
     */
    MmtpMessage.prototype.uuid = "";

    /**
     * MmtpMessage protocolMessage.
     * @member {IProtocolMessage|null|undefined} protocolMessage
     * @memberof MmtpMessage
     * @instance
     */
    MmtpMessage.prototype.protocolMessage = null;

    /**
     * MmtpMessage responseMessage.
     * @member {IResponseMessage|null|undefined} responseMessage
     * @memberof MmtpMessage
     * @instance
     */
    MmtpMessage.prototype.responseMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * MmtpMessage body.
     * @member {"protocolMessage"|"responseMessage"|undefined} body
     * @memberof MmtpMessage
     * @instance
     */
    Object.defineProperty(MmtpMessage.prototype, "body", {
        get: $util.oneOfGetter($oneOfFields = ["protocolMessage", "responseMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MmtpMessage instance using the specified properties.
     * @function create
     * @memberof MmtpMessage
     * @static
     * @param {IMmtpMessage=} [properties] Properties to set
     * @returns {MmtpMessage} MmtpMessage instance
     */
    MmtpMessage.create = function create(properties) {
        return new MmtpMessage(properties);
    };

    /**
     * Encodes the specified MmtpMessage message. Does not implicitly {@link MmtpMessage.verify|verify} messages.
     * @function encode
     * @memberof MmtpMessage
     * @static
     * @param {IMmtpMessage} message MmtpMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MmtpMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.msgType);
        if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.uuid);
        if (message.protocolMessage != null && Object.hasOwnProperty.call(message, "protocolMessage"))
            $root.ProtocolMessage.encode(message.protocolMessage, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.responseMessage != null && Object.hasOwnProperty.call(message, "responseMessage"))
            $root.ResponseMessage.encode(message.responseMessage, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MmtpMessage message, length delimited. Does not implicitly {@link MmtpMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MmtpMessage
     * @static
     * @param {IMmtpMessage} message MmtpMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MmtpMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MmtpMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MmtpMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MmtpMessage} MmtpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MmtpMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MmtpMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.msgType = reader.int32();
                    break;
                }
            case 2: {
                    message.uuid = reader.string();
                    break;
                }
            case 3: {
                    message.protocolMessage = $root.ProtocolMessage.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.responseMessage = $root.ResponseMessage.decode(reader, reader.uint32());
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
     * Decodes a MmtpMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MmtpMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MmtpMessage} MmtpMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MmtpMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MmtpMessage message.
     * @function verify
     * @memberof MmtpMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MmtpMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.msgType != null && message.hasOwnProperty("msgType"))
            switch (message.msgType) {
            default:
                return "msgType: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            if (!$util.isString(message.uuid))
                return "uuid: string expected";
        if (message.protocolMessage != null && message.hasOwnProperty("protocolMessage")) {
            properties.body = 1;
            {
                let error = $root.ProtocolMessage.verify(message.protocolMessage);
                if (error)
                    return "protocolMessage." + error;
            }
        }
        if (message.responseMessage != null && message.hasOwnProperty("responseMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.ResponseMessage.verify(message.responseMessage);
                if (error)
                    return "responseMessage." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MmtpMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MmtpMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MmtpMessage} MmtpMessage
     */
    MmtpMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MmtpMessage)
            return object;
        let message = new $root.MmtpMessage();
        switch (object.msgType) {
        default:
            if (typeof object.msgType === "number") {
                message.msgType = object.msgType;
                break;
            }
            break;
        case "UNSPECIFIED_MESSAGE":
        case 0:
            message.msgType = 0;
            break;
        case "PROTOCOL_MESSAGE":
        case 1:
            message.msgType = 1;
            break;
        case "RESPONSE_MESSAGE":
        case 2:
            message.msgType = 2;
            break;
        }
        if (object.uuid != null)
            message.uuid = String(object.uuid);
        if (object.protocolMessage != null) {
            if (typeof object.protocolMessage !== "object")
                throw TypeError(".MmtpMessage.protocolMessage: object expected");
            message.protocolMessage = $root.ProtocolMessage.fromObject(object.protocolMessage);
        }
        if (object.responseMessage != null) {
            if (typeof object.responseMessage !== "object")
                throw TypeError(".MmtpMessage.responseMessage: object expected");
            message.responseMessage = $root.ResponseMessage.fromObject(object.responseMessage);
        }
        return message;
    };

    /**
     * Creates a plain object from a MmtpMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MmtpMessage
     * @static
     * @param {MmtpMessage} message MmtpMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MmtpMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.msgType = options.enums === String ? "UNSPECIFIED_MESSAGE" : 0;
            object.uuid = "";
        }
        if (message.msgType != null && message.hasOwnProperty("msgType"))
            object.msgType = options.enums === String ? $root.MsgType[message.msgType] === undefined ? message.msgType : $root.MsgType[message.msgType] : message.msgType;
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            object.uuid = message.uuid;
        if (message.protocolMessage != null && message.hasOwnProperty("protocolMessage")) {
            object.protocolMessage = $root.ProtocolMessage.toObject(message.protocolMessage, options);
            if (options.oneofs)
                object.body = "protocolMessage";
        }
        if (message.responseMessage != null && message.hasOwnProperty("responseMessage")) {
            object.responseMessage = $root.ResponseMessage.toObject(message.responseMessage, options);
            if (options.oneofs)
                object.body = "responseMessage";
        }
        return object;
    };

    /**
     * Converts this MmtpMessage to JSON.
     * @function toJSON
     * @memberof MmtpMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MmtpMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MmtpMessage
     * @function getTypeUrl
     * @memberof MmtpMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MmtpMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MmtpMessage";
    };

    return MmtpMessage;
})();

/**
 * MsgType enum.
 * @name MsgType
 * @enum {number}
 * @property {number} UNSPECIFIED_MESSAGE=0 UNSPECIFIED_MESSAGE value
 * @property {number} PROTOCOL_MESSAGE=1 PROTOCOL_MESSAGE value
 * @property {number} RESPONSE_MESSAGE=2 RESPONSE_MESSAGE value
 */
export const MsgType = $root.MsgType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNSPECIFIED_MESSAGE"] = 0;
    values[valuesById[1] = "PROTOCOL_MESSAGE"] = 1;
    values[valuesById[2] = "RESPONSE_MESSAGE"] = 2;
    return values;
})();

export const ProtocolMessage = $root.ProtocolMessage = (() => {

    /**
     * Properties of a ProtocolMessage.
     * @name IProtocolMessage
     * @interface IProtocolMessage
     * @property {ProtocolMessageType|null} [protocolMsgType] ProtocolMessage protocolMsgType
     * @property {ISubscribe|null} [subscribeMessage] ProtocolMessage subscribeMessage
     * @property {IUnsubscribe|null} [unsubscribeMessage] ProtocolMessage unsubscribeMessage
     * @property {ISend|null} [sendMessage] ProtocolMessage sendMessage
     * @property {IReceive|null} [receiveMessage] ProtocolMessage receiveMessage
     * @property {IFetch|null} [fetchMessage] ProtocolMessage fetchMessage
     * @property {IDisconnect|null} [disconnectMessage] ProtocolMessage disconnectMessage
     * @property {IConnect|null} [connectMessage] ProtocolMessage connectMessage
     * @property {INotify|null} [notifyMessage] ProtocolMessage notifyMessage
     */

    /**
     * Constructs a new ProtocolMessage.
     * @name ProtocolMessage
     * @classdesc Represents a ProtocolMessage.
     * @implements IProtocolMessage
     * @constructor
     * @param {IProtocolMessage=} [properties] Properties to set
     */
    function ProtocolMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProtocolMessage protocolMsgType.
     * @member {ProtocolMessageType} protocolMsgType
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.protocolMsgType = 0;

    /**
     * ProtocolMessage subscribeMessage.
     * @member {ISubscribe|null|undefined} subscribeMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.subscribeMessage = null;

    /**
     * ProtocolMessage unsubscribeMessage.
     * @member {IUnsubscribe|null|undefined} unsubscribeMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.unsubscribeMessage = null;

    /**
     * ProtocolMessage sendMessage.
     * @member {ISend|null|undefined} sendMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.sendMessage = null;

    /**
     * ProtocolMessage receiveMessage.
     * @member {IReceive|null|undefined} receiveMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.receiveMessage = null;

    /**
     * ProtocolMessage fetchMessage.
     * @member {IFetch|null|undefined} fetchMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.fetchMessage = null;

    /**
     * ProtocolMessage disconnectMessage.
     * @member {IDisconnect|null|undefined} disconnectMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.disconnectMessage = null;

    /**
     * ProtocolMessage connectMessage.
     * @member {IConnect|null|undefined} connectMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.connectMessage = null;

    /**
     * ProtocolMessage notifyMessage.
     * @member {INotify|null|undefined} notifyMessage
     * @memberof ProtocolMessage
     * @instance
     */
    ProtocolMessage.prototype.notifyMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * ProtocolMessage body.
     * @member {"subscribeMessage"|"unsubscribeMessage"|"sendMessage"|"receiveMessage"|"fetchMessage"|"disconnectMessage"|"connectMessage"|"notifyMessage"|undefined} body
     * @memberof ProtocolMessage
     * @instance
     */
    Object.defineProperty(ProtocolMessage.prototype, "body", {
        get: $util.oneOfGetter($oneOfFields = ["subscribeMessage", "unsubscribeMessage", "sendMessage", "receiveMessage", "fetchMessage", "disconnectMessage", "connectMessage", "notifyMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ProtocolMessage instance using the specified properties.
     * @function create
     * @memberof ProtocolMessage
     * @static
     * @param {IProtocolMessage=} [properties] Properties to set
     * @returns {ProtocolMessage} ProtocolMessage instance
     */
    ProtocolMessage.create = function create(properties) {
        return new ProtocolMessage(properties);
    };

    /**
     * Encodes the specified ProtocolMessage message. Does not implicitly {@link ProtocolMessage.verify|verify} messages.
     * @function encode
     * @memberof ProtocolMessage
     * @static
     * @param {IProtocolMessage} message ProtocolMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtocolMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.protocolMsgType != null && Object.hasOwnProperty.call(message, "protocolMsgType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.protocolMsgType);
        if (message.subscribeMessage != null && Object.hasOwnProperty.call(message, "subscribeMessage"))
            $root.Subscribe.encode(message.subscribeMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.unsubscribeMessage != null && Object.hasOwnProperty.call(message, "unsubscribeMessage"))
            $root.Unsubscribe.encode(message.unsubscribeMessage, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.sendMessage != null && Object.hasOwnProperty.call(message, "sendMessage"))
            $root.Send.encode(message.sendMessage, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.receiveMessage != null && Object.hasOwnProperty.call(message, "receiveMessage"))
            $root.Receive.encode(message.receiveMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.fetchMessage != null && Object.hasOwnProperty.call(message, "fetchMessage"))
            $root.Fetch.encode(message.fetchMessage, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.disconnectMessage != null && Object.hasOwnProperty.call(message, "disconnectMessage"))
            $root.Disconnect.encode(message.disconnectMessage, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.connectMessage != null && Object.hasOwnProperty.call(message, "connectMessage"))
            $root.Connect.encode(message.connectMessage, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.notifyMessage != null && Object.hasOwnProperty.call(message, "notifyMessage"))
            $root.Notify.encode(message.notifyMessage, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ProtocolMessage message, length delimited. Does not implicitly {@link ProtocolMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProtocolMessage
     * @static
     * @param {IProtocolMessage} message ProtocolMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtocolMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProtocolMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ProtocolMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProtocolMessage} ProtocolMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtocolMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProtocolMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.protocolMsgType = reader.int32();
                    break;
                }
            case 2: {
                    message.subscribeMessage = $root.Subscribe.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.unsubscribeMessage = $root.Unsubscribe.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.sendMessage = $root.Send.decode(reader, reader.uint32());
                    break;
                }
            case 5: {
                    message.receiveMessage = $root.Receive.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.fetchMessage = $root.Fetch.decode(reader, reader.uint32());
                    break;
                }
            case 7: {
                    message.disconnectMessage = $root.Disconnect.decode(reader, reader.uint32());
                    break;
                }
            case 8: {
                    message.connectMessage = $root.Connect.decode(reader, reader.uint32());
                    break;
                }
            case 9: {
                    message.notifyMessage = $root.Notify.decode(reader, reader.uint32());
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
     * Decodes a ProtocolMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProtocolMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProtocolMessage} ProtocolMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtocolMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProtocolMessage message.
     * @function verify
     * @memberof ProtocolMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProtocolMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.protocolMsgType != null && message.hasOwnProperty("protocolMsgType"))
            switch (message.protocolMsgType) {
            default:
                return "protocolMsgType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.subscribeMessage != null && message.hasOwnProperty("subscribeMessage")) {
            properties.body = 1;
            {
                let error = $root.Subscribe.verify(message.subscribeMessage);
                if (error)
                    return "subscribeMessage." + error;
            }
        }
        if (message.unsubscribeMessage != null && message.hasOwnProperty("unsubscribeMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Unsubscribe.verify(message.unsubscribeMessage);
                if (error)
                    return "unsubscribeMessage." + error;
            }
        }
        if (message.sendMessage != null && message.hasOwnProperty("sendMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Send.verify(message.sendMessage);
                if (error)
                    return "sendMessage." + error;
            }
        }
        if (message.receiveMessage != null && message.hasOwnProperty("receiveMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Receive.verify(message.receiveMessage);
                if (error)
                    return "receiveMessage." + error;
            }
        }
        if (message.fetchMessage != null && message.hasOwnProperty("fetchMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Fetch.verify(message.fetchMessage);
                if (error)
                    return "fetchMessage." + error;
            }
        }
        if (message.disconnectMessage != null && message.hasOwnProperty("disconnectMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Disconnect.verify(message.disconnectMessage);
                if (error)
                    return "disconnectMessage." + error;
            }
        }
        if (message.connectMessage != null && message.hasOwnProperty("connectMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Connect.verify(message.connectMessage);
                if (error)
                    return "connectMessage." + error;
            }
        }
        if (message.notifyMessage != null && message.hasOwnProperty("notifyMessage")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.Notify.verify(message.notifyMessage);
                if (error)
                    return "notifyMessage." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ProtocolMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProtocolMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProtocolMessage} ProtocolMessage
     */
    ProtocolMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ProtocolMessage)
            return object;
        let message = new $root.ProtocolMessage();
        switch (object.protocolMsgType) {
        default:
            if (typeof object.protocolMsgType === "number") {
                message.protocolMsgType = object.protocolMsgType;
                break;
            }
            break;
        case "UNSPECIFIED":
        case 0:
            message.protocolMsgType = 0;
            break;
        case "SUBSCRIBE_MESSAGE":
        case 1:
            message.protocolMsgType = 1;
            break;
        case "UNSUBSCRIBE_MESSAGE":
        case 2:
            message.protocolMsgType = 2;
            break;
        case "SEND_MESSAGE":
        case 3:
            message.protocolMsgType = 3;
            break;
        case "RECEIVE_MESSAGE":
        case 4:
            message.protocolMsgType = 4;
            break;
        case "FETCH_MESSAGE":
        case 5:
            message.protocolMsgType = 5;
            break;
        case "DISCONNECT_MESSAGE":
        case 6:
            message.protocolMsgType = 6;
            break;
        case "CONNECT_MESSAGE":
        case 7:
            message.protocolMsgType = 7;
            break;
        case "NOTIFY_MESSAGE":
        case 8:
            message.protocolMsgType = 8;
            break;
        }
        if (object.subscribeMessage != null) {
            if (typeof object.subscribeMessage !== "object")
                throw TypeError(".ProtocolMessage.subscribeMessage: object expected");
            message.subscribeMessage = $root.Subscribe.fromObject(object.subscribeMessage);
        }
        if (object.unsubscribeMessage != null) {
            if (typeof object.unsubscribeMessage !== "object")
                throw TypeError(".ProtocolMessage.unsubscribeMessage: object expected");
            message.unsubscribeMessage = $root.Unsubscribe.fromObject(object.unsubscribeMessage);
        }
        if (object.sendMessage != null) {
            if (typeof object.sendMessage !== "object")
                throw TypeError(".ProtocolMessage.sendMessage: object expected");
            message.sendMessage = $root.Send.fromObject(object.sendMessage);
        }
        if (object.receiveMessage != null) {
            if (typeof object.receiveMessage !== "object")
                throw TypeError(".ProtocolMessage.receiveMessage: object expected");
            message.receiveMessage = $root.Receive.fromObject(object.receiveMessage);
        }
        if (object.fetchMessage != null) {
            if (typeof object.fetchMessage !== "object")
                throw TypeError(".ProtocolMessage.fetchMessage: object expected");
            message.fetchMessage = $root.Fetch.fromObject(object.fetchMessage);
        }
        if (object.disconnectMessage != null) {
            if (typeof object.disconnectMessage !== "object")
                throw TypeError(".ProtocolMessage.disconnectMessage: object expected");
            message.disconnectMessage = $root.Disconnect.fromObject(object.disconnectMessage);
        }
        if (object.connectMessage != null) {
            if (typeof object.connectMessage !== "object")
                throw TypeError(".ProtocolMessage.connectMessage: object expected");
            message.connectMessage = $root.Connect.fromObject(object.connectMessage);
        }
        if (object.notifyMessage != null) {
            if (typeof object.notifyMessage !== "object")
                throw TypeError(".ProtocolMessage.notifyMessage: object expected");
            message.notifyMessage = $root.Notify.fromObject(object.notifyMessage);
        }
        return message;
    };

    /**
     * Creates a plain object from a ProtocolMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProtocolMessage
     * @static
     * @param {ProtocolMessage} message ProtocolMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProtocolMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.protocolMsgType = options.enums === String ? "UNSPECIFIED" : 0;
        if (message.protocolMsgType != null && message.hasOwnProperty("protocolMsgType"))
            object.protocolMsgType = options.enums === String ? $root.ProtocolMessageType[message.protocolMsgType] === undefined ? message.protocolMsgType : $root.ProtocolMessageType[message.protocolMsgType] : message.protocolMsgType;
        if (message.subscribeMessage != null && message.hasOwnProperty("subscribeMessage")) {
            object.subscribeMessage = $root.Subscribe.toObject(message.subscribeMessage, options);
            if (options.oneofs)
                object.body = "subscribeMessage";
        }
        if (message.unsubscribeMessage != null && message.hasOwnProperty("unsubscribeMessage")) {
            object.unsubscribeMessage = $root.Unsubscribe.toObject(message.unsubscribeMessage, options);
            if (options.oneofs)
                object.body = "unsubscribeMessage";
        }
        if (message.sendMessage != null && message.hasOwnProperty("sendMessage")) {
            object.sendMessage = $root.Send.toObject(message.sendMessage, options);
            if (options.oneofs)
                object.body = "sendMessage";
        }
        if (message.receiveMessage != null && message.hasOwnProperty("receiveMessage")) {
            object.receiveMessage = $root.Receive.toObject(message.receiveMessage, options);
            if (options.oneofs)
                object.body = "receiveMessage";
        }
        if (message.fetchMessage != null && message.hasOwnProperty("fetchMessage")) {
            object.fetchMessage = $root.Fetch.toObject(message.fetchMessage, options);
            if (options.oneofs)
                object.body = "fetchMessage";
        }
        if (message.disconnectMessage != null && message.hasOwnProperty("disconnectMessage")) {
            object.disconnectMessage = $root.Disconnect.toObject(message.disconnectMessage, options);
            if (options.oneofs)
                object.body = "disconnectMessage";
        }
        if (message.connectMessage != null && message.hasOwnProperty("connectMessage")) {
            object.connectMessage = $root.Connect.toObject(message.connectMessage, options);
            if (options.oneofs)
                object.body = "connectMessage";
        }
        if (message.notifyMessage != null && message.hasOwnProperty("notifyMessage")) {
            object.notifyMessage = $root.Notify.toObject(message.notifyMessage, options);
            if (options.oneofs)
                object.body = "notifyMessage";
        }
        return object;
    };

    /**
     * Converts this ProtocolMessage to JSON.
     * @function toJSON
     * @memberof ProtocolMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProtocolMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ProtocolMessage
     * @function getTypeUrl
     * @memberof ProtocolMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ProtocolMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ProtocolMessage";
    };

    return ProtocolMessage;
})();

/**
 * ProtocolMessageType enum.
 * @name ProtocolMessageType
 * @enum {number}
 * @property {number} UNSPECIFIED=0 UNSPECIFIED value
 * @property {number} SUBSCRIBE_MESSAGE=1 SUBSCRIBE_MESSAGE value
 * @property {number} UNSUBSCRIBE_MESSAGE=2 UNSUBSCRIBE_MESSAGE value
 * @property {number} SEND_MESSAGE=3 SEND_MESSAGE value
 * @property {number} RECEIVE_MESSAGE=4 RECEIVE_MESSAGE value
 * @property {number} FETCH_MESSAGE=5 FETCH_MESSAGE value
 * @property {number} DISCONNECT_MESSAGE=6 DISCONNECT_MESSAGE value
 * @property {number} CONNECT_MESSAGE=7 CONNECT_MESSAGE value
 * @property {number} NOTIFY_MESSAGE=8 NOTIFY_MESSAGE value
 */
export const ProtocolMessageType = $root.ProtocolMessageType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNSPECIFIED"] = 0;
    values[valuesById[1] = "SUBSCRIBE_MESSAGE"] = 1;
    values[valuesById[2] = "UNSUBSCRIBE_MESSAGE"] = 2;
    values[valuesById[3] = "SEND_MESSAGE"] = 3;
    values[valuesById[4] = "RECEIVE_MESSAGE"] = 4;
    values[valuesById[5] = "FETCH_MESSAGE"] = 5;
    values[valuesById[6] = "DISCONNECT_MESSAGE"] = 6;
    values[valuesById[7] = "CONNECT_MESSAGE"] = 7;
    values[valuesById[8] = "NOTIFY_MESSAGE"] = 8;
    return values;
})();

export const Subscribe = $root.Subscribe = (() => {

    /**
     * Properties of a Subscribe.
     * @name ISubscribe
     * @interface ISubscribe
     * @property {string|null} [subject] Subscribe subject
     * @property {boolean|null} [directMessages] Subscribe directMessages
     */

    /**
     * Constructs a new Subscribe.
     * @name Subscribe
     * @classdesc Represents a Subscribe.
     * @implements ISubscribe
     * @constructor
     * @param {ISubscribe=} [properties] Properties to set
     */
    function Subscribe(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Subscribe subject.
     * @member {string|null|undefined} subject
     * @memberof Subscribe
     * @instance
     */
    Subscribe.prototype.subject = null;

    /**
     * Subscribe directMessages.
     * @member {boolean|null|undefined} directMessages
     * @memberof Subscribe
     * @instance
     */
    Subscribe.prototype.directMessages = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Subscribe subjectOrDirectMessages.
     * @member {"subject"|"directMessages"|undefined} subjectOrDirectMessages
     * @memberof Subscribe
     * @instance
     */
    Object.defineProperty(Subscribe.prototype, "subjectOrDirectMessages", {
        get: $util.oneOfGetter($oneOfFields = ["subject", "directMessages"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Subscribe instance using the specified properties.
     * @function create
     * @memberof Subscribe
     * @static
     * @param {ISubscribe=} [properties] Properties to set
     * @returns {Subscribe} Subscribe instance
     */
    Subscribe.create = function create(properties) {
        return new Subscribe(properties);
    };

    /**
     * Encodes the specified Subscribe message. Does not implicitly {@link Subscribe.verify|verify} messages.
     * @function encode
     * @memberof Subscribe
     * @static
     * @param {ISubscribe} message Subscribe message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Subscribe.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.subject);
        if (message.directMessages != null && Object.hasOwnProperty.call(message, "directMessages"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.directMessages);
        return writer;
    };

    /**
     * Encodes the specified Subscribe message, length delimited. Does not implicitly {@link Subscribe.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Subscribe
     * @static
     * @param {ISubscribe} message Subscribe message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Subscribe.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Subscribe message from the specified reader or buffer.
     * @function decode
     * @memberof Subscribe
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Subscribe} Subscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Subscribe.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Subscribe();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.subject = reader.string();
                    break;
                }
            case 2: {
                    message.directMessages = reader.bool();
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
     * Decodes a Subscribe message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Subscribe
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Subscribe} Subscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Subscribe.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Subscribe message.
     * @function verify
     * @memberof Subscribe
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Subscribe.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.subject != null && message.hasOwnProperty("subject")) {
            properties.subjectOrDirectMessages = 1;
            if (!$util.isString(message.subject))
                return "subject: string expected";
        }
        if (message.directMessages != null && message.hasOwnProperty("directMessages")) {
            if (properties.subjectOrDirectMessages === 1)
                return "subjectOrDirectMessages: multiple values";
            properties.subjectOrDirectMessages = 1;
            if (typeof message.directMessages !== "boolean")
                return "directMessages: boolean expected";
        }
        return null;
    };

    /**
     * Creates a Subscribe message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Subscribe
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Subscribe} Subscribe
     */
    Subscribe.fromObject = function fromObject(object) {
        if (object instanceof $root.Subscribe)
            return object;
        let message = new $root.Subscribe();
        if (object.subject != null)
            message.subject = String(object.subject);
        if (object.directMessages != null)
            message.directMessages = Boolean(object.directMessages);
        return message;
    };

    /**
     * Creates a plain object from a Subscribe message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Subscribe
     * @static
     * @param {Subscribe} message Subscribe
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Subscribe.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.subject != null && message.hasOwnProperty("subject")) {
            object.subject = message.subject;
            if (options.oneofs)
                object.subjectOrDirectMessages = "subject";
        }
        if (message.directMessages != null && message.hasOwnProperty("directMessages")) {
            object.directMessages = message.directMessages;
            if (options.oneofs)
                object.subjectOrDirectMessages = "directMessages";
        }
        return object;
    };

    /**
     * Converts this Subscribe to JSON.
     * @function toJSON
     * @memberof Subscribe
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Subscribe.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Subscribe
     * @function getTypeUrl
     * @memberof Subscribe
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Subscribe.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Subscribe";
    };

    return Subscribe;
})();

export const Unsubscribe = $root.Unsubscribe = (() => {

    /**
     * Properties of an Unsubscribe.
     * @name IUnsubscribe
     * @interface IUnsubscribe
     * @property {string|null} [subject] Unsubscribe subject
     * @property {boolean|null} [directMessages] Unsubscribe directMessages
     */

    /**
     * Constructs a new Unsubscribe.
     * @name Unsubscribe
     * @classdesc Represents an Unsubscribe.
     * @implements IUnsubscribe
     * @constructor
     * @param {IUnsubscribe=} [properties] Properties to set
     */
    function Unsubscribe(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Unsubscribe subject.
     * @member {string|null|undefined} subject
     * @memberof Unsubscribe
     * @instance
     */
    Unsubscribe.prototype.subject = null;

    /**
     * Unsubscribe directMessages.
     * @member {boolean|null|undefined} directMessages
     * @memberof Unsubscribe
     * @instance
     */
    Unsubscribe.prototype.directMessages = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Unsubscribe subjectOrDirectMessages.
     * @member {"subject"|"directMessages"|undefined} subjectOrDirectMessages
     * @memberof Unsubscribe
     * @instance
     */
    Object.defineProperty(Unsubscribe.prototype, "subjectOrDirectMessages", {
        get: $util.oneOfGetter($oneOfFields = ["subject", "directMessages"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Unsubscribe instance using the specified properties.
     * @function create
     * @memberof Unsubscribe
     * @static
     * @param {IUnsubscribe=} [properties] Properties to set
     * @returns {Unsubscribe} Unsubscribe instance
     */
    Unsubscribe.create = function create(properties) {
        return new Unsubscribe(properties);
    };

    /**
     * Encodes the specified Unsubscribe message. Does not implicitly {@link Unsubscribe.verify|verify} messages.
     * @function encode
     * @memberof Unsubscribe
     * @static
     * @param {IUnsubscribe} message Unsubscribe message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Unsubscribe.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.subject);
        if (message.directMessages != null && Object.hasOwnProperty.call(message, "directMessages"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.directMessages);
        return writer;
    };

    /**
     * Encodes the specified Unsubscribe message, length delimited. Does not implicitly {@link Unsubscribe.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Unsubscribe
     * @static
     * @param {IUnsubscribe} message Unsubscribe message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Unsubscribe.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Unsubscribe message from the specified reader or buffer.
     * @function decode
     * @memberof Unsubscribe
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Unsubscribe} Unsubscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Unsubscribe.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Unsubscribe();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.subject = reader.string();
                    break;
                }
            case 2: {
                    message.directMessages = reader.bool();
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
     * Decodes an Unsubscribe message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Unsubscribe
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Unsubscribe} Unsubscribe
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Unsubscribe.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Unsubscribe message.
     * @function verify
     * @memberof Unsubscribe
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Unsubscribe.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.subject != null && message.hasOwnProperty("subject")) {
            properties.subjectOrDirectMessages = 1;
            if (!$util.isString(message.subject))
                return "subject: string expected";
        }
        if (message.directMessages != null && message.hasOwnProperty("directMessages")) {
            if (properties.subjectOrDirectMessages === 1)
                return "subjectOrDirectMessages: multiple values";
            properties.subjectOrDirectMessages = 1;
            if (typeof message.directMessages !== "boolean")
                return "directMessages: boolean expected";
        }
        return null;
    };

    /**
     * Creates an Unsubscribe message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Unsubscribe
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Unsubscribe} Unsubscribe
     */
    Unsubscribe.fromObject = function fromObject(object) {
        if (object instanceof $root.Unsubscribe)
            return object;
        let message = new $root.Unsubscribe();
        if (object.subject != null)
            message.subject = String(object.subject);
        if (object.directMessages != null)
            message.directMessages = Boolean(object.directMessages);
        return message;
    };

    /**
     * Creates a plain object from an Unsubscribe message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Unsubscribe
     * @static
     * @param {Unsubscribe} message Unsubscribe
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Unsubscribe.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.subject != null && message.hasOwnProperty("subject")) {
            object.subject = message.subject;
            if (options.oneofs)
                object.subjectOrDirectMessages = "subject";
        }
        if (message.directMessages != null && message.hasOwnProperty("directMessages")) {
            object.directMessages = message.directMessages;
            if (options.oneofs)
                object.subjectOrDirectMessages = "directMessages";
        }
        return object;
    };

    /**
     * Converts this Unsubscribe to JSON.
     * @function toJSON
     * @memberof Unsubscribe
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Unsubscribe.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Unsubscribe
     * @function getTypeUrl
     * @memberof Unsubscribe
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Unsubscribe.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Unsubscribe";
    };

    return Unsubscribe;
})();

export const Send = $root.Send = (() => {

    /**
     * Properties of a Send.
     * @name ISend
     * @interface ISend
     * @property {IApplicationMessage|null} [applicationMessage] Send applicationMessage
     */

    /**
     * Constructs a new Send.
     * @name Send
     * @classdesc Represents a Send.
     * @implements ISend
     * @constructor
     * @param {ISend=} [properties] Properties to set
     */
    function Send(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Send applicationMessage.
     * @member {IApplicationMessage|null|undefined} applicationMessage
     * @memberof Send
     * @instance
     */
    Send.prototype.applicationMessage = null;

    /**
     * Creates a new Send instance using the specified properties.
     * @function create
     * @memberof Send
     * @static
     * @param {ISend=} [properties] Properties to set
     * @returns {Send} Send instance
     */
    Send.create = function create(properties) {
        return new Send(properties);
    };

    /**
     * Encodes the specified Send message. Does not implicitly {@link Send.verify|verify} messages.
     * @function encode
     * @memberof Send
     * @static
     * @param {ISend} message Send message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Send.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.applicationMessage != null && Object.hasOwnProperty.call(message, "applicationMessage"))
            $root.ApplicationMessage.encode(message.applicationMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Send message, length delimited. Does not implicitly {@link Send.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Send
     * @static
     * @param {ISend} message Send message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Send.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Send message from the specified reader or buffer.
     * @function decode
     * @memberof Send
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Send} Send
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Send.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Send();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.applicationMessage = $root.ApplicationMessage.decode(reader, reader.uint32());
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
     * Decodes a Send message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Send
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Send} Send
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Send.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Send message.
     * @function verify
     * @memberof Send
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Send.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.applicationMessage != null && message.hasOwnProperty("applicationMessage")) {
            let error = $root.ApplicationMessage.verify(message.applicationMessage);
            if (error)
                return "applicationMessage." + error;
        }
        return null;
    };

    /**
     * Creates a Send message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Send
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Send} Send
     */
    Send.fromObject = function fromObject(object) {
        if (object instanceof $root.Send)
            return object;
        let message = new $root.Send();
        if (object.applicationMessage != null) {
            if (typeof object.applicationMessage !== "object")
                throw TypeError(".Send.applicationMessage: object expected");
            message.applicationMessage = $root.ApplicationMessage.fromObject(object.applicationMessage);
        }
        return message;
    };

    /**
     * Creates a plain object from a Send message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Send
     * @static
     * @param {Send} message Send
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Send.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.applicationMessage = null;
        if (message.applicationMessage != null && message.hasOwnProperty("applicationMessage"))
            object.applicationMessage = $root.ApplicationMessage.toObject(message.applicationMessage, options);
        return object;
    };

    /**
     * Converts this Send to JSON.
     * @function toJSON
     * @memberof Send
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Send.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Send
     * @function getTypeUrl
     * @memberof Send
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Send.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Send";
    };

    return Send;
})();

export const Receive = $root.Receive = (() => {

    /**
     * Properties of a Receive.
     * @name IReceive
     * @interface IReceive
     * @property {IFilter|null} [filter] Receive filter
     */

    /**
     * Constructs a new Receive.
     * @name Receive
     * @classdesc Represents a Receive.
     * @implements IReceive
     * @constructor
     * @param {IReceive=} [properties] Properties to set
     */
    function Receive(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Receive filter.
     * @member {IFilter|null|undefined} filter
     * @memberof Receive
     * @instance
     */
    Receive.prototype.filter = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Receive _filter.
     * @member {"filter"|undefined} _filter
     * @memberof Receive
     * @instance
     */
    Object.defineProperty(Receive.prototype, "_filter", {
        get: $util.oneOfGetter($oneOfFields = ["filter"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Receive instance using the specified properties.
     * @function create
     * @memberof Receive
     * @static
     * @param {IReceive=} [properties] Properties to set
     * @returns {Receive} Receive instance
     */
    Receive.create = function create(properties) {
        return new Receive(properties);
    };

    /**
     * Encodes the specified Receive message. Does not implicitly {@link Receive.verify|verify} messages.
     * @function encode
     * @memberof Receive
     * @static
     * @param {IReceive} message Receive message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Receive.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.filter != null && Object.hasOwnProperty.call(message, "filter"))
            $root.Filter.encode(message.filter, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Receive message, length delimited. Does not implicitly {@link Receive.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Receive
     * @static
     * @param {IReceive} message Receive message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Receive.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Receive message from the specified reader or buffer.
     * @function decode
     * @memberof Receive
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Receive} Receive
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Receive.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Receive();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.filter = $root.Filter.decode(reader, reader.uint32());
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
     * Decodes a Receive message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Receive
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Receive} Receive
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Receive.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Receive message.
     * @function verify
     * @memberof Receive
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Receive.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.filter != null && message.hasOwnProperty("filter")) {
            properties._filter = 1;
            {
                let error = $root.Filter.verify(message.filter);
                if (error)
                    return "filter." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Receive message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Receive
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Receive} Receive
     */
    Receive.fromObject = function fromObject(object) {
        if (object instanceof $root.Receive)
            return object;
        let message = new $root.Receive();
        if (object.filter != null) {
            if (typeof object.filter !== "object")
                throw TypeError(".Receive.filter: object expected");
            message.filter = $root.Filter.fromObject(object.filter);
        }
        return message;
    };

    /**
     * Creates a plain object from a Receive message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Receive
     * @static
     * @param {Receive} message Receive
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Receive.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.filter != null && message.hasOwnProperty("filter")) {
            object.filter = $root.Filter.toObject(message.filter, options);
            if (options.oneofs)
                object._filter = "filter";
        }
        return object;
    };

    /**
     * Converts this Receive to JSON.
     * @function toJSON
     * @memberof Receive
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Receive.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Receive
     * @function getTypeUrl
     * @memberof Receive
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Receive.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Receive";
    };

    return Receive;
})();

export const Filter = $root.Filter = (() => {

    /**
     * Properties of a Filter.
     * @name IFilter
     * @interface IFilter
     * @property {Array.<string>|null} [messageUuids] Filter messageUuids
     */

    /**
     * Constructs a new Filter.
     * @name Filter
     * @classdesc Represents a Filter.
     * @implements IFilter
     * @constructor
     * @param {IFilter=} [properties] Properties to set
     */
    function Filter(properties) {
        this.messageUuids = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Filter messageUuids.
     * @member {Array.<string>} messageUuids
     * @memberof Filter
     * @instance
     */
    Filter.prototype.messageUuids = $util.emptyArray;

    /**
     * Creates a new Filter instance using the specified properties.
     * @function create
     * @memberof Filter
     * @static
     * @param {IFilter=} [properties] Properties to set
     * @returns {Filter} Filter instance
     */
    Filter.create = function create(properties) {
        return new Filter(properties);
    };

    /**
     * Encodes the specified Filter message. Does not implicitly {@link Filter.verify|verify} messages.
     * @function encode
     * @memberof Filter
     * @static
     * @param {IFilter} message Filter message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Filter.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageUuids != null && message.messageUuids.length)
            for (let i = 0; i < message.messageUuids.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageUuids[i]);
        return writer;
    };

    /**
     * Encodes the specified Filter message, length delimited. Does not implicitly {@link Filter.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Filter
     * @static
     * @param {IFilter} message Filter message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Filter.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Filter message from the specified reader or buffer.
     * @function decode
     * @memberof Filter
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Filter} Filter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Filter.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Filter();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.messageUuids && message.messageUuids.length))
                        message.messageUuids = [];
                    message.messageUuids.push(reader.string());
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
     * Decodes a Filter message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Filter
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Filter} Filter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Filter.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Filter message.
     * @function verify
     * @memberof Filter
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Filter.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageUuids != null && message.hasOwnProperty("messageUuids")) {
            if (!Array.isArray(message.messageUuids))
                return "messageUuids: array expected";
            for (let i = 0; i < message.messageUuids.length; ++i)
                if (!$util.isString(message.messageUuids[i]))
                    return "messageUuids: string[] expected";
        }
        return null;
    };

    /**
     * Creates a Filter message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Filter
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Filter} Filter
     */
    Filter.fromObject = function fromObject(object) {
        if (object instanceof $root.Filter)
            return object;
        let message = new $root.Filter();
        if (object.messageUuids) {
            if (!Array.isArray(object.messageUuids))
                throw TypeError(".Filter.messageUuids: array expected");
            message.messageUuids = [];
            for (let i = 0; i < object.messageUuids.length; ++i)
                message.messageUuids[i] = String(object.messageUuids[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Filter message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Filter
     * @static
     * @param {Filter} message Filter
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Filter.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.messageUuids = [];
        if (message.messageUuids && message.messageUuids.length) {
            object.messageUuids = [];
            for (let j = 0; j < message.messageUuids.length; ++j)
                object.messageUuids[j] = message.messageUuids[j];
        }
        return object;
    };

    /**
     * Converts this Filter to JSON.
     * @function toJSON
     * @memberof Filter
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Filter.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Filter
     * @function getTypeUrl
     * @memberof Filter
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Filter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Filter";
    };

    return Filter;
})();

export const Fetch = $root.Fetch = (() => {

    /**
     * Properties of a Fetch.
     * @name IFetch
     * @interface IFetch
     */

    /**
     * Constructs a new Fetch.
     * @name Fetch
     * @classdesc Represents a Fetch.
     * @implements IFetch
     * @constructor
     * @param {IFetch=} [properties] Properties to set
     */
    function Fetch(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Fetch instance using the specified properties.
     * @function create
     * @memberof Fetch
     * @static
     * @param {IFetch=} [properties] Properties to set
     * @returns {Fetch} Fetch instance
     */
    Fetch.create = function create(properties) {
        return new Fetch(properties);
    };

    /**
     * Encodes the specified Fetch message. Does not implicitly {@link Fetch.verify|verify} messages.
     * @function encode
     * @memberof Fetch
     * @static
     * @param {IFetch} message Fetch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fetch.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Fetch message, length delimited. Does not implicitly {@link Fetch.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Fetch
     * @static
     * @param {IFetch} message Fetch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fetch.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Fetch message from the specified reader or buffer.
     * @function decode
     * @memberof Fetch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Fetch} Fetch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fetch.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Fetch();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Fetch message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Fetch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Fetch} Fetch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fetch.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Fetch message.
     * @function verify
     * @memberof Fetch
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Fetch.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Fetch message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Fetch
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Fetch} Fetch
     */
    Fetch.fromObject = function fromObject(object) {
        if (object instanceof $root.Fetch)
            return object;
        return new $root.Fetch();
    };

    /**
     * Creates a plain object from a Fetch message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Fetch
     * @static
     * @param {Fetch} message Fetch
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Fetch.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Fetch to JSON.
     * @function toJSON
     * @memberof Fetch
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Fetch.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Fetch
     * @function getTypeUrl
     * @memberof Fetch
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Fetch.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Fetch";
    };

    return Fetch;
})();

export const Disconnect = $root.Disconnect = (() => {

    /**
     * Properties of a Disconnect.
     * @name IDisconnect
     * @interface IDisconnect
     */

    /**
     * Constructs a new Disconnect.
     * @name Disconnect
     * @classdesc Represents a Disconnect.
     * @implements IDisconnect
     * @constructor
     * @param {IDisconnect=} [properties] Properties to set
     */
    function Disconnect(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Disconnect instance using the specified properties.
     * @function create
     * @memberof Disconnect
     * @static
     * @param {IDisconnect=} [properties] Properties to set
     * @returns {Disconnect} Disconnect instance
     */
    Disconnect.create = function create(properties) {
        return new Disconnect(properties);
    };

    /**
     * Encodes the specified Disconnect message. Does not implicitly {@link Disconnect.verify|verify} messages.
     * @function encode
     * @memberof Disconnect
     * @static
     * @param {IDisconnect} message Disconnect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disconnect.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Disconnect.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Disconnect
     * @static
     * @param {IDisconnect} message Disconnect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Disconnect message from the specified reader or buffer.
     * @function decode
     * @memberof Disconnect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Disconnect} Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disconnect.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Disconnect();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Disconnect message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Disconnect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Disconnect} Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disconnect.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Disconnect message.
     * @function verify
     * @memberof Disconnect
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Disconnect.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Disconnect
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Disconnect} Disconnect
     */
    Disconnect.fromObject = function fromObject(object) {
        if (object instanceof $root.Disconnect)
            return object;
        return new $root.Disconnect();
    };

    /**
     * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Disconnect
     * @static
     * @param {Disconnect} message Disconnect
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Disconnect.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Disconnect to JSON.
     * @function toJSON
     * @memberof Disconnect
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Disconnect.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Disconnect
     * @function getTypeUrl
     * @memberof Disconnect
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Disconnect.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Disconnect";
    };

    return Disconnect;
})();

export const Connect = $root.Connect = (() => {

    /**
     * Properties of a Connect.
     * @name IConnect
     * @interface IConnect
     * @property {string|null} [ownMrn] Connect ownMrn
     * @property {string|null} [reconnectToken] Connect reconnectToken
     */

    /**
     * Constructs a new Connect.
     * @name Connect
     * @classdesc Represents a Connect.
     * @implements IConnect
     * @constructor
     * @param {IConnect=} [properties] Properties to set
     */
    function Connect(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Connect ownMrn.
     * @member {string|null|undefined} ownMrn
     * @memberof Connect
     * @instance
     */
    Connect.prototype.ownMrn = null;

    /**
     * Connect reconnectToken.
     * @member {string|null|undefined} reconnectToken
     * @memberof Connect
     * @instance
     */
    Connect.prototype.reconnectToken = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Connect _ownMrn.
     * @member {"ownMrn"|undefined} _ownMrn
     * @memberof Connect
     * @instance
     */
    Object.defineProperty(Connect.prototype, "_ownMrn", {
        get: $util.oneOfGetter($oneOfFields = ["ownMrn"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Connect _reconnectToken.
     * @member {"reconnectToken"|undefined} _reconnectToken
     * @memberof Connect
     * @instance
     */
    Object.defineProperty(Connect.prototype, "_reconnectToken", {
        get: $util.oneOfGetter($oneOfFields = ["reconnectToken"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Connect instance using the specified properties.
     * @function create
     * @memberof Connect
     * @static
     * @param {IConnect=} [properties] Properties to set
     * @returns {Connect} Connect instance
     */
    Connect.create = function create(properties) {
        return new Connect(properties);
    };

    /**
     * Encodes the specified Connect message. Does not implicitly {@link Connect.verify|verify} messages.
     * @function encode
     * @memberof Connect
     * @static
     * @param {IConnect} message Connect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Connect.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ownMrn != null && Object.hasOwnProperty.call(message, "ownMrn"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.ownMrn);
        if (message.reconnectToken != null && Object.hasOwnProperty.call(message, "reconnectToken"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.reconnectToken);
        return writer;
    };

    /**
     * Encodes the specified Connect message, length delimited. Does not implicitly {@link Connect.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Connect
     * @static
     * @param {IConnect} message Connect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Connect.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Connect message from the specified reader or buffer.
     * @function decode
     * @memberof Connect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Connect} Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Connect.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Connect();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.ownMrn = reader.string();
                    break;
                }
            case 2: {
                    message.reconnectToken = reader.string();
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
     * Decodes a Connect message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Connect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Connect} Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Connect.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Connect message.
     * @function verify
     * @memberof Connect
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Connect.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.ownMrn != null && message.hasOwnProperty("ownMrn")) {
            properties._ownMrn = 1;
            if (!$util.isString(message.ownMrn))
                return "ownMrn: string expected";
        }
        if (message.reconnectToken != null && message.hasOwnProperty("reconnectToken")) {
            properties._reconnectToken = 1;
            if (!$util.isString(message.reconnectToken))
                return "reconnectToken: string expected";
        }
        return null;
    };

    /**
     * Creates a Connect message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Connect
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Connect} Connect
     */
    Connect.fromObject = function fromObject(object) {
        if (object instanceof $root.Connect)
            return object;
        let message = new $root.Connect();
        if (object.ownMrn != null)
            message.ownMrn = String(object.ownMrn);
        if (object.reconnectToken != null)
            message.reconnectToken = String(object.reconnectToken);
        return message;
    };

    /**
     * Creates a plain object from a Connect message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Connect
     * @static
     * @param {Connect} message Connect
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Connect.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.ownMrn != null && message.hasOwnProperty("ownMrn")) {
            object.ownMrn = message.ownMrn;
            if (options.oneofs)
                object._ownMrn = "ownMrn";
        }
        if (message.reconnectToken != null && message.hasOwnProperty("reconnectToken")) {
            object.reconnectToken = message.reconnectToken;
            if (options.oneofs)
                object._reconnectToken = "reconnectToken";
        }
        return object;
    };

    /**
     * Converts this Connect to JSON.
     * @function toJSON
     * @memberof Connect
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Connect.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Connect
     * @function getTypeUrl
     * @memberof Connect
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Connect.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Connect";
    };

    return Connect;
})();

export const Notify = $root.Notify = (() => {

    /**
     * Properties of a Notify.
     * @name INotify
     * @interface INotify
     * @property {Array.<IMessageMetadata>|null} [messageMetadata] Notify messageMetadata
     */

    /**
     * Constructs a new Notify.
     * @name Notify
     * @classdesc Represents a Notify.
     * @implements INotify
     * @constructor
     * @param {INotify=} [properties] Properties to set
     */
    function Notify(properties) {
        this.messageMetadata = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Notify messageMetadata.
     * @member {Array.<IMessageMetadata>} messageMetadata
     * @memberof Notify
     * @instance
     */
    Notify.prototype.messageMetadata = $util.emptyArray;

    /**
     * Creates a new Notify instance using the specified properties.
     * @function create
     * @memberof Notify
     * @static
     * @param {INotify=} [properties] Properties to set
     * @returns {Notify} Notify instance
     */
    Notify.create = function create(properties) {
        return new Notify(properties);
    };

    /**
     * Encodes the specified Notify message. Does not implicitly {@link Notify.verify|verify} messages.
     * @function encode
     * @memberof Notify
     * @static
     * @param {INotify} message Notify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Notify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageMetadata != null && message.messageMetadata.length)
            for (let i = 0; i < message.messageMetadata.length; ++i)
                $root.MessageMetadata.encode(message.messageMetadata[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Notify message, length delimited. Does not implicitly {@link Notify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Notify
     * @static
     * @param {INotify} message Notify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Notify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Notify message from the specified reader or buffer.
     * @function decode
     * @memberof Notify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Notify} Notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Notify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Notify();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.messageMetadata && message.messageMetadata.length))
                        message.messageMetadata = [];
                    message.messageMetadata.push($root.MessageMetadata.decode(reader, reader.uint32()));
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
     * Decodes a Notify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Notify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Notify} Notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Notify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Notify message.
     * @function verify
     * @memberof Notify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Notify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageMetadata != null && message.hasOwnProperty("messageMetadata")) {
            if (!Array.isArray(message.messageMetadata))
                return "messageMetadata: array expected";
            for (let i = 0; i < message.messageMetadata.length; ++i) {
                let error = $root.MessageMetadata.verify(message.messageMetadata[i]);
                if (error)
                    return "messageMetadata." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Notify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Notify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Notify} Notify
     */
    Notify.fromObject = function fromObject(object) {
        if (object instanceof $root.Notify)
            return object;
        let message = new $root.Notify();
        if (object.messageMetadata) {
            if (!Array.isArray(object.messageMetadata))
                throw TypeError(".Notify.messageMetadata: array expected");
            message.messageMetadata = [];
            for (let i = 0; i < object.messageMetadata.length; ++i) {
                if (typeof object.messageMetadata[i] !== "object")
                    throw TypeError(".Notify.messageMetadata: object expected");
                message.messageMetadata[i] = $root.MessageMetadata.fromObject(object.messageMetadata[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Notify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Notify
     * @static
     * @param {Notify} message Notify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Notify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.messageMetadata = [];
        if (message.messageMetadata && message.messageMetadata.length) {
            object.messageMetadata = [];
            for (let j = 0; j < message.messageMetadata.length; ++j)
                object.messageMetadata[j] = $root.MessageMetadata.toObject(message.messageMetadata[j], options);
        }
        return object;
    };

    /**
     * Converts this Notify to JSON.
     * @function toJSON
     * @memberof Notify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Notify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Notify
     * @function getTypeUrl
     * @memberof Notify
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Notify.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Notify";
    };

    return Notify;
})();

export const ResponseMessage = $root.ResponseMessage = (() => {

    /**
     * Properties of a ResponseMessage.
     * @name IResponseMessage
     * @interface IResponseMessage
     * @property {string|null} [responseToUuid] ResponseMessage responseToUuid
     * @property {ResponseEnum|null} [response] ResponseMessage response
     * @property {string|null} [reasonText] ResponseMessage reasonText
     * @property {Array.<IMessageMetadata>|null} [messageMetadata] ResponseMessage messageMetadata
     * @property {Array.<IApplicationMessage>|null} [applicationMessages] ResponseMessage applicationMessages
     * @property {string|null} [reconnectToken] ResponseMessage reconnectToken
     */

    /**
     * Constructs a new ResponseMessage.
     * @name ResponseMessage
     * @classdesc Represents a ResponseMessage.
     * @implements IResponseMessage
     * @constructor
     * @param {IResponseMessage=} [properties] Properties to set
     */
    function ResponseMessage(properties) {
        this.messageMetadata = [];
        this.applicationMessages = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ResponseMessage responseToUuid.
     * @member {string} responseToUuid
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.responseToUuid = "";

    /**
     * ResponseMessage response.
     * @member {ResponseEnum} response
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.response = 0;

    /**
     * ResponseMessage reasonText.
     * @member {string|null|undefined} reasonText
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.reasonText = null;

    /**
     * ResponseMessage messageMetadata.
     * @member {Array.<IMessageMetadata>} messageMetadata
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.messageMetadata = $util.emptyArray;

    /**
     * ResponseMessage applicationMessages.
     * @member {Array.<IApplicationMessage>} applicationMessages
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.applicationMessages = $util.emptyArray;

    /**
     * ResponseMessage reconnectToken.
     * @member {string|null|undefined} reconnectToken
     * @memberof ResponseMessage
     * @instance
     */
    ResponseMessage.prototype.reconnectToken = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * ResponseMessage _reasonText.
     * @member {"reasonText"|undefined} _reasonText
     * @memberof ResponseMessage
     * @instance
     */
    Object.defineProperty(ResponseMessage.prototype, "_reasonText", {
        get: $util.oneOfGetter($oneOfFields = ["reasonText"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * ResponseMessage _reconnectToken.
     * @member {"reconnectToken"|undefined} _reconnectToken
     * @memberof ResponseMessage
     * @instance
     */
    Object.defineProperty(ResponseMessage.prototype, "_reconnectToken", {
        get: $util.oneOfGetter($oneOfFields = ["reconnectToken"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ResponseMessage instance using the specified properties.
     * @function create
     * @memberof ResponseMessage
     * @static
     * @param {IResponseMessage=} [properties] Properties to set
     * @returns {ResponseMessage} ResponseMessage instance
     */
    ResponseMessage.create = function create(properties) {
        return new ResponseMessage(properties);
    };

    /**
     * Encodes the specified ResponseMessage message. Does not implicitly {@link ResponseMessage.verify|verify} messages.
     * @function encode
     * @memberof ResponseMessage
     * @static
     * @param {IResponseMessage} message ResponseMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.responseToUuid != null && Object.hasOwnProperty.call(message, "responseToUuid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.responseToUuid);
        if (message.response != null && Object.hasOwnProperty.call(message, "response"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.response);
        if (message.reasonText != null && Object.hasOwnProperty.call(message, "reasonText"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.reasonText);
        if (message.messageMetadata != null && message.messageMetadata.length)
            for (let i = 0; i < message.messageMetadata.length; ++i)
                $root.MessageMetadata.encode(message.messageMetadata[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.applicationMessages != null && message.applicationMessages.length)
            for (let i = 0; i < message.applicationMessages.length; ++i)
                $root.ApplicationMessage.encode(message.applicationMessages[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.reconnectToken != null && Object.hasOwnProperty.call(message, "reconnectToken"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.reconnectToken);
        return writer;
    };

    /**
     * Encodes the specified ResponseMessage message, length delimited. Does not implicitly {@link ResponseMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ResponseMessage
     * @static
     * @param {IResponseMessage} message ResponseMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ResponseMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ResponseMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ResponseMessage} ResponseMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ResponseMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.responseToUuid = reader.string();
                    break;
                }
            case 2: {
                    message.response = reader.int32();
                    break;
                }
            case 3: {
                    message.reasonText = reader.string();
                    break;
                }
            case 4: {
                    if (!(message.messageMetadata && message.messageMetadata.length))
                        message.messageMetadata = [];
                    message.messageMetadata.push($root.MessageMetadata.decode(reader, reader.uint32()));
                    break;
                }
            case 5: {
                    if (!(message.applicationMessages && message.applicationMessages.length))
                        message.applicationMessages = [];
                    message.applicationMessages.push($root.ApplicationMessage.decode(reader, reader.uint32()));
                    break;
                }
            case 6: {
                    message.reconnectToken = reader.string();
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
     * Decodes a ResponseMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ResponseMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ResponseMessage} ResponseMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ResponseMessage message.
     * @function verify
     * @memberof ResponseMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ResponseMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.responseToUuid != null && message.hasOwnProperty("responseToUuid"))
            if (!$util.isString(message.responseToUuid))
                return "responseToUuid: string expected";
        if (message.response != null && message.hasOwnProperty("response"))
            switch (message.response) {
            default:
                return "response: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.reasonText != null && message.hasOwnProperty("reasonText")) {
            properties._reasonText = 1;
            if (!$util.isString(message.reasonText))
                return "reasonText: string expected";
        }
        if (message.messageMetadata != null && message.hasOwnProperty("messageMetadata")) {
            if (!Array.isArray(message.messageMetadata))
                return "messageMetadata: array expected";
            for (let i = 0; i < message.messageMetadata.length; ++i) {
                let error = $root.MessageMetadata.verify(message.messageMetadata[i]);
                if (error)
                    return "messageMetadata." + error;
            }
        }
        if (message.applicationMessages != null && message.hasOwnProperty("applicationMessages")) {
            if (!Array.isArray(message.applicationMessages))
                return "applicationMessages: array expected";
            for (let i = 0; i < message.applicationMessages.length; ++i) {
                let error = $root.ApplicationMessage.verify(message.applicationMessages[i]);
                if (error)
                    return "applicationMessages." + error;
            }
        }
        if (message.reconnectToken != null && message.hasOwnProperty("reconnectToken")) {
            properties._reconnectToken = 1;
            if (!$util.isString(message.reconnectToken))
                return "reconnectToken: string expected";
        }
        return null;
    };

    /**
     * Creates a ResponseMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ResponseMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ResponseMessage} ResponseMessage
     */
    ResponseMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ResponseMessage)
            return object;
        let message = new $root.ResponseMessage();
        if (object.responseToUuid != null)
            message.responseToUuid = String(object.responseToUuid);
        switch (object.response) {
        default:
            if (typeof object.response === "number") {
                message.response = object.response;
                break;
            }
            break;
        case "UNSPECIFIED_RESPONSE":
        case 0:
            message.response = 0;
            break;
        case "GOOD":
        case 1:
            message.response = 1;
            break;
        case "ERROR":
        case 2:
            message.response = 2;
            break;
        }
        if (object.reasonText != null)
            message.reasonText = String(object.reasonText);
        if (object.messageMetadata) {
            if (!Array.isArray(object.messageMetadata))
                throw TypeError(".ResponseMessage.messageMetadata: array expected");
            message.messageMetadata = [];
            for (let i = 0; i < object.messageMetadata.length; ++i) {
                if (typeof object.messageMetadata[i] !== "object")
                    throw TypeError(".ResponseMessage.messageMetadata: object expected");
                message.messageMetadata[i] = $root.MessageMetadata.fromObject(object.messageMetadata[i]);
            }
        }
        if (object.applicationMessages) {
            if (!Array.isArray(object.applicationMessages))
                throw TypeError(".ResponseMessage.applicationMessages: array expected");
            message.applicationMessages = [];
            for (let i = 0; i < object.applicationMessages.length; ++i) {
                if (typeof object.applicationMessages[i] !== "object")
                    throw TypeError(".ResponseMessage.applicationMessages: object expected");
                message.applicationMessages[i] = $root.ApplicationMessage.fromObject(object.applicationMessages[i]);
            }
        }
        if (object.reconnectToken != null)
            message.reconnectToken = String(object.reconnectToken);
        return message;
    };

    /**
     * Creates a plain object from a ResponseMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ResponseMessage
     * @static
     * @param {ResponseMessage} message ResponseMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ResponseMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.messageMetadata = [];
            object.applicationMessages = [];
        }
        if (options.defaults) {
            object.responseToUuid = "";
            object.response = options.enums === String ? "UNSPECIFIED_RESPONSE" : 0;
        }
        if (message.responseToUuid != null && message.hasOwnProperty("responseToUuid"))
            object.responseToUuid = message.responseToUuid;
        if (message.response != null && message.hasOwnProperty("response"))
            object.response = options.enums === String ? $root.ResponseEnum[message.response] === undefined ? message.response : $root.ResponseEnum[message.response] : message.response;
        if (message.reasonText != null && message.hasOwnProperty("reasonText")) {
            object.reasonText = message.reasonText;
            if (options.oneofs)
                object._reasonText = "reasonText";
        }
        if (message.messageMetadata && message.messageMetadata.length) {
            object.messageMetadata = [];
            for (let j = 0; j < message.messageMetadata.length; ++j)
                object.messageMetadata[j] = $root.MessageMetadata.toObject(message.messageMetadata[j], options);
        }
        if (message.applicationMessages && message.applicationMessages.length) {
            object.applicationMessages = [];
            for (let j = 0; j < message.applicationMessages.length; ++j)
                object.applicationMessages[j] = $root.ApplicationMessage.toObject(message.applicationMessages[j], options);
        }
        if (message.reconnectToken != null && message.hasOwnProperty("reconnectToken")) {
            object.reconnectToken = message.reconnectToken;
            if (options.oneofs)
                object._reconnectToken = "reconnectToken";
        }
        return object;
    };

    /**
     * Converts this ResponseMessage to JSON.
     * @function toJSON
     * @memberof ResponseMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ResponseMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ResponseMessage
     * @function getTypeUrl
     * @memberof ResponseMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ResponseMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ResponseMessage";
    };

    return ResponseMessage;
})();

/**
 * ResponseEnum enum.
 * @name ResponseEnum
 * @enum {number}
 * @property {number} UNSPECIFIED_RESPONSE=0 UNSPECIFIED_RESPONSE value
 * @property {number} GOOD=1 GOOD value
 * @property {number} ERROR=2 ERROR value
 */
export const ResponseEnum = $root.ResponseEnum = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNSPECIFIED_RESPONSE"] = 0;
    values[valuesById[1] = "GOOD"] = 1;
    values[valuesById[2] = "ERROR"] = 2;
    return values;
})();

export const MessageMetadata = $root.MessageMetadata = (() => {

    /**
     * Properties of a MessageMetadata.
     * @name IMessageMetadata
     * @interface IMessageMetadata
     * @property {string|null} [uuid] MessageMetadata uuid
     * @property {IApplicationMessageHeader|null} [header] MessageMetadata header
     */

    /**
     * Constructs a new MessageMetadata.
     * @name MessageMetadata
     * @classdesc Represents a MessageMetadata.
     * @implements IMessageMetadata
     * @constructor
     * @param {IMessageMetadata=} [properties] Properties to set
     */
    function MessageMetadata(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageMetadata uuid.
     * @member {string} uuid
     * @memberof MessageMetadata
     * @instance
     */
    MessageMetadata.prototype.uuid = "";

    /**
     * MessageMetadata header.
     * @member {IApplicationMessageHeader|null|undefined} header
     * @memberof MessageMetadata
     * @instance
     */
    MessageMetadata.prototype.header = null;

    /**
     * Creates a new MessageMetadata instance using the specified properties.
     * @function create
     * @memberof MessageMetadata
     * @static
     * @param {IMessageMetadata=} [properties] Properties to set
     * @returns {MessageMetadata} MessageMetadata instance
     */
    MessageMetadata.create = function create(properties) {
        return new MessageMetadata(properties);
    };

    /**
     * Encodes the specified MessageMetadata message. Does not implicitly {@link MessageMetadata.verify|verify} messages.
     * @function encode
     * @memberof MessageMetadata
     * @static
     * @param {IMessageMetadata} message MessageMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
            $root.ApplicationMessageHeader.encode(message.header, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MessageMetadata message, length delimited. Does not implicitly {@link MessageMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageMetadata
     * @static
     * @param {IMessageMetadata} message MessageMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof MessageMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageMetadata} MessageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageMetadata();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.uuid = reader.string();
                    break;
                }
            case 2: {
                    message.header = $root.ApplicationMessageHeader.decode(reader, reader.uint32());
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
     * Decodes a MessageMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageMetadata} MessageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageMetadata message.
     * @function verify
     * @memberof MessageMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            if (!$util.isString(message.uuid))
                return "uuid: string expected";
        if (message.header != null && message.hasOwnProperty("header")) {
            let error = $root.ApplicationMessageHeader.verify(message.header);
            if (error)
                return "header." + error;
        }
        return null;
    };

    /**
     * Creates a MessageMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageMetadata} MessageMetadata
     */
    MessageMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageMetadata)
            return object;
        let message = new $root.MessageMetadata();
        if (object.uuid != null)
            message.uuid = String(object.uuid);
        if (object.header != null) {
            if (typeof object.header !== "object")
                throw TypeError(".MessageMetadata.header: object expected");
            message.header = $root.ApplicationMessageHeader.fromObject(object.header);
        }
        return message;
    };

    /**
     * Creates a plain object from a MessageMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageMetadata
     * @static
     * @param {MessageMetadata} message MessageMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.uuid = "";
            object.header = null;
        }
        if (message.uuid != null && message.hasOwnProperty("uuid"))
            object.uuid = message.uuid;
        if (message.header != null && message.hasOwnProperty("header"))
            object.header = $root.ApplicationMessageHeader.toObject(message.header, options);
        return object;
    };

    /**
     * Converts this MessageMetadata to JSON.
     * @function toJSON
     * @memberof MessageMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MessageMetadata
     * @function getTypeUrl
     * @memberof MessageMetadata
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MessageMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MessageMetadata";
    };

    return MessageMetadata;
})();

export { $root as default };
