import React, { FunctionComponent } from 'react';
import { NblocksAppContextProvider } from '../../hooks/app-context';
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
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
}> = ({children, i18nOverrides, styleOverrides, colorOverrides}) => {

  return (
    <NblocksAppContextProvider>
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

export default NblocksProvider;