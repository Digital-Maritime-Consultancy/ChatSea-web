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
 * @interface SubscriptionPlanDto
 */
export interface SubscriptionPlanDto {

    /**
     * @type {string}
     * @memberof SubscriptionPlanDto
     */
    name: string;

    /**
     * @type {string}
     * @memberof SubscriptionPlanDto
     */
    description?: string;

    /**
     * @type {number}
     * @memberof SubscriptionPlanDto
     */
    monthlyCost: number;

    /**
     * @type {number}
     * @memberof SubscriptionPlanDto
     */
    annualCost?: number;

    /**
     * @type {string}
     * @memberof SubscriptionPlanDto
     */
    currency: string;

    /**
     * @type {number}
     * @memberof SubscriptionPlanDto
     */
    maxUsers?: number;

    /**
     * @type {boolean}
     * @memberof SubscriptionPlanDto
     */
    isActive?: boolean;

    /**
     * @type {number}
     * @memberof SubscriptionPlanDto
     */
    usageLimit?: number;
}
