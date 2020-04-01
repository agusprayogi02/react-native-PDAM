import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../component/Style';
import logo from '../assets/img/agus.jpg';
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
            Hai, {getUser().email}{' '}
          </Text>
          <TouchableOpacity style={styles.btnImage}>
            <Image
              source={logo}
              style={[styles.btnImage, {top: 0, right: 0}]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnUnit}
          onPress={() => this.props.navigation.navigate('Unit')}>
          <Image
            source={unit}
            style={[
              styles.btnUnit,
              {marginTop: 0, backgroundColor: '#00bfff', borderWidth: 0},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnUnit,
            {backgroundColor: '#00bfff', justifyContent: 'center'},
          ]}
          onPress={() => logOut()}>
          <Icon size={80} name="sign-out" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
      </View>
    );
  }
}
Home.navigationOptions = {
  headerShown: false,
};
export default Home;
