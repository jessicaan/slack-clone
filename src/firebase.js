import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOZzNYgsjnJNxMJ-TspQWhmRH6eeEONkY",
  authDomain: "slack-clone-78146.firebaseapp.com",
  projectId: "slack-clone-78146",
  storageBucket: "slack-clone-78146.appspot.com",
  messagingSenderId: "862581278633",
  appId: "1:862581278633:web:39805bbbb4820e9616a6b8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
