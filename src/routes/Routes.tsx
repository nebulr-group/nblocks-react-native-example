import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { useAuth } from '../hooks/auth-context';
import {BrandExpoScreen} from '../screens/BrandExpo/BrandExpoScreen';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {UserProfileScreen} from '../screens/UserProfile/UserProfileScreen';
import {TenantScreen} from '../screens/Tenant/TenantScreen';
import {UsersScreen} from '../screens/Users/UsersScreen';
import { AuthRoutes, AuthRoutesStackParams } from './AuthRoutes';
import {ChooseUserScreen} from '../screens/Auth/ChooseUserScreen';

export type RoutesStackParams = AuthRoutesStackParams & {
    Home: undefined;
    UserProfile: undefined;
    Users: undefined;
    Tenant: undefined;
    BrandExpo: undefined;
};

const Stack = createNativeStackNavigator<RoutesStackParams>();

const Routes: FunctionComponent<{}> = ({}) => {
    const {currentUser} = useAuth();

    if (currentUser.authenticated)
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
                    <Stack.Screen name="Users" component={UsersScreen}/>
                    <Stack.Screen name="Tenant" component={TenantScreen}/>
                    <Stack.Screen name="BrandExpo" component={BrandExpoScreen}/>
                    <Stack.Screen name="ChooseUser" component={ChooseUserScreen}/>
                </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        );
    else
        return (
            <AuthRoutes></AuthRoutes>
        );
}

export {Routes};
