import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider, ScrollView} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';
import CheckboxFormX from 'react-native-checkbox-form';

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
	    isLoading: true,
        userId: 0,
        userToken: 0,
        firstName: "",
        lastName: "",
		email: "",
		phone: "",
		password: "",
		categories1: [],
        categories2: []
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
      this.state.categories1 = emArray;
    } else {
      this.state.categories2 = emArray;
    }
  };
  
  componentWillMount() {
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
            lastName: responseJson.lastName,
			email: responseJson.email,
			phone: responseJson.phoneNumber
          }, function(){
            console.log(responseJson);
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

async onFetchUpdate() {

  var data = {
    email: this.state.email,
    password: this.state.password,
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    phoneNumber: this.state.phone,
    categoryIds: this.state.catagories1.concat(this.state.catagories2)
  };
  try {
   let response = await fetch('http://myvmlab.senecacollege.ca:6282//api/users/' + this.state.userId,
    {
      // A post request which sends a json
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
      actions: [NavigationActions.navigate({ routeName: 'Preference'})]
    });
    
    this.props.navigation.dispatch(resetAction);
   }
   else{
    Alert.alert("Registration Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
   }
 } catch (errors) {
  Alert.alert("Registration Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
  } 
}	
	
  static navigationOptions = {
    title: 'Profile Setting',
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
					onChangeText={(firstName) => this.setState({firstName})}
                  value={this.state.firstName}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                    onChangeText={(lastName) => this.setState({lastName})}
                  value={this.state.lastName}
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
                    onChangeText={(password) => this.setState({password})}
                  placeholder='Password*'
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
                  placeholder='Retype Password*'
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
                    onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5,
                    marginBottom:15
                  }}
                  autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    onChangeText={(phone) => this.setState({phone})}
                  value={this.state.phone}
                />
			  <View style={{flexDirection: 'column', width: 330, marginTop: 10}}>
                <Text
                style={{backgroundColor: 'white',
                fontSize:20,
                textAlign: 'left',
                width: 350 - 20,
                paddingLeft: 5
              }}>Interests</Text>
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
			  <CheckboxFormX
                  style={{ width: 350 - 20}}
                  backgroundColor='white'
                  padding={10}
                  dataSource={mockData2}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={30}
                  formHorizontal={true}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />
			  </View>
                <TouchableOpacity style={{marginTop: 20}}>
                    <Text style = {styles.buttons}>
                    Update
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 20, marginBottom: 20}}>
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