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
import { Service } from './service';
 /**
 * 
 *
 * @export
 * @interface ServiceSubscription
 */
export interface ServiceSubscription {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof ServiceSubscription
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof ServiceSubscription
     */
    updatedAt?: Date;

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof ServiceSubscription
     */
    id?: number;

    /**
     * @type {Service}
     * @memberof ServiceSubscription
     */
    service?: Service;

    /**
     * @type {Organization}
     * @memberof ServiceSubscription
     */
    organization: Organization;

    /**
     * @type {string}
     * @memberof ServiceSubscription
     */
    startDate: string;

    /**
     * @type {string}
     * @memberof ServiceSubscription
     */
    endDate?: string;

    /**
     * @type {boolean}
     * @memberof ServiceSubscription
     */
    isActive?: boolean;

    /**
     * @type {string}
     * @memberof ServiceSubscription
     */
    pricingModel: string;
}
