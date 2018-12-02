  import React, {Component} from 'react';
  import {AppRegistry,Platform, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, 
    ImageBackground,Image,TouchableOpacity, Button, TextInput,Alert,TouchableHighlight,ActivityIndicator, BackHandler} from 'react-native';
  import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
  import { EventRegister } from 'react-native-event-listeners'
  import ImagePicker from 'react-native-image-picker';


  export default class Preference extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,
        userId: 0,
        userToken: 0,
        firstName: "",
        lastName: "",
        avatarSource: null,
        videoSource: null
      };
  
    }

    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            avatarSource: source
          });
        }
      });
    }
  
    selectVideoTapped() {
      const options = {
        title: 'Video Picker',
        takePhotoButtonTitle: 'Take Video...',
        mediaType: 'video',
        videoQuality: 'medium'
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled video picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.setState({
            videoSource: response.uri
          });
        }
      });
    }

    componentWillMount() {
      console.log("here!!!!!!!");
      EventRegister.emit('myCustomEvent',{});
      const { navigation } = this.props;
      const id = navigation.getParam('id');
      const token = navigation.getParam('token');
      
  
      fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+ id, 
			{
				headers: { 
					'authtoken': token 
					}
			})
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            userId: id,
            userToken: token,
            firstName: responseJson.firstName,
            lastName: responseJson.lastName
          }, function(){
            //console.log(responseJson);
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    static navigationOptions = {
      title: 'Preference',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    };

    LogOut = () =>{
      // removing the user token
      
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home'})]
      });
      this.props.navigation.dispatch(resetAction);
    }


    componentWillUnmount() {
      //EventRegister.emit('myCustomEvent',{});

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
          <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', 
            }}>

            {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}> */}
            <TouchableOpacity >
              
                { this.state.avatarSource === null ? <Image source={require('../images/DefaultProfile.png')} style={styles.avatar} />:
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
              
              {/* <Image source={require('../images/DefaultProfile.png')} style={{width: 100, height: 100}} /> */}
            </TouchableOpacity>
              <Text
                  style={{
                  fontSize: 30,
                  textAlign: 'center',
                  fontWeight:'bold',
                  color: 'black'
                }}>{this.state.firstName}</Text>
                
            </View>
            <ScrollView style={{backgroundColor: 'white'}} >

            
            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}
            onPress={() => this.props.navigation.navigate('UserCreatedEventList', {id: this.state.userId, token: this.state.userToken})}>
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
                >My Events</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}
            onPress={() => this.props.navigation.navigate('AppSettings', {id: this.state.userId, token: this.state.userToken})}
            >
            <Image source={require('../images/DefaultProfile.png')} style={{justifyContent:'center', alignContent: 'center', height:50, width:50}} />
            <Text
                  style={{
                  fontSize: 25,
                  justifyContent:'center',
                  textAlign: 'left',
                  fontWeight:'bold',
                  marginLeft:10,
                  color: '#ff6666',
                  marginTop: 2
                }}>Account Setting</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 90, justifyContent:'flex-start', padding: 20,
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center',flexDirection:'row'}}
            onPress={() => this.props.navigation.navigate('AddEvent', {id: this.state.userId, token: this.state.userToken})}>
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

            

            

            <TouchableOpacity style={{ height: 90, justifyContent:'center',
            borderBottomColor:'gray', borderBottomWidth: 2, alignContent: 'center'}}
            onPress={() => this.LogOut()}
            >
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
      },
      avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
      }

    });
    AppRegistry.registerComponent(Preference, () => Preference);