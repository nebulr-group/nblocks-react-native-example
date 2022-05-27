import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ChooseUserScreen from '../screens/Login/ChooseUserScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

export type RoutesStackParams = {
    Home: undefined;
    Profile: undefined;
    Login: undefined;
    ChooseUser: undefined;
};

const Stack = createNativeStackNavigator<RoutesStackParams>();

export default class Routes extends Component<{},{}>{

  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="ChooseUser" component={ChooseUserScreen}/>
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    );
  }

}
