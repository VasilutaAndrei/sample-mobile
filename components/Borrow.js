import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Alert, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Header} from 'react-native-elements';

export default class Borrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student : '',
      availableBooks : [],
      isLoading : true
    };
  }

  componentDidMount() {
    this.getAvailableBooks();
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("ownerName");
      if (value !== null) {
        // We have data!!
        this.setState({
          student: value
        });
        this.getAllBooks();
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getAvailableBooks = () => {
    fetch("http://192.168.43.227:2501/available", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          availableBooks: responseJson,
          isLoading: false
        });
        console.log(responseJson);
      })
      .catch(error => {
        Alert.alert('Error:', error);
      });
  };

  confirmBorrow = (bID) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to borrow it?',
      [
        {text: 'Yes', onPress: () => this.borrowBook(bID)},
        {text: 'No'},
      ],
      {cancelable: false},
    );
  };

  borrowBook = (bID) => {
    fetch("http://192.168.43.227:2501/borrow/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        id: bID,
        student : this.state.student
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.id == bID && responseJson.status === 'borrowed') {
          Alert.alert("Borrowed", 'You have borrowed ' + responseJson.title + '. Enjoy reading it!');
          this.getAvailableBooks();
        } else {
          Alert.alert("Something went wrong.");
        }
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
          centerComponent={{ text: 'Borrow', style: { color: '#fff' } }}
        />
        <View
          style={{
            marginTop: 50,
            flexDirection: "column"
          }}
        >
          <FlatList
            data={this.state.availableBooks}
            style={{height:350}}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 40,
                  marginHorizontal : 10
                }}
                onPress={() => this.confirmBorrow(item.id)}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={{width : 150}}>{item.title}</Text>
                <Text>Pages: {item.pages} Status:{item.status}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </>
    );
  }
}
