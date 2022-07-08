import React, { FunctionComponent } from 'react';
import { LibConfig, NblocksAppContextProvider } from '../../hooks/app-context';
import { NblocksAuthContextProvider } from '../../hooks/auth-context';
import { LangOverrideParam, NblocksThemeContextProvider } from '../../hooks/theme-context';
import { NblocksSecureContextProvider } from '../../hooks/secure-http-context';
import { BrandingConfig, ColorConfig } from '../../utils/BrandingConfig';

/**
 * Wrap your code into this Provider to get access to the Nblocks world
 * @param param0 
 * @returns 
 */
const NblocksProvider: FunctionComponent<{
  appName: string, 
  config?: Partial<LibConfig>,
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
}> = ({children, appName, config, i18nOverrides, styleOverrides, colorOverrides}) => {

  return (
    <NblocksAppContextProvider appName={appName} config={config}>
      <NblocksSecureContextProvider>
        <NblocksAuthContextProvider>
          <NblocksThemeContextProvider i18nOverrides={i18nOverrides} styleOverrides={styleOverrides} colorOverrides={colorOverrides}>
            {children}
          </NblocksThemeContextProvider>
        </NblocksAuthContextProvider>
      </NblocksSecureContextProvider>
    </NblocksAppContextProvider>
  );
}

export {NblocksProvider};