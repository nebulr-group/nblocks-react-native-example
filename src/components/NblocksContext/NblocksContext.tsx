import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService } from "../../utils/AuthService";
import { AuthHttpClient } from "../../utils/AuthHttpClient";
import { AuthApolloClient } from "../../utils/AuthApolloClient";
import { ApolloProvider } from "@apollo/client";
import { CurrentUser } from "../../models/current-user.model";

//const BASE_URL = "http://192.168.2.22";
const BASE_URL = "http://172.22.78.146"
const HTTP_URL = `${BASE_URL}:3300`;
const GRAPHQL_URL = `${HTTP_URL}/graphql`;

const httpClient = new AuthHttpClient(HTTP_URL, true).httpClient;
const authService = new AuthService(httpClient, true);
const apolloClient = new AuthApolloClient(GRAPHQL_URL, true).client;

const initialSecurityContext = {authService, httpClient, apolloClient, didAuthenticate: (value: boolean) => {}};
const SecureHttpContext = React.createContext(initialSecurityContext);
const useSecureContext = () => useContext(SecureHttpContext);

const initialAuthContext = {currentUser:new CurrentUser(), logout: () => {}};
const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

export {useSecureContext, useAuth};

// TODO most probably it make sense to introduce abstraction layer and expose different contexts one by one.
{/* <SecureHttpContext
  <<SecureApiContext */}

interface NblocksContextProps {
}

const NblocksContext: FunctionComponent<NblocksContextProps> = ({children}) => {
    const [authenticated, setAuthenticated] = useState<boolean>();
    const [currentUser, setCurrentUser] = useState(new CurrentUser());

    const logout = () => {
      AuthService.clearAuthStorage();
      setAuthenticated(false);
    }

    const didAuthenticate = (value: boolean) => {
      console.log(`Did authenticate: ${value}`);
      setAuthenticated(value);
    }

    useEffect(() => {
      if (authenticated === undefined) {
        authService.checkCurrentUserAuthenticated().then(authenticated => {
          didAuthenticate(authenticated);
        });
      }
    })

    useEffect(() => {
        if (authenticated) {
          authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
        } else {
          setCurrentUser(new CurrentUser());
        }
    }, [authenticated])

    return (
      <SecureHttpContext.Provider value={{...initialSecurityContext,...{didAuthenticate}}}>
        <ApolloProvider client={apolloClient}>
          <AuthContext.Provider value={{...initialAuthContext,...{currentUser, logout}}}>
            {children}
          </AuthContext.Provider>
        </ApolloProvider>
      </SecureHttpContext.Provider>
    );
}

export default NblocksContext;