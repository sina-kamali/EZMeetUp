import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

export default class DiscoveryPreference extends Component {


  static navigationOptions = {
    title: 'Discovery Preference',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  constructor(props) {
    super(props)
    this.state = { distance: 20 }
   } 
   getVal(val){
   console.warn(val);
   }

  render() {
    let data = [{
      value: 'Toronto',
    }, {
      value: 'North York',
    }, {
      value: 'Richmnond Hill',
    }];
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Dropdown
              label='Your Location'
              data={data}
              dropdownMargins={{ min: 8, max: 16 }}
              containerStyle={{
                borderColor: 'white',
                backgroundColor:'white',
                width: 380,
              padding:20}}
            />

            <Text
                style={{backgroundColor: 'white',
                fontSize:20,
                textAlign: 'left',
                width: 380,
                padding:20
              }}>Discovery Distance</Text>

            <Slider
            style={{ width: 380,backgroundColor: 'white',padding:20 }}
            step={1}
            minimumValue={5}
            maximumValue={100}
            value={this.state.distance}
            onValueChange={val => this.setState({ distance: val })}
            onSlidingComplete={ val => this.getVal(val)}
            />
        <Text style={{backgroundColor: 'white',width: 380, textAlign:"center", paddingBottom:5}}>
          {this.state.distance}
        </Text> 
                
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
  AppRegistry.registerComponent(DiscoveryPreference, () => DiscoveryPreference);