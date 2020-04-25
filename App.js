import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const data = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${
    index * 5
  }, ${132})`,
}));

class Todo {}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: new Map(), data };
  }

  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? "blue" : item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
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
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <Text>Open up App.js to start working on your app!</Text>
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
