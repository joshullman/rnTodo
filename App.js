import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";

import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import DraggableFlatList from "react-native-draggable-flatlist";
import TodoRow, { Todo } from "./Todo";

class TodoList {
  @observable complete = [];
  @observable incomplete = [];
  @observable removed = [];
  @observable viewing = "incomplete";

  nowViewing = (page) => {
    this.viewing = page;
  };

  init = () => {
    [...Array(7)].forEach((d, index) =>
      this.incomplete.push(
        new Todo({
          id: `item-${index}`, // For example only
          label: `${index}`,
        })
      )
    );
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

  removeTodo = (todo) => {
    if (this.viewing == "complete") {
      this.removed.push(todo);
    } else {
      this.removed.push(todo);
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
    let { viewing, complete, incomplete } = this.state;
    let todos = viewing == "complete" ? complete : incomplete;
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button
                title="Pending"
                type={viewing == "incomplete" ? "solid" : "clear"}
                onPress={() => this.state.nowViewing("incomplete")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Complete"
                type={viewing == "complete" ? "solid" : "clear"}
                onPress={() => this.state.nowViewing("complete")}
              />
            </View>
          </View>
          {todos.length === 0 && (
            <View>
              <Text style={{ padding: 10 }}>
                {viewing == "complete"
                  ? "Complete a todo to see it here!"
                  : "Create a todo by clicking the plus sign"}
              </Text>
            </View>
          )}
          <DraggableFlatList
            data={this.state[viewing]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => (this.state[viewing] = data)}
          />
        </View>
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
  header: {
    height: 100,
    backgroundColor: "red",
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
  },
});
