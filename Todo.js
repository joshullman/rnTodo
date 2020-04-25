import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { StyleSheet, Text, TouchableOpacity, Easing } from "react-native";
import { ListItem } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export class Todo {
  constructor({ id, label, backgroundColor }) {
    this.id = id;
    this.label = label;
    this.backgroundColor = backgroundColor;
    this.added = Date.now();
  }
  @observable fill = 0;
  @observable inProgress = false;
  @observable completed;
}

@observer
export default class TodoRow extends React.Component {
  toggleComplete = () => {
    let { todo } = this.props;
    if (todo.inProgress) {
      todo.inProgress = false;
      this.circularProgress.animate(todo.fill == 0 ? 0 : 100, 10, Easing.quad);
      todo.fill = 0;
    } else {
      todo.inProgress = true;
      this.circularProgress.animate(
        todo.fill == 0 ? 100 : 0,
        2000,
        Easing.quad
      );
    }
  };

  complete = () => {
    let { todo } = this.props;
    if (todo.inProgress) {
      todo.completed = Date.now();
      todo.inProgress = false;
      // todo.fill = 100;
    }
  };

  render() {
    let { todo, index, drag, isActive } = this.props;
    return (
      <Swipeout
        autoClose
        right={[
          {
            text: "Edit",
            backgroundColor: "blue",
            onPress: (e) => {
              () => console.log("edit");
            },
          },
          {
            text: "Delete",
            backgroundColor: "blue",
            onPress: (e) => {
              () => console.log("delete");
            },
          },
        ]}
        // backgroundColor={"blue"}
      >
        <ListItem
          key={index}
          style={[
            styles.container,
            {
              backgroundColor: isActive ? "blue" : todo.backgroundColor,
            },
          ]}
          onPress={this.toggleComplete}
          title={todo.label}
          // subtitle={todo.subtitle}
          leftAvatar={
            <AnimatedCircularProgress
              // onPress={this.complete}
              size={50}
              width={25}
              fill={todo.fill}
              ref={(ref) => (this.circularProgress = ref)}
              tintColor="#00e0ff"
              onAnimationComplete={this.complete}
              backgroundColor="#3d5875"
            />
          }
          bottomDivider
          onLongPress={drag}
        />
      </Swipeout>
    );
  }
}
{
  /* <TouchableOpacity
style={}
onLongPress={drag}
>
<Text
  style={{
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  }}
>
  {item.label}
</Text>
</TouchableOpacity> */
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
