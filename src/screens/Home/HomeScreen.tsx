
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import {DefaultPaddingComponent} from '../../components/shared/DefaultPaddingComponent';
import {DividerComponent} from '../../components/shared/DividerComponent';
import {NblocksButton} from '../../components/shared/NblocksButton';
import {TitleComponent} from '../../components/shared/TitleComponent';
import { useAuth } from '../../hooks/auth-context';
import { RoutesStackParams } from '../../routes/Routes';

const HomeScreen: FunctionComponent<{}> = () => {

    const navigation = useNavigation<NavigationProp<RoutesStackParams>>();
    const {logout} = useAuth();

      return (
        <DefaultPaddingComponent style={{flex: 1}}>
          <TitleComponent>Nblocks navigation test screen</TitleComponent>
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('UserProfile')}
            title="Go to UserProfile!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('Users')}
            title="Go to Users!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('Tenant')}
            title="Go to Tenant!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('BrandExpo')}
            title="Go to Brand expo!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => { navigation.navigate('ChooseUser') }}
            title="Switch user!"
          />
          <NblocksButton
            onPress={() => { logout() }}
            title="Logout!"
          />
        </DefaultPaddingComponent>
      )
}

export {HomeScreen};