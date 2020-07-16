import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import logo from '../assets/img/hhh.png';
import styles from '../component/Style';
import {SignIn, SignUp, onGoogleButtonPress} from '../component/Firebase';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const {height} = Dimensions.get('screen');

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

  componentDidMount() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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
    if (email.trim() !== '' && password.trim() !== '') {
      SignIn(email.trim(), password.trim())
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch((error) => this.setState({errorM: error.message}));
    } else {
      this.setState({errorM: 'Input not be null!!'});
    }
  };

  register = () => {
    const {email, password} = this.state;
    if (email.trim() !== '' && password.trim() !== '') {
      SignUp(email.trim(), password.trim())
        .then(() => this.props.navigation.navigate('App'))
        .catch((err) => this.setState({errorM: err.message}));
    } else {
      this.setState({errorM: 'Input not be null!!'});
    }
  };

  SignInGoogle() {
    onGoogleButtonPress()
      .then(() => {
        this.props.navigation.navigate('Loading');
      })
      .catch((error) => {
        let err;
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          err = 'Login Cencel';
        } else if (error.code === statusCodes.IN_PROGRESS) {
          err = 'operation (e.g. sign in) is in progress already';
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          err = 'play services not available or outdated';
        } else {
          err = 'some other error happened';
          // this.props.navigation.navigate('Loading');
        }
        this.setState({errorM: err});
      });
  }

  render() {
    return (
      <View style={styles.containerSGN}>
        <View style={[styles.card, {marginTop: height / 5}]}>
          <Image style={styles.logo} source={logo} />
          <Text style={Styles.name}>PDAM</Text>
          <View style={{alignItems: 'center'}}>
            {/* <Text style={styles.text}>Login</Text> */}
            {this.state.errorM && (
              <Text style={Styles.error}>{this.state.errorM}</Text>
            )}
          </View>
          {/* <View style={styles.Input}>
            <Input
              placeholder="Email"
              autoCompleteType="email"
              leftIcon={<Icon name="envelope" size={24} color="black" />}
              onChangeText={(email) => this.setState({email})}
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
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={styles.button}>
            <Button title="Sign IN" type="outline" onPress={this.Login} />
          </View>
          <View style={styles.button}>
            <Button title="Sign UP" type="outline" onPress={this.register} />
          </View> */}
          <GoogleSigninButton
            style={Styles.btnGoole}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this.SignInGoogle()}
          />
        </View>
      </View>
    );
  }
}

Login.navigationOptions = {
  headerShown: false,
};

export default Login;

const Styles = StyleSheet.create({
  error: {color: 'red', margin: 10},
  btnGoole: {
    width: '90%',
    alignSelf: 'center',
    height: 48,
    marginTop: 30,
  },
  name: {
    fontSize: 35,
    marginTop: -15,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
