import { createStackNavigator } from "react-navigation-stack";
import Home from "./src/screen/HomeScreen";
import Login from "./src/screen/LoginScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Loading from "./src/screen/LoadingScreen";
import Unit from "./src/screen/UnitScreen";
import Layer from "./src/screen/LayerScreen";
import Maps from "./src/screen/MapScreen";
import Service from "./src/component/NavigationService";
import React, { Component } from 'react'

const home = createStackNavigator({
  Home: { screen: Home },
  Unit: { screen: Unit },
  Layer: { screen: Layer },
  Maps: { screen: Maps }
})

const auth = createStackNavigator({
  Login: { screen: Login }
})

const StackNav = createSwitchNavigator({
  Firt: home,
  Auth: auth,
  Loading: Loading,
}, {
  initialRouteName: 'Loading'
})

const Navigation = createAppContainer(StackNav)
export default class App extends Component {
  render() {
    return (
      <Navigation
        ref={nav => {
          Service.setTopLevelNavigator(nav)
        }}
      />
    );
  }
}
