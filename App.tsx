import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [count, setCount] = useState(0);
  const [usd, setUsd] = useState(0);

  const getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice/USD.json'
      );
      const json = await response.json();
      return json.bpi.USD.rate_float;
    } catch (error) {
      console.error(error);
    }
  };

  getMoviesFromApiAsync().then(result => setUsd(result));

  return (
    <View style={styles.container}>
      <Text>Hej Blomman!</Text>
      <Text>{usd}</Text>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
