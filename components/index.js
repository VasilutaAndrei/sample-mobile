import React, { Component } from "react";
import { Alert } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Customer from "./Customer";
import Manager from "./Manager";
import Employee from "./Employee";

export default class Index extends Component {
  render() {
    return <AppContainer />;
  }
}

var ws = new WebSocket("ws://192.168.0.45:2901/");

ws.onopen = () => {
  // connection opened
  ws.send("something"); // send a message
  console.log("s a deschis");
};

ws.onmessage = e => {
  // a message was received
  const jsonatuJsonat = JSON.parse(e.data);
  Alert.alert(jsonatuJsonat.model);
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
  Customer: { screen: Customer },
  Employee: { screen: Employee },
  Manager: { screen: Manager }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
