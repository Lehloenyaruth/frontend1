// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1ecdiEqXP6LtVNYKiTlqmo8T2wNIaSus",
  authDomain: "attendance-tracker-bf02b.firebaseapp.com",
  projectId: "attendance-tracker-bf02b",
  storageBucket: "attendance-tracker-bf02b.firebasestorage.app",
  messagingSenderId: "350259048783",
  appId: "1:350259048783:web:7b1e0c1a9dda78a83b553a",
  measurementId: "G-S6WVSBLE0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services you'll use
export { auth, db, analytics };
export default app;