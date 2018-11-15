import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ImageBackground, BackHandler,
   Image, TouchableOpacity, Button, TextInput, ScrollView, CheckBox, ActivityIndicator} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Slideshow from 'react-native-slideshow';
import PropTypes from 'prop-types';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default class EventDetails extends Component {
  
  constructor(props) {
    super(props);

		this.state = {
      isLoading:  true,
      UserId: "",
      token: "",
      eventImages:[],
      eventName:"",
      eventLocation:"",
      eventDescription:"",
      eventDate:"",
      Capacity: ""
		};

  }

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    const Event = navigation.getParam('eventDetails');
    const eDate = Event.eventDate.split('T');
    this.setState({
      eventDate: eDate[0],
      eventDescription: Event.eventDescription,
      Capacity: Event.eventCapacity,
      eventName: Event.eventName,
      eventLocation:Event.eventLocation
    });
    const images = Event.event_images;
    
    images.forEach(e => {
      this.state.eventImages.push({url: e.image});
    });

    this.state.isLoading = false;
    

  }


  
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image
          source={require('../images/logo.png')}
          style={{ width: 80, height: 80 }}
        />
      </View>
    ),
    headerStyle: {
      backgroundColor: '#f4511e',
      height: 90
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  });


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>
        <ScrollView>
        <View style={[styles.container,{padding: 20}]}>
          
          <View style={{ backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
            <Slideshow
              dataSource={this.state.eventImages} />

              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Name:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventName}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Description:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventDescription}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Location:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventLocation}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Date:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventDate}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Capacity:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.Capacity}</Text>
          </View>
        </View>
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
    fontWeight: 'bold'
  }

});
AppRegistry.registerComponent(EventDetails, () => EventDetails);
