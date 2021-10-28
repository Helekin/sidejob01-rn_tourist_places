import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzmRUweoVMMUrAhr3_SmcnnWI9PiAx5Wk",
  authDomain: "sidejob01-tourist-places.firebaseapp.com",
  projectId: "sidejob01-tourist-places",
  storageBucket: "sidejob01-tourist-places.appspot.com",
  messagingSenderId: "222123564640",
  appId: "1:222123564640:web:94594962769e5cec0cad05",
  measurementId: "G-53KX1DP6V7",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
