import React, { Component } from "react";
import { Alert } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Owner from "./Owner";
import Manager from "./Manager";
import Borrow from "./Borrow";

export default class Index extends Component {
  render() {
    return <AppContainer />;
  }
}

var ws = new WebSocket("ws://192.168.43.227:2501/");

ws.onopen = () => {
  // connection opened
  ws.send("something"); // send a message
  console.log("s a deschis");
};

ws.onmessage = e => {
  // a message was received
  const eJson = JSON.parse(e.data);
  Alert.alert('Title: ' + eJson.title, 'Student name: ' + eJson.student + ' ; Status : ' + eJson.status);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};

const AppSwitchNavigator = createSwitchNavigator({
  Home: { screen: Home },
  Owner: { screen: Owner },
  Borrow: { screen: Borrow },
  Manager: { screen: Manager }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
