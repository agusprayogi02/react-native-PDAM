import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { firebase } from '@react-native-firebase/auth'

class Loading extends Component {

    constructor(props) {
        super(props)
        this.location()
    }

    location = async () => {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch(error => {
                console.log("Terjadi error: " + error);
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                    .then(result => {
                        switch (result) {
                            case RESULTS.UNAVAILABLE:
                                console.log(
                                    'This feature is not available (on this device / in this context)',
                                );
                                break;
                            case RESULTS.DENIED:
                                console.log(
                                    'The permission has not been requested / is denied but requestable',
                                );
                                break;
                            case RESULTS.GRANTED:
                                console.log('The permission is granted');
                                break;
                            case RESULTS.BLOCKED:
                                console.log('The permission is denied and not requestable anymore');
                                break;
                        }
                    })
            });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Home')
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }
}
export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});