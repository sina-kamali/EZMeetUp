import React, { Component } from 'react';
import {
  AppRegistry, Platform, StyleSheet, Text, View, ImageBackground, BackHandler,
  Image, TouchableOpacity, Button, TextInput, ScrollView, CheckBox, ActivityIndicator,Alert,
} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { EventRegister } from 'react-native-event-listeners'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AnimatedHideView from 'react-native-animated-hide-view';

export default class Event extends Component {



  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: ["A", "B", "C", "D", "E", "F", "G"],
      token: "",
      UserId: "",
      EventList: [],
      views: [],
      infoEvent: 0,
      mounted : false,
      refreshing: false,
      noEventCounter: 0

    };

  }
  leftSwipe(i){

    //console.log("We are counting!");
    current = this.state.noEventCounter;
    current = current -1;
    this.setState({noEventCounter: current});
    //console.log(this.state.noEventCounter)
    this.infoEevent(i)
  }

  GetEvents() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    this.state.UserId = id;
    this.state.token = tk;
    global.id = navigation.getParam('id');
    global.token = navigation.getParam('token');
    this.setState({ EventList: [],
      views: []
     });

    fetch('http://myvmlab.senecacollege.ca:6282/api/events/withCategoriesOfUser/' + id,
      {
        headers: {
          'authtoken': tk
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          EventList: responseJson
        }, function () {

          let eve = responseJson;
          this.state.noEventCounter = eve.length;

          for (let i = 0; i < eve.length; i++) {
            //console.log(eve[i]);
            const words = eve[i].eventDate.split('T');
            if (i % 2 == 0) {

              this.state.views.push(
                <Card key={i} style={[styles.card,{backgroundColor:"white"}]} onSwipedLeft={() => this.leftSwipe(i)} onSwipedRight={()=> this.AcceptEvent(i,eve[i].id )}>
                  <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:"#F5F5F5",
                  padding: 5}}>
                  <Image
                    source={{ uri: eve[i].event_images[0].image }}
                    style={{alignSelf: 'center',
                    height: 200,
                    width: 200,}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{backgroundColor:"white", width:310, borderBottomLeftRadius:5, borderBottomRightRadius:5, padding: 5}}>
                  <Text style={[styles.label,{paddingLeft: 5}]}>Location: {eve[i].eventLocation}</Text>
                  <Text style={[styles.label,{paddingLeft: 5}]}>Event Date: {words[0]}</Text>
                </View>
                  
                </Card>
              );
            }
            else {
              this.state.views.push(
                <Card key={i} style={[styles.card,{backgroundColor:"white"}]} onSwipedLeft={() => this.leftSwipe(i)} onSwipedRight={()=> this.AcceptEvent(i,eve[i].id )} >
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:"#F5F5F5",
                  padding:5}}>
                  <Image
                    source={{ uri: eve[i].event_images[0].image }}
                    style={{alignSelf: 'center',
                    height: 200,
                    width: 200}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{backgroundColor:"white", padding: 5, borderBottomLeftRadius:5, borderBottomRightRadius:5 }}>
                  <Text style={[styles.label,{paddingLeft: 5}]}>Location: {eve[i].eventLocation}</Text>
                  <Text style={[styles.label,{paddingLeft: 5}]}>Event Date: {words[0]}</Text>
                </View>
                </Card>
              );
            }
          }
          this.setState({ isLoading: false });
        });
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

  }

  infoEevent(index){
    this.state.infoEvent = index + 1;
  }

 async AcceptEvent(index,eveId){  
   const eveid = index+1;
    this.state.infoEvent = index + 1;
    try {
      let response = await fetch(
        // change this link to our link
       "http://myvmlab.senecacollege.ca:6282/api/users/"+this.state.UserId+"/events/join/" + eveId,
       {
         // A post request which sends a json whit data objes keys
         method: "POST",
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authtoken":this.state.token
         },
        //body: JSON.stringify(data)
      }
     );
      if (response.status >= 200 && response.status < 300) {
        console.log("Joind Event");
      }
      else{
       console.log(response);
      }
    } catch (errors) {
      console.log(errors);
     Alert.alert("Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
    } 
 

    this.state.infoEvent = index + 1;

   
 }


  ShowInfo(){
    if(this.state.EventList.length >  this.state.infoEvent){
      this.props.navigation.navigate('EventDetails',{id: this.state.UserId, token: this.state.token, eventDetails: this.state.EventList[this.state.infoEvent]})
    }else{
      Alert.alert("", "Sorry there is no event details available to display! ");
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    
    this.listener = EventRegister.addEventListener('myCustomEvent', () => {
      this.refreshPage();
  })


    this.GetEvents();

    global.doRefresh = function(){
      EventRegister.emit('myCustomEvent',{});
    }

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    
  }

  onBackButtonPressed() {
    return true;
  }

  refreshPage(){
    console.log("Refresh Event Page Called!");
    
    this.state.isLoading=true;
    this.state.infoEvent = 0;
    this.GetEvents();
    this.forceUpdate();

  }

 


  static navigationOptions = ({ navigation, screenProps, state }) => ({
    headerTitle: (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={{ textAlign: 'center', marginRight: 10 }}
          onPress={() => global.doRefresh()}
        >
        <Image
          source={require('../images/logo.png')}
          style={{ width: 80, height: 80 }}
        />
      </TouchableOpacity>
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
        onPress={() => navigation.navigate('MyFriends',{ id: global.id, token: global.token })}>
        <Image
          source={require('../images/AddEvents.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{ textAlign: 'center', marginLeft: 10 }}
        onPress={() => navigation.navigate('Preference', { id: global.id, token: global.token })}>
        <Image
          source={require('../images/Menu.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    )
  });

  HideButtons(){
    if(this.state.noEventCounter <= 0){
       return false
    }else{
      return true
    }
  }


  render() {
    const hideIt = this.HideButtons();

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }



    return (
      
      <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%',alignItems: 'center',
      justifyContent: 'center' }}>
      {/* <View style={{position:'absolute', left:2, top:0}}>
      <TouchableOpacity style={{marginTop:10} } 
            onPress={() => this.refreshPage()}>
          <Image
          source={require('../images/refresh.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      </View> */}
        <View style={[styles.responsiveBox,{flex: 1,paddingTop: 10}]}>


          <CardStack
            style={styles.content}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray', width:200, textAlign:"center"}}>Thank you for using EZMeetUp! There is no event available now! You can create your own events.</Text>}
            ref={swiper => {
              this.swiper = swiper
            }}
          >
            {/* <Card style={[styles.card, styles.card1]}><Text style={styles.label}>A</Text></Card>
            <Card style={[styles.card, styles.card2]}><Text style={styles.label}>B</Text></Card>
            <Card style={[styles.card, styles.card1]}><Text style={styles.label}>C</Text></Card>
            <Card style={[styles.card, styles.card2]}><Text style={styles.label}>D</Text></Card>
            <Card style={[styles.card, styles.card1]}><Text style={styles.label}>E</Text></Card> */}
            {this.state.views}

          </CardStack>

        
                 
               
          <View style={styles.footer}>
          <AnimatedHideView
                  visible={hideIt}
                  unmountOnHide={true}
            >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
                this.swiper.swipeLeft();
              }}>
                <Image source={require('../images/no.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
               this.ShowInfo()
              }}>
                <Image source={require('../images/info.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                this.swiper.swipeRight();
              }}>
                <Image source={require('../images/yes.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
              </TouchableOpacity>
            </View>
            </AnimatedHideView>
          </View>

      

        </View>


      </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 320,
    height: 400,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
  },
  // card1: {
  //   backgroundColor: '#FE474C',
  // },
  // card2: {
  //   backgroundColor: '#FEB12C',
  // },
  label: {
    textAlign: 'left',
    paddingTop:5,
    fontSize: 20,
    fontFamily: 'System',
    color: 'black',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderWidth: 4,
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('17%'),
    flexDirection: 'column',
    justifyContent: 'space-around' 
  }
});
AppRegistry.registerComponent(Event, () => Event);
