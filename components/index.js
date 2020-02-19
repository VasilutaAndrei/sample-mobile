import React, { Component } from "react";
import { Alert } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Owner from "./Owner";
import Reports from "./Reports";
import Borrow from "./Borrow";
import Registration from "./Registration";
import Driver from "./Driver";

export default class Index extends Component {
  render() {
    return <AppContainer />;
  }
}

var ws = new WebSocket("ws://192.168.0.100:1957/");

ws.onopen = () => {
  ws.send("connected");
};

ws.onmessage = e => {
  const eJson = JSON.parse(e.data);
  Alert.alert('Name: ' + eJson.name, 'Driver: ' + eJson.driver + ' ; Status : ' + eJson.status);
};

ws.onerror = e => {
  console.log(e.message);
};

ws.onclose = e => {
  console.log(e.code, e.reason);
};

const AppSwitchNavigator = createSwitchNavigator({
  Home: { screen: Home },
  Owner: { screen: Owner },
  Borrow: { screen: Borrow },
  Reports: { screen: Reports },
  Registration: {screen: Registration},
  Driver:{screen: Driver}
});

const AppContainer = createAppContainer(AppSwitchNavigator);
