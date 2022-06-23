import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService } from "../utils/AuthService";
import { AuthHttpClient } from "../utils/AuthHttpClient";
import { AuthApolloClient } from "../utils/AuthApolloClient";
import { ApolloProvider } from "@apollo/client";

//const BASE_URL = "http://192.168.2.22";
const BASE_URL = "http://192.168.1.79"
//const BASE_URL = "http://172.22.79.23"
const HTTP_URL = `${BASE_URL}:3300`;
const GRAPHQL_URL = `${HTTP_URL}/graphql`;

const httpClient = new AuthHttpClient(HTTP_URL, true).httpClient;
const authService = new AuthService(httpClient, true);
const apolloClient = new AuthApolloClient(GRAPHQL_URL, true).client;

const initialSecurityContext = {authService, httpClient, apolloClient, authenticated: false, didAuthenticate: (value: boolean) => {}};
const SecureContext = React.createContext(initialSecurityContext);
const useSecureContext = () => useContext(SecureContext);

interface NblocksContextProps {
}

const NblocksSecureContextProvider: FunctionComponent<NblocksContextProps> = ({children}) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const didAuthenticate = (value: boolean) => {
      console.log(`Did authenticate: ${value}`);
      setAuthenticated(value);
    }

    useEffect(() => {
      if (!authenticated) {
        authService.checkCurrentUserAuthenticated().then(authenticated => {
          didAuthenticate(authenticated);
        });
      }
    })

    return (
      <SecureContext.Provider value={{...initialSecurityContext,...{authenticated, didAuthenticate}}}>
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
      </SecureContext.Provider>
    );
}

export {NblocksSecureContextProvider, useSecureContext};