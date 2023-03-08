// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDevJWAps7qWAnO6erEZOl143pI2g9sCIE",
  authDomain: "m-blog-9c58c.firebaseapp.com",
  projectId: "m-blog-9c58c",
  storageBucket: "m-blog-9c58c.appspot.com",
  messagingSenderId: "1024609214749",
  appId: "1:1024609214749:web:eeba63926812de678e01f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };