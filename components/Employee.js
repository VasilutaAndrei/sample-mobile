import React, { Component } from "react";
import { View, Picker, TextInput, Alert, Button } from "react-native";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelId: "",
      status: ""
    };
  }

  updateModel = () => {
    fetch("http://192.168.0.45:2901/process/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        id: this.state.modelId,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status === this.state.status) {
          Alert.alert("Ba baiatule", "bravo");
        } else {
          Alert.alert("Ba baiatule", "nu bravo");
        }
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View
        style={{
          marginTop: 300,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextInput
            placeholder="Model Id"
            onChangeText={text =>
              this.setState({
                modelId: text
              })
            }
          ></TextInput>
          <Picker
            selectedValue={this.state.status}
            style={{ width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ status: itemValue })
            }
          >
            <Picker.Item label="Done" value="done" />
            <Picker.Item label="Failed" value="failed" />
            <Picker.Item label="Canceled" value="canceled" />
          </Picker>
        </View>

        <Button title="Update Model" onPress={this.updateModel}></Button>
      </View>
    );
  }
}

export default Employee;
