import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import ChooseUserScreen from '../screens/Login/ChooseUserScreen';
import LoginScreen from '../screens/Login/LoginScreen';

export type AuthRoutesStackParams = {
    Login: undefined;
    ChooseUser: undefined;
};

const Stack = createNativeStackNavigator<AuthRoutesStackParams>();

const AuthRoutes: FunctionComponent<{}> = ({}) => {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Group>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="ChooseUser" component={ChooseUserScreen}/>
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AuthRoutes;
