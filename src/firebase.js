import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl026GYlhuTkCPFqTsaG2cUPIIe0o64N0",
  authDomain: "crud-85852.firebaseapp.com",
  projectId: "crud-85852",
  storageBucket: "crud-85852.appspot.com",
  messagingSenderId: "773215163884",
  appId: "1:773215163884:web:3ad22ec55f336bb98f9cc9",
  measurementId: "G-LECGEYGT4J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);