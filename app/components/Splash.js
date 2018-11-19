import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo} from 'react-native';
import {createStackNavigator} from 'react-navigation'

import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';



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




      async componentDidMount() {
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
        } 
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
// Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
            
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            alert(JSON.stringify(notification.data, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
            
        });
    }
    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }


//   async componentDidMount() {
//     // TODO: You: Do firebase things
//     // const { user } = await firebase.auth().signInAnonymously();
//     // console.warn('User -> ', user.toJSON());



//     firebase.messaging().getToken()
//   .then(fcmToken => {
//     if (fcmToken) {
//       console.log(fcmToken);
//     } else {
//       // user doesn't have a device token yet
//     } 
//   });

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