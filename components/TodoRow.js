import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Easing,
  View,
} from "react-native";

import TodosState from "../state/TodosState";

import { ListItem, Text } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import DoubleClick from "react-native-double-tap";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Feather, FontAwesome } from "@expo/vector-icons";

const ONE_DAY_MILLI = 86400000;

@observer
export default class TodoRow extends React.Component {
  startAnimation = () => {
    let { todo } = this.props;
    let zero = todo.fill == 0;
    if (todo.inProgress) {
      todo.inProgress = false;
      if (todo.completed) {
        this.circularProgress.animate(100, 10, Easing.quad);
        todo.fill = 100;
      } else {
        this.circularProgress.animate(0, 10, Easing.quad);
        todo.fill = 0;
      }
    } else {
      todo.inProgress = true;
      this.circularProgress.animate(zero ? 100 : 0, 2000, Easing.quad);
    }
  };

  complete = () => {
    let { todo, index } = this.props;
    if (todo.inProgress) {
      TodosState.toggleComplete(todo, index);
    }
  };

  formatDate = (timestamp) => {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  openTodo = () => {
    let { todo, navigation } = this.props;
    if (navigation) {
      navigation.navigate("Todo", { todo });
    }
  };

  render() {
    let { todo, index, drag, isActive, removeTodo } = this.props;
    return (
      <ListItem
        key={index}
        onPress={this.openTodo}
        title={
          <View style={{ height: 52, justifyContent: "center" }}>
            <Text numberOfLines={3} ellipsizeMode="tail">
              {todo.label}
            </Text>
          </View>
        }
        subtitle={
          todo.completed
            ? `Completed on ${this.formatDate(todo.completed)}`
            : todo.completeByDate && todo.created != todo.completeBy.getTime()
            ? `Complete by ${this.formatDate(todo.completeBy.getTime())}`
            : ""
        }
        subtitleStyle={{
          color:
            !todo.completed &&
            todo.completeByDate &&
            todo.created != todo.completeBy.getTime()
              ? Date.now() > todo.completeBy.getTime()
                ? "red"
                : todo.completeBy.getTime() - Date.now() < ONE_DAY_MILLI * 3
                ? "orange"
                : "gray"
              : "gray",
        }}
        leftAvatar={
          <TouchableOpacity onPress={this.startAnimation}>
            <View style={{ position: "relative", height: 36, width: 36 }}>
              <View
                style={[
                  styles.icon,
                  {
                    zIndex: 2,
                  },
                ]}
              >
                <AnimatedCircularProgress
                  // onPress={this.complete}
                  size={24}
                  width={12}
                  fill={todo.fill}
                  prefill={todo.fill}
                  rotation={0}
                  ref={(ref) => (this.circularProgress = ref)}
                  tintColor="#89b4ad"
                  onAnimationComplete={this.complete}
                  backgroundColor="#fff"
                />
              </View>
              <View
                style={[
                  styles.icon,
                  {
                    zIndex: 1,
                  },
                ]}
              >
                <FontAwesome name="circle" size={36} color={"#89b4ad"} />
              </View>
            </View>
          </TouchableOpacity>
        }
        rightAvatar={
          <TouchableOpacity
            onLongPress={drag}
            delayLongPress={0}
            style={styles.drag}
          >
            <Feather name="list" size={24} color={"lightgray"} />
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 36,
  },
  textInput: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  drag: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
