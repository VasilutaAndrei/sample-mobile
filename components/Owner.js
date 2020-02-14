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

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerName : '',
      studentBooks : [],
      bookTitle : '',
      bookPages : '',
      bookUserCount : '',
      isLoading: true
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
  saveOwnerName = text => {
    this.setState(
      {
        ownerName: text
      },
      () => this._storeData()
    );
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("ownerName", this.state.ownerName);
    } catch (error) {
      Alert.alert('Error:', error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("ownerName");
      if (value !== null) {
        // We have data!!
        this.setState({
          ownerName: value
        });
        this.getAllBooks();
      }
    } catch (error) {
      Alert.alert('Error:', error);
    }
  };

  getAllBooks = () => {
    fetch("http://192.168.43.227:2501/books/" + this.state.ownerName, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          studentBooks: responseJson,
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
          centerComponent={{ text: 'Owner', style: { color: '#fff' } }}
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
            <Text>Client name:</Text>
            <TextInput
              style={{
                width: 100
              }}
              placeholder="Client Name"
              onChangeText={text => this.saveOwnerName(text)}
              value={this.state.ownerName}
            />
          </View>
          <FlatList
            style={{height:200}}
            data={this.state.studentBooks}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={{width : 150}}>{item.title}</Text>
                <Text>Status:{item.status}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View
            style={{
              flexDirection: "column",
              marginHorizontal : 10
            }}
          >
            <TextInput
              style={{
                borderWidth : 1,
                padding : 5,
                width : 390,
                borderRadius : 5,
                borderColor : 'black',
                marginVertical : 7
              }}
              placeholder="Book title"
              onChangeText={text =>
                this.setState({
                  bookTitle: text
                })
              }
            ></TextInput>
            <TextInput
              style={{
                borderWidth : 1,
                padding : 5,
                width : 390,
                borderRadius : 5,
                borderColor : 'black',
                marginVertical : 7
              }}
              placeholder="Pages"
              onChangeText={text =>
                this.setState({
                  bookPages: text
                })
              }
            ></TextInput>
            <TextInput
              style={{
                borderWidth : 1,
                padding : 5,
                width : 390,
                borderRadius : 5,
                borderColor : 'black',
                marginVertical : 7
              }}
              placeholder="Used count"
              onChangeText={text =>
                this.setState({
                  bookUserCount: text
                })
              }
            ></TextInput>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button title="Add Book" onPress={this.addBook}></Button>
            </View>
          </View>
        </View>
      </>
      
    );
  }
}

export default Owner;
