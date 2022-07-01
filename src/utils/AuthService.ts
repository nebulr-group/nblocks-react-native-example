import { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//FIXME centralize models
export type UpdateUserProfileArgs = {firstName?: string, lastName?: string, phoneNumber?: string, consentsToPrivacyPolicy?: boolean};

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

    private static AUTH_TOKEN_KEY = "NBLOCKS_AUTH_TOKEN";
    private static TENANT_USER_ID_KEY = "NBLOCKS_TENANT_USER_ID";
    private static MFA_TOKEN_KEY = "NBLOCKS_TENANT_USER_ID";

    userAuthenticated: boolean;

    // private readonly _currentUserSource = new BehaviorSubject<CurrentUser>(new CurrentUser());
    // readonly currentUser$ = this._currentUserSource.asObservable();

    constructor(httpClient: AxiosInstance, debug: boolean) {
      this.debug = debug;
      this.httpClient = httpClient;
      this.userAuthenticated = false;
    }

    async checkCurrentUserAuthenticated(): Promise<boolean> {
      if (await AuthService.hasFullAuthContext())
        if (await this.authenticated())
          return true;

      return false
    } 

    async authenticate(username:string, password:string): Promise<{mfaState: 'DISABLED' | 'REQUIRED' | 'SETUP'}> {
        const response = await this.httpClient.post<{token: string, mfaState: 'DISABLED' | 'REQUIRED' | 'SETUP'}>(this.ENDPOINTS.authenticate, {username, password});
        if (!response.data.token)
            throw new Error("Wrong credentials");

        await AuthService.setAuthToken(response.data.token);

        return {mfaState: response.data.mfaState};
    }

    async authenticated(): Promise<boolean> {
      const response = await this.httpClient
        .get<{authenticated: boolean}>(this.ENDPOINTS.authenticated);
      return response.data.authenticated;
    }

    async listUsers(): Promise<any[]> {
      const response = await this.httpClient.get<any[]>(this.ENDPOINTS.tenantUsers);
      return response.data;
    }

    async currentUser(): Promise<any> {
      const response = await this.httpClient.get<any>(this.ENDPOINTS.currentUser);
      return response.data;
    }

    async updateCurrentUser(userProfile: UpdateUserProfileArgs): Promise<any> {
      const response = await this.httpClient.put<any>(this.ENDPOINTS.user, userProfile);
      return response.data;
    }

    static async hasFullAuthContext(): Promise<boolean> {
      return !!(await this.getAuthToken()) && !!(await this.getTenantUserId());
    }

    static async setAuthToken(token: string): Promise<void> {
      await AsyncStorage.setItem(this.AUTH_TOKEN_KEY, token);
    }

    static async setTenantUserId(userId: string): Promise<void> {
      await AsyncStorage.setItem(this.TENANT_USER_ID_KEY, userId);
    }

    static async getAuthToken(): Promise<string | null> {
      const data = AsyncStorage.getItem(this.AUTH_TOKEN_KEY);
      return data;
    }

    static async getTenantUserId(): Promise<string | null> {
      const data = await AsyncStorage.getItem(this.TENANT_USER_ID_KEY);
      return data;
    }

    static async clearAuthStorage(): Promise<void> {
      await Promise.all([
        AsyncStorage.removeItem(this.AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(this.TENANT_USER_ID_KEY),
        AsyncStorage.removeItem(this.MFA_TOKEN_KEY),
      ]);
    }
}