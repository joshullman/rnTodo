import React from "react";
import { StyleSheet, Text, TouchableOpacity, Easing } from "react-native";
import { ListItem } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default class Todo extends React.Component {
  complete = () => {
    let { todo } = this.props;
    todo.inProgress = true;
    setTimeout(() => {
      todo.inProgress = false;
    }, 3000);
  };

  toggleComplete = () => {
    let { todo } = this.props;
    if (todo.inProgress) {
      todo.inProgress = false;
      todo.fill = 0;
    } else {
      todo.inProgress = true;
      this.circularProgress.animate(100, 2500, Easing.quad);
    }
  };

  complete = () => {
    let { todo } = this.props;
    todo.complete = true;
    todo.inProgress = false;
  };

  render() {
    let { todo, index, drag, isActive } = this.props;
    return (
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
