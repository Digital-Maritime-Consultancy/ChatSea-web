/* tslint:disable */
/* eslint-disable */
/**
 * Maritime Connectivity Platform Identity Registry API
 * The MCP Identity Registry API can be used for managing entities in the Maritime Connectivity Platform.<br>Two versions of the API are available - one that requires authentication using OpenID Connect and one that requires authentication using a X.509 client certificate.<br>The OpenAPI descriptions for the two versions are available <a href=\"https://api.aivn.kr/v3/api-docs/mcp-idreg-oidc\">here</a> and <a href=\"https://api-x509.aivn.kr/v3/api-docs/mcp-idreg-x509\">here</a>.
 *
 * OpenAPI spec version: 1.2.1
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * Model object representing a certificate
 *
 * @export
 * @interface Certificate
 */
export interface Certificate {

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof Certificate
     */
    id?: number;

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof Certificate
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof Certificate
     */
    updatedAt?: Date;

    /**
     * The certificate in PEM format
     *
     * @type {string}
     * @memberof Certificate
     */
    certificate?: string;

    /**
     * When the certificate is valid from
     *
     * @type {Date}
     * @memberof Certificate
     */
    start?: Date;

    /**
     * When the certificate is valid until
     *
     * @type {Date}
     * @memberof Certificate
     */
    end?: Date;

    /**
     * The serial number of the certificate
     *
     * @type {number}
     * @memberof Certificate
     */
    serialNumber?: number;

    /**
     * The base64 encoded SHA-256 thumbprint of the certificate
     *
     * @type {string}
     * @memberof Certificate
     */
    thumbprint?: string;

    /**
     * Whether the certificate has been revoked
     *
     * @type {boolean}
     * @memberof Certificate
     */
    revoked?: boolean;

    /**
     * The time of revocation of the certificate
     *
     * @type {Date}
     * @memberof Certificate
     */
    revokedAt?: Date;

    /**
     * The revocation reason
     *
     * @type {string}
     * @memberof Certificate
     */
    revokeReason?: string;
}