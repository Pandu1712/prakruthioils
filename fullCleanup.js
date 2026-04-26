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

async function fullCleanup() {
  // Cleanup Products
  const productsCol = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCol);
  console.log(`Deleting ${productsSnapshot.docs.length} products...`);
  for (const d of productsSnapshot.docs) {
    await deleteDoc(doc(db, 'products', d.id));
  }
  
  // Cleanup Categories
  const categoriesCol = collection(db, 'categories');
  const categoriesSnapshot = await getDocs(categoriesCol);
  console.log(`Deleting ${categoriesSnapshot.docs.length} categories...`);
  for (const d of categoriesSnapshot.docs) {
    await deleteDoc(doc(db, 'categories', d.id));
  }
  
  console.log("Full cleanup completed!");
  process.exit(0);
}

fullCleanup();
