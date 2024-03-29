import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"
import "firebase/compat/firestore";
import "firebase/compat/storage";

// firebase config 정보
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGAGING_SENDERP_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase export
export const firebaseInstance = firebase;

// 사용자 인증 정보
export const authService = firebase.auth();

// firebase database 사용 함수
export const dbService = firebase.firestore();

// firebase storatge 사용 함수
export const storageService = firebase.storage();