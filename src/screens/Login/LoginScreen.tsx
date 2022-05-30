import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { SecureHttpContext } from '../../components/NblocksContext/NblocksContext';
import { RoutesStackParams } from '../../routes/Routes';

const LoginScreen: FunctionComponent<{}> = () => {

  const context = useContext(SecureHttpContext);
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();

  const authenticate = async(): Promise<void> => {
    const response = await context.authService.authenticate("oscar@nebulr.group", "helloworld");
    if (response.mfaState === 'DISABLED')
      navigation.navigate('ChooseUser');
  }


    return (
      <View>
        <Text>Login</Text>
        <Button
          onPress={() => authenticate()}
          title="Authenticate!"
        />
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel!"
        />
      </View>
    );
}

export default LoginScreen;
