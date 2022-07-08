import React, { FunctionComponent, useContext, useEffect, useState } from "react";

const initialAppContext = {
  name: "", 
  defaultLocale: "", 
  logo: "", 
  privacyPolicyUrl: "", 
  apiHost: "", 
  graphqlPath: "",
  debug: false
};
const AppContext = React.createContext(initialAppContext);
const useApp = () => useContext(AppContext);

export interface LibConfig {

  // Output debug messages from plugin
  debug: boolean

  /** Base Url to a backend API running a NBlocks compatable feature set. E.g. `https://api.myapp.com` */
  apiHost: string;

  /** The path which host the graphql endpoint, will be concatenated with apiHost. E.g. `/graphql` */
  graphqlPath: string;

  /** Asset Path to your logo. E.g. `https://www.myapp.com/logo.png` or `assets/logos/logo.png` */
  logoPath: string;

  /** Url to a privacy policy, will be used in href links. E.g. `https://www.myapp.com/privacy` */
  privacyPolicyUrl: string;

  /** View routes that are considered public accessable and interceptors should not require authentication context. E.g. `['/about', '/home']` */
  openRoutes: string[];

  /** Available languages that the user can set for the workspace. Can just be 'en' or 'sv' at the moment */
  languages: string[];

  /** Enable password complexity according to ISO27001 */
  passwordComplexity: boolean;

  /** Ask for personal information after first time user logs in. Can be setup to require specific fields */
  onboarding: {
    enabled: boolean,
    requiredFields: {
      firstName: boolean;
      lastName: boolean;
      phoneNumber: boolean;
    }
  }

  /** Available social login providers and account api data that the user can use for authorization. */
  socialLogins: {
    accountApiHost: string;
    appId: string;
    providers: {
      google: boolean;
      github: boolean;
      facebook: boolean;
    }
  },
}

const NblocksAppContextProvider: FunctionComponent<{appName: string, config?: Partial<LibConfig>}> = ({children, config, appName}) => {

  useEffect(() => {
    //Get app
  })

    return (
      <AppContext.Provider value={{...initialAppContext,...{
        name: appName,
        defaultLocale: 'en', 
        logo: config?.logoPath ? config.logoPath : "https://app-stage.northwhistle.com/assets/logos/logo-word-purple.png",  
        privacyPolicyUrl: config?.privacyPolicyUrl ? config.privacyPolicyUrl : "https://www.northwhistle.com/privacy-app",
        apiHost: config?.apiHost ? config.apiHost : "http://localhost:3000",
        graphqlPath: config?.graphqlPath ? config.graphqlPath : "/graphql",
        debug: config?.debug
        }}}>
        {children}
      </AppContext.Provider>
    );
}

export {NblocksAppContextProvider, useApp};