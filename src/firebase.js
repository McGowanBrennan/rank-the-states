import firebase from "firebase/app"
import 'firebase/analytics';
import "firebase/firestore"
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyDQfF5KckC3d6I5tUV_a8Gpao3fYCr3lAg",
    authDomain: "state-rank.firebaseapp.com",
    databaseURL: "https://state-rank.firebaseio.com",
    projectId: "state-rank",
    storageBucket: "state-rank.appspot.com",
    messagingSenderId: "139615399873",
    appId: "1:139615399873:web:3dc4afaaa7bb9edc828940"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase