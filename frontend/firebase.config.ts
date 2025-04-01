import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPX6NqTTcCvpA-8d7K6AbHmdttMtn_ULE",
  authDomain: "game-app-252bc.firebaseapp.com",
  projectId: "game-app-252bc",
  storageBucket: "game-app-252bc.appspot.com",
  messagingSenderId: "493050898397",
  appId: "1:493050898397:web:2b2c1bcffe54302fe73834",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();