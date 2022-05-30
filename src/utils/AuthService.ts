import { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {

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

    private readonly httpClient: AxiosInstance;
    private readonly debug: boolean;

    private authTokenKey = "NBLOCKS_AUTH_TOKEN";
    private tenantUserIdKey = "NBLOCKS_TENANT_USER_ID";

    constructor(httpClient: AxiosInstance, debug: boolean) {
      this.debug = debug;
      this.httpClient = httpClient;
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

}