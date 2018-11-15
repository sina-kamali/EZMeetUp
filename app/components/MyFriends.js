import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,
    Image,TouchableOpacity,ListView,ScrollView,
    Button, TextInput,Alert,TouchableHighlight,Slider,ActivityIndicator} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';

export default class MyFriends extends Component {
  constructor(props) {
    super(props);
    const dataObjects = [ 
      { eventId: 1,
        event:
        { eventName: 'Cineplex',
        eventLocation: '15460 Bayview Avenue Aurora, ON, L4G 7J1',
        eventDescription: 'Watch a movie together!' } 
      } 
    ]
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows(dataObjects),
      userId:"",
      token:""
    };
  }

//   _renderRow (rowData) {
//     // e.g. return <MyCustomCell title={rowData.title} description={rowData.description} />
//     // <TouchableOpacity style={{marginTop:10}}
// //     onPress={() => this.props.navigation.navigate('ForgotPassword')}>
// //     <Text style={{color: 'white'}}>
// //     Forgot password!
// //     </Text>
// // </TouchableOpacity>
//     return <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor: "#F0F0F0", margin: 5}} onPress={() => this.showMore(rowData)} ><Text style={{alignItems:"flex-start",justifyContent:"flex-start", fontSize:20, padding: 10, fontWeight:"bold"}}>{rowData.event.eventName} - {rowData.event.eventDescription}</Text></TouchableOpacity>
//   }

showMore(event){
  this.props.navigation.navigate('JoinedEventDetails');
}

componentWillMount(){
  const { navigation } = this.props;
  const id = navigation.getParam('id');
  const tk = navigation.getParam('token');

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
        this.dataObjects = responseJson;
        console.log(responseJson);
        
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


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }


    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
             <ListView style={{flex:1}}
                dataSource={this.state.dataSource}
                renderRow={
                  (rowData) => <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor: "#F0F0F0", margin: 5}} 
                  onPress={() => this.props.navigation.navigate('JoinedEventDetails',{selectedEvent: rowData, token: this.state.token, id: this.state.userId})} >
                    <Text style={{alignItems:"flex-start",justifyContent:"flex-start", fontSize:20, padding: 10, fontWeight:"bold", color:"black"}}>
                    {rowData.event.eventName} - {rowData.event.eventDescription}</Text>
                    </TouchableOpacity>
                }
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
     }

  });
  AppRegistry.registerComponent(MyFriends, () => MyFriends);