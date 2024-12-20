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
 * @interface UserDto
 */
export interface UserDto {

    /**
     * @type {string}
     * @memberof UserDto
     */
    organizationId?: string;

    /**
     * @type {string}
     * @memberof UserDto
     */
    mrn: string;

    /**
     * @type {string}
     * @memberof UserDto
     */
    email: string;

    /**
     * @type {string}
     * @memberof UserDto
     */
    username: string;

    /**
     * @type {string}
     * @memberof UserDto
     */
    role: string;
}
