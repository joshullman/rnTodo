import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import KeyboardShift from "./KeyboardShift";

import DraggableFlatList from "react-native-draggable-flatlist";

import TodoRow from "./TodoRow";

import TodosState from "./TodosState";

import { observer } from "mobx-react";

@observer
export default class CompletedScreen extends React.Component {
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
    let todos = this.state.complete;
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
              <Text style={{ padding: 10 }}>Completed todos appear here</Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            {/* <KeyboardShift>
              {() => ( */}
            <DraggableFlatList
              data={todos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.id}`}
              onDragEnd={({ data }) => (TodosState.complete = data)}
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
});
