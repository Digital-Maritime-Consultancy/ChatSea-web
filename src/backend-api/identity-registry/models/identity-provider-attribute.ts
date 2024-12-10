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
 * Model object representing an identity provider attribute
 *
 * @export
 * @interface IdentityProviderAttribute
 */
export interface IdentityProviderAttribute {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof IdentityProviderAttribute
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof IdentityProviderAttribute
     */
    updatedAt?: Date;

    /**
     * OpenId Connect or SAML2 attribute name
     *
     * @type {string}
     * @memberof IdentityProviderAttribute
     */
    attributeName: IdentityProviderAttributeAttributeNameEnum;

    /**
     * OpenId Connect or SAML2 attribute value
     *
     * @type {string}
     * @memberof IdentityProviderAttribute
     */
    attributeValue: string;
}

/**
 * @export
 * @enum {string}
 */
export enum IdentityProviderAttributeAttributeNameEnum {
    ImportUrlValidateSignatureSigningCertificateSingleLogoutServiceUrlPostBindingResponsePostBindingAuthnRequestSingleSignOnServiceUrlWantAuthnRequestsSignedUserInfoUrlTokenUrlAuthorizationUrlLogoutUrlIssuerPublicKeySignatureVerifierClientIdClientSecretproviderTypeFirstNameAttrLastNameAttrEmailAttrUsernameAttrPermissionsAttr = 'importUrl, validateSignature, signingCertificate, singleLogoutServiceUrl, postBindingResponse, postBindingAuthnRequest, singleSignOnServiceUrl, wantAuthnRequestsSigned, userInfoUrl, tokenUrl, authorizationUrl, logoutUrl, issuer, publicKeySignatureVerifier, clientId, clientSecret,providerType, firstNameAttr, lastNameAttr, emailAttr, usernameAttr, permissionsAttr'
}

