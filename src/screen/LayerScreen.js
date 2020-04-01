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
  updatePos,
  deleteData,
} from '../component/Database';
import Icon from 'react-native-vector-icons/FontAwesome';

class Layer extends Component {
  constructor(props) {
    super(props);
    this.getCurrent();
    this.state = {
      getLoc: {},
      data: null,
      index: 0,
    };
  }

  async getCurrent() {
    const name = this.props.navigation.state.params.Unit.id;
    const unit = this.props.navigation.state.params.Unit;
    Geolocation.getCurrentPosition(
      loc => {
        const coord = loc.coords;
        var location = {
          latitude: coord.latitude,
          longitude: coord.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({getLoc: location});
      },
      err => {
        console.log('Error: ' + err);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // deleteTable()
    createTable(name);
    (await db()).transaction(tx => {
      tx.executeSql('SELECT * FROM ' + name, [], (rest, data) => {
        let isi = [],
          i;
        if (data.rows.item(0) == null) {
          var isine = {
            key: 'item1',
            id: 1,
            name: 'Layer 1',
            position: '',
          };
          console.log('bisa');
          createData(isine, name);
          isi.push(isine);
          i = 0;
        }
        for (i = 0; i < data.rows.length; i++) {
          const dt = data.rows.item(i);
          var out = {
            key: 'item' + dt.id,
            id: dt.id,
            name: dt.name,
            position: dt.position,
          };
          isi.push(out);
          this.setState({index: dt.key});
        }
        this.setState({data: isi});
      });
    });
  }

  delete(id) {
    var data = {
      name: this.props.navigation.state.params.Unit.id,
      id: id,
    };
    deleteData(data);
    this.getCurrent();
  }

  _Add() {
    var {index} = this.state;
    var name = this.props.navigation.state.params.Unit.id;
    var isine = {
      key: 'item' + index,
      id: ++index,
      name: 'Layer ' + index,
      position: '',
    };
    console.log('bisa');
    createData(isine, name);
    this.getCurrent();
  }

  _move(name, id) {
    service.navigate('Maps', {
      location: this.state.getLoc,
      id: name,
    });
    var data = {
      name: this.props.navigation.state.params.Unit.id,
      pos: JSON.stringify(this.state.getLoc),
      id: id,
    };
    updatePos(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={Styles.floatButtom}
          onPress={() => this._Add()}>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
        <View style={[Styles.card, {paddingTop: 20}]}>
          {this.state.data && (
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <View key={item.key} style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[Styles.Input, {width: '75%'}]}
                    onPress={() => this._move(item.name, item.id)}>
                    <Text style={[Styles.text, {fontSize: 20, margin: 5}]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      Styles.btnshow,
                      {
                        backgroundColor: 'red',
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        height: 40,
                        justifyContent: 'flex-end',
                      },
                    ]}
                    onPress={() => this.delete(item.id)}>
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
});
