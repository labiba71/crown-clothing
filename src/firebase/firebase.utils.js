import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  
  apiKey: "AIzaSyAj1MgF1O3e3FVjn779R9yfQU2EVivYLn0",
  authDomain: "crown-db-45281.firebaseapp.com",
  databaseURL: "https://crown-db-45281.firebaseio.com",
  projectId: "crown-db-45281",
  storageBucket: "crown-db-45281.appspot.com",
  messagingSenderId: "850152882197",
  appId: "1:850152882197:web:84f95716741c62c05f8e1c",
  measurementId: "G-TGJCTWFNL8",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
