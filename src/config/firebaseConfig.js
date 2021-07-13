import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC-zd7E8g1oa1rME6ELY7C7Em5_ju3EyKs",
  authDomain: "online-cinema-b5683.firebaseapp.com",
  databaseURL: "https://online-cinema-b5683.firebaseio.com",
  projectId: "online-cinema-b5683",
  storageBucket: "online-cinema-b5683.appspot.com",
  messagingSenderId: "365768693004",
  appId: "1:365768693004:web:bfb2b64b80bd31b0c82529",
  measurementId: "G-LFHW1MDMDM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;