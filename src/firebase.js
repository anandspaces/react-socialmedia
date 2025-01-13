// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig"; // Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Provider
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Export the instances for use in other files
export { app, auth, googleAuthProvider, db };
