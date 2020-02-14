import React, { Component } from "react";
import { View, FlatList, ScrollView, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Header } from "react-native-elements";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      sortedBooks: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  sortByCount = books => {
    let filteredBooks = books.map(book => {
      return { id: book.id, title: book.title, usedCount: book.usedCount };
    });

    filteredBooks.sort(function(a, b) {
      return parseInt(b.usedCount, 10) - parseInt(a.usedCount, 10);
    });

    let toReturn = filteredBooks.slice(0, 10);

    return toReturn;
  };

  getAllBooks = () => {
    fetch("http://192.168.43.227:2501/all/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        const sortedByCount = this.sortByCount(responseJson);
        this.setState({
          sortedBooks: sortedByCount,
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
          centerComponent={{ text: 'Report', style: { color: '#fff' } }}
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
            Ordered by count
          </Text>
          <FlatList
            data={this.state.sortedBooks}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height : 35,
                  marginHorizontal : 10
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={{width : 200}}>{item.title}</Text>
                <Text>Used Count:{item.usedCount}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        
        </View>
      </>
    );
  }
}