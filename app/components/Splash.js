import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo} from 'react-native';
import {createStackNavigator} from 'react-navigation'

import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';



export default class Splash extends Component {

	constructor() {
    super();
	global.deviceToken = 0;
    this.state ={
        isOnline: false
    }
  }

  
    static navigationOptions = {
        header: null
      };




      async componentDidMount() {

        firebase.messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
            console.log(fcmToken);
            global.deviceToken = fcmToken;

            } else {
            // user doesn't have a device token yet
            console.log("No Token");
            } 
            this.createNotificationListeners(); //add this line
        });

        
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            //console.log("ForGround")
            //console.log(body)
        });
      
        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log("Back-click")
            console.log(body)
        });
      
        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log("OpendBy")
            //console.log(body)
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
          //process data message
          console.log(JSON.stringify(message));
        });
      }
    componentWillUnmount() {

        this.notificationListener();
        this.notificationOpenedListener();
    
    }


//   async componentDidMount() {
//     // TODO: You: Do firebase things
//     // const { user } = await firebase.auth().signInAnonymously();
//     // console.warn('User -> ', user.toJSON());



    

//    // await firebase.analytics().logEvent('foo', { bar: '123'});
//   }


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