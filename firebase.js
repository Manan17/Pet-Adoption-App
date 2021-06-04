import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCStpjYrlg1eVJeDoGbX_otv_SGqsD4kEQ",
  authDomain: "petsandhumans-65bc4.firebaseapp.com",
  projectId: "petsandhumans-65bc4",
  storageBucket: "petsandhumans-65bc4.appspot.com",
  messagingSenderId: "248188752584",
  appId: "1:248188752584:web:70f45085fa2b7abd7b0bfd",
  measurementId: "G-15HR4PP9DR",
};

let app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
