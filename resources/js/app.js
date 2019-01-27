require("./bootstrap");
require("./ReactApp");

import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyAnBd-7hmPO0dtJLrtGDWRF5wHbmiU0ho4",
  authDomain: "entree-70ebf.firebaseapp.com",
  databaseURL: "https://entree-70ebf.firebaseio.com",
  storageBucket: "entree-70ebf.appspot.com"
});
