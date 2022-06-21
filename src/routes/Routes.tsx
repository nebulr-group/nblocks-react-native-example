import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import UserListComponent from '../components/User/UserListComponent/UserListComponent';
import { useAuth } from '../hooks/auth-context';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AuthRoutes, { AuthRoutesStackParams } from './AuthRoutes';

export type RoutesStackParams = AuthRoutesStackParams & {
    Home: undefined;
    Profile: undefined;
    Users: undefined
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
                    <Stack.Screen name="Profile" component={ProfileScreen}/>
                    <Stack.Screen name="Users" component={UserListComponent}/>
                </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        );
    else
        return (
            <AuthRoutes></AuthRoutes>
        );
}

export default Routes;
