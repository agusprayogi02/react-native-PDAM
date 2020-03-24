import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    isi: {
        height: 50,
        flex: 1,
        backgroundColor: "#fff",
        opacity: 0.7,
        borderRadius: 3,
        flexDirection: "row"
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header: {
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: height / 1.5,
    },
    gambar: {
        marginBottom: 40,
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: 'transparent',
    },
    export: {
        marginBottom: 40,
        backgroundColor: 'transparent',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 10
    },
    street: {
        height: 35,
        width: 35,
        borderRadius: 35,
        marginLeft: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    btnshow: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: "lightblue",
        borderRadius: 5,
        paddingVertical: 7
    },
    menu: {
        backgroundColor: '#fff',
        opacity: 0.8,
        height: 50,
        width: 50,
        borderRadius: 3,
    },
    showMenu: {
        backgroundColor: "pink",
        opacity: 0.6,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center"
    },

    // sign in

    containerSGN: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#20ACDA"
    },
    card: {
        padding: 10,
        marginTop: 30,
        alignContent: "center",
        width: "90%",
        borderRadius: 5,
        backgroundColor: "lightblue",
    },
    Input: {
        borderWidth: 0.5,
        borderColor: '#007fff',
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: "blue",
        paddingBottom: 3,
        backgroundColor: "#eaeaea"
    },
    text: {
        fontSize: 35,
        margin: 10,
        fontWeight: 'bold',
        color: 'blue',
    },
    button: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    logo: {
        alignSelf: 'center',
        width: 140,
        height: 120,
        borderColor: 'black',
        // borderWidth: 1,
        // backgroundColor: '#eaeaea',
        marginTop: 5
    },
    btnheader: {
        marginVertical: 10,
        backgroundColor: '#0001fc',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center'
    }
});