import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

class Home extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 30,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          marginHorizontal : 10
        }}
      >
        <Button
          color='green'
          title="Registration"
          onPress={() => this.props.navigation.navigate("Registration")}
        />
        <Separator/>
        <Button
          color='green'
          title="Manage"
          onPress={() => this.props.navigation.navigate("Manage")}
        />
        <Separator/>
        <Button
          color='green'
          title="Reports"
          onPress={() => this.props.navigation.navigate("Reports")}
        />
        <Separator/>
        <Button
          color='green'
          title="Driver"
          onPress={() => this.props.navigation.navigate("Driver")}
        />
      </View>
    );
  }
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
