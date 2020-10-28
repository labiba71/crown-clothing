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

//saving user at firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

//adding shop data in firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transfromedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeNmae: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transfromedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//signin with google account
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
