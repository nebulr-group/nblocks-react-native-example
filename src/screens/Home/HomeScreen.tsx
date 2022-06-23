
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../hooks/auth-context';
import { RoutesStackParams } from '../../routes/Routes';

const HomeScreen: FunctionComponent<{}> = () => {

    const navigation = useNavigation<NavigationProp<RoutesStackParams>>();
    const {currentUser, logout} = useAuth();

    if (currentUser.authenticated) 
      return (
        <View>
          <Button
            onPress={() => navigation.navigate('Profile')}
            title="Go to Profile!"
          />
          <Button
            onPress={() => navigation.navigate('Users')}
            title="Go to Users!"
          />
          <Button
            onPress={() => navigation.navigate('Tenant')}
            title="Go to Tenant!"
          />
          <Button
            onPress={() => { logout() }}
            title="Logout!"
          />
        </View>
      )
    else
      return (
        <View>
          <Button
            onPress={() => navigation.navigate('Login')}
            title="Login!"
          />
        </View>
      );
}

export default HomeScreen;