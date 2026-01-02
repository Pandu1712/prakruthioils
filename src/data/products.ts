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
  {
    id: 'Snacks',
    name: 'Snacks',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/healthy_u5g2bg.jpg',
    description: 'Pure, aromatic, premium quality ghee'
  },
];

export const products: Product[] = [

/* ---------------------------------------------------------
   MILLETS / MIXES
----------------------------------------------------------*/

{
  id: "mm-001",
  name: "Whole Ground Nuts",
  category: "millets",
  description: "Fresh and natural whole groundnuts rich in protein and healthy fats.",
  image: "https://res.cloudinary.com/dd4oiwnep/image/upload/v1765185247/WhatsApp_Image_2025-12-08_at_14.42.59_8d7a8006_a0oshe.jpg",

  sizes: [
    {
      size: "1KG",
      price: 129,
      offerPrice: 119,
      inStock: true
    },
    {
      size: "2KG",
      price: 300,
      offerPrice: 269,
      inStock: true
    }
  ],

  benefits: [
    "Rich in protein",
    "Boosts energy",
    "Good for heart health",
    "Healthy fats for daily nutrition"
  ],

  specifications: [
    "Unpolished",
    "Premium Quality Nuts",
    "No Chemicals",
    "Fresh & Crunchy"
  ],

  tags: ["Natural", "Fully Organic"],
  howToUse: "Use for cooking, snacking, or making chutneys and powders."
}
,
{
  id: 'mm-002',
  name: 'Forest Honey',
  category: 'millets',
  description: 'Pure, raw forest honey collected from wild forest regions, rich in natural enzymes, antioxidants, and medicinal properties.',
  image: "https://ishavasyamproducts.com/cdn/shop/products/9.jpg?v=1634646181", // replace with your honey image
  sizes: [

    { size: '500G', price: 350, inStock: true,offerPrice: 320 },

  ],
  benefits: [
    'Boosts immunity',
    'Helps digestion',
    'Natural antioxidant source',
    'Improves throat health',
    'Enhances skin glow'
  ],
  tags: ['Natural','Fully Organic'],
  specifications: [
    '100% Raw & Unprocessed',
    'No Added Sugar',
    'Naturally Collected from Forest Bees',
    'Rich in Enzymes & Minerals'
  ],
  howToUse: 'Consume 1–2 teaspoons daily with warm water, use as a natural sweetener, or mix with herbal drinks and milk.'
}
,
{
  id: "mm-003",
  name: "Forming Honey",
  category: "millets",
  tags: ['Natural','Fully Organic'],

  description:
    "Pure, natural forest honey extracted from wild bee colonies. Unprocessed, chemical-free, and rich in enzymes, vitamins, and antioxidants. Ideal for boosting immunity and overall wellness.",

  image:
    "https://images.pexels.com/photos/12062925/pexels-photo-12062925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

  sizes: [
    { size: "500G", price: 200, inStock: true, offerPrice: 180 },
    { size: "1KG", price: 400, inStock: true  , offerPrice: 350 }
  ],

  benefits: [
    "Boosts immunity naturally",
    "Rich in antioxidants and enzymes",
    "Soothes sore throat and cough",
    "Improves digestion and gut health",
    "Acts as a natural energy booster",
    "Supports healthy skin glow"
  ],

  specifications: [
    "100% Raw & Unprocessed Forest Honey",
    "No Sugar, Chemicals, or Preservatives",
    "Collected from Natural Forest Bee Hives",
    "Cold-filtered to preserve nutrients",
    "Rich in pollen, enzymes & minerals"
  ],

  howToUse:
    "Take 1–2 teaspoons daily. Mix with warm water, milk, or herbal tea. Use as a natural sweetener for foods and beverages."
}
,{
  id: "mm-004",
  tags: ['Natural','Fully Organic'],
  name: "Jaggery Powder",
  category: "millets",

  description:
    "Pure and traditional jaggery powder made from fresh sugarcane juice. Unrefined, chemical-free, rich in minerals, and a healthier alternative to white sugar.",

  image:
    "https://res.cloudinary.com/dgky6sudx/image/upload/v1767329907/WhatsApp_Image_2026-01-01_at_14.01.06_fgmkgh.jpg",

  sizes: [
        { size: "500G", price: 80, inStock: true, offerPrice: 70 },
    { size: "1KG", price: 149, inStock: true, offerPrice: 130 }
  ],

  benefits: [
    "Boosts digestive health",
    "Natural detoxifier for the body",
    "Rich in iron and minerals",
    "Improves hemoglobin levels",
    "Provides long-lasting energy"
  ],

  specifications: [
    "Made from Pure Sugarcane Juice",
    "No Sulphur or Bleaching Agents",
    "Unrefined & Chemical-Free",
    "Rich in Iron, Magnesium & Minerals",
    "Traditional slow-made process"
  ],

  howToUse:
    "Use as a replacement for white sugar in tea, coffee, sweets, and cooking. Consume 1 teaspoon after meals to improve digestion."
}
,





{
  id: "mm-005",
  name: "Little Millet",
  category: "millets",
  description: "Nutritious little millet packed with fiber and essential minerals, ideal for daily healthy meals.",
  image: "https://justorganik.com/wp-content/uploads/2024/04/little-millet-image.jpg",
  sizes: [
    { size: "1KG", price: 120, inStock: true , offerPrice: 110 }
  ],
  benefits: [
    "Helps regulate blood sugar",
    "Improves digestion",
    "Rich in fiber and iron",
    "Supports weight management"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Unpolished whole grain",
    "Naturally gluten-free",
    "High dietary fiber",
    "No preservatives"
  ],
  howToUse: "Wash thoroughly and cook like rice. Ideal for pongal, upma, or khichdi."
},

{
  id: "mm-006",
  name: "Foxtail Millet",
  category: "millets",
  description: "High-protein millet that supports metabolism and sustained energy.",
  image: "https://justorganik.com/wp-content/uploads/2024/04/2.jpg",
  sizes: [
    { size: "1KG", price: 100, inStock: true }
  ],
  benefits: [
    "Supports heart health",
    "Good source of plant protein",
    "Improves digestion",
    "Controls blood sugar"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Low glycemic index",
    "Rich in antioxidants",
    "Chemical-free processing",
    "Naturally gluten-free"
  ],
  howToUse: "Best for making pongal, pulao, or dosa batter."
},

{
  id: "mm-007",
  name: "Barnyard Millet",
  category: "millets",
  description: "Light and easily digestible millet suitable for fasting and daily meals.",
  image: "https://www.naatigrains.com/image/cache/catalog/naatigrains-products/NG140/unpolished-barnyard-millet-oodalu-udalu-kuthiraivali-sanwn-kavadapullu-naturally-grown-order-online-chennai-bangalore-naati-grains-1000x1000.jpg",
  sizes: [
    { size: "1KG", price: 130, inStock: true , offerPrice: 120 }
  ],
  benefits: [
    "Excellent for weight loss",
    "Improves digestion",
    "High fiber content",
    "Supports heart health"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Low carbohydrate content",
    "High dietary fiber",
    "No additives or preservatives",
    "Easy to digest"
  ],
  howToUse: "Ideal for khichdi, upma, or replacing rice."
},

{
  id: "mm-008",
  name: "Kodo Millet",
  category: "millets",
  description: "Highly nutritious millet rich in antioxidants and dietary fiber.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjTWZfPM7AgIfaR09DMXtlicRkbeT7sSGmxg&s",
  sizes: [
    { size: "1KG", price: 100, inStock: true , offerPrice: 90 }
  ],
  benefits: [
    "Supports gut health",
    "Helps detoxify the body",
    "Improves metabolism",
    "Good for diabetics"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Unpolished grain",
    "High antioxidant value",
    "Naturally gluten-free",
    "Farm sourced"
  ],
  howToUse: "Cook like rice or use in dosa, idli, or porridge."
},

{
  id: "mm-009",
  name: "Brown Top Millet",
  category: "millets",
  description: "A rare and nutritious millet known for detoxifying properties.",
  image: "https://yummy-valley.com/cdn/shop/articles/brown-top-millet-benefits-2048x1152.webp?v=1760620367&width=1920",
  sizes: [
    { size: "1KG", price: 180, inStock: true , offerPrice: 160 }
  ],
  benefits: [
    "Supports detoxification",
    "Improves gut health",
    "Rich in antioxidants",
    "Helps weight management"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Traditional Indian millet",
    "High in dietary fiber",
    "No artificial processing",
    "Low glycemic index"
  ],
  howToUse: "Best used for rice replacement or health porridges."
},

{
  id: "mm-0010",
  name: "Proso Millet",
  category: "millets",
  description: "Lightweight millet with high protein and essential minerals.",
  image: "https://twobrothersindiashop.com/cdn/shop/articles/Proso_Millet_-_benefits_uses_Nutritional_value.png?v=1689832879&width=1024",
  sizes: [
    { size: "1KG", price: 130, inStock: true , offerPrice: 120 }
  ],
  benefits: [
    "Improves metabolism",
    "Helps control cholesterol",
    "Boosts energy levels",
    "Supports digestion"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Rich in protein",
    "Easily digestible",
    "Naturally gluten-free",
    "No preservatives"
  ],
  howToUse: "Ideal for pulao, khichdi, or breakfast bowls."
},

{
  id: "mm-0011",
  name: "Pearl Millet (Bajra)",
  category: "millets",
  description: "Energy-rich millet ideal for strength and stamina.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5805LsyAh1uP23mU8-Di3sVtJnNOtH9CjQ&s",
  sizes: [
    { size: "1KG", price: 50, inStock: true , offerPrice: 45 }
  ],
  benefits: [
    "Improves bone strength",
    "Boosts metabolism",
    "High in iron",
    "Keeps body warm"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Rich in iron and protein",
    "Traditionally stone-ground",
    "No preservatives",
    "High energy food"
  ],
  howToUse: "Used for rotis, porridge, or dosa batter."
},

{
  id: "mm-0012",
  name: "Great Millet (Jowar)",
  category: "millets",
  description: "Nutritious millet ideal for gluten-free diets and daily meals.",
  image: "https://www.jiomart.com/images/product/original/rv3ofu81tj/preeta-mart-organic-great-millet-jowar-500-g-product-images-orv3ofu81tj-p596145885-0-202212071756.png?im=Resize=(420,420)",
  sizes: [
    { size: "1KG", price: 60, inStock: true }
  ],
  benefits: [
    "Improves digestion",
    "Helps regulate blood sugar",
    "Good for heart health",
    "High in antioxidants"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Gluten-free grain",
    "Rich in fiber",
    "Naturally grown",
    "Unpolished"
  ],
  howToUse: "Use for rotis, dosa, or healthy porridge."
},

{
  id: "mm-0013",
  name: "Ragi Millet",
  category: "millets",
  description: "Highly nutritious millet rich in calcium and iron.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiUmHDQleFv1sjD2OdOG_8hyIGvi5hWUrVJw&s",
  sizes: [
    { size: "1KG", price: 60, inStock: true, offerPrice: 55 }
  ],
  benefits: [
    "Strengthens bones",
    "Rich in calcium and iron",
    "Supports weight management",
    "Good for kids and elders"
  ],
  tags: ["Natural", "Fully Organic"],
  specifications: [
    "Excellent calcium source",
    "Naturally gluten-free",
    "Traditional stone-ground",
    "No preservatives"
  ],
  howToUse: "Used for ragi malt, dosa, porridge, or rotis."
}
,
{
  id: "mm-0014",
  name: "Jaggery Lump / Bucket",
  category: "millets",
  description:
    "Traditional jaggery made from fresh sugarcane juice using natural methods. Rich in minerals, chemical-free, and a healthy alternative to refined sugar.",

  image:
    "https://res.cloudinary.com/dgky6sudx/image/upload/WhatsApp_Image_2026-01-01_at_13.55.00_jl8ecf.jpg",

  sizes: [
    { size: "1KG", price: 99, inStock: true }
  ],

  benefits: [
    "Improves digestion and gut health",
    "Boosts energy naturally",
    "Rich in iron, magnesium, and potassium",
    "Helps purify blood",
    "Good for immunity and overall wellness"
  ],

  tags: ["Natural", "Fully Organic"],

  specifications: [
    "Made from pure sugarcane juice",
    "No chemicals or preservatives",
    "Unrefined and traditionally processed",
    "Natural dark brown color",
    "Rich in essential minerals"
  ],

  howToUse:
    "Can be used as a natural sweetener in tea, coffee, sweets, and desserts. Also used in traditional recipes, health drinks, and daily cooking."
}
,

{
  id: "mm-0015",
  name: "Samruddhi Whole Wheat Chakki Atta",
  category: "millets",
  description:
    "Premium quality whole wheat chakki atta made from carefully selected wheat grains. Stone-ground to retain natural fiber, nutrients, and authentic taste.",

  image:
    "https://res.cloudinary.com/dgky6sudx/image/upload/WhatsApp_Image_2026-01-02_at_13.50.14_fevmwe.jpg",

  sizes: [
    { size: "1KG", price: 75, inStock: true, offerPrice: 70 },
    { size: "5KG", price: 360, inStock: true, offerPrice: 340 }
  ],

  benefits: [
    "Rich in dietary fiber for better digestion",
    "Helps maintain steady energy levels",
    "Supports healthy metabolism",
    "Good for heart and gut health",
    "Suitable for daily consumption"
  ],

  tags: ["Natural", "Stone Ground", "No Preservatives"],

  specifications: [
    "Made from 100% whole wheat grains",
    "Stone-ground using traditional chakki method",
    "No added chemicals or preservatives",
    "Retains natural fiber and nutrients",
    "Soft texture for fluffy rotis"
  ],

  howToUse:
    "Used to prepare soft rotis, chapatis, parathas, puris, and other traditional Indian breads. Can also be used for baking and cooking purposes."
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
  tags: ['Natural','Fully Organic'],
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181387/WhatsApp_Image_2025-12-08_at_10.33.32_780ad951_bqagse.jpg',
  sizes: [
    { size: '250ML', price: 169, inStock: true, offerPrice: 150 },
    { size: '500ML', price: 309, inStock: true, offerPrice: 280 },
    { size: '1L', price: 599, inStock: true, offerPrice: 550 }
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
  tags: ['Natural','Fully Organic'],
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181386/WhatsApp_Image_2025-12-08_at_11.17.54_8496d194_oro8d5.jpg',
  sizes: [
    { size: '250ML', price: 109, inStock: true, offerPrice: 100 },
    { size: '500ML', price: 209, inStock: true, offerPrice: 190 },
    { size: '1L', price: 399, inStock: true, offerPrice: 360 }
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
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181387/WhatsApp_Image_2025-12-08_at_10.33.32_2a116e60_f5iody.jpg',
  sizes: [
    { size: '1L', price: 289, inStock: true, offerPrice: 260 },
    { size: '2L', price: 569, inStock: true, offerPrice: 520 },
    { size: '5L', price: 1349, inStock: true, offerPrice: 1249 }
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
  tags: ['Natural','Fully Organic'],
  howToUse: 'Ideal for frying, deep frying, and daily Indian cooking.'
},

{
  id: 'co-004',
  name: 'Castor Oil',
  category: 'coldoils',
  description: 'Pure cold pressed castor oil ideal for hair, skin and wellness.',
  image: "https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181386/WhatsApp_Image_2025-12-08_at_10.33.31_e6b7059b_zeviuk.jpg", // REPLACE WITH REAL CASTOR IMAGE
  sizes: [
    { size: '250ML', price: 69, inStock: true , offerPrice: 60 },
    { size: '500ML', price: 129, inStock: true, offerPrice: 120 },
    { size: '1L', price: 249, inStock: true, offerPrice: 230 }
  ],
  tags: ['Natural','Fully Organic'],
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
    { size: '500ML', price: 159, inStock: true, offerPrice: 140 },
    { size: '1L', price: 299, inStock: true, offerPrice: 270 }
  ],
  tags: ['Natural','Fully Organic'],
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
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181388/WhatsApp_Image_2025-12-08_at_11.46.04_6b45fb0e_exmkhd.jpg',
  sizes: [
    { size: '500ML', price: 209, inStock: true, offerPrice: 190 },
    { size: '1L', price: 399, inStock: true, offerPrice: 360 }
  ],
  tags: ['Natural','Fully Organic'],
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
    { size: '500ML', price: 79, inStock: true, offerPrice: 70 },
    { size: '1L', price: 159, inStock: true, offerPrice: 140 }
  ],
  benefits: [
    'Long-lasting flame',
    'Pure & aromatic',
    'Ideal for daily pooja',
    'Smokeless burning'
  ],
  tags: ['Natural'],
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
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1765183924/ChatGPT_Image_Dec_8_2025_02_21_37_PM_n5niec.png',
  sizes: [
    { size: '500ML', price: 79, inStock: true, offerPrice: 70 },
    { size: '1L', price: 159, inStock: true, offerPrice: 140 }
  ],
  tags: ['Natural'],
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
    { size: '500ML', price: 399, inStock: true, offerPrice: 370 },
    { size: '1L', price: 799, inStock: true, offerPrice: 750 }
  ],
  benefits: [
    'Boosts immunity',
    'Improves digestion',
    'Strengthens bones',
    'Good for skin & hair'
  ],
  tags: ['Natural','Fully Organic'],
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
    { size: '500ML', price: 549, inStock: true, offerPrice: 520 },
    { size: '1L', price: 1099, inStock: true, offerPrice: 1040 }
  ],
  benefits: [
    'Strengthens bones',
    'Good for weight gain',
    'Improves stamina',
    'Rich in nutrients'
  ],
  tags: ['Natural','Fully Organic'],
  specifications: [
    'Pure Buffalo Milk',
    'Traditional Preparation',
    'Rich Texture',
    'High Nutrition'
  ],
  howToUse: 'Use in cooking, rotis, desserts, or consume 1 tsp for energy.'
},
{
  id: 'sn-001',
  name: 'Millet Mixture',
  category: 'snacks',
  description: 'A crunchy and healthy millet-based snack made with natural spices.',
  image: 'https://www.govindjee.store/cdn/shop/products/millet-mixture-211040.jpg?v=1709805227',
  sizes: [
    { size: '250g', price: 120, inStock: true , offerPrice: 100 }
  ],
  benefits: [
    'Rich in fiber for better digestion',
    'Helps maintain healthy gut',
    'Low in calories and gluten-free',
    'Supports heart health'
  ],
  tags: ['Natural', 'Fully Organic'],
  specifications: [
    'Made from premium millets',
    'No artificial colors or preservatives',
    'Lightly spiced and roasted',
    'Suitable for all age groups'
  ],
  howToUse: 'Consume directly as a snack or enjoy with tea or evening refreshments.'
},
{
  id: 'sn-002',
  name: 'Amaranth Chikki',
  category: 'snacks',
  description: 'A crunchy and nutritious sweet snack made with popped amaranth and jaggery.',
  image: 'https://img.freepik.com/premium-photo/cholai-ki-chikki-rajgira-chikki-amaranth-chikki-cake-bar_466689-62067.jpg',
  sizes: [
    { size: '200g', price: 80, inStock: true, offerPrice: 70 }
  ],
  benefits: [
    'High in protein and calcium',
    'Boosts energy levels naturally',
    'Good for bone strength',
    'Healthy alternative to sugar snacks'
  ],
  tags: ['Natural', 'Fully Organic'],
  specifications: [
    'Made with popped amaranth seeds',
    'Sweetened using natural jaggery',
    'No refined sugar',
    'Crunchy texture'
  ],
  howToUse: 'Consume as a healthy snack between meals or after workouts.'
},
{
  id: 'sn-003',
  name: 'Amaranth Mixture',
  category: 'snacks',
  description: 'A crispy and flavorful snack made using nutritious amaranth grains.',
  image: 'https://5.imimg.com/data5/WN/YK/WZ/SELLER-2044275/whatsapp-image-2020-08-06-at-15-41-11-500x500.jpeg',
  sizes: [
    { size: '200g', price: 100, inStock: true, offerPrice: 90 }
  ],
  benefits: [
    'Rich in plant protein',
    'Improves digestion',
    'Provides long-lasting energy',
    'Supports a healthy lifestyle'
  ],
  tags: ['Natural', 'Fully Organic'],
  specifications: [
    'Prepared using premium amaranth',
    'Lightly spiced for balanced taste',
    'No artificial flavors or preservatives',
    'Crunchy and fresh texture'
  ],
  howToUse: 'Enjoy directly as a snack or serve with tea during evenings.'
},


];
