import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import { Dropdown } from 'react-native-material-dropdown';
import CheckboxFormX from 'react-native-checkbox-form';
import AnimatedHideView from 'react-native-animated-hide-view';
import DateTimePicker from 'react-native-modal-datetime-picker';


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

export default class AddEvent extends Component {

  constructor(){
    super();
    this.state ={
      check:false,
      catagories1: [],
      catagories2: [],
      isDateTimePickerVisible: false,
      selectedDate: "Event Date",


      
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };

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

  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <Text style={{color: 'white', paddingLeft: 15, fontWeight: 'bold', paddingTop: 10}}>* These fields are required!</Text>
              <View>
                <Text>A place holder for image</Text>
              </View>
              <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                  placeholder="Event Name*"
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                  placeholder="Event Location*"
                />
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <View >
                    <Text style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    >
                      {selectedDate}
                    </Text>
                  </View>
                </TouchableOpacity>

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
                    marginTop: 20}}
                  placeholder="Numer of participants"
                />
                
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
                        onUncheck = {(item) => this._onDeSelect(item)}
                        onChecked = {(item) => this._onSelect(item)}
                    />
                  </View>
              </View>
              
              
              <TouchableOpacity style={{marginTop: 20, marginBottom: 20}}>
                  <Text style = {styles.buttons}>
                    Add New Event!
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
  AppRegistry.registerComponent(AddEvent, () => AddEvent);