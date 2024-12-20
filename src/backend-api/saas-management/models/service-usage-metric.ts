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

import { Service } from './service';
 /**
 * 
 *
 * @export
 * @interface ServiceUsageMetric
 */
export interface ServiceUsageMetric {

    /**
     * The time that the entity was created
     *
     * @type {Date}
     * @memberof ServiceUsageMetric
     */
    createdAt?: Date;

    /**
     * The time that the entity was last updated
     *
     * @type {Date}
     * @memberof ServiceUsageMetric
     */
    updatedAt?: Date;

    /**
     * The ID of the entity in the form of a sequential integer
     *
     * @type {number}
     * @memberof ServiceUsageMetric
     */
    id?: number;

    /**
     * @type {Service}
     * @memberof ServiceUsageMetric
     */
    service?: Service;

    /**
     * @type {string}
     * @memberof ServiceUsageMetric
     */
    metricName: string;

    /**
     * @type {string}
     * @memberof ServiceUsageMetric
     */
    description?: string;

    /**
     * @type {string}
     * @memberof ServiceUsageMetric
     */
    unit: string;
}
