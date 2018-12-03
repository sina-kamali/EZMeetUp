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
import { EventRegister } from 'react-native-event-listeners'

const mockData1 = [
  {
      label: 'Food',
      value: 1
  },
  {
      label: 'Events',
      value: 2
  },
  {
      label: 'Sports',
      value: 3
  },
  {
    label: 'Car Pool',
    value: 4
  },
  {
  label: 'Conference',
  value: 5
  },
  {
  label: 'Entertainment',
  value: 6
  }
];

const participants = [
  {
    label: 'Open',
    value: 0
    },
    {
      label: 'Limited',
      value: 1
      }
];

export default class AddEvent extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      isDateTimePickerVisible: false,
      selectedDate: "Event Date*",
      avatarSource: null,
      videoSource: null,
      EventName:"",
      EventAddress1:"",
      EventAddress2:"",
      EventCity:"",
      EventProvince:"ON",
      EventPostalCode:"",
      EventLocation:"",
      EventLimit:"em",
      capacity:0,
      catagory:"",
      description:"",
      userId:"",
      token:""


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

    const myDate = date.toString().split(' ');
    myDate.pop();
    myDate.pop();
    myDate.pop();
    
    this.setState({ selectedDate: myDate.join(" ") });
    
    this._hideDateTimePicker();
  };

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');
    this.state.userId = id;
    this.state.token = token;
    this.state.eveProv = 'ON'


  }

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
    if(this.state.EventName == ""){
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

  address1Valid(){
    if(this.state.EventAddress1 ==""){
      return true;
    } else {
      return false;
    }
  }

  cityValid(){
    if(this.state.EventCity ==""){
      return true;
    } else {
      return false;
    }
  }

  provinceValid(){
    if(this.state.EventProvince ==""){
      return true;
    } else {
      return false;
    }
  }

  postalCodeValid(){
    var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    //format.test(this.state.lname)
    if(regex.test(this.state.EventPostalCode)){
      return false;
    } else {
      return true;
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

    console.log(this.state.catagory);
    if(this.state.catagory == ""){
      return true;
    }
    else {
      return false;
    }
  }

  limiValid(){
    
    if(this.state.EventLimit == "em" ){
      return true;
    }
    else{
      return false;
    }
  }

  limitExtra(){
    if(this.state.EventLimit == 1){
      return true;
    }
    else {
      return false;
    }
  }

  capacityValid(){
    if(this.limitExtra()){
      if(this.state.capacity == 0) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }

  }
  descriptionValid(){
    if(this.state.description == ""){
      return true;
    }
    else {
      return false;
    }
  }

  addEvent(){
    console.log(this.nameValid() );
    console.log(this.address1Valid());
    console.log(this.cityValid());
    console.log(this.provinceValid());
    console.log(this.postalCodeValid());
    // console.log(this.locationValid());
    console.log(this.dateValid() );
    console.log(this.limiValid() );
    console.log(this.catagoryValid());

    if(!this.nameValid() && !this.address1Valid() && !this.cityValid() && !this.provinceValid() && !this.postalCodeValid() && !this.dateValid() && !this.limiValid() && !this.catagoryValid() && !this.descriptionValid()){

      if(!this.capacityValid()){
        this.onFetchAddEvent();
      }
      else {
        Alert.alert("Add Event Failed!", "Please fill all the necessary fields!");
      }

    }
    else{
      console.log(this.nameValid() );
      console.log(this.address1Valid());
      console.log(this.cityValid());
      console.log(this.provinceValid());
      console.log(this.postalCodeValid());
    //   console.log(this.locationValid());
      console.log(this.dateValid() );
      console.log(this.limiValid() );
      console.log(this.catagoryValid());
      Alert.alert("Add Event Failed!", "Please fill all the necessary fields!");
    }
    // {
    //   "eventName": "Test123",
    //   "eventLocation": "Toronto",
    //   "eventDescription": "This is test description",
    //   "eventDate": "2018/11/11",
    //   "userId": 1,
    //   "categoryIds": [1, 2]
    // }
  }

  async onFetchAddEvent() {
    //Match the back-end whit these keys
    const events = [];
    events.push(this.state.catagory);
    var data = {
      eventName: this.state.EventName,
      eventAddress1: this.state.EventAddress1,
      eventAddress2: this.state.EventAddress2,
      eventCity: this.state.EventCity,
      eventProvince: this.state.EventProvince,
      eventPostalCode: this.state.EventPostalCode.toUpperCase(),
      eventDescription: this.state.description,
      eventDate: this.state.selectedDate,
      userId: this.state.userId,
      categoryIds: events,
      eventCapacity: this.state.capacity

    };
    const token = this.state.token;
    console.log(data);
    console.log("********************************* image ********************************");
    // console.log(this.state.avatarSource);
    try {
        
        let formdata = new FormData();
        formdata.append("request", JSON.stringify(data));
        if(this.state.avatarSource != null) {
            let imageName = this.state.avatarSource.uri.split("/").slice(-1)[0];
            formdata.append("eventImage", {
                uri: this.state.avatarSource.uri,
                name: imageName,
                type: 'image/jpg' }
            );
        }
        console.log("***************** formdata ********************");
        console.log(formdata);
     let response = await fetch(
       // change this link to our link
      "http://myvmlab.senecacollege.ca:6282/api/events/create",
      {
        // A post request which sends a json whit data objes keys
        method: "POST",
        headers: {
         "Content-Type": "multipart/form-data",
          'authtoken': token 
        },
       body: formdata
     }
    );
     console.log(response)
     if (response.status >= 200 && response.status < 300) {
      EventRegister.emit('myCustomEvent',{});
      this.props.navigation.navigate('Preference');
     }
     else{
      Alert.alert("Add Event Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
     }
   } catch (errors) {
    Alert.alert("Add Event Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
    } 
  }

  

  render() {
    const eveName = this.nameValid();
    const eveAdd1 = this.address1Valid();
    const eveCity = this.cityValid();
    const eveProv = this.provinceValid();
    const evePost = this.postalCodeValid();
    // const eveLoc = this.locationValid();
    const eveDate = this.dateValid();
    const eveCat = this.catagoryValid();
    const eveDesc = this.descriptionValid();
    const eveLimit = this.limiValid();
    const eveExtra = this.limitExtra();
    const eveCap = this.capacityValid();
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
                    onChangeText={(EventAddress1) => this.setState({EventAddress1})}
                  placeholder="Event Address1*"
                />
                <AnimatedHideView
                  visible={eveAdd1}
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
                    onChangeText={(EventAddress2) => this.setState({EventAddress2})}
                  placeholder="Event Address2"
                />

                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    onChangeText={(EventCity) => this.setState({EventCity})}
                  placeholder="Event City*"
                />
                <AnimatedHideView
                  visible={eveCity}
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
                    color:'black',
                    fontWeight:'bold',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    onChangeText={(EventProvince) => this.setState({EventProvince})}
                    value={this.state.eveProv}
                    editable={false}
                />
                <AnimatedHideView
                  visible={eveProv}
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
                    onChangeText={(EventPostalCode) => this.setState({EventPostalCode})}
                  placeholder="Event PostalCode*"
                />
                <AnimatedHideView
                  visible={evePost}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty.{'\n'}The correct format is A1B 2C3
                  </Text>
                </AnimatedHideView>

                {/* <TextInput
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
                </AnimatedHideView> */}


            
                  <TextInput
                  style={{borderWidth: 2,
                    padding:10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                   // Inherit any props passed to it; e.g., multiline, numberOfLines below
                  editable = {true}
                  maxLength={300}
                  multiline
                  onChangeText={(description) => this.setState({description})}
                  placeholder="Event Description*"
                />

                <AnimatedHideView
                  visible={eveDesc}
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
                  minimumDate={new Date()}
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
                   label='Attendance Limitation*'
                   data={participants}
                   onChangeText={(EventLimit) => this.setState({EventLimit})}
                 />
                 </View>
             </View>
             <AnimatedHideView
                  visible={eveLimit}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
                  </Text>
                </AnimatedHideView>
             <AnimatedHideView
                  visible={eveExtra}
                  unmountOnHide={true}
                >
                  <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    keyboardType={"decimal-pad"}
                    onChangeText={(capacity) => this.setState({capacity})}
                  placeholder="Numer of participants"
                />
                </AnimatedHideView>
                <AnimatedHideView
                  visible={eveCap}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
                  </Text>
                </AnimatedHideView>

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
                    onChangeText={(catagory) => this.setState({catagory})}
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
              
              
              <TouchableOpacity style={{marginTop: 20, marginBottom: 20}}
               onPress={() => this.addEvent()}>
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