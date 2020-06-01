<<<<<<< HEAD
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from "react-navigation-drawer";
import { CustomDrawer } from "./Screens/CustomDrawer";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
import AuthLoadingScreen from "./Screens/Loading";
import HomeScreen from './Screens/Home';
import SignInScreen from './Screens/SignIn'
import { firebaseConfig } from './Screens/Config'
import Layer from './Screens/Layer';
import Utama from './Screens/Utama';
import firebase from 'firebase'
// goes here.

firebase.initializeApp(firebaseConfig)

const Unit = createStackNavigator({
  Layer: { screen: Layer }, Home: { screen: HomeScreen },
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const ini = createStackNavigator({ Utama: { screen: Utama } })

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Unit,
      Auth: AuthStack,
      Utama: ini
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
=======
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/screen/HomeScreen';
import Login from './src/screen/LoginScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Loading from './src/screen/LoadingScreen';
import Unit from './src/screen/UnitScreen';
import Layer from './src/screen/LayerScreen';
import Maps from './src/screen/MapScreen';
import Service from './src/component/NavigationService';
import React, {Component} from 'react';

const home = createStackNavigator({
  Home: {screen: Home},
  Unit: {screen: Unit},
  Layer: {screen: Layer},
  Maps: {screen: Maps},
});

const auth = createStackNavigator({
  Login: {screen: Login},
});

const StackNav = createSwitchNavigator(
  {
    Firt: home,
    Auth: auth,
    Loading: Loading,
  },
  {
    initialRouteName: 'Loading',
  },
);

const Navigation = createAppContainer(StackNav);
export default class App extends Component {
  render() {
    return (
      <Navigation
        ref={nav => {
          Service.setTopLevelNavigator(nav);
        }}
      />
    );
  }
}
>>>>>>> origin/master
