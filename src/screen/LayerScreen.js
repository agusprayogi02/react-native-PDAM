import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import service from '../component/NavigationService'
import Geolocation from '@react-native-community/geolocation'
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0020

class Layer extends Component {

    constructor(props) {
        super(props)
        this.getCurrent()
        this.state = {
            getLoc: {}
        }
    }

    async getCurrent() {
        Geolocation.getCurrentPosition(loc => {
            const coord = loc.coords
            var location = {
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            this.setState({ getLoc: location })
        }, err => { console.log("Error: " + err) }, { timeout: 100000, enableHighAccuracy: true })
    }

    setMaps() {
        service.navigate('Maps', { 'location': this.state.getLoc })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setMaps()}>
                    <Text>Layer</Text>
                </TouchableOpacity>
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