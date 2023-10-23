// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore'; // Include Firestore module

const firebaseConfig = {
  apiKey: "AIzaSyBGjNqS0k1ynQK2WgWYJfSBt_WZffSVKeo",
  authDomain: "quiz-bethel.firebaseapp.com",
  projectId: "quiz-bethel",
  storageBucket: "quiz-bethel.appspot.com",
  messagingSenderId: "1060365324102",
  appId: "1:1060365324102:web:24442514262641005ddf47"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {  auth, firestore };