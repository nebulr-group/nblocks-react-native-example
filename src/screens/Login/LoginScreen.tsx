import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RoutesStackParams } from '../../routes/Routes';

export default class LoginScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{}>{

  constructor(props: {navigation: NavigationProp<RoutesStackParams>}) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go to Home!"
        />
      </View>
    );
  }

}
