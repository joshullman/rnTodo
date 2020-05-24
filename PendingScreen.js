import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import TodosState from "./TodosState";

import { observer } from "mobx-react";

import { FontAwesome, Feather } from "@expo/vector-icons";

import TodoList from "./TodoList";

@observer
export default class PendingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = TodosState.incomplete;
    return (
      <View style={styles.container}>
        <View style={styles.headerPadding} />
        <View style={styles.header}>
          <Text h3 style={styles.headerText}>
            Todos
          </Text>
          <TouchableOpacity style={styles.newTodo} onPress={TodosState.newTodo}>
            <FontAwesome name="plus-circle" size={32} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {todos.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <View style={styles.tutorialRow}>
                  <Text>Tap</Text>
                  <View style={styles.tutorialIcon}>
                    <FontAwesome name="plus-circle" size={12} color={"black"} />
                  </View>
                  <Text>to create a new todo</Text>
                </View>
                <View style={styles.tutorialRow}>
                  <Text>Tap</Text>
                  <View style={styles.tutorialIcon}>
                    <Feather name="list" size={12} color={"black"} />
                  </View>
                  <Text>or swipe left to edit</Text>
                </View>
                <View style={styles.tutorialRow}>
                  <Text>Hold</Text>
                  <View style={styles.tutorialIcon}>
                    <Feather name="list" size={12} color={"black"} />
                  </View>
                  <Text>to rearrange</Text>
                </View>
              </View>
            </View>
          )}
          <TodoList todos={todos} />
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
