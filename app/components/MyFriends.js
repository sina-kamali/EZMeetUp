import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,
    Image,TouchableOpacity,ListView,ScrollView,
    Button, TextInput,Alert,TouchableHighlight,Slider,ActivityIndicator, RefreshControl} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';
import { EventRegister } from 'react-native-event-listeners'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MyFriends extends Component {
  constructor(props) {
    super(props);
    const dataObjects = [ 
      { eventId: 0,
        event:
        { eventName: 'Place Holder',
        eventLocation: 'Place Holder',
        eventDescription: 'Place Holder' } 
      } 
    ]
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      isListEmpty: true,
      isLoading: true,
      refreshing: false,
      dataSource: ds.cloneWithRows(dataObjects),
      userId:"",
      token:"",
      items: {},
      today: '',
    };
  }



  loadItems(day) {
   
  
      

      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <TouchableOpacity style={{flex:1, flexDirection: 'row', margin: 5, padding:10}} 
        onPress={() => this.props.navigation.navigate('JoinedEventDetails',{token: this.state.token, id: this.state.userId, eventId:item.eventId})} >
          <Text>
            <Text style={{fontSize:20}} >{item.date} - </Text>
            <Text style={{fontSize:20, fontWeight:'bold'}} >{item.name}</Text>
            {'\n'}
            <Text style={{fontSize:18}}>{item.descrip}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>You didn't jouin any events on this day!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


showMore(event){
  this.props.navigation.navigate('JoinedEventDetails');
}

componentWillMount(){
  this.fetchData();
}

fetchData(){
  const { navigation } = this.props;
  const id = navigation.getParam('id');
  const tk = navigation.getParam('token');

  // refreshing the event page
  EventRegister.emit('myCustomEvent',{});

  console.log(tk)
  console.log(id)
  this.setState({userId: id,
    token: tk
  });
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+id+'/events',
  {
    headers: { 
      'authtoken': tk 
      }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      }, function(){
        if(!(responseJson.isEmpty)){
          this.state.items = {};
          this.state.isListEmpty = false;
          //this.setState({fetch: responseJson});
          var date = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var i =0;
          this.setState({
            today: year.toString() + '-' + month.toString() +'-' + date.toString()
          });

          

          for (let i = -5; i < 100; i++) {
            const chDate= date + i;
            //const time = date.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = year.toString() + '-' + month.toString() +'-' + chDate.toString()
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
              
            }
          }
          
    
            responseJson.forEach(e => {
              date+=i;
              let dt = e.event.eventDate.split('T');
              var day = dt[0];
              this.state.items[day] = [];
              if (this.state.items[day]) {
                  this.state.items[day].push({
                  name: e.event.eventName,
                  date: day,
                  descrip: e.event.eventDescription,
                  eventId: e.eventId,
                  height: 100
                });
              }
            });
          

        }
        //console.log(this.state.items);
        this.setState({isLoading:false});
      });

    })
    .catch((error) =>{
      console.error(error);
    });
}

  static navigationOptions = {
    title: 'Joined Events',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  onRefresh() {

    console.log("refresh");
    this.fetchData();
  
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.isListEmpty) {
      return (
        <View style={{ flex: 1, textAlign:"center", justifyContent:"center", flexDirection:"row"}}>
          <Text style={{ fontSize: '25', fontSize: 18, color: 'black', width:200, textAlign:"center",justifyContent:"center"}}>
            You did not joined any event. Plese use the main page to joine events.
          </Text>
        </View>
      );
    }


    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
             {/* <ListView style={{flex:1}}
                dataSource={this.state.dataSource}
                renderRow={
                  (rowData) => <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor: "#F0F0F0", margin: 5}} 
                  onPress={() => this.props.navigation.navigate('JoinedEventDetails',{selectedEvent: rowData, token: this.state.token, id: this.state.userId, eventId:rowData.eventId})} >
                    <Text style={{alignItems:"flex-start",justifyContent:"flex-start", fontSize:20, padding: 10, fontWeight:"bold", color:"black"}}>
                    {rowData.event.eventName} - {rowData.event.eventDescription}</Text>
                    </TouchableOpacity>
                }

                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
              /> */}
              <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.state.today}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={() => {return (<View style={styles.emptyDate}></View>);}}
                rowHasChanged={this.rowHasChanged.bind(this)}
                onRefresh={() => <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />}
                pastScrollRange={1}
                //markingType={'period'}
                // markedDates={{
                //    '2018-12-08': {textColor: '#666'},
                //    '2018-11-09': {textColor: '#666'},
                //    '2018-12-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2018-12-21': {startingDay: true, color: 'blue'},
                //    '2018-12-22': {endingDay: true, color: 'gray'},
                //    '2018-11-24': {startingDay: true, color: 'gray'},
                //    '2018-11-25': {color: 'gray'},
                //    '2018-11-26': {endingDay: true, color: 'gray'}}}
                //  monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
              />

              
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
     },
     item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }

  });
  AppRegistry.registerComponent(MyFriends, () => MyFriends);