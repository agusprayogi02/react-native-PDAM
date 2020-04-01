import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/database';

const getUser = () => {
  var uid = firebase.auth().currentUser;
  return uid;
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

const addUnit = async dt => {
  var rand =
    'a' +
    Math.random()
      .toString(36)
      .substring(7) +
    Math.random()
      .toString(36)
      .substring(7);
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

const deleteUnit = async dt => {
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

const logOut = () => {
  return firebase.auth().signOut();
};

export {SignIn, SignUp, addUnit, GetUnit, getUser, deleteUnit, logOut};
