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
import { IdentityProviderAttribute } from './identity-provider-attribute';
 /**
 * Model object representing an organization
 *
 * @export
 * @interface Organization
 */
export interface Organization {

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof Organization
     */
    id?: number;

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof Organization
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof Organization
     */
    updatedAt?: Date;

    /**
     * The name of the organization
     *
     * @type {string}
     * @memberof Organization
     */
    name: string;

    /**
     * Maritime Connectivity Platform Maritime Resource Name
     *
     * @type {string}
     * @memberof Organization
     */
    mrn: string;

    /**
     * Subsidiary Maritime Resource Name
     *
     * @type {string}
     * @memberof Organization
     */
    mrnSubsidiary?: string;

    /**
     * URL of the MMS that the organization is registered with
     *
     * @type {string}
     * @memberof Organization
     */
    homeMMSUrl?: string;

    /**
     * The email of the organization
     *
     * @type {string}
     * @memberof Organization
     */
    email: string;

    /**
     * The URL of the organization's website
     *
     * @type {string}
     * @memberof Organization
     */
    url: string;

    /**
     * The address of the organization
     *
     * @type {string}
     * @memberof Organization
     */
    address: string;

    /**
     * The country that the organization is located in
     *
     * @type {string}
     * @memberof Organization
     */
    country: string;

    /**
     * Type of identity federation used by organization
     *
     * @type {string}
     * @memberof Organization
     */
    federationType?: OrganizationFederationTypeEnum;

    /**
     * The set of certificates of the organization. Cannot be created/updated by editing in the model. Use the dedicate create and revoke calls.
     *
     * @type {Array<Certificate>}
     * @memberof Organization
     */
    certificates?: Array<Certificate>;

    /**
     * The identity provider attributes of the organization
     *
     * @type {Array<IdentityProviderAttribute>}
     * @memberof Organization
     */
    identityProviderAttributes?: Array<IdentityProviderAttribute>;
}

/**
 * @export
 * @enum {string}
 */
export enum OrganizationFederationTypeEnum {
    TestIdp = 'test-idp',
    OwnIdp = 'own-idp',
    ExternalIdp = 'external-idp'
}
