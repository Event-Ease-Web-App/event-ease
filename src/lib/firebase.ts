// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FIREBASE_ENV } from "@/constants/env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_ENV.apiKey,
  authDomain: FIREBASE_ENV.authDomain,
  projectId: FIREBASE_ENV.projectId,
  storageBucket: FIREBASE_ENV.storageBucket,
  messagingSenderId: FIREBASE_ENV.messagingSenderId,
  appId: FIREBASE_ENV.appId,
  measurementId: FIREBASE_ENV.measurementId,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
