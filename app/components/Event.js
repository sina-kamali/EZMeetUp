import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ImageBackground, BackHandler,
   Image, TouchableOpacity, Button, TextInput, ScrollView, CheckBox, ActivityIndicator} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Slideshow from 'react-native-slideshow';
import PropTypes from 'prop-types';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default class Event extends Component {
  


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
		  eventDescription: "No more events nearby, adjust preferences to see more",
		  eventCapacity: "",	
		  myText: 'I\'m ready to get swiped!',
		  gestureName: 'none',
		  backgroundColor: '#fff',
		  position: 1,
		  interval: null,
		  dataSource: [
			{
			  title: '',
			  caption: '',
			  url: 'http://placeimg.com/640/480/any',
			}, 
		  ],
		};

  }

  componentWillMount() {
 
  }
  
  //load new event 
  async loadNewEvent(){
      //load new event only if there's more than one event to swipe through (or no events)
	  if (this.state.eventsTotal > 1){
		  const { navigation } = this.props;
		  const id = navigation.getParam('id');
		  const token = navigation.getParam('token');
		  console.log("event no" + global.EventNo);
		  console.log("event max" + global.EventMax);
		  //Keep going through the events list, once reaches the end loop back to the beginning
		  if (global.EventNo < global.EventMax - 1){
			  global.EventNo += 1;
		  }
		  else{
			  global.EventNo = 0;
		  }
		  fetch('http://myvmlab.senecacollege.ca:6282/api/events/withCategoriesOfUser/'+ id, 
			{
				headers: { 
					'authtoken': token 
					}
			})
			.then((response) => response.json())
			.then((responseJson) => {
			this.setState({
			  eventName: responseJson[global.EventNo].eventName,
			  eventLocation: responseJson[global.EventNo].eventLocation,
			  eventDescription: responseJson[global.EventNo].eventDescription,
			  eventCapacity: responseJson[global.EventNo].eventCapacity,
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
		  })
		  .catch((error) =>{
			console.error(error);
			throw error;
		  });
	  }
  }
  
  onSwipeUp(gestureState) {
	this.loadNewEvent();  
    //this.setState({ myText: 'You swiped up!'});
	this.forceUpdate();
  }

  onSwipeDown(gestureState) {
	this.loadNewEvent();
    //this.setState({ myText: 'You swiped down!' });
	this.forceUpdate();
  }

  onSwipeLeft(gestureState) {
	this.loadNewEvent();
    //this.setState({ myText: 'You swiped left!' });
	this.forceUpdate();
  }

  onSwipeRight(gestureState) {
	this.loadNewEvent();
    //this.setState({ myText: 'You swiped right!' });
	this.forceUpdate();
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'red' });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: 'green' });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: 'blue' });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: 'yellow' });
        break;
    }
  }
	renderIf(condition, content) {
		if (condition) {
			return content;
		} else {
			return null;
		}
	}



  static navigationOptions = ({ navigation, screenProps, state}) => ({
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
    },
    headerRight: (
      <TouchableOpacity style={{ textAlign: 'center', marginRight: 10 }}
        onPress={() => navigation.navigate('MyFriends')}>
        <Image
          source={require('../images/Messages.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{ textAlign: 'center', marginLeft: 10 }}
        onPress={() => navigation.navigate('Preference', {id: global.id, token: global.token})}>
        <Image
          source={require('../images/Settings.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    )
  });



  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
	this.mounted = true;
	const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');
    // global for passing
    global.id = navigation.getParam('id');
    global.token = navigation.getParam('token');

	if (this.mounted){
		this.setState({
		  interval: setInterval(() => {
			this.setState({
        position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1,
        
			});
		  }, 2000)
		});
  }
  
  

		  fetch('http://myvmlab.senecacollege.ca:6282/api/events/withCategoriesOfUser/'+ id, 
			{
				headers: { 
					'authtoken': token 
					}
			})
      .then((response) => response.json())
      .then((responseJson) => {
		if (responseJson.length > 0 ){
			global.EventMax = responseJson.length;
			global.EventNo = 0;
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
				  console.log(responseJson[global.EventNo].event_images);
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
	isEnabled = false;
	if (global.EventMax > 0){
		isEnabled = true;
	}
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
	if (global.EventMax == 0){
		return(
		<ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>   
        <ScrollView>
          <View style={[styles.container,{padding: 20}]}>
          
              <View style={{ backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
                <Slideshow
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  onPositionChanged={position => this.setState({ position })} />

                
				<Text>{this.state.eventDescription}</Text>

                <View style={{ marginTop: 30, justifyContent:'space-between', flexDirection: 'row',}}>
			  
                </View>
              </View>
          </View>
        </ScrollView>
      </ImageBackground>
		);
	}
    return (
      <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>   
        <ScrollView>
          <View style={[styles.container,{padding: 20}]}>
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeUp={(state) => this.onSwipeUp(state)}
              onSwipeDown={(state) => this.onSwipeDown(state)}
              onSwipeLeft={(state) => this.onSwipeLeft(state)}
              onSwipeRight={(state) => this.onSwipeRight(state)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: this.state.backgroundColor
              }}
            >
              <View style={{ backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
			  
			    <Text>{this.state.eventName}</Text>
				<Text>Location: {this.state.eventLocation}</Text>
				<Text>Capacity: {this.state.eventCapacity}</Text>
				
                <Slideshow
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  onPositionChanged={position => this.setState({ position })} />

                
				<Text>{this.state.eventDescription}</Text>

                <View style={{ marginTop: 30, justifyContent:'space-between', flexDirection: 'row',}}>
                  <TouchableOpacity
                  onPress={(state) => this.onSwipeLeft(state)}
                  >
                    <Image
                      source={require('../images/no.png')}
                    />
                  </TouchableOpacity>

				<TouchableOpacity
				disabled={!isEnabled}
                  onPress={(state) => this.props.navigation.navigate('EventDetails',{id: this.state.userId, token: this.state.userToken})}
                  >
                    <Image
                      source={require('../images/info.png')}
                    />
                  </TouchableOpacity>
				  
                  <TouchableOpacity
                  onPress={(state) => this.onSwipeRight(state)}
                  >
                    <Image
                      source={require('../images/yes.png')}
                    />
                  </TouchableOpacity>
				  
                </View>
              </View>
            </GestureRecognizer>
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
AppRegistry.registerComponent(Event, () => Event);
