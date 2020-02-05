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
          title="Owner"
          onPress={() => this.props.navigation.navigate("Owner")}
        />
        <Button
          title="Borrow"
          onPress={() => this.props.navigation.navigate("Borrow")}
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
