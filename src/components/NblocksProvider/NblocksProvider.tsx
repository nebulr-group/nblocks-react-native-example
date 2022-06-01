import React, { FunctionComponent } from 'react';
import NblocksAuthContextProvider from '../../hooks/auth-context';
import NblocksSecureContextProvider from '../../hooks/secure-http-context';

const NblocksProvider: FunctionComponent<{}> = ({children}) => {

  return (
    <NblocksSecureContextProvider>
      <NblocksAuthContextProvider>
        {children}
      </NblocksAuthContextProvider>
    </NblocksSecureContextProvider>
  );
}

export default NblocksProvider;