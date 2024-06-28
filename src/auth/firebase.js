import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: 'AIzaSyC_uMbcQTNy8aBVfYcA90ERBiae808EaF0',
  authDomain: 'prevencao-18c5d.firebaseapp.com',
  databaseURL: 'https://prevencao-18c5d-default-rtdb.firebaseio.com',
  projectId: 'prevencao-18c5d',
  storageBucket: 'prevencao-18c5d.appspot.com',
  messagingSenderId: '332715181515',
  appId: '1:332715181515:web:f7961290dea302e09da24e',
  measurementId: 'G-TWSVGFH33H',
};
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();

export default database;
