import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, TextInput} from 'react-native';
import {createStackNavigator} from 'react-navigation'


export default class SignUp extends Component {

  static navigationOptions = {
    title: 'SIGN UP',
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
            <View style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                  // onChangeText={(text) => this.setState({text})}
                  value={'Username'}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                  // onChangeText={(text) => this.setState({text})}
                  value={'Password'}
                  secureTextEntry={true}
                />
                <TouchableOpacity style={{marginTop:50}}>
                    <Text style = {styles.buttons}>
                    SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
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
  AppRegistry.registerComponent(SignUp, () => SignUp);