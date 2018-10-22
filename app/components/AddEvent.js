import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

export default class AddEvent extends Component {


  static navigationOptions = {
    title: 'Add Event',
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
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', 
            }}>

            <TouchableOpacity style={{}}>
              <Image source={require('../images/DefaultProfile.png')} style={{width: 100, height: 100}} />
            </TouchableOpacity>
              <Text
                  style={{
                  fontSize: 30,
                  textAlign: 'center',
                  fontWeight:'bold',
                  color: 'black'
                }}>Username</Text>
                
            </View>
            <ScrollView style={{backgroundColor: 'white'}} >

            
           


            

            </ScrollView>
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
  AppRegistry.registerComponent(AddEvent, () => AddEvent);