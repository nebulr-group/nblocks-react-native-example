import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthService } from './AuthService';

export class AuthApolloClient {

    readonly client: ApolloClient<NormalizedCacheObject>;

    private readonly debug: boolean;
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
            AuthService.getAuthToken(),
            AuthService.getTenantUserId()
          ]);
          
          return {
            headers: {
              ...headers,
              'x-auth-token': authToken ? authToken : "",
              'x-tenant-user-id': tenantUserId ? tenantUserId : "",
            }
          }
        });

        const requestMiddleware = new ApolloLink((operation, forward) => {
          console.log("[GraphQL request]:", operation.operationName, operation.variables);
          return forward(operation);
        });
        
        const responseLink = new ApolloLink((operation, forward) => {
          return forward(operation).map(response => {
            if (debug) {
              console.log("[GraphQL response]:", response);
            }
            return response;
          });
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

        return from([authLink, requestMiddleware, errorLink, responseLink, httpLink]);
      }
}