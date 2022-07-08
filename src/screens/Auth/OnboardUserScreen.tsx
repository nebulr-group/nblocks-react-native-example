import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {EditUserProfileModalComponent} from '../../components/User/UserProfileComponent/UserProfileComponent/EditUserProfileModalComponent';
import { AuthRoutesStackParams } from '../../routes/AuthRoutes';

const OnboardUserScreen: FunctionComponent<{}> = () => {

  const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();

  return (
    <DefaultPaddingComponent style={{flex: 1}}>
      <ActivityIndicator color="#32B768" size="large" />
      <EditUserProfileModalComponent visible={true} onCloseModal={() => navigation.navigate('ChooseUser')}/>
    </DefaultPaddingComponent>
  );
}

export {OnboardUserScreen};
