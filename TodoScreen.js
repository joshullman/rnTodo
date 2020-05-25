import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { observable, computed } from "mobx";
import { Input } from "react-native-elements";
import TodosState from "./TodosState";

import { observer } from "mobx-react";

import { FontAwesome, Feather } from "@expo/vector-icons";

@observer
export default class TodoScreen extends React.Component {
  render() {
    let { navigation } = this.props;
    let todo = navigation.getParam("todo", {});
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Input
            placeholder="Name"
            style={styles.textInput}
            onChangeText={(text) => todo.updateProp("label", text)}
            value={todo.label}
            // onBlur={() => todo.updateProp("editing", false)}
            autoFocus
          />
          <Input
            placeholder="Description"
            style={styles.textInput}
            onChangeText={(text) => todo.updateProp("description", text)}
            value={todo.label}
            // onBlur={() => todo.updateProp("editing", false)}
            multiline
            numberOfLines={3}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    backgroundColor: "#4e7934",
    color: "white",
    padding: 10,
  },
  headerText: {
    color: "white",
  },
  body: {
    flex: 1,
  },
  newTodo: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 48,
  },
  tutorialRow: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // height: 18,
  },
  tutorialIcon: {
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
