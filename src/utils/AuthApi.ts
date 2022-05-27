import axios, { AxiosError, AxiosInstance } from 'axios';
import { ForbiddenError } from './errors/ForbiddenError';
import { UnauthenticatedError } from './errors/UnauthenticatedError';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthApi {

    private readonly ENDPOINTS = {
        authenticate: "/auth-proxy/authenticate",
        authenticated: "/auth-proxy/authenticated",
        tenantUsers: "/auth-proxy/tenantUsers",
        currentUser: "/auth/currentUser",
        password: "/auth-proxy/password",
        user: "/auth-proxy/user",
        socialLogin: "/social-login",
        commitMfaCode: "/auth-proxy/commitMfaCode",
        startMfaUserSetup: "/auth-proxy/startMfaUserSetup",
        finishMfaUserSetup: "/auth-proxy/finishMfaUserSetup",
        resetUserMfaSetup: "/auth-proxy/resetUserMfaSetup"
    }

    private readonly BASE_URL = "http://192.168.2.22:3300";
    private readonly httpClient: AxiosInstance;
    private readonly debug = true;

    private authTokenKey = "NBLOCKS_AUTH_TOKEN";
    private tenantUserIdKey = "NBLOCKS_TENANT_USER_ID";

    constructor() {
        this.httpClient = axios.create({
            baseURL: this.BASE_URL,
        });
        this._configureHttpClient(this.httpClient);
    }

    async authenticate(username:string, password:string): Promise<{mfaState: 'DISABLED' | 'REQUIRED' | 'SETUP'}> {
        const response = await this.httpClient.post<{token: string, mfaState: 'DISABLED' | 'REQUIRED' | 'SETUP'}>(this.ENDPOINTS.authenticate, {username, password});
        if (!response.data.token)
            throw new Error("Wrong credentials");

        await AsyncStorage.setItem(this.authTokenKey, response.data.token);

        return {mfaState: response.data.mfaState};
    }

    async listUsers(): Promise<any[]> {
      const response = await this.httpClient.get<any[]>(this.ENDPOINTS.tenantUsers);
      return response.data;
    }

    async currentUser(): Promise<any> {
      const response = await this.httpClient.get<any>(this.ENDPOINTS.currentUser);
      return response.data;
    }

    async setUser(userId: string): Promise<void> {
      await AsyncStorage.setItem(this.tenantUserIdKey, userId);
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