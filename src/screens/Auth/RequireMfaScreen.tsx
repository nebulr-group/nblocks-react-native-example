import React, { FunctionComponent } from 'react';
import {RequireMfaComponent} from '../../components/Auth/mfa/RequireMfaComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const RequireMfaScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <RequireMfaComponent />
    </DefaultPaddingComponent>
  );
}

export {RequireMfaScreen};
