import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { useSecureContext } from '../../hooks/secure-http-context';
import { RoutesStackParams } from '../../routes/Routes';
import { AuthService } from '../../utils/AuthService';

const ChooseUserScreen: FunctionComponent<{}> = () => {

  const [users, setUsers] = useState<any[]>();
  const navigation = useNavigation<NavigationProp<RoutesStackParams>>();
  const {authService, didAuthenticate} = useSecureContext();

  useEffect(() => {
    if (!users) {
      authService.listUsers().then(result => setUsers(result));
    }
  });

  const setUser = async (userId: any): Promise<void> => {
    await AuthService.setTenantUserId(userId);
    didAuthenticate(true);
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
