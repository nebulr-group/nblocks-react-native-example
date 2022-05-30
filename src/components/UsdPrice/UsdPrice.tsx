import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text } from 'react-native';

const UsdPriceComponent: FunctionComponent<{}> = ({}) => {

  const [usd, setUsd] = useState(0.0);

  useEffect(() => {
    getPriceFromApiAsync().then(result => setUsd(result));
  })

  const getPriceFromApiAsync = async (): Promise<number> => {
    try {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice/USD.json'
      );
      const json = await response.json();
      return json.bpi.USD.rate_float;
    } catch (error) {
      console.error(error);
    }
    return 0;
  };

  return (
    <Text>USD: {usd}</Text>
  );

}

export default UsdPriceComponent;
