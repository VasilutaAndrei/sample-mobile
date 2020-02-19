import React, { Component } from "react";
import { View, FlatList, ScrollView, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Header } from "react-native-elements";

export default class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabs: [],
      sortedBooks: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getAllCabs();
  }

  sortBySize = cabs => {
    cabs.sort(function(a, b) {
      return parseInt(b.size, 10) - parseInt(a.size, 10);
    });

    let toReturn = cabs.slice(0, 10);

    return toReturn;
  };

  sortByCapacity = cabs => {
    cabs.sort(function(a, b) {
      return parseInt(b.capacity, 10) - parseInt(a.capacity, 10);
    });

    let toReturn = cabs.slice(0, 5);

    return toReturn;
  }

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
        const sortedBySize = this.sortBySize(responseJson);
        const sortedByCapacity = this.sortByCapacity(responseJson);
        this.setState({
          sortedBySize: sortedBySize,
          sortedByCapacity : sortedByCapacity,
          isLoading : false
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
          centerComponent={{ text: 'Reports', style: { color: '#fff' } }}
        />
        <View
          style={{
            marginTop: 50
          }}
        >
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10
            }}
          >
            Ordered by Size
          </Text>
          <FlatList
            data={this.state.sortedBySize}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
              >
              <Text>Name:{item.name} Status:{item.status} Size:{item.size} Driver:{item.driver}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        
        </View>
        <View
          style={{
            marginTop: 50
          }}
        >
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10
            }}
          >
            Ordered by capacity
          </Text>
          <FlatList
            data={this.state.sortedByCapacity}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={{width : 200}}>Name:{item.name}</Text>
                <Text>Capacity:{item.capacity}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        
        </View>
      </>
    );
  }
}