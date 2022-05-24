import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RoutesStackParams } from '../../routes/Routes';

export default class ProfileScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{}>{

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go to Home!"
        />
      </View>
    );
  }
}