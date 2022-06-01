import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService } from "../utils/AuthService";
import { CurrentUser } from "../models/current-user.model";
import { useSecureContext } from "./secure-http-context";

const initialAuthContext = {currentUser:new CurrentUser(), logout: () => {}};
const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

export {useAuth};

interface NblocksContextProps {
}

const NblocksAuthContextProvider: FunctionComponent<NblocksContextProps> = ({children}) => {
    const {authenticated, didAuthenticate, authService} = useSecureContext();
    const [currentUser, setCurrentUser] = useState(new CurrentUser());

    const logout = () => {
      AuthService.clearAuthStorage();
      didAuthenticate(false);
    }

    useEffect(() => {
        if (authenticated) {
          authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
        } else {
          setCurrentUser(new CurrentUser());
        }
    }, [authenticated])

    return (
      <AuthContext.Provider value={{...initialAuthContext,...{currentUser, logout}}}>
        {children}
      </AuthContext.Provider>
    );
}

export default NblocksAuthContextProvider;