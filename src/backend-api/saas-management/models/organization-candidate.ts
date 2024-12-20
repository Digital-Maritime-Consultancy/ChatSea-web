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

import { SubscriptionPlan } from './subscription-plan';
 /**
 * 
 *
 * @export
 * @interface OrganizationCandidate
 */
export interface OrganizationCandidate {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof OrganizationCandidate
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof OrganizationCandidate
     */
    updatedAt?: Date;

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof OrganizationCandidate
     */
    id?: number;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    mrn: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    name: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    email: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    phone?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    country?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    address?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    url?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    adminUserEmail?: string;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    adminUserName?: string;

    /**
     * @type {SubscriptionPlan}
     * @memberof OrganizationCandidate
     */
    subscriptionPlan?: SubscriptionPlan;

    /**
     * @type {string}
     * @memberof OrganizationCandidate
     */
    status: string;
}
