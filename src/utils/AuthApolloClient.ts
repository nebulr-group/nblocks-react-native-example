import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export class AuthApolloClient {

    readonly client: ApolloClient<NormalizedCacheObject>;

    private readonly debug: boolean;

    private authTokenKey = "NBLOCKS_AUTH_TOKEN";
    private tenantUserIdKey = "NBLOCKS_TENANT_USER_ID";

    constructor(graphqlUrl: string, debug: boolean) {
      this.debug = debug;

      const cache = new InMemoryCache();      

      this.client = new ApolloClient({
        cache, 
        link: this._configureApolloLink(graphqlUrl)
      });
    }

    private _configureApolloLink(graphqlUrl: string): ApolloLink {
        const debug = this.debug;

        const httpLink = createHttpLink({
          uri: graphqlUrl,
        });

        const authLink = setContext(async (_, { headers }) => {
        
          const [authToken, tenantUserId] = await Promise.all([
            AsyncStorage.getItem(this.authTokenKey),
            AsyncStorage.getItem(this.tenantUserIdKey)
          ]);
          
          return {
            headers: {
              ...headers,
              'x-auth-token': authToken ? authToken : "",
              'x-tenant-user-id': tenantUserId ? tenantUserId : "",
            }
          }
        });

        const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
          if (graphQLErrors) {
            for (const error of graphQLErrors) {
              console.error(
                `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
                operation,
                response
              );
            }
          }
          if (networkError) {
            console.error(`[Network error]: ${networkError}`, operation, response);
          }
        });

        return ApolloLink.from([authLink, errorLink, httpLink]);
      }
}