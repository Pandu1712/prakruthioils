import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'millets',
    name: 'Millet & Mixes',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890873/millites_hwipba.webp',
    description: 'Nutritious millet blends for healthy living'
  },

  {
    id: 'coldoils',
    name: 'Cold Pressed Oils',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/cold_oil_ggu81b.webp',
    description: 'Pure cold pressed oils preserving natural goodness'
  },

  {
    id: 'ghee',
    name: 'Ghee',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/healthy_u5g2bg.jpg',
    description: 'Pure, aromatic, premium quality ghee'
  },
];

export const products: Product[] = [

/* ---------------------------------------------------------
   MILLETS / MIXES
----------------------------------------------------------*/

{
  id: 'mm-001',
  name: 'Whole Ground Nuts',
  category: 'millets',
  description: 'Fresh and natural whole groundnuts rich in protein and healthy fats.',
  image: 'https://chakkiwalle.com/cdn/shop/files/31Q7mf5dD_L.jpg?v=1708589197',
  sizes: [
    { size: '1KG', price: 129, inStock: true }
  ],
  benefits: [
    'Rich in protein',
    'Boosts energy',
    'Good for heart health',
    'Healthy fats for daily nutrition'
  ],
  specifications: [
    'Unpolished',
    'Premium Quality Nuts',
    'No Chemicals',
    'Fresh & Crunchy'
  ],
  howToUse: 'Use for cooking, snacking, or making chutneys and powders.'
},
{
  id: 'mm-002',
  name: 'Forest Honey',
  category: 'millets',
  description: 'Pure, raw forest honey collected from wild forest regions, rich in natural enzymes, antioxidants, and medicinal properties.',
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXXPkE9peBJeg__gOysvdOvLUeEk3W1gnGtQ&s", // replace with your honey image
  sizes: [
    { size: '250g', price: 149, inStock: true },
    { size: '500g', price: 289, inStock: true },
    { size: '1KG', price: 549, inStock: true }
  ],
  benefits: [
    'Boosts immunity',
    'Helps digestion',
    'Natural antioxidant source',
    'Improves throat health',
    'Enhances skin glow'
  ],
  specifications: [
    '100% Raw & Unprocessed',
    'No Added Sugar',
    'Naturally Collected from Forest Bees',
    'Rich in Enzymes & Minerals'
  ],
  howToUse: 'Consume 1–2 teaspoons daily with warm water, use as a natural sweetener, or mix with herbal drinks and milk.'
}
,

/* ---------------------------------------------------------
   COLD PRESSED OILS
----------------------------------------------------------*/

{
  id: 'co-001',
  name: 'Coconut Oil',
  category: 'coldoils',
  description: '100% pure cold pressed coconut oil made from fresh coconuts.',
  image: 'https://www.greendna.in/cdn/shop/products/coconut-oil_11_600x.jpg?v=1593247466',
  sizes: [
    { size: '250ML', price: 169, inStock: true },
    { size: '500ML', price: 309, inStock: true },
    { size: '1L', price: 599, inStock: true }
  ],
  benefits: [
    'Promotes hair growth',
    'Moisturizes skin',
    'Great for cooking',
    'Boosts immunity'
  ],
  specifications: [
    'Cold Pressed',
    'Extra Virgin',
    'No Additives',
    'Fresh Aroma'
  ],
  howToUse: 'Use for cooking, oil pulling, or as a hair/body oil.'
},

{
  id: 'co-002',
  name: 'Sesame Oil',
  category: 'coldoils',
  description: 'Pure cold pressed sesame oil with deep aroma and essential nutrients.',
  image: 'https://sivaromanaturals.com/wp-content/uploads/2024/02/Sesame-Oil.png',
  sizes: [
    { size: '250ML', price: 109, inStock: true },
    { size: '500ML', price: 209, inStock: true },
    { size: '1L', price: 399, inStock: true }
  ],
  benefits: [
    'Strengthens bones',
    'Supports heart health',
    'Good for oil pulling',
    'Rich in antioxidants'
  ],
  specifications: [
    'Cold Pressed',
    '100% Natural',
    'Wood Pressed',
    'Aromatic & Pure'
  ],
  howToUse: 'Use for cooking, hair oiling, or oil pulling.'
},

{
  id: 'co-003',
  name: 'Groundnut Oil',
  category: 'coldoils',
  description: 'Nutty and flavorful cold pressed groundnut oil for everyday cooking.',
  image: 'https://paneerwala.in/wp-content/uploads/2022/02/groundnut-oil-e1568642832203.jpg',
  sizes: [
    { size: '1L', price: 289, inStock: true },
    { size: '2L', price: 569, inStock: true },
    { size: '5L', price: 1349, inStock: true }
  ],
  benefits: [
    'Heart friendly',
    'Rich in Vitamin E',
    'High smoke point',
    'Improves immunity'
  ],
  specifications: [
    'Cold Pressed',
    'Unrefined',
    'Chemical Free',
    'Premium Quality'
  ],
  howToUse: 'Ideal for frying, deep frying, and daily Indian cooking.'
},

{
  id: 'co-004',
  name: 'Castor Oil',
  category: 'coldoils',
  description: 'Pure cold pressed castor oil ideal for hair, skin and wellness.',
  image: "https://m.media-amazon.com/images/I/71TMFhJOmwL._AC_UF350,350_QL80_.jpg", // REPLACE WITH REAL CASTOR IMAGE
  sizes: [
    { size: '250ML', price: 69, inStock: true },
    { size: '500ML', price: 129, inStock: true },
    { size: '1L', price: 249, inStock: true }
  ],
  benefits: [
    'Promotes hair growth',
    'Anti-inflammatory',
    'Moisturizes dry skin',
    'Supports digestion'
  ],
  specifications: [
    'Cold Pressed',
    '100% Pure',
    'Thick Texture',
    'No Chemicals'
  ],
  howToUse: 'Apply on hair, skin, or consume in small quantities as per Ayurvedic guidance.'
},

{
  id: 'co-005',
  name: 'Sunflower Oil',
  category: 'coldoils',
  description: 'Light and healthy cold pressed sunflower oil.',
  image: 'https://healthybuddha.in/image/cache/catalog/sunflower-oil-500x500-500x515.jpg',
  sizes: [
    { size: '500ML', price: 159, inStock: true },
    { size: '1L', price: 299, inStock: true }
  ],
  benefits: [
    'High in Vitamin E',
    'Good for heart',
    'Easy to digest',
    'Neutral taste for all cooking'
  ],
  specifications: [
    'Cold Pressed',
    'Mild Aroma',
    'Light Texture',
    'Chemical Free'
  ],
  howToUse: 'Use for frying, sautéing, and salad dressing.'
},

{
  id: 'co-006',
  name: 'Mustard Oil',
  category: 'coldoils',
  description: 'Strong aromatic cold pressed mustard oil ideal for Indian cooking.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXzc3zb6NV7qjIJ1qZ3eRIdoJs3SA4i8vAA&s',
  sizes: [
    { size: '500ML', price: 209, inStock: true },
    { size: '1L', price: 399, inStock: true }
  ],
  benefits: [
    'Boosts metabolism',
    'High in Omega 3',
    'Good for heart health',
    'Ideal for pickles'
  ],
  specifications: [
    'Kachi Ghani',
    '100% Pure',
    'Strong Aroma',
    'No Chemicals'
  ],
  howToUse: 'Use for cooking, pickles, massage oil, and winter remedies.'
},

{
  id: 'co-007',
  name: 'Deepam Oil (Normal)',
  category: 'coldoils',
  description: 'Pure oil blend ideal for daily pooja and diya lighting.',
  image: 'https://images.jdmagicbox.com/quickquotes/images_main/deepam-oil-250ml-traditional-lighting-oil-2021977919-wc7rwi1f.jpg',
  sizes: [
    { size: '500ML', price: 79, inStock: true },
    { size: '1L', price: 159, inStock: true }
  ],
  benefits: [
    'Long-lasting flame',
    'Pure & aromatic',
    'Ideal for daily pooja',
    'Smokeless burning'
  ],
  specifications: [
    'Pure Oil Blend',
    'No Chemicals',
    'Bright Flame',
    'Pooja Use Only'
  ],
  howToUse: 'Use in diyas during morning & evening pooja.'
},

{
  id: 'co-008',
  name: 'Deepam Oil (5 Oils Mix)',
  category: 'coldoils',
  description: 'A sacred blend of 5 oils traditionally used for pooja purposes.',
  image: 'Deepam Oil (5 Oils Mix)',
  sizes: [
    { size: '500ML', price: 79, inStock: true },
    { size: '1L', price: 159, inStock: true }
  ],
  benefits: [
    'Brings positivity',
    'Longer diya burning',
    'Traditional 5-oil mix',
    'Pure & spiritual'
  ],
  specifications: [
    'Panchadeepa Oil Mix',
    'No Additives',
    'Aromatic',
    'Ideal for Pooja'
  ],
  howToUse: 'Use in diyas during special occasions, festivals, and daily rituals.'
},

/* ---------------------------------------------------------
   GHEE
----------------------------------------------------------*/

{
  id: 'gh-001',
  name: 'Pure Cow Ghee',
  category: 'ghee',
  description: 'Premium homemade cow ghee with rich aroma and golden texture.',
  image: 'https://cdn.dotpe.in/longtail/store-items/5739802/CDHRtW0x.jpeg',
  sizes: [
    { size: '500ML', price: 399, inStock: true },
    { size: '1L', price: 799, inStock: true }
  ],
  benefits: [
    'Boosts immunity',
    'Improves digestion',
    'Strengthens bones',
    'Good for skin & hair'
  ],
  specifications: [
    'Pure Cow Milk',
    'Traditional Method',
    'No Preservatives',
    'Golden Aroma'
  ],
  howToUse: 'Use for cooking, sweets, or consume 1 tsp daily for health.'
},

{
  id: 'gh-002',
  name: 'Buffalo Ghee',
  category: 'ghee',
  description: 'Thick, creamy buffalo ghee with rich taste and high nutrition.',
  image: 'https://pothgaal.com/cdn/shop/files/BuffaloGhee1.jpg?v=1748348974&width=1200',
  sizes: [
    { size: '500ML', price: 549, inStock: true },
    { size: '1L', price: 1099, inStock: true }
  ],
  benefits: [
    'Strengthens bones',
    'Good for weight gain',
    'Improves stamina',
    'Rich in nutrients'
  ],
  specifications: [
    'Pure Buffalo Milk',
    'Traditional Preparation',
    'Rich Texture',
    'High Nutrition'
  ],
  howToUse: 'Use in cooking, rotis, desserts, or consume 1 tsp for energy.'
},

];
