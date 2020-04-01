import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {firebase} from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.location();
  }

  location = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
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
            console.log('The permission is denied and not requestable anymore');
            this.getRequest();
            break;
        }
      })
      .catch(error => {
        console.log('Terjadi error: ' + error);
        this.getRequest();
      });
  };

  getRequest() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
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
      position => {
        // console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
}
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
