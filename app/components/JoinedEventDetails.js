import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView,ActivityIndicator} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import Slideshow from 'react-native-slideshow';



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
        Capacity: ""
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
    const event = navigation.getParam('selectedEvent');
  
    //console.log(tk);
    //console.log(id);
    //console.log(event);
    this.setState({
      userId: id,
      token: tk,
      eventId: event.eventId
    });

   this.getDetails(id,tk,event.eventId);

  //   fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+id+'/events/details/'+event.eventId,
  // {
  //   headers: { 
  //     'authtoken': tk
  //     }
  // })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.setState({
        
  //     }, function(){
  //       if(!(responseJson.isEmpty)){
        
  //         console.log(responseJson);
         
  //       }
        
  //     });

  //   })
  //   .catch((error) =>{
  //     console.error(error);
  //   });

    //this.state.isLoading = false;
}

getDetails(id,token,event){

  if(id!="" && token!="" && event !=""){

    fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+id+'/events/details/'+event,
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

          this.setState({
            eventName: responseJson[0].event.eventName,
            eventDescription:responseJson[0].event.eventDescription,
            eventLocation: responseJson[0].event.eventLocation,
            eventDate: responseJson[0].event.eventDate,
            Capacity: responseJson[0].event.eventCapacity
          });
          const images = responseJson[0].event.event_images;
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

  render() {


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
                  //onPress={() => this.props.navigation.navigate('Event')}
                  >
                    <Text style = {styles.buttons}>Event Group Chat</Text>
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