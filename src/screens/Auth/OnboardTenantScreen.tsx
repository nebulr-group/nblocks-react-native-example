import React, { FunctionComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {EditTenantModalComponent} from '../../components/Tenant/TenantComponent/EditTenantModalComponent';
import { useSecureContext } from '../../hooks/secure-http-context';

const OnboardTenantScreen: FunctionComponent<{}> = () => {

  const {didAuthenticate} = useSecureContext();

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <ActivityIndicator color="#32B768" size="large" />
      <EditTenantModalComponent visible={true} onCloseModal={() => didAuthenticate(true)}/>
    </DefaultPaddingComponent>
  );
}

export {OnboardTenantScreen};
