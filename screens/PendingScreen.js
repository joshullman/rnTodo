import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import KeyboardShift from "../components/KeyboardShift";
import DraggableFlatList from "react-native-draggable-flatlist";

import TodoRow from "../components/TodoRow";

import TodosState from "../state/TodosState";

import { observer } from "mobx-react";

import { FontAwesome, Feather } from "@expo/vector-icons";

@observer
export default class PendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = TodosState;
  }

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TodoRow
        todo={item}
        index={index}
        drag={drag}
        isActive={isActive}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    let todos = this.state.incomplete;
    return (
      <View style={styles.container}>
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
                  <Text>Hold</Text>
                  <View style={styles.tutorialIcon}>
                    <Feather name="list" size={12} color={"black"} />
                  </View>
                  <Text>to rearrange</Text>
                </View>
                <View style={styles.tutorialRow}>
                  <Text>Tap a row to edit</Text>
                </View>
              </View>
            </View>
          )}
          <View style={{ flex: 1 }}>
            {/* <KeyboardShift>
              {() => ( */}
            <DraggableFlatList
              data={todos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.id}`}
              onDragEnd={({ data }) => (TodosState.incomplete = data)}
            />
            {/* )}
            </KeyboardShift> */}
          </View>
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
