// Firebase SDK 직접 로드
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
firebase.initializeApp(firebaseConfig);

// 전역으로 내보내기
const auth = firebase.auth();
const db = firebase.firestore();
