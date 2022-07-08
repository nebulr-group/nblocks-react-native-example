import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {NblocksProvider} from './src/components/NblocksProvider/NblocksProvider';
import {Routes} from './src/routes/Routes';

export default class App extends Component<{}, {}> {

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1 // Must have for mobile to give height of routes
      }
    })
    return (
      <NblocksProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Routes></Routes>
        </SafeAreaView>
      </NblocksProvider>
    ); 
  }
}


/**
 * <NblocksProvider i18nOverrides={[{lang: 'en', resources: {"FORGOT_PASSWORD": "iForgot?"}}]} colorOverrides={{primaryColor: 'red'}} styleOverrides={{buttonText: {color: 'black', padding: 10,
      fontWeight: "700"}}}>
 */