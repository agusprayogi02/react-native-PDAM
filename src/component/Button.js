import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Dimensions, StyleSheet, Animated} from 'react-native';
import Styles from './Style';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height, width} = Dimensions.get('window');

const propType = {
  edit: PropTypes.bool,
  plus: PropTypes.bool,
  editPress: PropTypes.func,
};

var isRot = true;
const FloatPlus = props => {
  const [Rotasi, setRotasi] = useState({});
  function rotasi() {
    if (isRot) {
      setRotasi({transform: [{rotate: '45deg'}]});
    } else {
      setRotasi({});
    }
    isRot = !isRot;
  }

  function root() {
    const {edit, plus, editPress, plusPress, editStyle, setPress} = props;
    edit && (
      <TouchableOpacity style={editStyle} onPress={() => editPress}>
        <Icon name="arrow-circle-left" size={45} color="white" />
      </TouchableOpacity>
    );
    plus && (
      <>
        <Animated.View>
          <TouchableOpacity style={styles.floatView} onPress={() => setPress}>
            <Icon name="arrow-circle-left" size={45} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={[Styles.floatButtom, styles.floatR, Rotasi]}
          onPress={() => {
            rotasi();
            plusPress;
          }}>
          <Icon name="arrow-circle-left" size={45} color="white" />
        </TouchableOpacity>
      </>
    );
  }
  return root;
};
FloatPlus.propType = propType;
export default FloatPlus;

const styles = StyleSheet.create({
  floatR: {
    top: height / 2.4,
    bottom: 0,
    right: 15,
    backgroundColor: 'transparent',
  },
  floatView: {
    top: height / 2.4,
    bottom: 0,
    right: 15,
    backgroundColor: '#eaeaea',
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});
