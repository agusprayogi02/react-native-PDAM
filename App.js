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
import Splash from './src/screen/SplaashScreen';

const home = createStackNavigator({
  Home: {screen: Home},
  Unit: {screen: Unit},
  Layer: {screen: Layer},
  Maps: {screen: Maps},
});

const auth = createStackNavigator({
  Login: {screen: Login},
});

const load = createStackNavigator({
  load1: Splash,
  Load2: Loading,
});

const StackNav = createSwitchNavigator(
  {
    Loading: load,
    Firt: home,
    Auth: auth,
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
        ref={(nav) => {
          Service.setTopLevelNavigator(nav);
        }}
      />
    );
  }
}
