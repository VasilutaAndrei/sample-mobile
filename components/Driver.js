import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  AsyncStorage,
  FlatList,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  Header
} from 'react-native-elements';
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
        driver : '',
        myCabs : [],

      ownerName : '',
      studentBooks : [],
      bookTitle : '',
      bookPages : '',
      bookUserCount : '',
      isLoading: false
    };
  }

  componentDidMount() {
    this._retrieveData();
  }

  addBook = () => {
    this.setState({
      isLoading: false
    });
    fetch("http://192.168.43.227:2501/book/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title : this.state.bookTitle,
        student : this.state.ownerName,
        pages : this.state.bookPages,
        usedCount : this.state.bookUserCount
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          this.getAllBooks();
        }
        console.log(responseJson);
      })
      .then(this.getAllBooks())
      .then(
        this.setState({
          isLoading: true
        })
      )
      .catch(error => {
        Alert.alert('Error:', error);
      });
  };
  saveDriver = text => {
    this.setState(
      {
        driver: text
      },
      () => this._storeData()
    );
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("driver", this.state.driver);
    } catch (error) {
      Alert.alert('Error:', error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("driver");
      if (value !== null) {
        // We have data!!
        this.setState({
            driver: value
        });
        this.getMyCabs();
      }
    } catch (error) {
      Alert.alert('Error:', error);
    }
  };

  getMyCabs = () => {
    fetch("http://192.168.0.100:1957/my/" + this.state.driver, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          myCabs: responseJson,
          isLoading: false
        });
        console.log(responseJson);
      })
      .catch(error => {
        Alert.alert('Error:', error);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Text>{'< Back'}</Text>
            </TouchableOpacity>
          }
          centerComponent={{ text: 'Driver', style: { color: '#fff' } }}
        />
        <View
          style={{
            flexDirection: "column",
            marginTop: 50
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Text>Driver name:</Text>
            <TextInput
              style={{
                width: 100
              }}
              placeholder="Driver Name"
              onChangeText={text => this.saveDriver(text)}
              value={this.state.driver}
            />
          </View>
          <FlatList
            style={{height:200}}
            data={this.state.myCabs}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
                onPress={() => Alert.alert('Cab details', 'Name: ' + item.name + '; Size: ' + item.size + '; Driver: ' + item.driver + '; Color: ' + item.color + '; Capacity: ' + item.capacity)}
              >
                <Text>Name : {item.name} Status:{item.status} Size:{item.size}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
          
        </View>
      </>
      
    );
  }
}

export default Driver;
