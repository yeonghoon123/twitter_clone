import { initializeApp } from "firebase/app";

console.log(process.env.FIREBASE_API_KEY);

// firebase config 정보
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGAGING_SENDERP_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
export default initializeApp(firebaseConfig);