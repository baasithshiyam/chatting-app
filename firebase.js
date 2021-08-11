import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVpKcajsrIVsN_YW6tQqjuU5dk9WRR06k",
    authDomain: "chatting-app-82238.firebaseapp.com",
    projectId: "chatting-app-82238",
    storageBucket: "chatting-app-82238.appspot.com",
    messagingSenderId: "422666312188",
    appId: "1:422666312188:web:0bae900165293d59497a79"
  };

  let app;

  if (firebase.apps.length  === 0){
      app =  firebase.initializeApp(firebaseConfig);
  }else{
      app = firebase.app();
  }

const db = app.firestore();
const auth = firebase.auth();

export {db , auth} ;