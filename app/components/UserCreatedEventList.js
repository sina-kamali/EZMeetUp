import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight,Slider,FlatList, ActivityIndicator} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";

export default class UserCreatedEventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      OrigData:[],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      userId: "",
      token: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const token = navigation.getParam('token');
    this.state.userId = id;
    this.state.token = token;
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    var uId = this.state.userId;
    var tk = this.state.token;

    fetch('http://myvmlab.senecacollege.ca:6282/api/users/'+ uId +'/events/created',
    {
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json",
      	'authtoken': tk 
      	}
    })
    
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          OrigData: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false

        }, function(){
          //console.log(responseJson);
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };



  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };


SearchFilterFunction(text){
      var arrayholder = this.state.OrigData;
     const newData = arrayholder.filter(function(item){
         const itemData = item.eventName.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         data: newData,
         text: text
     })
 }

  renderHeader = () => {
    return <SearchBar 
    placeholder="Type Here..." 
    onChangeText={(text) => this.SearchFilterFunction(text)}
    lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0}}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('EditEvent', {id: this.state.userId, token: this.state.token, curEvent: item})}
            >
              <ListItem
                roundAvatar
                title={`${item.eventName}`}
                subtitle={item.eventCity}
                avatar={{ uri: item.event_images[0].image}}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          //onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
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
     sectionHeader: {
         height: 50,
         flex: 1,
         backgroundColor: '#fff',
         justifyContent: 'center',
         paddingLeft: 10
     },
     header: {
         fontSize: 20,
     }

  });
  
  AppRegistry.registerComponent(UserCreatedEventList, () => UserCreatedEventList);