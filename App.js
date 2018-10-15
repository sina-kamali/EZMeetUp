/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import Login from './app/components/Login.js';
import Splash from './app/components/Splash';
import SignUp from './app/components/SignUp';
import ForgotPassword from './app/components/ForgotPassword';
import Preference from './app/components/Preference';
import Event from './app/components/Event';
import CreateEvent from './app/components/CreateEvent';
import DiscoveryPreference from './app/components/DiscoveryPreference';
const RootStack = createStackNavigator({
    
    Home: {
        screen: Splash,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    ForgotPassword: {
      screen: ForgotPassword
    },
    Preference: {
      screen: Preference
    },
	Event: {
      screen: Event
    },
	CreateEvent: {
      screen: CreateEvent
    },
    DiscoveryPreference: {
      screen: DiscoveryPreference
    }

  });

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
