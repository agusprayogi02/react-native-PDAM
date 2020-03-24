import { createStackNavigator } from "react-navigation-stack";
import Home from "./src/screen/HomeScreen";
import Login from "./src/screen/LoginScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Loading from "./src/screen/LoadingScreen";

const home = createStackNavigator({
  Home: { screen: Home }
})

const auth = createStackNavigator({
  Login: { screen: Login }
})

const StackNav = createSwitchNavigator({
  Firt: home,
  Auth: auth,
  Loading: Loading
}, {
  initialRouteName: 'Loading'
})

export default App = createAppContainer(StackNav)