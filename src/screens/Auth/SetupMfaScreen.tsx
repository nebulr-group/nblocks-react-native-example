import React, { FunctionComponent } from 'react';
import {SetupMfaComponent} from '../../components/Auth/mfa/SetupMfaComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const SetupMfaScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <SetupMfaComponent />
    </DefaultPaddingComponent>
  );
}

export {SetupMfaScreen};
