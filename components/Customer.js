import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  AsyncStorage,
  FlatList,
  Button,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientModels: [],
      modelName: "",
      modelStatus: "",
      modelTime: "",
      modelCost: "",
      isLoading: true
    };
  }

  componentWillMount() {
    this._retrieveData();
  }

  addModel = () => {
    this.setState({
      isLoading: false
    });
    fetch("http://192.168.0.45:2901/model/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: this.state.modelName,
        status: this.state.modelStatus,
        client: this.state.clientId,
        time: this.state.modelTime,
        cost: this.state.modelCost
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          this.onlineGetAllModels();
        }
        console.log(responseJson);
      })
      .then(this.onlineGetAllModels())
      .then(
        this.setState({
          isLoading: true
        })
      )
      .catch(error => {
        console.error(error);
      });
  };
  saveClientId = id => {
    console.log("save client id", id);
    this.setState(
      {
        clientId: id
      },
      () => this._storeData()
    );
  };

  _storeData = async () => {
    try {
      console.log("store data", this.state.clientId);
      await AsyncStorage.setItem("clientId", this.state.clientId);
      const value = await AsyncStorage.getItem("clientId");
      console.log("saved value is", value);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("clientId");
      if (value !== null) {
        // We have data!!
        this.setState({
          clientId: value
        });
        this.onlineGetAllModels();
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  onlineGetAllModels = () => {
    fetch("http://192.168.0.45:2901/models/" + this.state.clientId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          clientModels: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
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
      <View
        style={{
          flexDirection: "column",
          marginTop: 200
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Text>Your id:</Text>
          <TextInput
            style={{
              width: 100
            }}
            placeholder="Id"
            onChangeText={text => this.saveClientId(text)}
            value={this.state.clientId}
          />
        </View>
        <ScrollView>
          <FlatList
            data={this.state.clientModels}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <Text>Model Name:{item.model}</Text>
                <Text>Model Cost:{item.cost}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: "column"
          }}
        >
          <TextInput
            placeholder="Model Name"
            onChangeText={text =>
              this.setState({
                modelName: text
              })
            }
          ></TextInput>
          <TextInput
            placeholder="Model Status"
            onChangeText={text =>
              this.setState({
                modelStatus: text
              })
            }
          ></TextInput>
          <TextInput
            placeholder="Time for print"
            onChangeText={text =>
              this.setState({
                modelTime: text
              })
            }
          ></TextInput>
          <TextInput
            placeholder="Model Cost"
            onChangeText={text =>
              this.setState({
                modelCost: text
              })
            }
          ></TextInput>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button title="Add Model" onPress={this.addModel}></Button>
          </View>
        </View>
      </View>
    );
  }
}

export default Customer;
