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

import { ListItem, Text } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import DoubleClick from "react-native-double-tap";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Feather, FontAwesome } from "@expo/vector-icons";

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
    let { todo, toggleComplete, index } = this.props;
    if (todo.inProgress) {
      toggleComplete(todo, index);
    }
  };

  onChangeText = (text) => {
    let { todo } = this.props;
    todo.label = text;
  };

  formatDate = (timestamp) => {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  render() {
    let { todo, index, drag, isActive, removeTodo } = this.props;
    return (
      <Swipeout
        autoClose
        right={[
          {
            text: <FontAwesome name="edit" size={24} color={"white"} />,
            backgroundColor: "#71935c",
            onPress: (e) => todo.updateProp("editing", true),
          },
          {
            text: <FontAwesome name="trash" size={24} color={"white"} />,
            backgroundColor: "#71935c",
            onPress: (e) => removeTodo(todo),
          },
        ]}
        backgroundColor={"#89b4ad"}
      >
        <ListItem
          key={index}
          // onLongPress={() => todo.updateProp("editing", true)}
          title={
            <View style={{ height: 52, justifyContent: "center" }}>
              {todo.editing ? (
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.onChangeText(text)}
                  value={todo.label}
                  onBlur={() => todo.updateProp("editing", false)}
                  autoFocus
                  // multiline
                  // numberOfLines={3}
                />
              ) : (
                <Text numberOfLines={3} ellipsizeMode="tail">
                  {todo.label}
                </Text>
              )}
            </View>
          }
          // subtitle={
          //   todo.completed
          //     ? `Completed ${this.formatDate(todo.completed)}`
          //     : `Created ${this.formatDate(todo.created)}`
          // }
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
            // <DoubleClick
            //   doubleTap={() => todo.updateProp("editing", true)}
            //   delay={200}
            // >
            <TouchableOpacity
              onPress={() => todo.updateProp("editing", true)}
              onLongPress={drag}
              delayLongPress={100}
              style={styles.drag}
            >
              <Feather name="list" size={24} color={"lightgray"} />
            </TouchableOpacity>
            // </DoubleClick>
          }
          bottomDivider
        />
      </Swipeout>
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
