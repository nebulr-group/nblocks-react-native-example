import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import NblocksContext from './src/components/NblocksContext/NblocksContext';
import Routes from './src/routes/Routes';

export default class App extends Component<{}, {}> {

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1 // Must have for mobile to give height of routes
      }
    })
    return (
      <NblocksContext>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
            <Routes></Routes>
        </SafeAreaView>
      </NblocksContext>
    ); 
  }
}
