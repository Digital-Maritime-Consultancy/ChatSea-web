/* tslint:disable */
/* eslint-disable */
/**
 * Maritime Connectivity Platform Identity Registry API
 * The MCP Identity Registry API can be used for managing entities in the Maritime Connectivity Platform.<br>Two versions of the API are available - one that requires authentication using OpenID Connect and one that requires authentication using a X.509 client certificate.<br>The OpenAPI descriptions for the two versions are available <a href=\"https://api.aivn.kr/v3/api-docs/mcp-idreg-oidc\">here</a> and <a href=\"https://api-x509.aivn.kr/v3/api-docs/mcp-idreg-x509\">here</a>.
 *
 * OpenAPI spec version: 1.2.1
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { OrgMrnLogoBody } from '../models';
import { OrgMrnLogoBody1 } from '../models';
import { OrgMrnLogoBody2 } from '../models';
import { OrgMrnLogoBody3 } from '../models';
/**
 * LogoControllerApi - axios parameter creator
 * @export
 */
export const LogoControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLogoPost: async (orgMrn: string, body?: OrgMrnLogoBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling createLogoPost.');
            }
            const localVarPath = `/oidc/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'image/png';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody2} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLogoPost1: async (orgMrn: string, body?: OrgMrnLogoBody2, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling createLogoPost1.');
            }
            const localVarPath = `/x509/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'image/png';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLogo: async (orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling deleteLogo.');
            }
            const localVarPath = `/oidc/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLogo1: async (orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling deleteLogo1.');
            }
            const localVarPath = `/x509/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogo: async (orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling getLogo.');
            }
            const localVarPath = `/oidc/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogo1: async (orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling getLogo1.');
            }
            const localVarPath = `/x509/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLogoPut: async (body: Array<string>, orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateLogoPut.');
            }
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling updateLogoPut.');
            }
            const localVarPath = `/oidc/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'image/png';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLogoPut1: async (body: Array<string>, orgMrn: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateLogoPut1.');
            }
            // verify required parameter 'orgMrn' is not null or undefined
            if (orgMrn === null || orgMrn === undefined) {
                throw new RequiredError('orgMrn','Required parameter orgMrn was null or undefined when calling updateLogoPut1.');
            }
            const localVarPath = `/x509/api/org/{orgMrn}/logo`
                .replace(`{${"orgMrn"}}`, encodeURIComponent(String(orgMrn)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'image/png';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers! = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LogoControllerApi - functional programming interface
 * @export
 */
export const LogoControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).createLogoPost(orgMrn, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody2} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLogoPost1(orgMrn: string, body?: OrgMrnLogoBody2, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).createLogoPost1(orgMrn, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLogo(orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).deleteLogo(orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLogo1(orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).deleteLogo1(orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogo(orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).getLogo(orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogo1(orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).getLogo1(orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLogoPut(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).updateLogoPut(body, orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLogoPut1(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await LogoControllerApiAxiosParamCreator(configuration).updateLogoPut1(body, orgMrn, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LogoControllerApi - factory interface
 * @export
 */
export const LogoControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).createLogoPost(orgMrn, body, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new organization logo using POST
         * @param {string} orgMrn 
         * @param {OrgMrnLogoBody2} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLogoPost1(orgMrn: string, body?: OrgMrnLogoBody2, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).createLogoPost1(orgMrn, body, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLogo(orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).deleteLogo(orgMrn, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an organization logo
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLogo1(orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).deleteLogo1(orgMrn, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogo(orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).getLogo(orgMrn, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the logo of the given organization
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogo1(orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).getLogo1(orgMrn, options).then((request) => request(axios, basePath));
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLogoPut(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).updateLogoPut(body, orgMrn, options).then((request) => request(axios, basePath));
        },
        /**
         * Update an existing organization logo or create it if none already exists
         * @param {Array<string>} body 
         * @param {string} orgMrn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLogoPut1(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return LogoControllerApiFp(configuration).updateLogoPut1(body, orgMrn, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LogoControllerApi - object-oriented interface
 * @export
 * @class LogoControllerApi
 * @extends {BaseAPI}
 */
export class LogoControllerApi extends BaseAPI {
    /**
     * Create a new organization logo using POST
     * @param {string} orgMrn 
     * @param {OrgMrnLogoBody} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async createLogoPost(orgMrn: string, body?: OrgMrnLogoBody, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).createLogoPost(orgMrn, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Create a new organization logo using POST
     * @param {string} orgMrn 
     * @param {OrgMrnLogoBody2} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async createLogoPost1(orgMrn: string, body?: OrgMrnLogoBody2, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).createLogoPost1(orgMrn, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an organization logo
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async deleteLogo(orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).deleteLogo(orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an organization logo
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async deleteLogo1(orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).deleteLogo1(orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get the logo of the given organization
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async getLogo(orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).getLogo(orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get the logo of the given organization
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async getLogo1(orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).getLogo1(orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update an existing organization logo or create it if none already exists
     * @param {Array<string>} body 
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async updateLogoPut(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).updateLogoPut(body, orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update an existing organization logo or create it if none already exists
     * @param {Array<string>} body 
     * @param {string} orgMrn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoControllerApi
     */
    public async updateLogoPut1(body: Array<string>, orgMrn: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return LogoControllerApiFp(this.configuration).updateLogoPut1(body, orgMrn, options).then((request) => request(this.axios, this.basePath));
    }
}
