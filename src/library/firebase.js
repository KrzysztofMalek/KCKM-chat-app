
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatappkmkc.firebaseapp.com",
  projectId: "chatappkmkc",
  storageBucket: "chatappkmkc.firebasestorage.app",
  messagingSenderId: "212076725227",
  appId: "1:212076725227:web:7ceb0a1927e25b0d9c0fae"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage =getStorage()