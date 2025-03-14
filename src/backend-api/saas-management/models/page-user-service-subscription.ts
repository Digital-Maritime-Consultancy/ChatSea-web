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
import { UserServiceSubscription } from './user-service-subscription';
 /**
 * 
 *
 * @export
 * @interface PageUserServiceSubscription
 */
export interface PageUserServiceSubscription {

    /**
     * @type {number}
     * @memberof PageUserServiceSubscription
     */
    totalPages?: number;

    /**
     * @type {number}
     * @memberof PageUserServiceSubscription
     */
    totalElements?: number;

    /**
     * @type {PageableObject}
     * @memberof PageUserServiceSubscription
     */
    pageable?: PageableObject;

    /**
     * @type {boolean}
     * @memberof PageUserServiceSubscription
     */
    first?: boolean;

    /**
     * @type {boolean}
     * @memberof PageUserServiceSubscription
     */
    last?: boolean;

    /**
     * @type {number}
     * @memberof PageUserServiceSubscription
     */
    size?: number;

    /**
     * @type {Array<UserServiceSubscription>}
     * @memberof PageUserServiceSubscription
     */
    content?: Array<UserServiceSubscription>;

    /**
     * @type {number}
     * @memberof PageUserServiceSubscription
     */
    number?: number;

    /**
     * @type {Array<SortObject>}
     * @memberof PageUserServiceSubscription
     */
    sort?: Array<SortObject>;

    /**
     * @type {number}
     * @memberof PageUserServiceSubscription
     */
    numberOfElements?: number;

    /**
     * @type {boolean}
     * @memberof PageUserServiceSubscription
     */
    empty?: boolean;
}
