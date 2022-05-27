import { NavigationProp } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { SecureHttpContext } from '../../components/SecureHttpContext/SecureHttpContext';
import { RoutesStackParams } from '../../routes/Routes';

export default class ProfileScreen extends Component<{navigation: NavigationProp<RoutesStackParams>},{user: any}>{

  static contextType = SecureHttpContext;
  declare context: React.ContextType<typeof SecureHttpContext>;

  constructor(props: {navigation: NavigationProp<RoutesStackParams>}) {
    super(props);
    this.state = {
      user: {}
    }
  }
  
  async componentDidMount(): Promise<void> {
    const user = await this.context.currentUser();
    this.setState({user});
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>{JSON.stringify(this.state.user)}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go to Home!"
        />
      </View>
    );
  }
}