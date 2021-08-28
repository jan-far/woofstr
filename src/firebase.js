import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAmt2Pg5tvIUPUqTwl661JcL5oiqyplsv4',
  authDomain: 'woofstr-7a206.firebaseapp.com',
  projectId: 'woofstr-7a206',
  storageBucket: 'woofstr-7a206.appspot.com',
  messagingSenderId: '793125272417',
  appId: '1:793125272417:web:3fd661b9c0f8068662e320',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
console.log('🚀 ~ file: firebase.js ~ line 19 ~ db', db);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref('images');
const audioStorage = firebase.storage().ref('audios');
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};
