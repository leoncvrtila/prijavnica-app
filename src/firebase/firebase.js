import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDG6k7UhE_5NI9FCYmoQ3SxcevpVhlCgwE",
    authDomain: "core-5f8c5.firebaseapp.com",
    databaseURL: "https://core-5f8c5.firebaseio.com",
    projectId: "core-5f8c5",
    storageBucket: "core-5f8c5.appspot.com",
    messagingSenderId: "782739521223",
    appId: "1:782739521223:web:eaa25d99f06fea1e34c8e2",
    measurementId: "G-VQ0EZFREH9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }