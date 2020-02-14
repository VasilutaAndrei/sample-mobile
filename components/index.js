import React, { Component } from "react";
import { Alert } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Owner from "./Owner";
import Report from "./Report";
import Borrow from "./Borrow";

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      socketEntry : []
    }
  }
  render() {
    return <AppContainer />;
  }
}

var ws = new WebSocket("ws://192.168.43.227:2501/");

ws.onopen = () => {
  ws.send("connected");
};

ws.onmessage = e => {
  const eJson = JSON.parse(e.data);
  let newEntries = this.state.socketEntry;
  newEntries.push(eJson);
  Alert.alert('Title: ' + eJson.title, 'Student name: ' + eJson.student + ' ; Status : ' + eJson.status);
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
  Report: { screen: Report }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
