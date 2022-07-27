import { initializeApp } from "firebase/app";

// firebase config 정보
const firebaseConfig = {
  apiKey: "AIzaSyDDCu8PaADN3cqw0YqoSxuvGyayLFwGTSc",
  authDomain: "twitterclone-281c7.firebaseapp.com",
  projectId: "twitterclone-281c7",
  storageBucket: "twitterclone-281c7.appspot.com",
  messagingSenderId: "788282970252",
  appId: "1:788282970252:web:1b30c69b1192d53b0eeba9"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);