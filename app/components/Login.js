import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, TextInput,Alert,TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation'


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
    }
  }


  UserLoginFunction = () =>{
    const { Username }  = this.state ;
    const { Password }  = this.state ;

    if(Username !='' && Password !=''){
      Alert.alert("Authentication", "Username: " + Username +" \nPassword: "+ Password);
      // sending post requests in here
      this.onFetchLoginRecords()
    } 
    else {
      //Alert.alert("Login Failed!", "Invalid Username or Password! \nPlease try again. ");
      this.props.navigation.navigate('Preference')
    }
  }

  static navigationOptions = {
    title: 'LOG IN',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  async onFetchLoginRecords() {
    //Match the back-end whit these keys
    var data = {
      Username: this.state.Username,
      Password: this.state.Password
    };
    try {
     let response = await fetch(
       // change this link to our link
      "http://yourdomain.com",
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
        // if successfull goes to user's Preference page or dashboard
        this.props.navigation.navigate('Preference')
     }
   } catch (errors) {
     alert(errors);
    } 
}
  render() {
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    returnKeyLabel="Next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(Username) => this.setState({Username})}
                  placeholder="Username"
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                    returnKeyLabel="Go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={(input)=> this.passwordInput = input}
                    onChangeText={(Password) => this.setState({Password})}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <TouchableOpacity style={{marginTop:10}}
                //onPress={() => this.props.navigation.navigate('Preference')}
                onPress={() => this.UserLoginFunction()}
                >
                    <Text style = {styles.buttons}>
                    LOG IN
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:10}}
                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={{color: 'white'}}>
                    Forgot Password!
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
  AppRegistry.registerComponent(Login, () => Login);