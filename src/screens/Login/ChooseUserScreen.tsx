import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { SecureHttpContext } from '../../components/NblocksContext/NblocksContext';
import { RoutesStackParams } from '../../routes/Routes';

const ChooseUserScreen: FunctionComponent<{}> = () => {

  const [users, setUsers] = useState<any[]>();
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();
  const context = useContext(SecureHttpContext);

  useEffect(() => {
    if (!users) {
      context.authService.listUsers().then(result => setUsers(result));
    }
  });

  const setUser = async (userId: any): Promise<void> => {
    await context.authService.setUser(userId);
    navigation.navigate('Profile');
  }

  return (
    <View>
      {users?.map(user => 
        <Button key={user.id} onPress={() => setUser(user.id)} title={`${user.tenant.name} - (${user.role})`}></Button>
      )}
    </View>
  );
}

export default ChooseUserScreen;
