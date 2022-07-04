import React, { FunctionComponent, useContext, useEffect, useState } from "react";

const initialAppContext = {name:"", logo: "", userRoles: [], privacyPolicyUrl: ""};
const AppContext = React.createContext(initialAppContext);
const useApp = () => useContext(AppContext);

const NblocksAppContextProvider: FunctionComponent = ({children}) => {
  
  const [name, setName] = useState("My app");
  const [logo, setLogo] = useState("https://app-stage.northwhistle.com/assets/logos/logo-word-purple.png");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("https://www.northwhistle.com/privacy-app")
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    //Get app
  })

    return (
      <AppContext.Provider value={{...initialAppContext,...{name, logo, userRoles, privacyPolicyUrl}}}>
        {children}
      </AppContext.Provider>
    );
}

export {NblocksAppContextProvider, useApp};