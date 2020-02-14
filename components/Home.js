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
          title="Owner"
          onPress={() => this.props.navigation.navigate("Owner")}
        />
        <Separator/>
        <Button
          color='green'
          title="Borrow"
          onPress={() => this.props.navigation.navigate("Borrow")}
        />
        <Separator/>
        <Button
          color='green'
          title="Report"
          onPress={() => this.props.navigation.navigate("Report")}
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
