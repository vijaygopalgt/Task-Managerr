import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLC6yslHznq76wxFGaSBmTEnO5VDb9i2Y",
  authDomain: "task-a69f1.firebaseapp.com",
  projectId: "task-a69f1",
  storageBucket: "task-a69f1.firebasestorage.app",
  messagingSenderId: "998241655930",
  appId: "1:998241655930:web:0912d665ffc95beb782fc3",
  measurementId: "G-PWP0K98GMD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication Setup
const auth = getAuth(app);

// Google Provider
const provider = new GoogleAuthProvider();

// Function to Sign In with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Signed In:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

// Function to Sign In with Email and Password
const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email Signed In:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Email Sign-In Error:", error.message);
    throw error;
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export { auth, provider, signInWithGoogle, signInWithEmailPassword, logout };
