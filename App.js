import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import KeyboardShift from "./KeyboardShift";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { FontAwesome } from "@expo/vector-icons";

import PendingScreen from "./PendingScreen";
import CompletedScreen from "./CompletedScreen";
import TodoScreen from "./TodoScreen";

const theme = {
  Button: {
    buttonStyle: {
      borderRadius: 0,
    },
  },
};

let headerStyle = {
  defaultNavigationOptions: {
    headerStyle: {
      // color: "white",
      backgroundColor: "red",
      borderBottomWidth: 0,
      // fontFamily: "open-sans",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      color: "white",
    },
  },
};

let Screens = {
  Pending: {
    screen: PendingScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Pending",
    }),
  },
  Completed: {
    screen: CompletedScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Completed",
    }),
  },
  Todo: {
    screen: TodoScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Todo",
    }),
  },
};

const PendingStack = createStackNavigator(
  {
    Pending: Screens.Pending,
    Todo: Screens.Todo,
  }
  // headerStyle
);

const CompletedStack = createStackNavigator(
  {
    Completed: Screens.Completed,
    Todo: Screens.Todo,
  }
  // headerStyle
);

const AppNavigator = createBottomTabNavigator(
  {
    Pending: {
      screen: PendingStack,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome name={"users"} size={24} color={tintColor} />
        ),
      },
    },
    Completed: {
      screen: CompletedStack,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome name={"user-circle"} size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Pending",
    tabBarOptions: {
      activeTintColor: "orange",
      // activeBackgroundColor: Theme.primary[300],
      // inactiveTintColor: "black",
      inactiveTintColor: "blue",
      // inactiveBackgroundColor: Theme.primary[300]
      style: {
        backgroundColor: "red",
        paddingTop: 10,
      },
    },
  }
);

let switchNavigator = createSwitchNavigator(
  {
    App: AppNavigator,
  },
  {
    initialRouteName: "App",
  }
);

const AppContainer = createAppContainer(switchNavigator);

// function uuidv4() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (Crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }

class State {
  @observable complete = [];
  @observable incomplete = [];
  @observable removed = [];
  @observable viewing = "incomplete";

  nowViewing = (page) => {
    this.viewing = page;
  };

  toggleComplete = (todo) => {
    todo.inProgress = false;
    if (todo.completed) {
      todo.completed = null;
      todo.fill = 0;
      this.incomplete.push(todo);
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      todo.completed = Date.now();
      todo.fill = 100;
      this.complete.push(todo);
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };

  newTodo = () => {
    this.incomplete.push(new Todo());
  };

  removeTodo = (todo) => {
    todo.removed = Date.now();
    this.removed.push(todo);
    if (this.viewing == "complete") {
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };
}

// purely for example purposes
let id = 0;

export class Todo {
  constructor() {
    this.id = id;
    id++;
    this.created = Date.now();
  }
  id;
  @observable label = "";
  @observable fill = 0;
  @observable inProgress = false;
  created;
  @observable completed;
  @observable editing = true;
  @observable removed;

  updateProp = (prop, val) => {
    this[prop] = val;
  };
}

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
