/* tslint:disable */
/* eslint-disable */
/**
 * SaaS Management Service
 * Management Service for SaaS infrastructure
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface PaymentMethodDto
 */
export interface PaymentMethodDto {

    /**
     * @type {string}
     * @memberof PaymentMethodDto
     */
    type: string;

    /**
     * @type {{ [key: string]: any; }}
     * @memberof PaymentMethodDto
     */
    details: { [key: string]: any; };

    /**
     * @type {boolean}
     * @memberof PaymentMethodDto
     */
    isDefault?: boolean;
}