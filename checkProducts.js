import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function check() {
  const col = collection(db, 'products');
  const snapshot = await getDocs(col);
  console.log(`Total products in Firestore: ${snapshot.docs.length}`);
  
  const counts = {};
  snapshot.docs.forEach(d => {
    const p = d.data();
    counts[p.category] = (counts[p.category] || 0) + 1;
    if (p.category === 'pickles' && p.name.toLowerCase().includes('honey')) {
        console.log(`MISPLACED: ${p.name} is in ${p.category}`);
    }
  });
  
  console.log("Counts by category:", counts);
  process.exit(0);
}

check();
