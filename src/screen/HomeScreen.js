import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import styles from '../component/Style';
import unit from '../assets/img/unit.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getUser, logOut} from '../component/Firebase';

class Home extends Component {
  render() {
    return (
      <View style={[styles.containerSGN, {backgroundColor: '#eaeaea'}]}>
        <View style={styles.Navheader}>
          <Text style={styles.dasb}>DASHBOARD</Text>
          <Text style={{marginLeft: 15, marginTop: -3}}>
            Hai, {getUser().displayName}{' '}
          </Text>
          <TouchableOpacity style={styles.btnImage}>
            <Image
              source={{uri: getUser().photoURL}}
              style={[styles.btnImage, {top: 0, right: 0}]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnUnit}
          onPress={() => this.props.navigation.navigate('Unit')}>
          <Image source={unit} style={[styles.btnUnit, custom.btn]} />
          <Text style={custom.text}>Unit PDAM</Text>
        </TouchableOpacity>
        <View style={[styles.btnUnit, {justifyContent: 'center'}]}>
          <TouchableOpacity onPress={() => logOut()}>
            <Icon
              size={80}
              name="sign-out"
              style={{alignSelf: 'center', height: 100}}
            />
            <Text style={custom.text}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
Home.navigationOptions = {
  headerShown: false,
};
export default Home;

const custom = StyleSheet.create({
  btn: {
    marginTop: 0,
    height: 100,
    borderWidth: 0,
  },
  text: {
    alignSelf: 'center',
    marginTop: -10,
    fontWeight: 'bold',
  },
});
