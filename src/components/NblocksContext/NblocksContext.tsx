import React, { FunctionComponent } from "react";
import { AuthService } from "../../utils/AuthService";
import { AuthHttpClient } from "../../utils/AuthHttpClient";
import { AuthApolloClient } from "../../utils/AuthApolloClient";
import { ApolloProvider } from "@apollo/client";

//const BASE_URL = "http://192.168.2.22";
const BASE_URL = "http://172.22.78.146"
const HTTP_URL = `${BASE_URL}:3300`;
const GRAPHQL_URL = `${HTTP_URL}/graphql`;

const httpClient = new AuthHttpClient(HTTP_URL, true).httpClient;
const authService = new AuthService(httpClient, true);
const apolloClient = new AuthApolloClient(GRAPHQL_URL, true).client;

const initialContext = {authService, httpClient, apolloClient};
const SecureHttpContext = React.createContext(initialContext);

export {SecureHttpContext};

// TODO most probably it make sense to introduce abstraction layer and expose different contexts one by one.
{/* <SecureHttpContext
  <<SecureApiContext */}

interface NblocksContextProps {
}

const NblocksContext: FunctionComponent<NblocksContextProps> = ({children}) => {
    return (
      <SecureHttpContext.Provider value={initialContext}>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </SecureHttpContext.Provider>
    );
}

export default NblocksContext;