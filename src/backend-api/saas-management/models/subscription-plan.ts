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
 * Model object representing an subscription plan
 *
 * @export
 * @interface SubscriptionPlan
 */
export interface SubscriptionPlan {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof SubscriptionPlan
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof SubscriptionPlan
     */
    updatedAt?: Date;

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof SubscriptionPlan
     */
    id?: number;

    /**
     * @type {string}
     * @memberof SubscriptionPlan
     */
    name: string;

    /**
     * @type {string}
     * @memberof SubscriptionPlan
     */
    description?: string;

    /**
     * @type {number}
     * @memberof SubscriptionPlan
     */
    monthlyCost: number;

    /**
     * @type {number}
     * @memberof SubscriptionPlan
     */
    annualCost?: number;

    /**
     * @type {string}
     * @memberof SubscriptionPlan
     */
    currency: string;

    /**
     * @type {number}
     * @memberof SubscriptionPlan
     */
    maxUsers?: number;

    /**
     * @type {boolean}
     * @memberof SubscriptionPlan
     */
    isActive?: boolean;

    /**
     * @type {number}
     * @memberof SubscriptionPlan
     */
    usageLimit: number;
}
