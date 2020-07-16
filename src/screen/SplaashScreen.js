import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.navigate('Load2');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Splash</Text>
      </View>
    );
  }
}

Splash.navigationOptions = {
  headerShown: false,
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
