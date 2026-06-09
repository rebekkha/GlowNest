import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAuYJc-YX6Q_RWMIeWjaKnHBG04iLpWRQ",
  authDomain: "login-with--and-phone-num.firebaseapp.com",
  projectId: "login-with--and-phone-num",
  storageBucket: "login-with--and-phone-num.firebasestorage.app",
  messagingSenderId: "980612151282",
  appId: "1:980612151282:web:e26b8c097c88b933675d6b",
  measurementId: "G-LFVG6VKR7B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
