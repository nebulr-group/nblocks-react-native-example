import React, { FunctionComponent } from 'react';
import { NblocksAppContextProvider } from '../../hooks/app-context';
import { NblocksAuthContextProvider } from '../../hooks/auth-context';
import { NblocksSecureContextProvider } from '../../hooks/secure-http-context';

/**
 * Wrap your code into this Provider to get access to the Nblocks world
 * @param param0 
 * @returns 
 */
const NblocksProvider: FunctionComponent<{}> = ({children}) => {

  return (
    <NblocksAppContextProvider>
      <NblocksSecureContextProvider>
        <NblocksAuthContextProvider>
          {children}
        </NblocksAuthContextProvider>
      </NblocksSecureContextProvider>
    </NblocksAppContextProvider>
  );
}

export default NblocksProvider;