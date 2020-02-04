import React, { Component } from "react";
import { View, FlatList, ScrollView, Text, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelsFilteredByCost: [],
      modelsFilteredByTime: [],
      isVisible: false
    };
  }

  componentWillMount() {
    this.onlineGetAllModels();
  }

  filterModelsByCost = models => {
    let filteredModels = models.map(model => {
      return { id: model.id, model: model.model, cost: model.cost };
    });

    filteredModels.sort(function(a, b) {
      return parseInt(b.cost, 10) - parseInt(a.cost, 10);
    });

    let toReturn = filteredModels.slice(0, 5);

    return toReturn;
  };

  filterModelsByTime = models => {
    let filteredModels = models.map(model => {
      return { id: model.id, model: model.model, time: model.time };
    });

    filteredModels.sort(function(a, b) {
      return parseInt(a.time, 10) - parseInt(b.time, 10);
    });

    let toReturn = filteredModels.slice(0, 10);

    return toReturn;
  };

  onlineGetAllModels = async () => {
    fetch("http://192.168.0.45:2901/all/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      //.then(resp => this.filterModelsByCost(resp))
      .then(resp => {
        const filteredByCost = this.filterModelsByCost(resp);
        const filteredByTime = this.filterModelsByTime(resp);
        this.setState({
          modelsFilteredByCost: filteredByCost,
          modelsFilteredByTime: filteredByTime
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View
        style={{
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10
          }}
        >
          Ordered by cost
        </Text>
        <ScrollView
          style={{
            marginTop: 5
          }}
        >
          <FlatList
            data={this.state.modelsFilteredByCost}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <Text>{`Model ${item.model} costs ${item.cost}`}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10
          }}
        >
          Ordered by time
        </Text>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto"
          onBackdropPress={() =>
            this.setState({
              isVisible: false
            })
          }
        >
          <Text>Hello bitch</Text>
        </Overlay>
        <ScrollView
          style={{
            marginTop: 5
          }}
        >
          <FlatList
            data={this.state.modelsFilteredByTime}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <TouchableHighlight
                  style={{
                    alignItems: "center",
                    backgroundColor: "#DDDDDD",
                    padding: 10
                  }}
                  onPress={() =>
                    this.setState({
                      isVisible: true
                    })
                  }
                >
                  <Text>{`Model ${item.model} takes ${item.time}`}</Text>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Manager;
