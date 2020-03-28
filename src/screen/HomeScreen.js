import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Unit') }}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});