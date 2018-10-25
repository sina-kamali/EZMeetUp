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

  onSwipeUp(gestureState) {
    this.setState({ myText: 'You swiped up!' });
  }

  onSwipeDown(gestureState) {
    this.setState({ myText: 'You swiped down!' });
  }

  onSwipeLeft(gestureState) {
    this.setState({ myText: 'You swiped left!' });
  }

  onSwipeRight(gestureState) {
    this.setState({ myText: 'You swiped right!' });
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
                <Slideshow
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  onPositionChanged={position => this.setState({ position })} />

                <Text style={{ marginTop: 20 }}>{this.state.myText}</Text>
                <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
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
