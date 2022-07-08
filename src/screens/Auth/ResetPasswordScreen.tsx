import React, { FunctionComponent } from 'react';
import {ResetPasswordComponent} from '../../components/Auth/ResetPasswordComponent/ResetPasswordComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const ResetPasswordScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <ResetPasswordComponent />
    </DefaultPaddingComponent>
  );
}

export {ResetPasswordScreen};
