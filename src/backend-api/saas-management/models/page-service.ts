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
import { Service } from './service';
import { SortObject } from './sort-object';
 /**
 * 
 *
 * @export
 * @interface PageService
 */
export interface PageService {

    /**
     * @type {number}
     * @memberof PageService
     */
    totalPages?: number;

    /**
     * @type {number}
     * @memberof PageService
     */
    totalElements?: number;

    /**
     * @type {PageableObject}
     * @memberof PageService
     */
    pageable?: PageableObject;

    /**
     * @type {boolean}
     * @memberof PageService
     */
    first?: boolean;

    /**
     * @type {boolean}
     * @memberof PageService
     */
    last?: boolean;

    /**
     * @type {number}
     * @memberof PageService
     */
    size?: number;

    /**
     * @type {Array<Service>}
     * @memberof PageService
     */
    content?: Array<Service>;

    /**
     * @type {number}
     * @memberof PageService
     */
    number?: number;

    /**
     * @type {Array<SortObject>}
     * @memberof PageService
     */
    sort?: Array<SortObject>;

    /**
     * @type {number}
     * @memberof PageService
     */
    numberOfElements?: number;

    /**
     * @type {boolean}
     * @memberof PageService
     */
    empty?: boolean;
}
