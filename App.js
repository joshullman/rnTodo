import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import DraggableFlatList from "react-native-draggable-flatlist";
import Todo from "./Todo";

const data = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${
    index * 5
  }, ${132})`,
  fill: 0,
  inProgress: false,
  complete: false,
}));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: new Map(), data };
  }

  renderItem = ({ item, index, drag, isActive }) => {
    return <Todo todo={item} index={index} drag={drag} isActive={isActive} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => this.setState({ data })}
          />
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
});
