import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../components/NblocksContext/NblocksContext';
import UserListComponent from '../../components/User/UserListComponent/UserListComponent';
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
      <UserListComponent></UserListComponent>
    </View>
  );
}

export default ProfileScreen;