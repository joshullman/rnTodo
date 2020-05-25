import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TodosState from "./TodosState";
import { observer } from "mobx-react";

import { FontAwesome, Feather } from "@expo/vector-icons";

import PendingScreen from "./PendingScreen";
import CompletedScreen from "./CompletedScreen";
import TodoScreen from "./TodoScreen";

const theme = {
  Button: {
    buttonStyle: {
      borderRadius: 0,
    },
  },
  ListItem: {
    // subtitleStyle: {
    //   color: "gray",
    // },
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
      headerRight: () => (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: 48,
          }}
          onPress={() => TodosState.newTodo(navigation)}
        >
          <FontAwesome name={"plus-circle"} size={24} />
        </TouchableOpacity>
      ),
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
      headerRight: () => {
        let todo = navigation.getParam("todo", {});
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: 48,
            }}
            onPress={() => {
              TodosState.removeTodo(todo);
              navigation.pop();
            }}
          >
            <FontAwesome name={"trash"} size={24} />
          </TouchableOpacity>
        );
      },
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
          <Feather name="list" size={24} color={tintColor} />
        ),
      },
    },
    Completed: {
      screen: CompletedStack,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome name={"check-circle"} size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Pending",
    tabBarOptions: {
      activeTintColor: "#89b4ad",
      // activeBackgroundColor: Theme.primary[300],
      // inactiveTintColor: "black",
      inactiveTintColor: "gray",
      // inactiveBackgroundColor: Theme.primary[300]
      style: {
        // backgroundColor: "red",
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
