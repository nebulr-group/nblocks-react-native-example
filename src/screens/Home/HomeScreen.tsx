import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RoutesStackParams } from '../../routes/Routes';

export default class HomeScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{}>{

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
          title="Go to Profile!"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          title="Login!"
        />
      </View>
    );
  }
}