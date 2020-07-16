import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import Styles from '../component/Style';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import PriceMarker from '../component/Map/PriceMarker';
import pin from '../assets/img/MapPin.png';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {Costum} from '../component/Map/Map';
import Retro from '../component/Map/RetroMap';
import {CMap, UMap, db, DMap} from '../component/Database';
import {getDistance} from 'geolib';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

const {height} = Dimensions.get('window');
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.002;
let ID = 0;
var isrot = true,
  editing = false;
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
class Maps extends Component {
  constructor(props) {
    super(props);
    let {location, item} = props.navigation.state.params;
    this.state = {
      Location: location,
      latlang: {latitude: 0, longitude: 0},
      index: ID,
      rot: {},
      bView: new Animated.Value(150),
      changePos: location,
      coordinates: [],
      data: item,
      coords: [],
      edit: {},
      meteran: [],
      loading: false,
    };
    // this.init();
  }

  componentDidMount() {
    this.init();
  }

  init() {
    var {location, item} = this.props.navigation.state.params;
    var lat = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.setState({
      Location: location,
      latlang: lat,
      data: item,
      loading: true,
      changePos: location,
    });
    var data = {
      key: 'Layer1',
      id: 1,
      coordinate: lat,
      color: 'red',
    };
    UMap(data, item.Tname);
    db().transaction((tx) => {
      tx.executeSql('SELECT * FROM ' + item.Tname, [], (rest, All) => {
        let isi = [],
          coords = [],
          meter = [0],
          p = 0;
        for (let i = 0; i < All.rows.length; i++) {
          const dt = All.rows.item(i);
          var coordinate = {
            latitude: parseFloat(dt.latitude),
            longitude: parseFloat(dt.longitude),
          };
          var out = {
            key: 'Layer' + dt.id,
            id: --dt.id,
            no: i,
            coordinate: coordinate,
            color: dt.color,
          };
          coords.push(coordinate);
          isi.push(out);
          this.setState({index: dt.id});
        }
        if (coords[1]) {
          for (let index = 1; index < coords.length; index++) {
            var m = getDistance(coords[p], coords[index]);
            p++;
            meter.push(m);
          }
        }
        // console.log(meter);
        this.setState({
          coordinates: isi,
          coords: coords,
          meteran: meter,
          loading: false,
        });
      });
    });
  }

  _set() {
    if (!isrot) {
      let {changePos, data, index, edit} = this.state;
      if (editing) {
        var ini = {
          id: edit,
          coordinate: changePos,
          color: randomColor(),
        };
        UMap(ini, data.Tname);
        editing = false;
      } else {
        var ini = {
          key: 'Layer' + ++index,
          id: ++index,
          coordinate: changePos,
          color: randomColor(),
        };
        CMap(ini, data.Tname);
        this.setState({index: index});
      }
      this.init();
      this._rotate();
    }
  }

  _rotate() {
    var toValue = 150;
    if (isrot) {
      this.setState({rot: {transform: [{rotate: '45deg'}]}});
      toValue = 0;
    } else {
      this.setState({rot: {}});
      toValue = 150;
    }

    Animated.spring(this.state.bView, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();

    isrot = !isrot;
  }

  _dataPress(data) {
    var cor = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.setState({
      edit: data.id + 1,
      changePos: cor,
    });
    editing = true;
  }

  DeletePos = () => {
    let {edit, data} = this.state;
    DMap(edit, data.Tname);
    editing = false;
    this.init();
  };

  render() {
    return (
      <View style={Styles.container}>
        {/* {console.log(this.state.coordinates)} */}
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          // followsUserLocation={true}
          style={Styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.Location}
          customMapStyle={Retro}
          onRegionChangeComplete={(e) => this.setState({changePos: e})}
          // region={this.state.changePos}
          onPoiClick={(e) => {
            console.log(e.nativeEvent);
          }}
          loadingEnabled={true}>
          <Polyline
            coordinates={this.state.coords}
            strokeColor="red"
            strokeWidth={3}
          />
          {this.state.coordinates &&
            this.state.coordinates.map((data) => (
              <Marker
                key={data.id}
                draggable
                coordinate={data.coordinate}
                onPress={(e) => console.log(e)}
                pinColor="blue">
                <PriceMarker
                  fontSize={12}
                  amount={data.id}
                  borderColor={data.color}
                />
                {/* {console.log(data.coordinate)} */}
              </Marker>
            ))}
        </MapView>
        {!isrot && <Image style={Styles.pinMap} source={pin} />}
        <View style={Styles.footerMap}>
          <View style={[Styles.MapText, {flexDirection: 'row'}]}>
            <Text style={custom.text}>{this.state.data.name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={Styles.MapTextJudul}>Distance :</Text>
            {editing && (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <TouchableOpacity
                    style={Styles.btnCircle}
                    onPress={() => {
                      this._rotate();
                    }}>
                    <Icon name="edit" size={17} color="white" />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    custom.text,
                    {
                      marginHorizontal: 15,
                      color: 'white',
                    },
                  ]}>
                  No. {this.state.edit - 1}
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.DeletePos();
                    }}
                    style={[Styles.btnCircle, {backgroundColor: 'red'}]}>
                    <Icon name="trash" size={17} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <FlatList
            data={this.state.coordinates}
            style={[Styles.Input, {marginHorizontal: 15, marginBottom: 15}]}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.key}
                style={Styles.dataMap}
                onPress={() => this._dataPress(item)}>
                <Text style={{margin: 5, marginHorizontal: 15}}>
                  {item.id}. {'  Position'} {item.id - 1} To {item.id} :{' '}
                  {this.state.meteran[item.no]} M
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity
          style={[Styles.floatButtom, custom.floatL]}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon name="arrow-circle-left" size={45} color="white" />
        </TouchableOpacity>
        {!isrot && (
          <Animated.View
            style={[
              custom.subView,
              {transform: [{translateY: this.state.bView}]},
            ]}>
            <TouchableOpacity
              style={custom.floatView}
              onPress={() => {
                this._set();
              }}>
              <Icon name="check-circle" size={35} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={[Styles.floatButtom, custom.floatR, this.state.rot]}
          onPress={() => {
            this._rotate();
          }}>
          <Icon name="plus-circle" size={45} color="white" />
        </TouchableOpacity>
        <Spinner
          visible={this.state.loading}
          color="red"
          size="large"
          textContent={'Loading...'}
          textStyle={{color: 'red'}}
        />
      </View>
    );
  }
}

Maps.navigationOptions = {
  headerShown: false,
};

const custom = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  floatL: {
    top: height / 2,
    left: 15,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  floatR: {
    top: height / 2,
    bottom: 0,
    right: 15,
    backgroundColor: 'transparent',
  },
  floatView: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  subView: {
    top: height / 2.3,
    bottom: 0,
    right: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export default Maps;
