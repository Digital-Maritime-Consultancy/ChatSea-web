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
 * @interface OrganizationDto
 */
export interface OrganizationDto {

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    phone?: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    mrn: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    name: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    email: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    country?: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    address?: string;

    /**
     * @type {string}
     * @memberof OrganizationDto
     */
    status?: string;

    /**
     * @type {number}
     * @memberof OrganizationDto
     */
    currentBalance?: number;
}
