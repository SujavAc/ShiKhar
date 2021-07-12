import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
//import {useHistory} from 'react-router-dom';


var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvF0GL_KsfYBVm_BbBvOTNSIkTCPAOGtw",
    authDomain: "shikhar-9e7a0.firebaseapp.com",
    projectId: "shikhar-9e7a0",
    storageBucket: "shikhar-9e7a0.appspot.com",
    messagingSenderId: "692919986598",
    appId: "1:692919986598:web:3e4eb707f35f3adb744767",
    measurementId: "G-G07B69JDPH"
  });

  var firebaseDB = firebaseApp.database().ref();

  var firebaseStorage = firebaseApp.storage();

  var fireStore = firebaseApp.firestore();
   
  //var history = useHistory();

  export const auth = firebaseApp.auth();

  // const provider = new firebase.auth.GoogleAuthProvider();
  // provider.setCustomParameters({ prompt: 'select_account' });
  // export const signInWithGoogle = () => 
  //   auth.signInWithPopup(provider);

  export {
    firebaseStorage, firebaseDB, fireStore, firebase as default
  }
  
  // firebase.auth().onAuthStateChanged(user=>{
  //   if (user){
  //     console.log(user);
      
  //   }else{
  //     console.log('not logged in');
  //   }
  // });