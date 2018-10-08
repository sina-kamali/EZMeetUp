import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, 
  ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView, CheckBox,} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import CheckboxFormX from 'react-native-checkbox-form';

const mockData1 = [
  {
      label: 'Sports',
      value: 'Sports'
  },
  {
      label: 'City Events',
      value: 'City Events'
  },
  {
      label: 'Music',
      value: 'Music'
  },
  {
    label: 'Drinking',
    value: 'Drinking'
  },
  {
  label: 'Movies',
  value: 'Movies'
  },
  {
  label: 'Art',
  value: 'Art'
  }
];



export default class SignUp extends Component {

  constructor(){
    super();
    this.state ={
      check:false
    }
  }

  chechBoxHandler(){
    this.setState({
      check:!this.state.check
    })
  }

  _onSelect = ( item ) => {
    console.log(item);
  };

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
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
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
                  // onChangeText={(text) => this.setState({text})}
                  placeholder="First Name"
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Last Name'
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    autoCapitalize="none"
                    autoCorrect={false}
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Password'
                  secureTextEntry={true}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                    autoCapitalize="none"
                    autoCorrect={false}
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Retype Password'
                  secureTextEntry={true}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Email'
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5,
                    marginBottom:20
                  }}
                  autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="phone-pad"
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Phone Number'
                />
                <Text
                style={{backgroundColor: 'white',
                fontSize:20,
                textAlign: 'left',
                width: 350 - 20,
                paddingLeft: 5
              }}>Intrests</Text>
              <CheckboxFormX
                  style={{ width: 350 - 20}}
                  backgroundColor='white'
                  padding={10}
                  dataSource={mockData1}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={30}
                  formHorizontal={true}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />
                <TouchableOpacity style={{marginTop:50}}>
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