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

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabs : [],
      name : '',
      size : '',
      color: '',
      driver: '',
      capacity: '',
      isLoading: true
    };
  }

  componentDidMount() {
    this.getAllCabs();
  }

  addCab = () => {
    this.setState({
      isLoading: false
    });
    fetch("http://192.168.0.100:1957/cab/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name : this.state.name,
        size : this.state.size,
        driver : this.state.driver,
        color : this.state.color,
        capacity : this.state.capacity
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          this.getAllCabs();
        }
        console.log(responseJson);
      })
      .then(this.getAllCabs())
      .then(
        this.setState({
          isLoading: true
        })
      )
      .catch(error => {
        Alert.alert('Error:', error);
      });
  };

  getAllCabs = () => {
    fetch("http://192.168.0.100:1957/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          cabs: responseJson,
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
          centerComponent={{ text: 'Registration', style: { color: '#fff' } }}
        />
        <View
          style={{
            flexDirection: "column",
            marginTop: 50
          }}
        >
          <FlatList
            style={{height:200}}
            data={this.state.cabs}
            extraData={this.state.cabs}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={{width : 150}}>Name:{item.name}</Text>
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
              placeholder="Name"
              onChangeText={text =>
                this.setState({
                  name: text
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
              placeholder="Size"
              onChangeText={text =>
                this.setState({
                  size: text
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
              placeholder="Driver"
              onChangeText={text =>
                this.setState({
                  driver: text
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
              placeholder="Color"
              onChangeText={text =>
                this.setState({
                  color: text
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
              placeholder="Capacity"
              onChangeText={text =>
                this.setState({
                  capacity: text
                })
              }
            ></TextInput>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button title="Add Cab" onPress={this.addCab}></Button>
            </View>
          </View>
        </View>
      </>
      
    );
  }
}

export default Registration;
