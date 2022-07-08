import React, { FunctionComponent } from 'react';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {TenantComponent} from '../../components/Tenant/TenantComponent/TenantComponent';

const TenantScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <TenantComponent/>
    </DefaultPaddingComponent>
  );
}

export {TenantScreen};