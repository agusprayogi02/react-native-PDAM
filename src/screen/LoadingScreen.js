import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {firebase} from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import Styles from '../component/Style';
import logo from '../assets/img/hhh.png';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

class Loading extends Component {
  constructor(props) {
    super(props);
    this.location();
  }

  componentDidMount() {
    this.getLogin();
  }

  location = async () => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              this.getRequest();
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              this.getRequest();
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              this.getCurrentLoc();
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              this.getRequest();
              break;
          }
        })
        .catch((error) => {
          console.log('Terjadi error: ' + error);
          this.getRequest();
        });
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      request(PERMISSIONS.IOS.MEDIA_LIBRARY);
    }
  };

  getRequest() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    });
  }

  getCurrentLoc() {
    Geolocation.watchPosition(
      (position) => {
        // console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  getLogin() {
    wait(1000).then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Login');
        }
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={Styles.logo} source={logo} />
        <ActivityIndicator size="large" color="red" />
        <Text>Loading...</Text>
      </View>
    );
  }
}

Loading.navigationOptions = {
  headerShown: false,
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#20ACDA',
  },
});
