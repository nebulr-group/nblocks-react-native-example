import React, { FunctionComponent } from 'react';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {UserProfileComponent} from '../../components/User/UserProfileComponent/UserProfileComponent/UserProfileComponent';

const UserProfileScreen: FunctionComponent<{}> = () => {
  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <UserProfileComponent/>
    </DefaultPaddingComponent>
  );
}

export {UserProfileScreen};