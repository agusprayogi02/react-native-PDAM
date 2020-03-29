import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Styles from '../component/Style'
import Prompt from 'react-native-simple-prompt'
import { addUnit, GetUnit, getUser, deleteUnit } from '../component/Firebase'
import Service from '../component/NavigationService'
import { ScrollView } from "react-native-gesture-handler";

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class Unit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            refresh: false
        }
    }

    componentDidMount() {
        this.list()
    }

    list() {
        GetUnit().then((dt) => {
            this.setState({ list: [] })
            dt.forEach((e) => {
                const dt = e.val()
                if (dt.uid == getUser().uid) {
                    var data = [
                        ...this.state.list,
                        dt
                    ]
                    this.setState({ list: data })
                }
            })
        })
    }

    moveLayer(name) {
        Service.navigate('Layer', { 'Unit': name, })
    }

    onRefresh() {
        this.setState({ refresh: true })
        this.list()
        wait(1000).then(() => this.setState({ refresh: false }))
    }

    delete(dt) {
        // console.log(dt);
        deleteUnit(dt).then(() => {
            this.list()
        }).catch((err) => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView centerContent={true} refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={() => this.onRefresh()} />} style={{ marginBottom: 10, width: '100%', paddingLeft: 20 }}>
                    <Text style={Styles.text}>Daftar Unit</Text>
                    {this.state.list && <View style={[Styles.card, { paddingTop: 20, marginTop: 10 }]}>
                        {this.state.list.map(rest => (
                            <View style={{ flexDirection: "row", }} key={rest.id}>
                                <TouchableOpacity style={[Styles.Input, { width: '75%' }]} onPress={() => this.moveLayer(rest)}>
                                    <Text style={[Styles.text, { fontSize: 20 }]}>{rest.name} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.btnshow, { backgroundColor: 'red', paddingHorizontal: 10, borderRadius: 5 }]} onPress={() => this.delete(rest.name)}>
                                    <Icon name="trash" style={Styles.iconBtn} size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>}
                </ScrollView>
                <TouchableOpacity
                    style={Styles.floatButtom}
                    onPress={() => {
                        Prompt.show('Tambah Unit data', 'Masukkan Nama Unit!!',
                            data => {
                                data = data.trim()
                                data = data.toUpperCase()
                                addUnit(data).then(() => {
                                    this.onRefresh()
                                })
                            })
                    }}
                >
                    <Icon name="plus" size={30} color="#01a699" />
                </TouchableOpacity>
                <Prompt />
            </View>
        );
    }
}
export default Unit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});