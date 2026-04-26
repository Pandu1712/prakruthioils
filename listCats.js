import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzS28_3n4gp7GMUC-0-KYHemUemijuyDE",
  authDomain: "prakruthioils-c1ab3.firebaseapp.com",
  projectId: "prakruthioils-c1ab3",
  storageBucket: "prakruthioils-c1ab3.firebasestorage.app",
  messagingSenderId: "962529873217",
  appId: "1:962529873217:web:7f397a5371c689612ce5c0",
  measurementId: "G-5X4LK68P11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanup() {
  const categoriesCol = collection(db, 'categories');
  const snapshot = await getDocs(categoriesCol);
  console.log(`Found ${snapshot.docs.length} categories.`);
  
  for (const d of snapshot.docs) {
    console.log(`ID: ${d.id}, Name: ${d.data().name}`);
  }
  process.exit(0);
}

cleanup();
