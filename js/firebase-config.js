// Firebase SDK 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCxszVF67zjle2vVXFVFMoinQqVMrQNVj8",
  authDomain: "bangyunseo-portfolio.firebaseapp.com",
  projectId: "bangyunseo-portfolio",
  storageBucket: "bangyunseo-portfolio.firebasestorage.app",
  messagingSenderId: "604360833220",
  appId: "1:604360833220:web:0709ab3b446f59c199f191",
  measurementId: "G-EQ8TQJL22B",
};

// Firebase 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
