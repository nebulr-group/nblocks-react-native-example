import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth-context';
import { RoutesStackParams } from '../../routes/Routes';

const ProfileScreen: FunctionComponent<{}> = () => {
  const context = useAuth();
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();

  return (
    <View>
      <Text>Profile</Text>
      <Text>{JSON.stringify(context.currentUser)}</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to Home!"
      />
    </View>
  );
}

export default ProfileScreen;