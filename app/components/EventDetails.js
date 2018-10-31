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
      isLoading: true,
      userId: 0,
      userToken: 0,
	  eventsTotal: 0,
	  eventsCurrent: 0,
		  eventName: "",
		  eventLocation: "",
		  eventDescription: "No More Events Nearby",
		  eventCapacity: "",	
		  myText: 'I\'m ready to get swiped!',
		  gestureName: 'none',
		  backgroundColor: '#fff',
		  position: 1,
		  interval: null,
		  dataSource: [
			{
			  title: 'Title 1',
			  caption: 'Caption 1',
			  url: 'http://placeimg.com/640/480/any',
			}, 
		  ],
		};

  }

  componentWillMount() {
 
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
    },/*
    headerLeft: (
      <TouchableOpacity style={{ textAlign: 'center', marginRight: 10 }}
        onPress={() => navigation.navigate('Event', {id: navigation.getParam('id'), token: navigation.getParam('token')})}>
        <Text>Back </Text>
      </TouchableOpacity>
    ),*/
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
	this.mounted = true;
	const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');

	if (this.mounted){
		this.setState({
		  interval: setInterval(() => {
			this.setState({
			  position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
			});
		  }, 2000)
		});
	}

    fetch('http://myvmlab.senecacollege.ca:6282/api/events/withCategoriesOfUser/'+ id)
      .then((response) => response.json())
      .then((responseJson) => {
		if (responseJson.length > 0 ){
			if (this.mounted){
			this.setState({
				isLoading: false,
				userId: id,
				userToken: token,
				eventName: responseJson[global.EventNo].eventName,
				eventLocation: responseJson[global.EventNo].eventLocation,
				eventDescription: responseJson[global.EventNo].eventDescription,
				eventCapacity: responseJson[global.EventNo].eventCapacity,
				eventsTotal: responseJson.length,
				dataSource: [
					{
					  title: responseJson[global.EventNo].eventName,
					  caption: responseJson[global.EventNo].eventDescription,
					  url: responseJson[global.EventNo].event_images[0].image,
					}, 
					{
					  title: responseJson[global.EventNo].eventName,
					  caption: responseJson[global.EventNo].eventDescription,
					  url: responseJson[global.EventNo].event_images[1].image,
					}, 
					{
					  title: responseJson[global.EventNo].eventName,
					  caption: responseJson[global.EventNo].eventDescription,
					  url: responseJson[global.EventNo].event_images[2].image,
					},
				  ],
				}, function(){
				  console.log(responseJson);
				});
			}
		}
		else{
			if (this.mounted){
				this.setState({
				isLoading: false,
				userId: id,
				userToken: token,
				}, function(){
				console.log(responseJson);
				});
			}
		}
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
	clearInterval(this.state.interval);
	this.mounted = false;
  }

  onBackButtonPressed() {
    return true;
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>
        <ScrollView>
          <View style={[styles.container,{padding: 20}]}>
            <View style={{ backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
                <Slideshow
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  onPositionChanged={position => this.setState({ position })} />
			
                <View style={{ marginTop: 30, justifyContent:'space-between', flexDirection: 'row',}}>
                </View>
            </View>
			<View style={{ marginTop: 30, backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
				<Text>{this.state.eventName}</Text>
				<Text>Location: {this.state.eventLocation}</Text>
				<Text>Capacity: {this.state.eventCapacity}</Text>
				<Text>{this.state.eventDescription}</Text>
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
