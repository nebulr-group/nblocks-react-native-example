
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, Text, View } from 'react-native';
import { RoutesStackParams } from '../../routes/Routes';

const HomeScreen: FunctionComponent<{}> = () => {

    const navigation = useNavigation<NavigationProp<RoutesStackParams>>();

    return (
      <View>
        <Text>Home</Text>
        <Button
          onPress={() => navigation.navigate('Profile')}
          title="Go to Profile!"
        />
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login!"
        />
      </View>
    );
}

export default HomeScreen;