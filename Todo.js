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

export class Todo {
  constructor({ id, label, backgroundColor }) {
    this.id = id;
    this.label = label;
    this.backgroundColor = backgroundColor;
    this.created = Date.now();
  }
  id;
  @observable label = "";
  @observable fill = 0;
  @observable inProgress = false;
  created;
  @observable completed;
  @observable editing = false;
  @observable removed;

  updateProp = (prop, val) => {
    this[prop] = val;
  };
}

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
    console.log("animation complete");
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

  // <TouchableOpacity onPress={() => (todo.editing = true)}>

  // </TouchableOpacity>

  render() {
    let { todo, index, drag, isActive } = this.props;
    return (
      <Swipeout
        autoClose
        right={[
          {
            text: <FontAwesome name="edit" size={24} color={"white"} />,
            backgroundColor: "blue",
            onPress: (e) => todo.updateProp("editing", true),
          },
          {
            text: <FontAwesome name="trash" size={24} color={"white"} />,
            backgroundColor: "blue",
            onPress: (e) => todo.updateProp("removed", true),
          },
        ]}
        backgroundColor={"blue"}
      >
        <ListItem
          key={index}
          style={[
            // styles.container,
            {
              backgroundColor: isActive ? "blue" : todo.backgroundColor,
            },
          ]}
          title={
            <View style={{ height: 52, justifyContent: "center" }}>
              {todo.editing ? (
                <TextInput
                  style={{
                    // borderColor: "gray",
                    // borderWidth: 1,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(text) => this.onChangeText(text)}
                  value={todo.label}
                  onBlur={() => (todo.editing = false)}
                  autoFocus
                  multiline
                  numberOfLines={3}
                />
              ) : (
                <DoubleClick
                  doubleTap={() => (todo.editing = true)}
                  delay={200}
                >
                  <Text numberOfLines={3} ellipsizeMode="tail">
                    {todo.label}
                  </Text>
                </DoubleClick>
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
                    tintColor="blue"
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
                  <FontAwesome name="circle" size={36} color={"blue"} />
                </View>
              </View>
            </TouchableOpacity>
          }
          rightAvatar={
            <TouchableOpacity onLongPress={drag} delayLongPress={0}>
              <Feather name="list" size={24} color={"blue"} />
            </TouchableOpacity>
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
});
