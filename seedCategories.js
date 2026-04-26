import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

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

const categories = [
  {
    id: 'coldoils',
    name: 'Cold Pressed Oils',
    image: '/cold_pressed_oils_1777167064203.png',
    description: 'Pure cold pressed oils preserving natural goodness'
  },
  {
    id: 'pulses',
    name: 'Organic Pulses',
    image: '/pulses_and_dal_1777167085195.png',
    description: 'High-quality pulses and lentils from organic farms'
  },
  {
    id: 'spices',
    name: 'Authentic Spices',
    image: '/indian_spices_mix_1777167103492.png',
    description: 'Hand-picked spices for authentic Indian flavors'
  },
  {
    id: 'snacks',
    name: 'Crispy Snacks',
    image: '/indian_snacks_platter_1777167125845.png',
    description: 'Traditional and healthy snacks for any time'
  },
  {
    id: 'dryfruits',
    name: 'Premium Dry Fruits',
    image: '/premium_dry_fruits_mix_1777167146932.png',
    description: 'Carefully selected premium quality dry fruits'
  },
  {
    id: 'millet_snacks',
    name: 'Millet Snacks',
    image: '/millet_cookies_and_snacks_1777167211594.png',
    description: 'Healthy and nutritious snacks made with millets'
  },
  {
    id: 'homemade_snacks',
    name: 'Homemade Snacks',
    image: '/millet_cookies_and_snacks_1777167211594.png',
    description: 'Authentic homemade cookies and traditional snacks'
  },
  {
    id: 'jaggery',
    name: 'Organic Jaggery',
    image: '/organic_jaggery_and_honey_1777167168541.png',
    description: 'Pure and natural organic jaggery products'
  },
  {
    id: 'shampoo',
    name: 'Natural Care',
    image: '/millet_cookies_and_snacks_1777167211594.png',
    description: 'Traditional hair care powders like Shikakai and Soapnut'
  },
  {
    id: 'pickles',
    name: 'Traditional Pickles',
    image: '/traditional_indian_pickles_1777167190912.png',
    description: 'Spicy and tangy traditional Indian pickles'
  },
  {
    id: 'honey_ghee',
    name: 'Honey & Ghee',
    image: '/organic_jaggery_and_honey_1777167168541.png',
    description: 'Pure forest honey and traditional desi cow ghee'
  }
];

async function seed() {
  console.log(`Starting to seed ${categories.length} categories...`);

  for (const cat of categories) {
    try {
      await setDoc(doc(db, "categories", cat.id), cat);
      console.log(`Successfully added category: ${cat.name}`);
    } catch (e) {
      console.error(`Error adding category ${cat.name}: `, e);
    }
  }
  console.log("Category seeding completed!");
  process.exit(0);
}

seed();
