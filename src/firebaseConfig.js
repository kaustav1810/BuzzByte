// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwS5MeDhJYF2hLRzvJzDgFRk4_kYAurJM",
  authDomain: "twitter-clone-f12d0.firebaseapp.com",
  projectId: "twitter-clone-f12d0",
  storageBucket: "twitter-clone-f12d0.appspot.com",
  messagingSenderId: "724936469034",
  appId: "1:724936469034:web:8c70fa39ce2df602eab153",
  measurementId: "G-SPV2W0YJGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const analytics = getAnalytics(app);

export  {auth,db} ;