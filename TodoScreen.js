import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";

import { observer } from "mobx-react";

import { FontAwesome } from "@expo/vector-icons";

@observer
export default class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let state = this.props.screenProps;
    let { viewing, newTodo } = state;
    return (
      <View style={styles.container}>
        <Text>I am a todo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  headerPadding: {
    height: 30,
    backgroundColor: "#4e7934",
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
  buttonRow: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    // borderBottomColor: "lightgray",
    // borderBottomWidth: 1,
  },
  button: {
    borderRadius: 0,
  },
  newTodo: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 48,
  },
  raisedButton: {
    backgroundColor: "#89b4ad",
  },
  raisedTitle: {
    color: "white",
  },
  clearButton: {
    backgroundColor: "white",
  },
  clearTitle: {
    color: "#89b4ad",
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
