import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

export default class Chat extends Component {
	_isMounted = false;
	constructor(props){
    super(props);
    this.state ={
		userId:"",
		eventId:"",
		token:"",
		messages: [],
		name:"",
		renderFriendList: false
    }
  }

  componentWillMount() {
	_isMounted = true;
	const { navigation } = this.props;
	const eventName = navigation.getParam('eventName');
	const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    const eventId = navigation.getParam('eventId');
  global.eventId = eventId;
  
	fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+ id,
    {
      headers: { 
      	'authtoken': token 
      	}
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
			userId: id,
			token: tk,
			eventId: eventId,
			name: responseJson.firstName + ' ' + responseJson.lastName,
        }, function(){
			/*
		  	console.log('EventID' + eventId);
			console.log('userID' + id);	
			console.log('name' + this.state.name);*/
        });
      })
      .catch((error) =>{
        console.error(error);
      });
	this.getMessages(id,tk,eventId);
	//this.getEventMembers(tk,eventId);
  }
  
  async getMessages(id,token,eventId){
	if(id!="" && token!="" && eventId !=""){
    fetch('http://myvmlab.senecacollege.ca:6282/api/chats/'+eventId,
	  {
		headers: { 
		  'authtoken': token
		  }
	  })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
      }, function(){
        if(!(responseJson.isEmpty)){
			//console.log(responseJson);
			message = [];
			for (i = responseJson.length-1; i > -1; i--){
					insertIndex = message.length;
					
					if (message.length > 0){
						//console.log(message[0]);
						//console.log(responseJson[i]);
						for (j = 0; j < message.length; j++){
							if (message[j].createdAt < responseJson[i].createdAt){
								insertIndex = j;
								//console.log('condition was hit');
								break;
							}
						}
					}
					//console.log(insertIndex);
					message.splice(insertIndex, 0, {
						_id: i + '',
						text: responseJson[i].message,
						createdAt: responseJson[i].createdAt,
						user: {
							_id: responseJson[i].user.id,
							name: responseJson[i].user.firstName + ' ' + responseJson[i].user.lastName
						}
					});
			}
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
          this.forceUpdate();
		  console.log('Messages updated');
        }
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  }	
  async sendMessage(messages = []){
	  console.log('Now sending messages');
	  var data = {
		    userId: messages[0].user._id,
			eventId: this.state.eventId,
			message: messages[0].text
      };
	  console.log(data);
	  
	  try {
	   let response = await fetch('http://myvmlab.senecacollege.ca:6282/api/chats/'+this.state.eventId,
		{
		  // A post request which sends a json
		  method: "POST",
		  headers: {
		   "Accept": "application/json",
		   "Content-Type": "application/json",
		   "authtoken":this.state.token
		  },
		 body: JSON.stringify(data)
	   }
	  );
	   if (response.status >= 200 && response.status < 300) {
		console.log('success');
	   }
	   else{
		Alert.alert("send message failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
	   }
	  } catch (errors) {
	  
	  Alert.alert("send message Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
	  } 	  
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
	this.sendMessage(messages);
	//this.getMessages(this.state.userId,this.state.token,this.state.eventId);
  }


   renderBubble(props) {
  
    if(props.currentMessage.user._id == global.userId){
      return (
        <View>
          <Text style={{textAlign:'right'}}>{props.currentMessage.user.name}</Text>
          <Bubble {...props}  />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{textAlign:'left'}}>{props.currentMessage.user.name}</Text>
          <Bubble {...props}  />
        </View>
      );
    }

    
  }

  // ====================== Notification ========================

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("ForGround")
        //console.log(body)
        let Id = this.state.userId;
        let eveId = this.state.eventId;
        let token = this.state.token;
        this.setState({
          messages: []
        })
        this.getMessages(Id,token,eveId);
    });
  }

   // ====================== Notification ========================

  componentDidMount() {
	  _isMounted = true;
      //this.interval = setInterval(() => this.setState({ time: Date.now()}), 100)
      this.createNotificationListeners(); //add this line
  }
  componentWillUnmount() {
    // Clear the interval right before component unmount
    //clearInterval(this.interval);
  _isMounted = false;
  this.notificationListener();
}
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).eventName || 'Chat!',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
	headerRight: (
	<TouchableOpacity 
	onPress={() => navigation.navigate('Members',{token: global.token, eventId: global.eventId})}
	>
	<Image
          source={require('../images/MyFriends.png')}
          style={{ width: 40, height: 40 }}
    />
    </TouchableOpacity>
	)
  });
  render() {
	if (this.state.renderFriendList) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.userId,
		      name: this.state.name
        }}
		    renderBubble={this.renderBubble}
      />

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
        width: 330,
        textAlign: "center",
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
     }

  });