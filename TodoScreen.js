import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { Text } from "react-native-elements";
import { observable, computed } from "mobx";
import TodosState from "./TodosState";
import DateTimePicker from "@react-native-community/datetimepicker";

import { observer } from "mobx-react";

import { FontAwesome, Feather } from "@expo/vector-icons";

@observer
export default class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (event, selectedDate) => {
    let { navigation } = this.props;
    let todo = navigation.getParam("todo", {});
    const thisDate = selectedDate || date;
    todo.updateProp("completeBy", thisDate);
  };

  render() {
    let { navigation } = this.props;
    let todo = navigation.getParam("todo", {});
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.inputContainer}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                placeholder="Name"
                style={[styles.textInput, { flex: 1 }]}
                onChangeText={(text) => todo.updateProp("label", text)}
                value={todo.label}
                autoFocus
              />
              {/* <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Switch
                  trackColor={{ false: "gray", true: "gray" }}
                  thumbColor={todo.completed ? "#89b4ad" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => TodosState.toggleComplete(todo)}
                  value={todo.completed}
                />
                <Text>Completed</Text>
              </View> */}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Description"
              style={[styles.textInput, { height: 120, maxHeight: 120 }]}
              onChangeText={(text) => todo.updateProp("description", text)}
              value={todo.description}
              multiline
              numberOfLines={5}
            />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Switch
                trackColor={{ false: "gray", true: "gray" }}
                thumbColor={todo.completeByDate ? "#89b4ad" : "#f4f3f4"}
                ios_backgroundColor="gray"
                onValueChange={() =>
                  todo.updateProp("completeByDate", !todo.completeByDate)
                }
                value={todo.completeByDate}
              />
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
                onPress={() =>
                  todo.updateProp("completeByDate", !todo.completeByDate)
                }
              >
                <Text>Complete by date?</Text>
              </TouchableOpacity>
            </View>
          </View>
          {todo.completeByDate && (
            <View style={styles.inputContainer}>
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={todo.completeBy}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            </View>
          )}
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
  body: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
});
