import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView,CheckBox,} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import Slideshow from 'react-native-slideshow';

export default class Event extends Component {

  constructor(){
    super();
    this.state ={
      check:false
    }
	//placeholder to fetch slides from event object
    this.slidePictures = ['http://placeimg.com/640/480/any'];
	this.slideInformation = 
	'Cineplex Inc. is a Canadian entertainment company headquartered in Toronto, Ontario. Through its operating subsidiary Cineplex Entertainment LP, Cineplex operates 162 theatres across Canada.';
  }

  static navigationOptions = {
    title: 'EVENT',
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
          <ScrollView>
            <View style={styles.container}>
                <Slideshow dataSource={[
					{ 
						title: 'Cineplex',
						caption: 'Movie Threater',
						url:'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cineplex_logo.svg/500px-Cineplex_logo.svg.png' 
					},
					{ 
						title: 'Venom',
						caption: 'Thriller, Action',
						url:'https://mediafiles.cineplex.com/Attachments/NewItems/venom-595x326-EN_20181005144852_0.jpg' 
					},
					{ 
						title: 'A Star is Born',
						caption: 'Slice of Life',
						url:'https://mediafiles.cineplex.com/Attachments/NewItems/astarisborn-595x326-EN_20181005144910_0.jpg' 
					}
				]}/>
			<Text>
				{this.slideInformation}
			</Text>
			<TouchableOpacity style={{marginTop:20}}
                onPress={() => this.props.navigation.navigate('CreateEvent')}>
                    <Text style = {styles.buttons}>
                    Create Event
                    </Text>
            </TouchableOpacity>
			<TouchableOpacity style={{marginTop:10}}
                onPress={() => this.props.navigation.navigate('Event')}>
                    <Text style = {styles.buttons}>
                    Swipe Right
                    </Text>
            </TouchableOpacity>
			<TouchableOpacity style={{marginTop:1	0}}
                onPress={() => this.props.navigation.navigate('Event')}>
                    <Text style = {styles.buttons}>
                    Swipe Left
                    </Text>
            </TouchableOpacity>
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
        fontWeight:'bold'
     }

  });
  AppRegistry.registerComponent(Event, () => Event);