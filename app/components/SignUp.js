import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, 
  ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView, Alert} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import CheckboxFormX from 'react-native-checkbox-form';
import AnimatedHideView from 'react-native-animated-hide-view';


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





export default class SignUp extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      email: '',
      reemail:'',
      password: '',
      repassword: '',
      fname: '',
      lname: '',
      phone: '',
      catagories1: [],
      catagories2: []

      
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
    var format = /[ !@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/;

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
    var format = /[ !@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/;

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
ReEValidation(){
  
  var result = false;

  if(this.state.reemail != this.state.email){
    result =  true;
  } 
  return result;
}
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
    && !(this.EValidation()) && !(this.ReEValidation()) && !(this.PhValidation())){

      return true;
      
    }
    else {
      
      return false;
    }
}

SubmitInfo() {
  if(this.Register()){
    this.onFetchRegister();

  } else {
    Alert.alert("Registration Failed!", "Something went wrong please contact EZMeetUp support.\n Sorry for the invoice! ");
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
  //Match the back-end whit these keys
  var data = {
    email: this.state.email,
    password: this.state.password,
    firstName: this.state.fname,
    lastName: this.state.lname,
    phoneNumber: this.state.phone,
    isAdmin: false,
    categoryIds: this.state.catagories1.concat(this.state.catagories2)
  };
  try {
   let response = await fetch(
     // change this link to our link
    "http://myvmlab.senecacollege.ca:6282/api/users/register",
    {
      // A post request which sends a json whit data objes keys
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }
  );
   if (response.status >= 200 && response.status < 300) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login', params: {email: this.state.email}})]
    });
    
    this.props.navigation.dispatch(resetAction);
   }
   else{
    Alert.alert("Registration Failed!", "Something went wrong please contact EZMeetUp support.\n Sorry for the invoice! ");
   }
 } catch (errors) {
  Alert.alert("Registration Failed!", "Something went wrong please contact EZMeetUp support.\n Sorry for the invoice! ");
  } 
}

  static navigationOptions = {
    title: 'SIGN UP',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const FnameError = this.FnameValidation();
    const LnameError = this.LnameValidation();
    const PasswordError = this.PValidation();
    const RePasswordError = this.RePValidation();
    const EmailError = this.EValidation();
    const ReEmailError = this.ReEValidation();
    const PhoneError = this.PhValidation();
    const allowSignUp = this.Register();
    const isVisible = this.CanAcive();
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
                  onChangeText={(fname) => this.setState({fname})}
                  placeholder="First Name*"
                />
                <AnimatedHideView
                  visible={FnameError}
                  unmountOnHide={true}
                >
                  <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Name must be between 2 and 20 characters, and can contain only (- and _)</Text>
                </AnimatedHideView>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 1}}
                  onChangeText={(lname) => this.setState({lname})}
                  placeholder='Last Name*'
                />
                <AnimatedHideView
                  visible={LnameError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>last name must be between 2 and 20 characters, and can contain only (- and _)</Text>
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
                    onChangeText={(email) => this.setState({email})}
                  placeholder='Email*'
                />
                <AnimatedHideView
                  visible={EmailError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 340, fontSize: 18, fontWeight: 'bold'}}>Valid Email address: EZMeetUp@test.ca</Text>
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
                    onChangeText={(reemail) => this.setState({reemail})}
                  placeholder='Retype Email*'
                />
                <AnimatedHideView
                  visible={ReEmailError}
                  unmountOnHide={true}
                >
                <Text style={{color: 'white',width: 330, fontSize: 18, fontWeight: 'bold'}}>Retype email and email must match</Text>
                </AnimatedHideView>
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
              }}>Intrests</Text>
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
                    SIGN UP
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
  AppRegistry.registerComponent(SignUp, () => SignUp);