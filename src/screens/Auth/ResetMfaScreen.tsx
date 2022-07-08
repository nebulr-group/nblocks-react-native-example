import React, { FunctionComponent } from 'react';
import {ResetMfaComponent} from '../../components/Auth/mfa/ResetMfaComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const ResetMfaScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <ResetMfaComponent />
    </DefaultPaddingComponent>
  );
}

export {ResetMfaScreen};
