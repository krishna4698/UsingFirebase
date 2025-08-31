import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRd4v6Rq7W7eSWQ0SuWWmKQ7a_iP7Vbd8",
  authDomain: "newproject-39eb6.firebaseapp.com",
  projectId: "newproject-39eb6",
  storageBucket: "newproject-39eb6.firebasestorage.app",
  messagingSenderId: "322137556646",
  appId: "1:322137556646:web:572a2136c4f9504e495667",
  measurementId: "G-TRF3FLJDNH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);