// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  browserSessionPersistence,
  setPersistence,
  sendPasswordResetEmail,
  inMemoryPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

const firebase_apikey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebase_authdomain = import.meta.env.VITE_AUTHDOMAIN;
const firebase_projectid = import.meta.env.VITE_PROJECTID;
const firebase_storagebucket = import.meta.env.VITE_STORAGEBUCKET;
const firebase_messagingsenderid = import.meta.env.VITE_MESSAGINGSENDERID;
const firebase_appid = import.meta.env.VITE_APPID;
const firebase_measurementid = import.meta.env.VITE_MEASUREMENTID;

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebase_apikey,
  authDomain: firebase_authdomain,
  projectId: firebase_projectid,
  storageBucket: firebase_storagebucket,
  messagingSenderId: firebase_messagingsenderid,
  appId: firebase_appid,
  measurementId: firebase_measurementid,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// auth variable to get the user information who is currently authenticated
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// This is the logout function.
export const logOut = () => {
  signOut(auth)
    .then(() => {
      // console.log('loggedout');
    })
    .catch((error) => {
      // console.log('error');
    });
};
