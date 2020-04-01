import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import logo from '../assets/img/hhh.png';
import styles from '../component/Style';
import {SignIn, SignUp} from '../component/Firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      icon: 'eye',
      isPasswordHidden: true,
      errorM: null,
    };
  }

  handleToggle = () => {
    const {isPasswordHidden} = this.state;

    if (isPasswordHidden) {
      this.setState({isPasswordHidden: false});
      this.setState({icon: 'eye-slash'});
    } else {
      this.setState({isPasswordHidden: true});
      this.setState({icon: 'eye'});
    }
  };

  Login = () => {
    const {email, password} = this.state;
    SignIn(email, password)
      .then(() => {
        this.props.navigation.navigate('App');
      })
      .catch(error => this.setState({errorM: error.message}));
  };

  register = () => {
    const {email, password} = this.state;
    SignUp(email, password)
      .then(() => this.props.navigation.navigate('App'))
      .catch(err => this.setState({errorM: err.message}));
  };

  render() {
    return (
      <View style={styles.containerSGN}>
        <View style={styles.card}>
          <Image style={styles.logo} source={logo} />
          <View style={{alignItems: 'center'}}>
            {/* <Text style={styles.text}>Login</Text> */}
            {this.state.errorM && (
              <Text style={{color: 'red'}}>{this.state.errorM}</Text>
            )}
          </View>
          <View style={styles.Input}>
            <Input
              placeholder="Email"
              autoCompleteType="email"
              leftIcon={<Icon name="envelope" size={24} color="black" />}
              onChangeText={email => this.setState({email})}
            />
          </View>
          <View style={styles.Input}>
            <Input
              placeholder="Password"
              autoCompleteType="password"
              secureTextEntry={this.state.isPasswordHidden}
              leftIcon={<Icon name="lock" size={24} color="black" />}
              rightIcon={
                <TouchableOpacity onPress={this.handleToggle}>
                  <Icon name={this.state.icon} size={24} color="black" />
                </TouchableOpacity>
              }
              onChangeText={password => this.setState({password})}
            />
          </View>
          <View style={styles.button}>
            <Button title="Sign IN" type="outline" onPress={this.Login} />
          </View>
          <View style={styles.button}>
            <Button title="Sign UP" type="outline" onPress={this.register} />
          </View>
        </View>
      </View>
    );
  }
}

Login.navigationOptions = {
  headerShown: false,
};

export default Login;
