import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Home extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 30,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          title="Customer"
          onPress={() => this.props.navigation.navigate("Customer")}
        />
        <Button
          title="Employee"
          onPress={() => this.props.navigation.navigate("Employee")}
        />
        <Button
          title="Manager"
          onPress={() => this.props.navigation.navigate("Manager")}
        />
      </View>
    );
  }
}

export default Home;
