import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_API_KEY,
    authDomain: "ucsdraccoon-372d3.firebaseapp.com",
    projectId: "ucsdraccoon-372d3",
    storageBucket: "ucsdraccoon-372d3.appspot.com",
    messagingSenderId: "411204973881",
    appId: "1:411204973881:web:8ee88a97e6ab40ec3464e8",
    measurementId: "G-900ZK21EET"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app); 