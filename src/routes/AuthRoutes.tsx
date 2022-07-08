import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import {ChooseUserScreen} from '../screens/Auth/ChooseUserScreen';
import {LoginScreen} from '../screens/Auth/LoginScreen';
import {OnboardTenantScreen} from '../screens/Auth/OnboardTenantScreen';
import {OnboardUserScreen} from '../screens/Auth/OnboardUserScreen';
import {RequireMfaScreen} from '../screens/Auth/RequireMfaScreen';
import {ResetMfaScreen} from '../screens/Auth/ResetMfaScreen';
import {ResetPasswordScreen} from '../screens/Auth/ResetPasswordScreen';
import {SetupMfaScreen} from '../screens/Auth/SetupMfaScreen';

type AuthRoutesStackParams = {
    Login: undefined;
    ResetPassword: undefined;
    SetupMfa: undefined;
    RequireMfa: undefined;
    ResetMfa: undefined;
    ChooseUser: undefined;
    OnboardUser: undefined;
    OnboardTenant: undefined;
};

const Stack = createNativeStackNavigator<AuthRoutesStackParams>();

const AuthRoutes: FunctionComponent<{}> = ({}) => {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Group>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
                <Stack.Screen name="SetupMfa" component={SetupMfaScreen}/>
                <Stack.Screen name="RequireMfa" component={RequireMfaScreen}/>
                <Stack.Screen name="ResetMfa" component={ResetMfaScreen}/>
                <Stack.Screen name="ChooseUser" component={ChooseUserScreen}/>
                <Stack.Screen name="OnboardUser" component={OnboardUserScreen}/>
                <Stack.Screen name="OnboardTenant" component={OnboardTenantScreen}/>
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    );
}

export {AuthRoutes, AuthRoutesStackParams};
