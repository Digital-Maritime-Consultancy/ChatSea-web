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

import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { SubscriptionPlan } from './subscription-plan';
 /**
 * 
 *
 * @export
 * @interface PageSubscriptionPlan
 */
export interface PageSubscriptionPlan {

    /**
     * @type {number}
     * @memberof PageSubscriptionPlan
     */
    totalPages?: number;

    /**
     * @type {number}
     * @memberof PageSubscriptionPlan
     */
    totalElements?: number;

    /**
     * @type {PageableObject}
     * @memberof PageSubscriptionPlan
     */
    pageable?: PageableObject;

    /**
     * @type {boolean}
     * @memberof PageSubscriptionPlan
     */
    first?: boolean;

    /**
     * @type {boolean}
     * @memberof PageSubscriptionPlan
     */
    last?: boolean;

    /**
     * @type {number}
     * @memberof PageSubscriptionPlan
     */
    size?: number;

    /**
     * @type {Array<SubscriptionPlan>}
     * @memberof PageSubscriptionPlan
     */
    content?: Array<SubscriptionPlan>;

    /**
     * @type {number}
     * @memberof PageSubscriptionPlan
     */
    number?: number;

    /**
     * @type {Array<SortObject>}
     * @memberof PageSubscriptionPlan
     */
    sort?: Array<SortObject>;

    /**
     * @type {number}
     * @memberof PageSubscriptionPlan
     */
    numberOfElements?: number;

    /**
     * @type {boolean}
     * @memberof PageSubscriptionPlan
     */
    empty?: boolean;
}
