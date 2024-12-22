// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoTSDYIjbE0T_COkKFcUAR72WPzMOw940",
  authDomain: "social-media-4004.firebaseapp.com",
  projectId: "social-media-4004",
  storageBucket: "social-media-4004.firebasestorage.app",
  messagingSenderId: "815049675126",
  appId: "1:815049675126:web:9cb5f95b35aed4f0162a57",
  measurementId: "G-W2JPVZW8E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);