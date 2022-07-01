import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService, UpdateUserProfileArgs } from "../utils/AuthService";
import { CurrentUser } from "../models/current-user.model";
import { useSecureContext } from "./secure-http-context";

const initialAuthContext = {currentUser:new CurrentUser(), logout: () => {}, updateUserProfile: (userProfile: UpdateUserProfileArgs) => {}};
const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

interface NblocksContextProps {
}

const NblocksAuthContextProvider: FunctionComponent<NblocksContextProps> = ({children}) => {
    const {authenticated, didAuthenticate, authService} = useSecureContext();
    const [currentUser, setCurrentUser] = useState(new CurrentUser());

    const logout = () => {
      AuthService.clearAuthStorage();
      didAuthenticate(false);
    }

    const updateUserProfile = (userProfile: UpdateUserProfileArgs) => {
      authService.updateCurrentUser(userProfile).then(() => {
        authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
      });
    }

    useEffect(() => {
        if (authenticated) {
          authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
        } else {
          setCurrentUser(new CurrentUser());
        }
    }, [authenticated])

    return (
      <AuthContext.Provider value={{...initialAuthContext,...{currentUser, logout, updateUserProfile}}}>
        {children}
      </AuthContext.Provider>
    );
}

export {NblocksAuthContextProvider, useAuth};