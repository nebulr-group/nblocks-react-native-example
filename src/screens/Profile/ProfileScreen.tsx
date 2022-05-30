import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SecureHttpContext } from '../../components/NblocksContext/NblocksContext';
import UserListComponent from '../../components/User/UserListComponent/UserListComponent';
import { RoutesStackParams } from '../../routes/Routes';

const ProfileScreen: FunctionComponent<{}> = () => {

  const [user, setUser] = useState<{}>();
  const context = useContext(SecureHttpContext);
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();

  useEffect(() => {
    if (!user) {
      context.authService.currentUser().then(result => setUser(result))
    }
  })

  return (
    <View>
      <Text>Profile</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to Home!"
      />
      <UserListComponent></UserListComponent>
    </View>
  );
}

export default ProfileScreen;