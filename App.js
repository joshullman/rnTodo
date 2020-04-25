import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";

import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import DraggableFlatList from "react-native-draggable-flatlist";
import TodoRow, { Todo } from "./Todo";

class AppState {
  @observable list = new Map();
  @observable viewing = "incomplete";

  nowViewing = (page) => {
    this.viewing = page;
  };
  init = () => {
    [...Array(20)].forEach((d, index) =>
      this.list.set(
        `item-${index}`,
        new Todo({
          id: `item-${index}`, // For example only -- don't use index as your key!
          label: index,
        })
      )
    );
  };
  @computed get keys() {
    return Array.from(this.list.keys());
  }
  @computed get full() {
    return this.keys.map((todoId) => this.list.get(todoId));
  }
  @computed get valid() {
    return this.full.filter((todo) => !todo.removed);
  }
  @computed get complete() {
    return this.valid.filter((todo) => todo.completed);
  }
  @computed get incomplete() {
    return this.valid.filter((todo) => !todo.completed);
  }
}
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = new AppState();
    this.state.init();
  }

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TodoRow todo={item} index={index} drag={drag} isActive={isActive} />
    );
  };

  render() {
    let { viewing } = this.state;
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
          <DraggableFlatList
            data={
              viewing == "complete"
                ? this.state.complete
                : this.state.incomplete
            }
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />
          {/* <View style={styles.listHeader}>
            <Text>Complete</Text>
          </View>
          <DraggableFlatList
            data={this.state.data.filter((item) => item.completed)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => this.setState({ data })}
          /> */}
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
