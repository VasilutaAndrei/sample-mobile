import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Alert, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Borrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student : '',
      availableBooks : []
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
      })
      .catch(error => {
        console.error(error);
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
        console.log(responseJson);
        if (responseJson.id == bID && responseJson.status === 'borrowed') {
          Alert.alert("Borrowed");
          this.getAvailableBooks();
        } else {
          Alert.alert("Not Borrowed");
        }
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View
        style={{
          marginTop: 50,
          flexDirection: "column"
        }}
      >
        <ScrollView style={{
          height: 350
        }}>
          <FlatList
            data={this.state.availableBooks}
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
        </ScrollView>
      </View>
    );
  }
}
