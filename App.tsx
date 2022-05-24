import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Routes from './src/routes/Routes';

export default class App extends Component<{}, {}> {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1 // Must have for mobile to give height of routes
      }
    })
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Routes></Routes>
      </SafeAreaView>
    ); 
  }
}
