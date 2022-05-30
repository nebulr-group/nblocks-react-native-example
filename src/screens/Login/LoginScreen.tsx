import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { SecureHttpContext } from '../../components/NblocksContext/NblocksContext';
import { RoutesStackParams } from '../../routes/Routes';

export default class LoginScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{errors: any[]}>{

  static contextType = SecureHttpContext;
  declare context: React.ContextType<typeof SecureHttpContext>;

  constructor(props: {navigation: NavigationProp<RoutesStackParams>}) {
    super(props);
    this.state = {
      errors: []
    }
  }

  async authenticate(): Promise<void> {
    const response = await this.context.authService.authenticate("oscar@nebulr.group", "helloworld");
    if (response.mfaState === 'DISABLED')
      this.props.navigation.navigate('ChooseUser');
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          onPress={() => this.authenticate()}
          title="Authenticate!"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Cancel!"
        />
      </View>
    );
  }
}
