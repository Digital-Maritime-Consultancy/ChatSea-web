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
 * @interface OrganizationCandidateDto
 */
export interface OrganizationCandidateDto {

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    mrn: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    name: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    email: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    phone?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    country?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    address?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    url?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    adminUserEmail?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    adminUserName?: string;

    /**
     * @type {number}
     * @memberof OrganizationCandidateDto
     */
    subscriptionPlanId?: number;

    /**
     * @type {string}
     * @memberof OrganizationCandidateDto
     */
    status: string;
}
