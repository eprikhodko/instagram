// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// import {seedDatabase} from "../seed"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBe12SZq-2xyOxV5PQI6q5iDZHtWBuoKmA",
    authDomain: "instagram-c2f5a.firebaseapp.com",
    projectId: "instagram-c2f5a",
    storageBucket: "instagram-c2f5a.appspot.com",
    messagingSenderId: "942084475661",
    appId: "1:942084475661:web:83fe8bcb0308566840be44"
  }

  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

const {FieldValue} = firebase.firestore

// seedDatabase(firebase)

export {firebase, FieldValue}