import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import service from '../component/NavigationService'
import Geolocation from 'react-native-geolocation-service'
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0020
import Styles from '../component/Style'
import { createTable, createData, db, deleteTable } from "../component/Database";

class Layer extends Component {

    constructor(props) {
        super(props)
        this.getCurrent()
        this.state = {
            getLoc: {},
            data: []
        }
    }

    async getCurrent() {
        const name = this.props.navigation.state.params.Unit.id
        const unit = this.props.navigation.state.params.Unit
        Geolocation.getCurrentPosition(loc => {
            const coord = loc.coords
            var location = {
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            this.setState({ getLoc: location })
        }, err => { console.log("Error: " + err) }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
        // deleteTable()
        createTable(name)
            ; (await db()).transaction((tx) => {
                tx.executeSql("SELECT * FROM " + name, [], (rest, data) => {
                    // console.log("aff: " + data.rows.item());
                    let isi = []
                    for (let i = 0; i < data.rows.length; i++) {
                        const dt = data.rows.item(i);
                        // console.log(dt)
                        var out = {
                            key: 'item' + dt.id,
                            name: dt.name,
                            position: dt.position
                        }
                        isi.push(out)
                    }
                    this.setState({ data: isi })
                })
            })
    }


    render() {
        return (
            <View style={styles.container}>
                {/* {console.log(this.state.data)} */}
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.key} onPress={() => service.navigate('Maps', { 'location': this.state.getLoc, 'id': item.name })}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>)} />
            </View>
        );
    }
}
export default Layer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});