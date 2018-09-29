import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView,CheckBox,} from 'react-native';
import {createStackNavigator} from 'react-navigation'

const checkboxes = [
  {
    name: 'check-box-1',
    key: 'checkBox1',
    label: 'Check Box 1',
  },
  {
    name: 'check-box-2',
    key: 'checkBox2',
    label: 'Check Box 2',
  },
  {
    name: 'check-box-3',
    key: 'checkBox3',
    label: 'Check Box 3',
  },
  {
    name: 'check-box-4',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
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
            <View style={styles.container}>
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
                  // onChangeText={(text) => this.setState({text})}
                  placeholder='Phone Number'
                />
                <View style={{ flexDirection: 'column'}}>
                  <CheckBox
                      value={this.state.checked}
                      onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                  <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                      value={this.state.checked}
                      onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text style={{marginTop: 5}}> this is checkbox</Text>
                  </View>
                </View>
              
                <TouchableOpacity style={{marginTop:50}}>
                    <Text style = {styles.buttons}>
                    SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
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