import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ImageBackground, BackHandler, Image, TouchableOpacity, Button, TextInput, ScrollView, CheckBox, } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Slideshow from 'react-native-slideshow';
import PropTypes from 'prop-types';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default class Event extends Component {


  constructor(props) {
    super(props);

		this.state = {
		  eventName: "EventName",
		  eventLocation: "EventLocation",
		  eventDescription: "EventDescription",
		  eventCapacity: "EventCapacity",	
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
			}, {
			  title: 'Title 2',
			  caption: 'Caption 2',
			  url: 'http://placeimg.com/640/400/any',
			}, {
			  title: 'Title 3',
			  caption: 'Caption 3',
			  url: 'http://placeimg.com/640/470/any',
			},
		  ],
		};

  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  
  //load new event with swiping, will replace with DB data later
  loadNewEvent(){
	if (global.EventNo == global.EventMax){
		global.EventNo = 1;
	}
	else{
		global.EventNo = global.EventNo + 1;
	}
	if (global.EventNo == 1){
	  this.setState({
		  eventName: "EventName",
		  eventLocation: "EventLocation",
		  eventDescription: "EventDescription",
		  eventCapacity: "EventCapacity",	
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
			}, {
			  title: 'Title 2',
			  caption: 'Caption 2',
			  url: 'http://placeimg.com/640/400/any',
			}, {
			  title: 'Title 3',
			  caption: 'Caption 3',
			  url: 'http://placeimg.com/640/470/any',
			},
		  ],
	  });
	}
	if (global.EventNo == 2){
	  this.setState({
		  eventName: "Cineplex",
		  eventLocation: "15460 Bayview Avenue Aurora, ON, L4G 7J1",
		  eventDescription: "Movie Threater",
		  eventCapacity: "200",	
		  myText: 'I\'m ready to get swiped!',
		  gestureName: 'none',
		  backgroundColor: '#fff',
		  position: 1,
		  interval: null,
		  dataSource: [
			{
			  title: 'Cineplex',
			  caption: 'Movie Threater',
			  url: 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cineplex_logo.svg/500px-Cineplex_logo.svg.png',
			}, {
			  title: 'Venom',
			  caption: 'Thriller, Action',
			  url: 'https://mediafiles.cineplex.com/Attachments/NewItems/venom-595x326-EN_20181005144852_0.jpg',
			}, {
			  title: 'A Star is Born',
			  caption: 'Drama, Slice of Life',
			  url: 'https://mediafiles.cineplex.com/Attachments/NewItems/astarisborn-595x326-EN_20181005144910_0.jpg',
			},
		  ],
	  });
	}
	if (global.EventNo == 3){
	  this.setState({
		  eventName: "CNE",
		  eventLocation: "210 Princes' Blvd, Toronto, ON M6K 3C3",
		  eventDescription: "An annual event that takes place at Exhibition Place",
		  eventCapacity: "50000",	
		  myText: 'I\'m ready to get swiped!',
		  gestureName: 'none',
		  backgroundColor: '#fff',
		  position: 1,
		  interval: null,
		  dataSource: [
			{
			  title: 'Sky Ride',
			  caption: 'Adult Ride',
			  url: 'https://theex.com/statcache/pthumb/images/galleries/skyride/skyride_1.fe2c857b.jpg',
			}, {
			  title: 'Ribfest',
			  caption: 'Food',
			  url: 'https://theex.com/statcache/pthumb/images/food/restaurants/ribfest_lg.ce9edee6.jpg',
			}, {
			  title: 'Craft Beer Fest',
			  caption: 'Alcohol',
			  url: 'https://theex.com/statcache/pthumb/images/food/craft_beer_fest_2015.ce9edee6.jpg',
			},
		  ],
	  });
	}
  }
  
  onSwipeUp(gestureState) {
	this.loadNewEvent();  
    this.setState({ myText: 'You swiped up!'});
	this.forceUpdate();
  }

  onSwipeDown(gestureState) {
	this.loadNewEvent();
    this.setState({ myText: 'You swiped down!' });
	this.forceUpdate();
  }

  onSwipeLeft(gestureState) {
	this.loadNewEvent();
    this.setState({ myText: 'You swiped left!' });
	this.forceUpdate();
  }

  onSwipeRight(gestureState) {
	this.loadNewEvent();
    this.setState({ myText: 'You swiped right!' });
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
        onPress={() => navigation.navigate('Preference')}>
        <Image
          source={require('../images/Settings.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
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

                <Text style={{ marginTop: 20 }}>{this.state.myText}</Text>
                <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
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
