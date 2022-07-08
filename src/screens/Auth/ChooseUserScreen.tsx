import React, { FunctionComponent } from 'react';
import {ChooseUserComponent} from '../../components/Auth/ChooseUserComponent/ChooseUserComponent';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';

const ChooseUserScreen: FunctionComponent<{}> = () => {

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <ChooseUserComponent />
    </DefaultPaddingComponent>
  );
}

export {ChooseUserScreen};
