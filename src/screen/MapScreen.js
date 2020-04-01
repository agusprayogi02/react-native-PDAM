import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Styles from '../component/Style';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import PriceMarker from '../component/Map/PriceMarker';
import pin from '../assets/img/MapPin.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const ID = 0;
class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: null,
      latlang: {latitude: 0, longitude: 0},
      index: ID,
    };
  }
  componentDidMount() {
    this.init();
  }

  init() {
    var loc = this.props.navigation.state.params.location;
    var lat = {
      latitude: loc.latitude,
      longitude: loc.longitude,
    };
    this.setState({Location: loc, latlang: lat});
  }

  render() {
    return (
      <View style={Styles.container}>
        {/* {console.log(this.state.latlang)} */}
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          style={Styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.Location}
          // onRegionChange={e => this.setState({ latlang: e })}
          loadingEnabled={true}>
          <Marker draggable coordinate={this.state.latlang} pinColor="blue">
            <PriceMarker fontSize={12} amount={ID} borderColor="red" />
          </Marker>
        </MapView>
        <Image style={Styles.pinMap} source={pin} />
        <View style={Styles.footerMap}></View>
        <TouchableOpacity
          style={[
            Styles.floatButtom,
            {
              top: 15,
              left: 15,
              bottom: 0,
              right: 0,
              backgroundColor: 'transparent',
            },
          ]}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon name="arrow-circle-left" size={40} color="gray" />
        </TouchableOpacity>
      </View>
    );
  }
}

Maps.navigationOptions = {
  headerShown: false,
};

export default Maps;
