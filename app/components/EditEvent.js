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

export default class EditEvent extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      isDateTimePickerVisible: false,
      
      avatarSource: null,
      videoSource: null,
      
      selectedDate: "Event Date*",
      EventName:"",
      EventAddress1:"",
      EventAddress2:"",
      EventCity:"",
      EventProvince:"",
      EventPostalCode:"",
      EventLocation:"",
      EventLimit:"em",
      capacity:0,
      catagory:"",
      description:"",
      
      SavedEveId:0,
      SavedEventName:"",
      SavedEventAddress1:"",
      SavedEventAddress2:"",
      SavedEventCity:"",
      SavedEventProvince:"",
      SavedEventPostalCode:"",
      SavedEventLocation:"",
      SavedEventLimit:"em",
      Savedcapacity:0,
      Savedcatagory:"",
      Saveddescription:"",
      SavedselectedDate:"",
      Savedimage: null,
      SavedDate: "",

      userId:"",
      token:"",
      EveId:""


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
      //console.log('Response = ', response);

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
          avatarSource: source,
          Savedimage: null

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

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');
    const event = navigation.getParam('curEvent');
    this.state.userId = id;
    this.state.token = token;
    if(typeof event != undefined){
      this.setState({
        EveId: event.id,
        EventName: event.eventName,
        EventAddress1: event.eventAddress1,
        EventCity: event.eventCity,
        EventProvince: event.eventProvince,
        EventPostalCode: event.eventPostalCode,
        EventLocation: event.eventLocation,
        description: event.eventDescription,


        
        SavedEventName: event.eventName,
        SavedEventAddress1: event.eventAddress1,
        SavedEventCity: event.eventCity,
        SavedEventProvince: event.eventProvince,
        SavedEventPostalCode: event.eventPostalCode,
        SavedEventLocation: event.eventLocation,
        Saveddescription: event.eventDescription,
        Savedimage: event.event_images[0].image,
        avatarSource: ""
      });

      
      const eDate = event.eventDate.split('T');
      var loc2 = ""
      if(event.eventAddress2 != null) {
        loc2 = event.SavedeventAddress2;
      } 

      if(event.eventCapacity == 0){
        this.state.EventLimit = 0;
        this.state.capacity = 0;

        this.state.SavedEventLimit = 0;
        this.state.Savedcapacity = 0;
      } else {
        this.state.EventLimit = 1;
        this.state.capacity = event.eventCapacity;

        this.state.SavedEventLimit = 1;
        this.state.Savedcapacity = event.eventCapacity;
      }

     
      if(event.event_categories[0].categoryId != undefined){
        this.state.catagory = event.event_categories[0].categoryId;
        console.log(event.event_categories[0].categoryId);

        this.state.Savedcatagory = event.event_categories[0].categoryId;
      }
      

      this.setState({
        SavedDate: eDate[0],
        SavedeventAddress2: loc2,
        selectedDate: eDate[0]
      });
    }
  }

  // ======================= START - Getters =======================

  getName(){
    return this.state.EventName;
  }
  getDate(){
    return this.state.selectedDate;
  }
  getAdd1(){
    return this.state.EventAddress1;
  }
  getAdd2(){
    return this.state.EventAddress2;
  }
  getCity(){
    return this.state.EventCity;
  }
  getProv(){
    return this.state.EventProvince;
  }
  getPostal(){
    return this.state.EventPostalCode;
  }
  getLoc(){
    return this.state.EventLocation;
  }
  getLim(){
    return this.state.EventLimit;
  }
  getCap(){
  
    return String(this.state.capacity);
  }
  getCat(){
    return this.state.catagory;
  }
  getDec(){
    return this.state.description;
  }


  // ======================= END - Getters =======================

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
   // ======================= START - Text Fields Validations =======================
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
    if(this.state.EventPostalCode ==""){
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
  // ======================= END - Text Fields Validations =======================

  // ======================= START - Data Has Been Changed Validation =======================

  HasChanged(){

    var counter = 11;

    if(this.state.EventName != this.state.SavedEventName){
      //console.log("a");
      counter--;
    }
    if(this.state.selectedDate != this.state.SavedDate){
      //console.log("b");
      counter--;
    }
    if(this.state.EventAddress1 != this.state.SavedEventAddress1){
      //console.log("c");
      counter--;
    }
    if(this.state.EventAddress2 != this.state.SavedEventAddress2){
      //console.log("d");
      counter--;
    }
    if(this.state.EventCity != this.state.SavedEventCity){
      //console.log("e");
      counter--;
    }
    if(this.state.EventPostalCode != this.state.SavedEventPostalCode){
      //console.log("f");
      counter--;
    }
    if(this.state.EventLimit != this.state.SavedEventLimit){
      //console.log("g");
      counter--;
    }
    if(this.state.capacity != this.state.Savedcapacity){
      //console.log("h");
      counter--;
    }
    if(this.state.catagory != this.state.Savedcatagory){
      //console.log("i");
      counter--;
    }
    if(this.state.description != this.state.Saveddescription){
      //console.log("j");
      counter--;
    }
    if(this.state.EventLocation != this.state.SavedEventLocation){
      //console.log("k");
      counter--;
    }

    if(counter < 11){
      this.onFetchAddEvent();
    }
    else {
      Alert.alert("Update Event Failed!", "Please Modify Your Event!");
    }

  }


   // ======================= END - Data Has Been Changed Validation =======================

  addEvent(){

    if(!this.nameValid() && !this.address1Valid() && !this.cityValid() && !this.provinceValid() && !this.postalCodeValid() && !this.dateValid() && !this.limiValid() && !this.catagoryValid() && !this.descriptionValid()){

      if(!this.capacityValid()){
        //this.onFetchAddEvent();
        this.HasChanged();
      }
      else {
        Alert.alert("Add Event Failed!", "Please fill all the necessary fields!");
      }

    }
    else{
      Alert.alert("Add Event Failed!", "Please fill all the necessary fields!");
    }
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
      eventPostalCode: this.state.EventPostalCode,
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
        
        if(this.state.avatarSource != "") {
            let imageName = this.state.avatarSource.uri.split("/").slice(-1)[0];
            formdata.append("eventImage", {
                uri: this.state.avatarSource.uri,
                name: imageName,
                type: 'image/jpg' }
            );
        }
        console.log("***************** formdata ********************");
        console.log(formdata);
        const id = this.state.userId;
        const eventId = this.state.EveId;
     let response = await fetch(
       // change this link to our link
      "http://myvmlab.senecacollege.ca:6282/api/users/"+id+"/events/edit/"+eventId,
      {
        // A post request which sends a json whit data objes keys
        method: "PUT",
        headers: {
         "Content-Type": "multipart/form-data",
         "Accept": "application/json",
          'authtoken': token 
        },
       body: formdata
     }
    );
     
     if (response.status >= 200 && response.status < 300) {
      EventRegister.emit('myCustomEvent',{});
      this.props.navigation.navigate('Preference');
     }
     else{
      Alert.alert("Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
     }
   } catch (errors) {
     console.log(errors);
    Alert.alert("Add Event Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
    } 
  }

  

  render() {
    const eveName = this.nameValid();
    const eveAdd1 = this.address1Valid();
    const eveCity = this.cityValid();
    const eveProv = this.provinceValid();
    const evePost = this.postalCodeValid();
    const eveDate = this.dateValid();
    const eveCat = this.catagoryValid();
    const eveDesc = this.descriptionValid();
    const eveLimit = this.limiValid();
    const eveExtra = this.limitExtra();
    const eveCap = this.capacityValid();

  //  ============== Getter ============

  const Savedname = this.getName();
  const SavedDate = this.getDate();
  const SavedAdd1 = this.getAdd1();
  const SavedAdd2 = this.getAdd2();
  const SavedCity = this.getCity();
  const SavedProv = this.getProv();
  const SavedPostal = this.getPostal();
  const SavedLoc = this.getLoc();
  const SavedLim = this.getLim();
  const SavedCap = this.getCap();
  const SavedCat = this.getCat();
  const SavedDec = this.getDec();

//<Image style={styles.avatar} source={this.state.avatarSource} />

    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <Text style={{color: 'white', paddingLeft: 15, fontWeight: 'bold', paddingTop: 10}}>* These fields are required!</Text>
              <View style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
                
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                { this.state.avatarSource === null ? <Text style={{textAlign:"center", fontWeight:"bold"}}>Select to upload your event picture</Text> :
                  this.state.Savedimage === null ? <Image style={styles.avatar} source={this.state.avatarSource} /> : <Image style={styles.avatar} source={{uri: this.state.Savedimage}} />
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
                    value = {Savedname}
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
                    value = {SavedAdd1}
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
                    value = {SavedAdd2}
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
                    value = {SavedCity}
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
                    fontSize:20,
                    width: 330,
                    marginTop: 10}}
                    onChangeText={(EventProvince) => this.setState({EventProvince})}
                    value={SavedProv}
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
                    value = {SavedPostal}
                    onChangeText={(EventPostalCode) => this.setState({EventPostalCode})}
                  placeholder="Event PostalCode*"
                />
                <AnimatedHideView
                  visible={evePost}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>
                    Field cannot be empty
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
                  value = {SavedDec}
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
                      {SavedDate}
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
                   value={SavedLim}
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
                    value={SavedCap}
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
                    value ={SavedCat}
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
                    Update Event!
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
  AppRegistry.registerComponent(EditEvent, () => EditEvent);