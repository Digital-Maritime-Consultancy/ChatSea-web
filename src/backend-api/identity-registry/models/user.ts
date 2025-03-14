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

import { Certificate } from './certificate';
 /**
 * Model object representing a user
 *
 * @export
 * @interface User
 */
export interface User {

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof User
     */
    id?: number;

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof User
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof User
     */
    updatedAt?: Date;

    /**
     * The ID of the organization that the entity belongs to
     *
     * @type {number}
     * @memberof User
     */
    idOrganization?: number;

    /**
     * Maritime Connectivity Platform Maritime Resource Name
     *
     * @type {string}
     * @memberof User
     */
    mrn: string;

    /**
     * Subsidiary Maritime Resource Name
     *
     * @type {string}
     * @memberof User
     */
    mrnSubsidiary?: string;

    /**
     * URL of MMS that the identity is registered
     *
     * @type {string}
     * @memberof User
     */
    homeMMSUrl?: string;

    /**
     * Permissions as assigned from the organization
     *
     * @type {string}
     * @memberof User
     */
    permissions?: string;

    /**
     * The first name of the user
     *
     * @type {string}
     * @memberof User
     */
    firstName: string;

    /**
     * The last name of the user
     *
     * @type {string}
     * @memberof User
     */
    lastName: string;

    /**
     * The email of the user
     *
     * @type {string}
     * @memberof User
     */
    email: string;

    /**
     * The set of certificates of the user. Cannot be created/updated by editing in the model. Use the dedicated create and revoke calls.
     *
     * @type {Array<Certificate>}
     * @memberof User
     */
    certificates?: Array<Certificate>;
}
