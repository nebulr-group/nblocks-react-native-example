import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CounterComponent from './src/components/Counter/CounterComponent';
import UsdPriceComponent from './src/components/UsdPrice/UsdPrice';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Hej Blomman!</Text>
      <UsdPriceComponent></UsdPriceComponent>
      <CounterComponent></CounterComponent>
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
