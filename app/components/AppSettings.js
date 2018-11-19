

import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, 
  ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView, Alert, ActivityIndicator,NetInfo, DeviceEventEmitter} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import CheckboxFormX from 'react-native-checkbox-form';
import AnimatedHideView from 'react-native-animated-hide-view';
import { EventRegister } from 'react-native-event-listeners'


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
  }
];

const mockData2 = [
  
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





export default class AppSettings extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      email: '',
      reemail:'',
      sendEmail:'',
      oldEmail:'',
      password: '',
      sendPassword:'',
      repassword: '',
      fname: '',
      sendFname:'',
      oldFname:'',
      lname: '',
      sendLname:'',
      oldLname:'',
      phone: '',
      sendPhone:'',
      oldPhone:'',
      catagories1: [],
      senCat1:[],
      oldCat1:[],
      catagories2: [],
      sendCat2:[],
      oldCat2:[],
      isLoading:true,
      ErrorMessage: "",
      token:"",
      isOnline: false

      
    }
  }

  chechBoxHandler(){
    this.setState({
      check:!this.state.check
    })
  }

  _onSelect = ( item ) => {
    var emArray = [];
  
    item.forEach( e => {
      if(e.RNchecked){
        emArray.push(e.value);
      } 
    });

    if(item[0].value == 1){
      this.state.catagories1 = emArray;
    } else {
      this.state.catagories2 = emArray;
    }
  };


  FnameValidation(){
    var format = /[ !@#$%^&*()+\=\[\]{};_:"\\|,.<>\/?]/;

    var result = false;
      if(this.state.fname == ''){
        result =  true;
      } 
      if(this.state.fname.length < 2){
        result =  true;
      }
      if(this.state.fname.length > 20){
        result =  true;
      }
      if(format.test(this.state.fname)){
        result =  true;
      }

      return result;
  }
  LnameValidation(){
    var format = /[ !@#$%^&*()+\=\[\]{};_:"\\|,.<>\/?]/;

    var result = false;
    if(this.state.lname == ''){
      result =  true;
    }
    if(this.state.lname.length < 2 ){
      result =  true;
    }
    if(this.state.lname.length > 20 ){
      result =  true;
    }
    if(format.test(this.state.lname)){
      result =  true;
    }
    return result;
}
PValidation(){
  // at least one number, one lowercase and one uppercase letter
  // at least six characters that are letters, numbers or the underscore
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
  var format = /[ !_@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
  
  var result = false;
  if(this.state.password.length < 8){
    result =  true;
  }
  if(this.state.password.length > 30){
    result =  true;
  }
  if(!format.test(this.state.password)){
    result =  true;
  }
  if(re.test(this.state.password)){
    result =  true;
  }
  return result;
}
RePValidation(){
  var result = false;

  if(this.state.repassword != this.state.password){
    result =  true;
  } 
  return result;
}
EValidation(){
  var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var result = false;

  if(!re.test(this.state.email)){
    result =  true;
  } 
  return result;
}
// ReEValidation(){
  
//   var result = false;

//   if(this.state.reemail != this.state.email){
//     result =  true;
//   } 
//   return result;
// }
PhValidation(){
  
  var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  
  var result = false;

  if(!re.test(this.state.phone)){
    result =  true;
  } 
  return result;
}

Register(){
  if(!(this.FnameValidation()) && !(this.LnameValidation()) && !(this.PValidation()) && !(this.RePValidation())
    && !(this.EValidation()) && !(this.PhValidation())){
      return true;
      
    }
    else {
      
      return false;
    }


}


SubmitInfo() {
  if(this.Register()){

    var UnchangedField = 4;

    // if(this.state.oldEmail !== this.state.email){
    //   UnchangedField--;
    //   this.state.sendEmail = this.state.email;
    // }
    if(this.state.password !== "EZMeetUp@123"){
      UnchangedField--;
      this.sendPassword = this.state.password;
    }
    if(this.state.oldFname !== this.state.fname){
      UnchangedField--;
      this.sendFname = this.state.fname;
    }
    if(this.state.oldLname !== this.state.lname){
      UnchangedField--;
      this.state.sendLname = this.state.lname;
    }
    if(this.state.oldPhone !== this.state.phone){
      UnchangedField--;
      this.state.sendPhone = this.state.phone;
    }

    var cat1Changed = false;

    this.state.catagories1.forEach( e => {
      if(this.state.oldCat1.length === 0){
        this.state.sendCat1.push(e);
        cat1Changed = true;
      }
      this.state.oldCat1.forEach(j => {
        if(e != j){
          this.state.senCat1.push(j);
          cat1Changed = true;
        }
      });
    });


    var cat2Changed = false;

    this.state.catagories2.forEach( k => {
      if(this.state.oldCat2.length === 0){
        this.state.sendCat2.push(k);
        cat2Changed = true;
      }
      this.state.oldCat2.forEach(l => {
        if(k != l){
          this.state.sendCat2.push(l);
          cat2Changed = true;
        }
      });
    });

    

    
    if(UnchangedField != 4 || cat1Changed || cat2Changed){
      //Alert.alert("good You changed something");
      
      this.onFetchRegister();
    } else {
      Alert.alert("Update Profile Failed!", "You did not change anything!");
    }
    
    

  } else {
    Alert.alert("Update Profile Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
  }
};

CanAcive() {
  if(!this.Register()){
    return 'gray'
  }
  else {
    return 'transparent'
  }
}

async onFetchRegister() {




   var data = {
    email: this.state.sendEmail,
    password: this.state.sendPassword,
    firstName: this.state.sendFname,
    lastName: this.state.sendLname,
    phoneNumber: this.state.sendPhone,
    categoryIds: this.state.catagories1.concat(this.state.catagories2)
  };

  try {
   let response = await fetch('http://myvmlab.senecacollege.ca:6282/api/users/' + this.state.userId,
    {
      // A post request which sends a json
      method: "PUT",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json",
       "authtoken":this.state.token
      },
     body: JSON.stringify(data)
   }
  );
   if (response.status >= 200 && response.status < 300) {
    EventRegister.emit('myCustomEvent',{});
    this.props.navigation.navigate('Preference');
   }
   else{
    Alert.alert("Update profile Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
   }
 } catch (errors) {
  
  Alert.alert("Update profile Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
  } 
}

  static navigationOptions = {
    title: 'App Settings',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');
    this.state.userId = id;
    this.state.token = token;


    fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+ id,
    {
      headers: { 
      	'authtoken': token 
      	}
    })
      .then((response) => response.json())
      .then((responseJson) => {

        const cat = responseJson.user_categories;

        cat.forEach(e => {

          mockData1.forEach(k => {
            if(k.value == e.categoryId){
              k.RNchecked = true;
              this.state.oldCat1.push(k.value);
              this.state.catagories1.push(k.value);
            }
          });
          mockData2.forEach(j => {
            if(j.value == e.categoryId){
              j.RNchecked = true;
              this.state.oldCat2.push(j.value);
              this.state.catagories2.push(j.value);
            }
          });
        });

        this.setState({
          isLoading: false,
          email: responseJson.email,
          oldEmail: responseJson.email,
          reemail: responseJson.email,
          password: "EZMeetUp@123",
          repassword: "EZMeetUp@123",
          fname: responseJson.firstName,
          oldFname:responseJson.firstName,
          lname: responseJson.lastName,
          oldLname: responseJson.lastName,
          phone: responseJson.phoneNumber,
          oldPhone:responseJson.phoneNumber

        }, function(){
          //console.log(responseJson);
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  getName(){
    return this.state.fname;
  }

  getLname(){
    return this.state.lname;
  }

  getPassword(){
    return this.state.password;
  }

  getConfirmPass(){
    return this.state.repassword
  }

  getEmail(){

    return this.state.email;
  }

  // getConfirmEmail(){

  //   return this.state.reemail;
  // }

  getPhone(){
    return this.state.phone;
  }

  getEventCat1(){
    return this.state.catagories1;
  }

  getEventCat2(){
    return this.state.catagories2;
  }


  render() {


    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
      if(!isConnected){
        this.props.navigation.navigate('Home');
      }
    });



    const FnameError = this.FnameValidation();
    const LnameError = this.LnameValidation();
    const PasswordError = this.PValidation();
    const RePasswordError = this.RePValidation();
    const EmailError = this.EValidation();
    //const ReEmailError = this.ReEValidation();
    const PhoneError = this.PhValidation();
    const allowSignUp = this.Register();
    const isVisible = this.CanAcive();
    var SavedName = this.getName();
    var SavedLname = this.getLname();
    var SavePassword = this.getPassword();
    var ConfirmPassword = this.getConfirmPass();
    var SavedEmail = this.getEmail();
    // var ConfirmEmail = this.getConfirmEmail();
    var SavedPhone = this.getPhone();
    var SavedEventCat1 = this.getEventCat1();
    var SavedEventCat2 = this.getEventCat2();

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
          <Text style={{color: 'white', paddingLeft: 15, fontWeight: 'bold', paddingTop: 10}}>* These fields are required!</Text>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    value={SavedName}
                  onChangeText={(fname) => this.setState({fname})}
                  placeholder="First Name*"
                />
                <AnimatedHideView
                  visible={FnameError}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Name must be between 2 and 20 characters, and can contain only (- and ')</Text>
                </AnimatedHideView>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1}}
                    value={SavedLname}
                  onChangeText={(lname) => this.setState({lname})}
                  placeholder='Last Name*'
                />
                <AnimatedHideView
                  visible={LnameError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>last name must be between 2 and 20 characters, and can contain only (- and ')</Text>
                </AnimatedHideView>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={SavePassword}
                    onChangeText={(password) => this.setState({password})}
                  placeholder='Password*'
                  secureTextEntry={true}
                />
                <AnimatedHideView
                  visible={PasswordError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Password must be between 8 and 30 characters, and must contain at least one special character (i.e !@#$%^) and one number</Text>
                </AnimatedHideView>
                
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1.1}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={ConfirmPassword}
                    onChangeText={(repassword) => this.setState({repassword})}
                  placeholder='Retype Password*'
                  secureTextEntry={true}
                />
                <AnimatedHideView
                  visible={RePasswordError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Password and Retype password must match</Text>
                </AnimatedHideView>
               
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={SavedEmail}
                    editable={false}
                    onChangeText={(email) => this.setState({email})}
                  placeholder='Email*'
                />
                <AnimatedHideView
                  visible={EmailError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 340, fontSize: 18, fontWeight: 'bold'}}>Valid Email address: EZMeetUp@test.ca</Text>
                </AnimatedHideView>
                {/* <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={ConfirmEmail}
                    onChangeText={(reemail) => this.setState({reemail})}
                  placeholder='Retype Email*'
                />
                <AnimatedHideView
                  visible={ReEmailError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Retype email and email must match</Text>
                </AnimatedHideView> */}
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1,
                  }}
                  autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    value={SavedPhone}
                    onChangeText={(phone) => this.setState({phone})}
                  placeholder='Phone Number*'
                />
                <AnimatedHideView
                  visible={PhoneError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Phone number must be in format xxx-xxx-xxxx </Text>
                </AnimatedHideView>
                <View style={{flexDirection: 'column', width: 330, marginTop: 10}}>
                <Text
                style={{backgroundColor: 'white',
                fontSize:20,
                textAlign: 'left',
                paddingLeft: 5
              }}>Interests</Text>
                <View style={{flexDirection: 'row'}}>
                  <CheckboxFormX
                      backgroundColor='white'
                      padding={10}
                      dataSource={mockData1}
                      itemShowKey="label"
                      itemCheckedKey="RNchecked"
                      iconSize={30}
                      formHorizontal={false}
                      labelHorizontal={false}
                      onUncheck = {(item) => this._onDeSelect(item)}
                      onChecked={(item) => this._onSelect(item)}
                  />
                  <CheckboxFormX
                      backgroundColor='white'
                      padding={10}
                      dataSource={mockData2}
                      itemShowKey="label"
                      itemCheckedKey="RNchecked"
                      iconSize={30}
                      formHorizontal={false}
                      labelHorizontal={false}
                      //onChecked={(item) => this._onSelect(item)}
                      onUncheck = {(item) => this._onDeSelect(item)}
                      onChecked = {(item) => this._onSelect(item)}
                  />
                </View>
              </View>
              
              
                <TouchableOpacity style={{marginTop: 20, marginBottom: 20, backgroundColor: isVisible}}
                disabled={!allowSignUp}
                onPress={() => this.SubmitInfo()}
                >
                    <Text style = {styles.buttons}>
                    Update!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 10, marginBottom: 20}}
                onPress={() => this.props.navigation.navigate('Preference')}
                >
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
     }

  });
  AppRegistry.registerComponent(AppSettings, () => AppSettings);