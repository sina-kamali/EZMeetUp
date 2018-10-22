import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

export default class MyFriends extends Component {


  static navigationOptions = {
    title: 'My Friends',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
                
            </KeyboardAvoidingView>
        </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        //marginTop: 50
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    buttons: {
        borderWidth: 2,
        padding: 10,
        borderColor: 'white',
        width: 330,
        textAlign: "center",
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
     }

  });
  AppRegistry.registerComponent(MyFriends, () => MyFriends);