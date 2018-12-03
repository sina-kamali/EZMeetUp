import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView,ActivityIndicator} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import Slideshow from 'react-native-slideshow';
import { EventRegister } from 'react-native-event-listeners'
import AnimatedHideView from 'react-native-animated-hide-view';



export default class JoinedEventDetails extends Component {
	constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        userId:"",
        eventId:"",
        token:"",
        currEvent:[],
        eventImages:[],
        eventName:"",
        eventLocation:"",
        eventDescription:"",
        eventDate:"",
        Capacity: "",
        creatorId:""
    }
  }
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    global.userId = id;
    //Sconst event = navigation.getParam('selectedEvent');
    const joind = navigation.getParam('eventId');
  
    //console.log(tk);
    //console.log(id);
    //console.log(event);
    this.setState({
      userId: id,
      token: tk,
      eventId: joind
    });

   this.getDetails(id,tk,joind);
}
async leaveEvents(id,tk,eveId) {
  
  try {
   let response = await fetch(
     // change this link to our link
    "http://myvmlab.senecacollege.ca:6282/api/users/"+id+"/events/leave/"+eveId,
    {
      // A post request which sends a json whit data objes keys
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json",
       "authtoken":tk,
      },
   }
  );
   if (response.status >= 200 && response.status < 300) {
     //console.log(response);
     EventRegister.emit('myCustomEvent',{});
    this.props.navigation.navigate('Event',{id: id, token: tk})
   }
   else{
   
    Alert.alert("Leave Failed!", "Failed to leave");
     
   }
 } catch (errors) {
  Alert.alert("Leave Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
  } 
}

leaveEvent(){
  
  let id = this.state.userId;
  let tk = this.state.token;
  let eveId = this.state.eventId;
  this.leaveEvents(id,tk,eveId);
  
  
}

getDetails(id,token,eveId){
  console.log(eveId);

  var images = [];

  if(id!="" && token!="" && eveId !=""){

    fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+id+'/events/details/'+eveId,
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
          
        
          console.log(responseJson);
          responseJson.forEach(e => {
            const eDate = e.event.eventDate.split('T');
            if(e.eventId == eveId){
              this.setState({
                eventName: e.event.eventName,
                eventDescription:e.event.eventDescription,
                eventLocation: e.event.eventLocation,
                creatorId: e.event.userId,
                eventDate: eDate[0],
                Capacity: e.event.eventCapacity !== 0 ? e.event.eventCapacity : 'Open'
              });
              images = e.event.event_images;
            }
          });

          
          //const images = responseJson[0].event.event_images;
          //console.log(images);
    
          images.forEach(e => {
            this.state.eventImages.push({url: e.image});
          });


          this.state.isLoading = false;
          this.forceUpdate();
        }
        
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

    //this.state.isLoading = false;

}

HideLeave(){
  if(this.state.userId == this.state.creatorId) {
    return false;
  }else {
    return true;
  }
}

  render() {

    const hideButton = this.HideLeave();


    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
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
          <TouchableOpacity style={{marginTop:10} } 
                   onPress={() => this.props.navigation.navigate('Chat',{token: this.state.token, id: this.state.userId, eventId: this.state.eventId, eventName: this.state.eventName})}
                  >
                    <Text style = {styles.buttons}>Event Group Chat</Text>
          </TouchableOpacity>

          <AnimatedHideView
                  visible={hideButton}
                  unmountOnHide={true}
                >
            <TouchableOpacity style={{marginTop:10} } 
              onPress={() => this.leaveEvent()}
            >
                <Text style = {styles.buttons}>Leave Event!</Text>
            </TouchableOpacity>

          </AnimatedHideView>
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