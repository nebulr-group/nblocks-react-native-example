import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
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

const Routes: FunctionComponent<{}> = ({}) => {
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

export default Routes;
