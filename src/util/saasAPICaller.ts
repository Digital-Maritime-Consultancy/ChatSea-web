import { Configuration, MyUserControllerApi, UserManagementControllerApi } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import Keycloak from 'keycloak-js'

const refreshTokenAndRetry = async <T>(
    keycloak: Keycloak,
    token: string,
    apiCall: (config: Configuration) => Promise<T>
  ): Promise<T> => {
    try {
      // Refresh the token
      await keycloak?.updateToken(30); // Refresh if token expires within 30 seconds
      console.log('Token refreshed successfully');
  
      // Update API configuration with the new token
      const apiConfig: Configuration = {
        basePath: BASE_PATH,
        baseOptions: {
          headers: {
            'Authorization': `Bearer ${keycloak.token}`,
          },
        },
      };
  
      // Retry the API call with the new token
      const response = await apiCall(apiConfig);
      return response;
    } catch (refreshError) {
      console.error('Failed to refresh token:', refreshError);
      throw refreshError; // Handle this based on your app's requirements
    }
  };
  
  export const fetchUserServiceSubscriptions = async (keycloak: Keycloak, token: string, orgMrn:string, mrn:string) => {
    const apiConfig: Configuration = {
      basePath: BASE_PATH,
      baseOptions: {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    };
    const userController = new UserManagementControllerApi(apiConfig);

    const apiCall = (config: Configuration) => userController.getUserServiceSubscriptions(orgMrn, mrn);

    try {  
      // Make the initial API request
      const response = await apiCall(apiConfig);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Handle 401 error by refreshing the token and retrying
        console.warn('401 error detected, attempting token refresh...');
        return refreshTokenAndRetry(keycloak, token, apiCall);
      } else {
        console.error('Failed to fetch user service subscriptions:', error);
        throw error; // Rethrow the error to handle elsewhere
      }
    }
  };


  export const reportUsage = async (keycloak: Keycloak, token: string, serviceId: number, usageAmount: number) => {
    const apiConfig: Configuration = {
      basePath: BASE_PATH,
      baseOptions: {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    };
    const userController = new MyUserControllerApi(apiConfig);

    const apiCall = (config: Configuration) => userController.registerServiceUsage({ serviceId, usageAmount });

    try {  
      // Make the initial API request
      const response = await apiCall(apiConfig);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Handle 401 error by refreshing the token and retrying
        console.warn('401 error detected, attempting token refresh...');
        return refreshTokenAndRetry(keycloak, token, apiCall);
      } else {
        console.error('Failed to fetch user service subscriptions:', error);
        throw error; // Rethrow the error to handle elsewhere
      }
    }
  };