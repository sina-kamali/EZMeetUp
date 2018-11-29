import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import PropTypes from 'prop-types';

export default class Members extends Component {
	_isMounted = false;
	constructor(props){
    super(props);
    this.state ={
		eventId:"",
		token:"",
		memberIds:[],
		members: []
    }
  }

  componentWillMount() {
	_isMounted = true;
	const { navigation } = this.props;
    const tk = navigation.getParam('token');
    const eventId = navigation.getParam('eventId');
	console.log(tk);
	console.log(eventId);
	this.setState({
		token: token,
		eventId: eventId
	});
	this.getEventMembers(tk, eventId);
  }	

  getEventMembers(token, eventId){
	if(token!="" && eventId !=""){
		console.log('this is the users from the event: ');
		fetch('http://myvmlab.senecacollege.ca:6282/api/events/'+eventId+'/users',
		  {
			headers: { 
			  'authtoken': token
			  }
		  })
		.then((response) => response.json())
		.then((responseJson) => {
		  this.setState({ 
			memberIds: responseJson.user_events
		  }, function(){

			console.log(this.state.memberIds);
			console.log('parsing membersid of this size' + this.state.memberIds.length);
			for (i = 0; i < this.state.memberIds.length; i++) {
				fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+ this.state.memberIds[i].userId,
				{
				  headers: { 
					'authtoken': token 
					}
				})
			    .then((response) => response.json())
			    .then((responseJson) => {
					this.setState(prevState => (
					{
					  	members: [prevState.members, responseJson.firstName + ' ' + responseJson.lastName]
					}), 
					function(){
						console.log('name ' + responseJson.firstName + ' ' + responseJson.lastName);
						console.log(this.state.members);
					}
					);
			    })
			    .catch((error) =>{
					console.error(error);
			    });
		    }
		  });

		})
		.catch((error) =>{
		  console.error(error);
		});
	}
  }

  componentDidMount() {
	  _isMounted = true;
      //this.interval = setInterval(() => this.setState({ time: Date.now()}), 100)
  }
  componentWillUnmount() {
    // Clear the interval right before component unmount
    //clearInterval(this.interval);
	_isMounted = false;
}
  static navigationOptions = ({ navigation }) => ({
    title: 'Members!',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  });
  render() {
    
    return (
	<ScrollView>

			{this.state.members.map(userId => <Text style={styles.text} >{userId} </Text> )}   

	</ScrollView>
    )
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