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

import { Organization } from './organization';
import { SubscriptionPlan } from './subscription-plan';
 /**
 * Model object representing an organization subscription
 *
 * @export
 * @interface OrganizationSubscription
 */
export interface OrganizationSubscription {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof OrganizationSubscription
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof OrganizationSubscription
     */
    updatedAt?: Date;

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof OrganizationSubscription
     */
    id?: number;

    /**
     * @type {Organization}
     * @memberof OrganizationSubscription
     */
    organization: Organization;

    /**
     * @type {SubscriptionPlan}
     * @memberof OrganizationSubscription
     */
    subscriptionPlan: SubscriptionPlan;

    /**
     * @type {string}
     * @memberof OrganizationSubscription
     */
    startDate: string;

    /**
     * @type {string}
     * @memberof OrganizationSubscription
     */
    endDate: string;

    /**
     * @type {string}
     * @memberof OrganizationSubscription
     */
    status: string;
}
