import { firebase } from "@react-native-firebase/auth";
import '@react-native-firebase/database';
import React, { useState } from "react";

const getUser = () => {
    var uid = firebase.auth().currentUser
    return uid
}

const SignIn = async (email, password) => {
    const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
    return auth
}

const SignUp = async (email, pass) => {
    const auth = await firebase.auth().createUserWithEmailAndPassword(email, pass)
    return auth
}

const addUnit = async (dt) => {
    var rand = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)
    var data = {
        id: rand,
        uid: getUser().uid,
        name: dt
    }
    const db = await firebase.database().ref('Unit/' + rand).set(data)
    return db
}

const deleteUnit = async (dt) => {
    var db = await firebase.database().ref('Unit/' + dt).remove()
    return db
}

const GetUnit = async () => {
    var db = await firebase.database().ref('Unit/').once("value")
    return db
}

export {
    SignIn,
    SignUp,
    addUnit,
    GetUnit,
    getUser,
    deleteUnit
}
