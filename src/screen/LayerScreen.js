import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import service from '../component/NavigationService';
import Geolocation from 'react-native-geolocation-service';
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.002;
import Styles from '../component/Style';
import {
  createTable,
  db,
  createData,
  deleteData,
  CTableMap,
  deleteTable,
  CMap,
} from '../component/Database';
import Icon from 'react-native-vector-icons/FontAwesome';

var index = 0;
class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLoc: {},
      data: null,
      name: null,
    };
  }

  componentDidMount() {
    this.getCurrent();
  }

  componentWillUnmount() {
    index = 0;
  }

  async getCurrent() {
    const name = this.props.navigation.state.params.Unit.id;
    this.setState({name: name});
    Geolocation.getCurrentPosition(
      (loc) => {
        const coord = loc.coords;
        var location = {
          latitude: coord.latitude,
          longitude: coord.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({getLoc: location});
      },
      (err) => {
        console.log('Error: ' + err);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // deleteTable()
    createTable(name);
    (await db()).transaction((tx) => {
      tx.executeSql('SELECT * FROM ' + name, [], (rest, data) => {
        let isi = [],
          i;
        if (data.rows.item(0) == null) {
          var isine = {
            key: 'item1',
            id: 1,
            name: 'Layer 1',
            Tname: 'L' + name + '1',
          };
          this._Add();
          isi.push(isine);
          i = 0;
        }
        for (i = 0; i < data.rows.length; i++) {
          const dt = data.rows.item(i);
          var out = {
            key: 'item' + dt.id,
            id: dt.id,
            name: dt.name,
            Tname: dt.Tname,
          };
          isi.push(out);
          index = dt.id;
        }
        this.setState({data: isi});
      });
    });
  }

  delete(item) {
    var data = {
      name: this.state.name,
      id: item.id,
    };
    deleteData(data);
    deleteTable(item.Tname);
    this.getCurrent();
  }

  _Add() {
    var name = this.state.name;
    const {getLoc} = this.state;
    index++;
    var isine = {
      name: 'Layer ' + index,
      Tname: 'L' + name + index,
    };
    console.log('bisa');
    createData(isine, name);
    this.getCurrent();
    CTableMap(isine.Tname);
    var data = {
      coordinate: getLoc,
      color: 'red',
    };
    CMap(data, isine.Tname);
  }

  _move(item) {
    service.navigate('Maps', {
      location: this.state.getLoc,
      item: item,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[Styles.text, {textAlign: 'center', fontSize: 25}]}>
          Daftar Layer
        </Text>
        <TouchableOpacity
          style={Styles.floatButtom}
          onPress={() => this._Add()}>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
        <View style={[Styles.card, {paddingTop: 15, marginTop: 15}]}>
          {this.state.data && (
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <View key={item.key} style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[Styles.Input, {width: '75%'}]}
                    onPress={() => this._move(item)}>
                    <Text style={[Styles.text, {fontSize: 20, margin: 5}]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[Styles.btnshow, styles.deleteBtn]}
                    onPress={() => this.delete(item)}>
                    <Icon
                      name="trash"
                      style={Styles.iconBtn}
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {this.state.data === null && (
            <View style={Styles.Input}>
              <Text style={[Styles.text, {fontSize: 20, margin: 5}]}>
                Tidak ada
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default Layer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'flex-end',
  },
});
