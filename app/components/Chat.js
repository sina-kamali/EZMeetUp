import { GiftedChat } from 'react-native-gifted-chat'
import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'

export default class Chat extends Component {
	_isMounted = false;
	constructor(props){
    super(props);
    this.state ={
		userId:"",
		eventId:"",
		token:"",
		messages: [],
		name:""
    }
  }

  componentWillMount() {
	_isMounted = true;
	const { navigation } = this.props;
	const eventName = navigation.getParam('eventName');
	const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    const eventId = navigation.getParam('eventId');
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
    title: (navigation.state.params || {}).eventName || 'Chat!',
  });
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.userId,
		  name: this.state.name
        }}
      />
    )
  }
}