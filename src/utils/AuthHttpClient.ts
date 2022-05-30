import axios, { AxiosError, AxiosInstance } from 'axios';
import { ForbiddenError } from './errors/ForbiddenError';
import { UnauthenticatedError } from './errors/UnauthenticatedError';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthHttpClient {

  readonly httpClient: AxiosInstance;

    private readonly BASE_URL: string;
    private readonly debug: boolean;

    private authTokenKey = "NBLOCKS_AUTH_TOKEN";
    private tenantUserIdKey = "NBLOCKS_TENANT_USER_ID";

    constructor(baseUrl: string, debug: boolean) {
      this.BASE_URL = baseUrl;
      this.debug = debug;

      this.httpClient = axios.create({
          baseURL: this.BASE_URL,
      });
      this._configureHttpClient(this.httpClient);
    }

    private _configureHttpClient(httpClient: AxiosInstance): void {
        const debug = this.debug;

        httpClient.interceptors.request.use(async (request) => {
          const [authToken, tenantUserId] = await Promise.all([
            AsyncStorage.getItem(this.authTokenKey),
            AsyncStorage.getItem(this.tenantUserIdKey)
          ]);

          if (authToken !== null) {
            if (request.headers)
              request.headers['x-auth-token'] = authToken;
          }

          if (tenantUserId !== null) {
            if (request.headers)
              request.headers['x-tenant-user-id'] = tenantUserId;
          }

          if (this.debug) {
            console.log(`${request.method?.toUpperCase()} ${request.baseURL}/${request.url}`, "Headers", JSON.stringify(request.headers));
            console.log("Body:", request.data);
          }
          return request;
        });

        httpClient.interceptors.response.use(function (response) {
          if (debug) {
            console.log("Response:", response.status, response.data);
          }
          return response;
        }, function (error: AxiosError) {
          
          if (debug) {
            console.error("Error response:", `${error.name} - Http status: ${error.response?.status}`, error.response?.data);
          }
    
          if (!error.response)
            return Promise.reject(error);
    
          let customError: Error;
          switch (error.response.status) {
            case 401:
              customError = new UnauthenticatedError(error.response.data as {message: string, error: string});
              break;
    
            case 403:
              customError = new ForbiddenError(error.response.data as {message: string, error: string});
              break;
          
            default:
              customError = new Error(error.response.data as string);
              break;
          }
          return Promise.reject(customError);
        });
      }

}