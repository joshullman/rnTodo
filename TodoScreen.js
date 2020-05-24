import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";

import { observer } from "mobx-react";

import { FontAwesome } from "@expo/vector-icons";

@observer
export default class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let state = this.props.screenProps;
    let { viewing, newTodo } = state;
    return (
      <View style={styles.container}>
        <Text>I am a todo!</Text>
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
});
