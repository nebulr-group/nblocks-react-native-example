import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {NblocksProvider} from './src/components/NblocksProvider/NblocksProvider';
import {Routes} from './src/routes/Routes';

// This is the IP to your running docker container on your local network. This must be reachable from your mobile device that is running the app.
const ipToBackend = "http://192.168.2.22:3300";

export default class App extends Component<{}, {}> {

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1 // Must have for mobile to give height of routes
      }
    })
    return (
      <NblocksProvider config={{apiHost: ipToBackend, debug: true}}>
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