import React, { FunctionComponent } from 'react';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {UserListComponent} from '../../components/User/UserListComponent/UserListComponent';

const UsersScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <UserListComponent />
    </DefaultPaddingComponent>
  );
}

export {UsersScreen};