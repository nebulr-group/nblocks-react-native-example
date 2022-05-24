import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

type CounterComponentState = {
  count: number;
};

export default class CounterComponent extends Component<{},CounterComponentState>{

  constructor(props = {}) {
    super(props);

    this.state = {
      count: 0
    }
  }

  onPressButton(): void {
    const count = this.state.count;
    this.setState({count: count + 1})
  }

  render() {
    return (
      <View>
        <Text>You clicked {this.state.count} times</Text>
        <Button
          onPress={() => this.onPressButton()}
          title="Click me!"
        />
      </View>
    );
  }

}
