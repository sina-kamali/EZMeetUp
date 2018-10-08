import React, {Component} from 'react';
import {Alert, AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, TextInput, ScrollView,CheckBox,} from 'react-native';
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



export default class CreateEvent extends Component {

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
    title: 'CREATE EVENT',
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
                  placeholder="Event Name"
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                  placeholder='Location'
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                  placeholder='Time'
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
				  keyboardType = 'numeric'
                  placeholder='Number of Participants'
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                  placeholder='Starting Date'
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
                  placeholder='Ending Date'
                />
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
                <TouchableOpacity style={{marginTop:10}}
                    onPress={() => this.props.navigation.navigate('Event')}>					
                    <Text style = {styles.buttons}>
                    Create 
                    </Text>
				</TouchableOpacity>
				<TouchableOpacity style={{marginTop:10}}
                    onPress={() => this.props.navigation.navigate('Event')}>					
                    <Text style = {styles.buttons}>
                    Discard 
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
  AppRegistry.registerComponent(CreateEvent, () => CreateEvent);