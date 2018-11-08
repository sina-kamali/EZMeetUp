import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo} from 'react-native';
import {createStackNavigator} from 'react-navigation'



export default class Splash extends Component {
	constructor() {
    super();
	global.EventNo = 0;
    global.EventMax = 0;
    this.state ={
        isOnline: false
    }
  }
    static navigationOptions = {
        header: null
      };
  render() {
    NetInfo.isConnected.fetch().then(isConnected => {
        this.setState({isOnline: isConnected});
      });

      if(!this.state.isOnline){
        return (
            <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Image source={require('../images/logo.png')} style={styles.logo} />
                    <Text style={{fontSize:25, padding: 10, fontWeight:"bold", color:"black", textAlign:'center'}}>Ofline Mode</Text>
                    <Text style={{fontSize:18, padding: 10, fontWeight:"bold", color:"black", textAlign:'center'}}>Plese check your network connection!</Text>
                </View>
            </ImageBackground>
    
        );
      }

    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                <TouchableOpacity style={{marginTop:150}} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style = {styles.buttons}>
                    SIGN UP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:10}}
                onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style = {styles.buttons}>
                    LOG IN
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