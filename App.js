import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import KeyboardShift from "./KeyboardShift";

import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import DraggableFlatList from "react-native-draggable-flatlist";
import { FontAwesome } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";

import TodoRow, { Todo } from "./Todo";

const theme = {
  Button: {
    buttonStyle: {
      borderRadius: 0,
      // backgroundColor: "#C6AEFF",
    },
  },
};

let id = 0;

// function uuidv4() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (Crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }

class TodoList {
  @observable complete = [];
  @observable incomplete = [];
  @observable removed = [];
  @observable viewing = "incomplete";

  nowViewing = (page) => {
    this.viewing = page;
  };

  init = () => {
    [...Array(7)].forEach((d, index) => {
      this.incomplete.push(
        new Todo({
          id,
          label: `${index}`,
        })
      );
      id++;
    });
  };

  toggleComplete = (todo) => {
    todo.inProgress = false;
    if (todo.completed) {
      todo.completed = null;
      todo.fill = 0;
      this.incomplete.push(todo);
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      todo.completed = Date.now();
      todo.fill = 100;
      this.complete.push(todo);
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };

  newTodo = () => {
    this.incomplete.push(
      new Todo({
        id,
        label: "",
      })
    );
    id++;
  };

  removeTodo = (todo) => {
    todo.removed = Date.now();
    this.removed.push(todo);
    if (this.viewing == "complete") {
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };
}
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = new TodoList();
    this.state.init();
  }

  renderItem = ({ item, index, drag, isActive }) => {
    let { toggleComplete, removeTodo } = this.state;
    return (
      <TodoRow
        todo={item}
        index={index}
        drag={drag}
        isActive={isActive}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    );
  };

  render() {
    let { viewing, newTodo } = this.state;
    let todos = this.state[viewing];
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <View style={styles.headerPadding} />
          <View style={styles.header}>
            <Text h3 style={styles.headerText}>
              Todos
            </Text>
            <TouchableOpacity style={styles.newTodo} onPress={newTodo}>
              <FontAwesome name="plus-circle" size={32} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={[
                    styles.button,
                    viewing == "incomplete"
                      ? styles.raisedButton
                      : styles.clearButton,
                  ]}
                  titleStyle={
                    viewing == "incomplete"
                      ? styles.raisedTitle
                      : styles.clearTitle
                  }
                  title="Pending"
                  onPress={() => this.state.nowViewing("incomplete")}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={[
                    styles.button,
                    viewing == "complete"
                      ? styles.raisedButton
                      : styles.clearButton,
                  ]}
                  titleStyle={
                    viewing == "complete"
                      ? styles.raisedTitle
                      : styles.clearTitle
                  }
                  title="Complete"
                  onPress={() => this.state.nowViewing("complete")}
                />
              </View>
            </View>
            {todos.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ padding: 10 }}>
                  {viewing == "complete"
                    ? "Completed todos appear here"
                    : "Create a todo by clicking the plus sign"}
                </Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <KeyboardShift>
                {() => (
                  <DraggableFlatList
                    data={todos}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.id}`}
                    onDragEnd={({ data }) => (this.state[viewing] = data)}
                  />
                )}
              </KeyboardShift>
            </View>
          </View>
        </View>
      </ThemeProvider>
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
});
