import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import fs from 'fs';

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

async function seed() {
  const data = JSON.parse(fs.readFileSync('./products_import.json', 'utf8'));
  console.log(`Starting to seed ${data.length} products...`);

  for (const product of data) {
    try {
      await setDoc(doc(db, "products", product.id), product);
      console.log(`Successfully added: ${product.name}`);
    } catch (e) {
      console.error(`Error adding ${product.name}: `, e);
    }
  }
  console.log("Seeding completed!");
  process.exit(0);
}

seed();
