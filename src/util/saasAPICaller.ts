import { Configuration, MyUserControllerApi, OrganizationRequestControllerApi, OrganizationServiceUsage } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import Keycloak from 'keycloak-js';
import { convertToDateString } from "./timeConverter";

const createApiConfig = (token: string): Configuration => ({
  basePath: BASE_PATH,
  baseOptions: {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  },
});

const refreshTokenAndRetry = async <T>(
  keycloak: Keycloak,
  apiCall: (config: Configuration) => Promise<T>
): Promise<T> => {
  try {
    // Refresh the token
    await keycloak?.updateToken(30); // Refresh if token expires within 30 seconds
    console.log('Token refreshed successfully');

    // Update API configuration with the new token
    const apiConfig = createApiConfig(keycloak.token!);

    // Retry the API call with the new token
    return await apiCall(apiConfig);
  } catch (refreshError) {
    console.error('Failed to refresh token:', refreshError);
    throw refreshError; // Handle this based on your app's requirements
  }
};

const makeApiCall = async <T>(
  keycloak: Keycloak,
  token: string,
  apiCall: (config: Configuration) => Promise<T>
): Promise<T> => {
  const apiConfig = createApiConfig(token);

  try {
    // Make the initial API request
    return await apiCall(apiConfig);
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Handle 401 error by refreshing the token and retrying
      console.warn('401 error detected, attempting token refresh...');
      return refreshTokenAndRetry(keycloak, apiCall);
    } else {
      console.error('API call failed:', error);
      throw error; // Rethrow the error to handle elsewhere
    }
  }
};

export const fetchPossibleSubscriptions = async (keycloak: Keycloak, token: string) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).getMyPossibleSubscriptions();
  return makeApiCall(keycloak, token, apiCall);
};

export const fetchActiveSubscriptions = async (keycloak: Keycloak, token: string) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).getMyActiveSubscriptions();
  return makeApiCall(keycloak, token, apiCall);
};

export const getAllActiveServices = async (keycloak: Keycloak, token: string): Promise<any> => {
  const apiCall = (config: Configuration) => new OrganizationRequestControllerApi(config).getServices1();
  return makeApiCall(keycloak, token, apiCall);
};

export const reportUsage = async (keycloak: Keycloak, token: string, serviceId: number, usageAmount: number, usageCost: number) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).registerServiceUsage({ serviceId, usageAmount, usageCost });
  return makeApiCall(keycloak, token, apiCall);
};

export const activateServiceSubscription = async (keycloak: Keycloak, token: string, subscriptionId: number) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).activateSubscription(subscriptionId);
  return makeApiCall(keycloak, token, apiCall);
}

export const deactivateServiceSubscription = async (keycloak: Keycloak, token: string, subscriptionId: number) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).deactivateSubscription(subscriptionId);
  return makeApiCall(keycloak, token, apiCall);
}

export const canIUseService = async (keycloak: Keycloak, token: string, predictedCost: number) => {
  const apiCall = (config: Configuration) => new MyUserControllerApi(config).canUseService(predictedCost);
  return makeApiCall(keycloak, token, apiCall);
}
