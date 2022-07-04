import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService, UpdateUserProfileArgs } from "../utils/AuthService";
import { CurrentUser } from "../models/current-user.model";
import { useSecureContext } from "./secure-http-context";

const initialAuthContext = {
  currentUser: new CurrentUser(),
  logout: () => {},
  switchUser: (tenantUserId: string) => {},
  refreshCurrentUser: () => {}
};

const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

interface NblocksContextProps {
}

const NblocksAuthContextProvider: FunctionComponent<NblocksContextProps> = ({children}) => {
    const {authenticated, didAuthenticate, authService, apolloClient} = useSecureContext();
    const [currentUser, setCurrentUser] = useState(new CurrentUser());

    //TODO async
    const logout = () => {
      AuthService.clearAuthStorage();
      apolloClient.resetStore();
      didAuthenticate(false);
      console.log("DidLogout");
    }

    //TODO async
    const switchUser = (userId: string) => {
      apolloClient.resetStore();
      AuthService.setTenantUserId(userId!);
      if (authenticated)
        refreshCurrentUser();
      console.log("DidSwitchUser");
    }

    const refreshCurrentUser = () => {
      authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
      console.log("refreshCurrentUser");
    }

    useEffect(() => {
        if (authenticated) {
          refreshCurrentUser();
        } else {
          setCurrentUser(new CurrentUser());
        }
    }, [authenticated])

    return (
      <AuthContext.Provider value={{...initialAuthContext,...{currentUser, logout, switchUser, refreshCurrentUser}}}>
        {children}
      </AuthContext.Provider>
    );
}

export {NblocksAuthContextProvider, useAuth};