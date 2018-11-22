import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, 
    ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider, PixelRatio} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';
import CheckboxFormX from 'react-native-checkbox-form';
import AnimatedHideView from 'react-native-animated-hide-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';

const mockData1 = [
  {
      label: 'Food',
      value: 1,
      RNchecked : false
  },
  {
      label: 'Events',
      value: 2,
      RNchecked : false
  },
  {
      label: 'Sports',
      value: 3,
      RNchecked : false
  },
  {
    label: 'Car Pool',
    value: 4,
    RNchecked : false
  },
  {
  label: 'Conference',
  value: 5,
  RNchecked : false

  },
  {
  label: 'Entertainment',
  value: 6,
  RNchecked : false
  }
];

export default class AddEvent extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      catagories1: [],
      catagories2: [],
      isDateTimePickerVisible: false,
      selectedDate: "Event Date*",
      avatarSource: null,
      videoSource: null,
      EventName:"",
      EventLocation:"",


      
    }
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {

    const myDate = date.toString().split('G');
    this.setState({ selectedDate: myDate[0] });
    this._hideDateTimePicker();
  };

  static navigationOptions = {
    title: 'Add Event',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  nameValid(){
    if(this.state.eveName == ""){
      console.log("yes")
      return true;
    } else {
      return false;
    }
  }

  locationValid(){
    if(this.state.EventLocation ==""){
      return true;
    } else {
      return false;
    }
  }

  dateValid(){
    if(this.state.selectedDate =="Event Date*" ){
      return true;
    }
    else{
      return false;
    }
  }

  catagoryValid(){
    if(this.state.catagories1.length == 0 && this.state.catagories2.length == 0){
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    const eveName = this.nameValid();
    const eveLoc = this.locationValid();
    const eveDate = this.dateValid();
    const eveCat = this.catagoryValid();
    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <Text style={{color: 'white', paddingLeft: 15, fontWeight: 'bold', paddingTop: 10}}>* These fields are required!</Text>
              <View style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
                
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                { this.state.avatarSource === null ? <Text style={{textAlign:"center", fontWeight:"bold"}}>Select to upload your event picture</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
                </View>
              </TouchableOpacity>
              </View>
              <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    onChangeText={(EventName) => this.setState({EventName})}
                  placeholder="Event Name*"
                />

                <AnimatedHideView
                  visible={eveName}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
                  </Text>
                </AnimatedHideView>

                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    onChangeText={(EventLocation) => this.setState({EventLocation})}
                  placeholder="Event Location*"
                />
                <AnimatedHideView
                  visible={eveLoc}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
                  </Text>
                </AnimatedHideView>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <View >
                    <Text style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    >
                      {selectedDate}
                    </Text>
                  </View>
                </TouchableOpacity>
                <AnimatedHideView
                  visible={eveDate}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
                  </Text>
                </AnimatedHideView>

                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    keyboardType={"decimal-pad"}
                  placeholder="Numer of participants"
                />
                
                <View style={{flexDirection: 'column', width: 330, marginTop: 10}}>
                 
                  <View style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}>
                  <Dropdown
                    label='Event Catagory*'
                    data={mockData1}
                  />
                  </View>
                  
              </View>
              <AnimatedHideView
                  visible={eveCat}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    You must select at least one catagory
                  </Text>
                </AnimatedHideView>
              
              
              <TouchableOpacity style={{marginTop: 20, marginBottom: 20}}>
                  <Text style = {styles.buttons}>
                    Add New Event!
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 5, marginBottom: 20}}
              onPress={() => this.props.navigation.navigate('Preference')}>
                  <Text style = {styles.buttons}>
                    Cancel
                  </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
              

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
    width: 150,
    height: 150
  }

});
  AppRegistry.registerComponent(AddEvent, () => AddEvent);