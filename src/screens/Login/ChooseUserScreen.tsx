import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { SecureHttpContext } from '../../components/NblocksContext/NblocksContext';
import { RoutesStackParams } from '../../routes/Routes';

export default class ChooseUserScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{users: any[]}>{

  static contextType = SecureHttpContext;
  declare context: React.ContextType<typeof SecureHttpContext>;

  constructor(props: {navigation: NavigationProp<RoutesStackParams>}) {
    super(props);
    this.state = {
      users: []
    }
  }

  async setUser(userId: any): Promise<void> {
    this.context.authService.setUser(userId);
    this.props.navigation.navigate('Profile');
  }

  async componentDidMount(): Promise<void> {
    const users = await this.context.authService.listUsers();
    this.setState({users});
  }

  render() {
    return (
      <View>
        {this.state.users.map(user => 
          <Button key={user.id} onPress={() => this.setUser(user.id)} title={`${user.tenant.name} - (${user.role})`}></Button>
        )}
      </View>
    );
  }
}
