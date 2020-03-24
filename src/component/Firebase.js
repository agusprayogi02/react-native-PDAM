import { firebase } from "@react-native-firebase/auth";

const SignIn = async (email, password) => {
    const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
    return auth
}

const SignUp = async (email, pass) => {
    const auth = await firebase.auth().createUserWithEmailAndPassword(email, pass)
    return auth
}

export {
    SignIn,
    SignUp
}
