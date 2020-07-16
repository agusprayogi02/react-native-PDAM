import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import React, {useState} from 'react';

GoogleSignin.configure({
  webClientId:
    '286885361678-7ifu645uam7f09r5vdrksde3o83elkh7.apps.googleusercontent.com', // From Firebase Console Settings
  offlineAccess: true,
});

// const _cUSer = async () => {
//   const userInfo = await GoogleSignin.signInSilently();
//   return userInfo;
// };

const getUser = () => {
  var user = firebase.auth().currentUser;
  return user;
};

const SignIn = async (email, password) => {
  const auth = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return auth;
};

const SignUp = async (email, pass) => {
  const auth = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass);
  return auth;
};

const addUnit = async (dt) => {
  var rand =
    'a' +
    Math.random().toString(36).substring(7) +
    Math.random().toString(36).substring(7);
  var data = {
    id: rand,
    uid: getUser().uid,
    name: dt,
  };
  const snapshot = await firebase
    .database()
    .ref('Unit/' + getUser().uid + '/' + dt)
    .once('value');
  let db = null;
  if (!snapshot.exists()) {
    db = await firebase
      .database()
      .ref('Unit/' + getUser().uid + '/' + dt)
      .set(data);
  } else {
    db = 'Sudah ada';
  }
  return db;
};

const deleteUnit = async (dt) => {
  var db = await firebase
    .database()
    .ref('Unit/' + getUser().uid + '/' + dt)
    .remove();
  return db;
};

const GetUnit = async () => {
  var db = await firebase
    .database()
    .ref('Unit/' + getUser().uid + '/')
    .once('value');
  return db;
};

const logOut = async () => {
  await GoogleSignin.revokeAccess();
  return firebase.auth().signOut();
};

async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices();
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return firebase.auth().signInWithCredential(googleCredential);
}

export {
  SignIn,
  SignUp,
  addUnit,
  GetUnit,
  getUser,
  deleteUnit,
  logOut,
  onGoogleButtonPress,
  // _cUSer,
};
