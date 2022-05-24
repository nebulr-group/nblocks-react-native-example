import React, { Component } from 'react';
import { Text } from 'react-native';

type CounterComponentState = {
  usd: number;
};

export default class UsdPriceComponent extends Component<{},CounterComponentState>{

  constructor(props = {}) {
    super(props);

    this.state = {
      usd: 0
    }

    this.getPriceFromApiAsync();
  }

  async getPriceFromApiAsync(): Promise<void> {
    try {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice/USD.json'
      );
      const json = await response.json();
      this.setState({usd: json.bpi.USD.rate_float})
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Text>USD: {this.state.usd}</Text>
    );
  }

}
