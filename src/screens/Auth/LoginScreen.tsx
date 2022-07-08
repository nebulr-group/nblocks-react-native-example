import React, { FunctionComponent } from 'react';
import {LoginComponent} from '../../components/Auth/LoginComponent/LoginComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const LoginScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <LoginComponent />
    </DefaultPaddingComponent>
  );
}

export {LoginScreen};
