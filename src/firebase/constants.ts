import { FIREBASE_ENV } from "@/constants/env";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: FIREBASE_ENV.apiKey,
  authDomain: FIREBASE_ENV.authDomain,
  projectId: FIREBASE_ENV.projectId,
  storageBucket: FIREBASE_ENV.storageBucket,
  messagingSenderId: FIREBASE_ENV.messagingSenderId,
  appId: FIREBASE_ENV.appId,
  measurementId: FIREBASE_ENV.measurementId,
};

export const COLLECTIONS = {
  USERS: "users",
};
