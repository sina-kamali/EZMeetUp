  import React, {Component} from 'react';
  import {AppRegistry,Platform, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, 
    ImageBackground,Image,TouchableOpacity, Button, TextInput,Alert,TouchableHighlight, BackHandler} from 'react-native';
  import {createStackNavigator} from 'react-navigation'


  export default class Preference extends Component {

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed() {
        return true;
    }

    static navigationOptions = {
      header: null
    };
    render() {
      return (
          <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', 
            }}>

            <TouchableOpacity style={{}}>
              <Image source={require('../images/DefaultProfile.png')} style={{width: 100, height: 100}} />
            </TouchableOpacity>
              <Text
                  style={{
                  fontSize: 30,
                  textAlign: 'center',
                  fontWeight:'bold',
                  color: 'black'
                }}>Username</Text>
                
            </View>
            <ScrollView style={{backgroundColor: 'white'}} >

            
            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}>
            <Image source={require('../images/Discover.png')} style={{justifyContent:'center', alignContent: 'center'}} />
            <Text
                style={{
                  fontSize: 25,
                  justifyContent:'center',
                  alignContent: 'center',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666'
                }}
                onPress={() => this.props.navigation.navigate('DiscoveryPreference')}
                >Discovery Preference</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}>
            <Image source={require('../images/Settings.png')} style={{justifyContent:'center', alignContent: 'center'}} />
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'left',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666'
                }}>App Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}>
            <Image source={require('../images/AddEvents.png')} style={{justifyContent:'center', alignContent: 'center'}} />
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'left',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666'
                }}>Add New Events</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}>
            <Image source={require('../images/MyFriends.png')} style={{justifyContent:'center', alignContent: 'center'}} />
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'left',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666'
                }}>My Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}>
            <Image source={require('../images/AddFriends.png')} style={{justifyContent:'center', alignContent: 'center'}} />
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'left',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666'
                }}>Add Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 90, justifyContent:'center',
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center'}}>
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'center',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: 'red'
                }}>Log Out</Text>
            </TouchableOpacity>


            

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
    AppRegistry.registerComponent(Preference, () => Preference);