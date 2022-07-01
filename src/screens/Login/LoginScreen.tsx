import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, Text, View } from 'react-native';
import NblocksButton from '../../components/shared/NblocksButton';
import { useSecureContext } from '../../hooks/secure-http-context';
import { RoutesStackParams } from '../../routes/Routes';

const LoginScreen: FunctionComponent<{}> = () => {

  const {authService} = useSecureContext();
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();

  const authenticate = async(): Promise<void> => {
    const response = await authService.authenticate("oscar@nebulr.group", "helloworld");
    if (response.mfaState === 'DISABLED')
      navigation.navigate('ChooseUser');
  }

  return (
    <View>
      <Text>Oh, oh! Please login to continue</Text>
      <NblocksButton
        type='primary'
        onPress={() => authenticate()}
        title="Authenticate!"
      />
    </View>
  );
}

export default LoginScreen;
