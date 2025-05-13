import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCl026GYlhuTkCPFqTsaG2cUPIIe0o64N0",
    authDomain: "crud-85852.firebaseapp.com",
    projectId: "crud-85852",
    storageBucket: "crud-85852.firebasestorage.app",
    messagingSenderId: "773215163884",
    appId: "1:773215163884:web:3ad22ec55f336bb98f9cc9",
    measurementId: "G-LECGEYGT4J",
};
const app = initializeApp(firebaseConfig);


// const analytics = getAnalytics(app);
export const db = getFirestore(app);