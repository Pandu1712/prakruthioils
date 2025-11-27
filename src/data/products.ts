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
  }
  ,{
    id: 'ghee',
    name: 'Ghee',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/healthy_u5g2bg.jpg',
    description: 'Guilt-free snacks for every craving'
  },
];

export const products: Product[] = [
 
{
  id: 'mm-001',
  name: 'Amla Powder',
  category: 'millets',
  description: 'Pure nutrient-rich amla powder packed with natural Vitamin C.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894392/Amla_Powder1_qkzhbo.webp',
  sizes: [
    { size: '150g', price: 213, inStock: true },
    { size: '500g', price: 680, inStock: true }
  ],
  benefits: ['Boosts immunity', 'Improves digestion', 'Promotes hair health', 'Rich in antioxidants'],
  specifications: ['100% Natural', 'Sun Dried', 'No Additives', 'Fine Powder'],
  howToUse: 'Mix 1 tsp with warm water, smoothies, or use in hair packs.'
},

{
  id: 'mm-002',
  name: 'ABC Mix (Amla + Beetroot + Carrot)',
  category: 'millets',
  description: 'Powerful nutrition blend of amla, beetroot, and carrot for overall wellness.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894392/ABC_Mix_Amla_Beetroot_Carrot_o7czo1.jpg',
  sizes: [
    { size: '150g', price: 283, inStock: true },
    { size: '500g', price: 945, inStock: true }
  ],
  benefits: ['Improves blood health', 'Boosts immunity', 'Enhances skin glow', 'Rich in vitamins & minerals'],
  specifications: ['Natural Ingredients', 'No Artificial Color', 'Nutrient Dense', 'Fine Blend'],
  howToUse: 'Mix with milk, smoothies, or consume with warm water daily.'
},

{
  id: 'mm-003',
  name: 'Sprouted Ragi Flour',
  category: 'millets',
  description: 'Calcium-rich sprouted ragi flour ideal for kids and adults.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894390/Sprouted_Ragi_Flour_vb9fua.jpg',
  sizes: [
    { size: '150g', price: 80, inStock: true },
    { size: '500g', price: 266, inStock: true }
  ],
  benefits: ['High in calcium', 'Improves digestion', 'Great for kids', 'Strengthens bones'],
  specifications: ['Sprouted & Sun Dried', 'No Preservatives', 'Stone Ground', 'High Fiber'],
  howToUse: 'Use for porridge, dosa batter, laddus, and baby foods.'
},

{
  id: 'mm-004',
  name: 'Sprouted Jowar Flour',
  category: 'millets',
  description: 'Nutritious sprouted jowar flour for healthy daily cooking.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894387/Sprouted_Jowar_Flour_qjjwob.jpg',
  sizes: [
    { size: '150g', price: 80, inStock: true },
    { size: '500g', price: 266, inStock: true }
  ],
  benefits: ['Diabetic-friendly', 'Good for digestion', 'High in fiber', 'Supports heart health'],
  specifications: ['Sprouted Grains', 'Gluten Free', 'No Additives', 'Stone Ground'],
  howToUse: 'Use to make rotis, dosa batter, porridges, and baking.'
},

{
  id: 'mm-005',
  name: 'Sprouted Moong Dal Flour',
  category: 'millets',
  description: 'Protein-rich sprouted moong dal flour perfect for healthy meals.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894386/Sprouted_Moong_Dal_Flour_fogmiy.webp',
  sizes: [
    { size: '150g', price: 102, inStock: true },
    { size: '500g', price: 340, inStock: true }
  ],
  benefits: ['High in protein', 'Easy to digest', 'Improves gut health', 'Great for weight loss'],
  specifications: ['Sprouted', 'No Chemicals', 'Premium Quality', 'Fine Texture'],
  howToUse: 'Use for dosa batter, roti mix, soups, or energy mixes.'
},

{
  id: 'mm-006',
  name: 'Sprouted Fenugreek Powder',
  category: 'millets',
  description: 'Healthy sprouted fenugreek powder known for digestion & sugar control.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894386/Sprouted_Fenugreek_Powder_u5jjqm.webp',
  sizes: [
    { size: '150g', price: 220, inStock: true },
    { size: '500g', price: 733, inStock: true }
  ],
  benefits: ['Controls blood sugar', 'Improves metabolism', 'Aids digestion', 'Boosts immunity'],
  specifications: ['Sprouted & Sun Dried', 'No Preservatives', 'Herbal Grade', 'Fine Powder'],
  howToUse: 'Mix with warm water, add to curries, or blend in health drinks.'
},

{
  id: 'mm-007',
  name: 'Multi Millet Nutri Mix',
  category: 'millets',
  description: 'A wholesome multi-millet blend for complete daily nutrition.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894385/Multi_Millet_Nutri_Mix_t7qlho.jpg',
  sizes: [
    { size: '150g', price: 150, inStock: true },
    { size: '500g', price: 500, inStock: true }
  ],
  benefits: ['Improves stamina', 'High in fiber', 'Rich in minerals', 'Perfect meal replacement'],
  specifications: ['Multi-Millet Blend', 'No Sugar Added', 'High Protein', '100% Natural'],
  howToUse: 'Use for porridge, laddus, dosa mix, or health drinks.'
}
,
  {
    id: 'co-001',
    name: 'Coconut Oil',
    category: 'coldoils',
    description: 'Pure cold pressed coconut oil',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894365/Coconut_Oil_wy6uds.jpg',
    sizes: [
      { size: '1L', price: 500, inStock: true },
      { size: '5L', price: 2450, inStock: true }
    ],
    benefits: ['Promotes hair growth', 'Moisturizes skin', 'Supports healthy cooking', 'Natural antibacterial properties'],
    specifications: ['Cold Pressed', 'Extra Virgin', 'No Chemicals', 'Traditional Extraction'],
    howToUse: 'Use for cooking, as a hair oil, or for body massage to enhance wellness.'
},
{
    id: 'co-002',
    name: 'Sesame Oil',
    category: 'coldoils',
    description: 'Traditional gingelly oil',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Sesame_Oil_b3vxnf.avif',
    sizes: [
      { size: '1L', price: 480, inStock: true },
      { size: '5L', price: 2350, inStock: true }
    ],
    benefits: ['Supports bone health', 'Rich in calcium', 'Heart friendly', 'Warming and soothing'],
    specifications: ['Cold Pressed', '100% Pure', 'Wood Pressed', 'Aromatic'],
    howToUse: 'Ideal for South Indian cooking, oil pulling, or as a massage oil.'
},
{
    id: 'co-003',
    name: 'Peanut Oil',
    category: 'coldoils',
    description: 'Cold pressed peanut oil',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Peanut_Oil_msppyp.webp',
    sizes: [
      { size: '1L', price: 320, inStock: true },
      { size: '5L', price: 1550, inStock: true }
    ],
    benefits: ['Heart healthy', 'High smoke point', 'Rich nutty taste', 'Contains Vitamin E'],
    specifications: ['Cold Pressed', 'Unrefined', 'Chemical Free', 'Natural'],
    howToUse: 'Perfect for deep frying, tadka, and general Indian cooking.'
},
{
    id: 'co-004',
    name: 'Caster Oil',
    category: 'coldoils',
    description: 'Pure kachi ghani mustard oil',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/cold_oil_ggu81b.webp',
    sizes: [
      { size: '1L', price: 350, inStock: true },
      { size: '5L', price: 1700, inStock: true }
    ],
    benefits: ['Antibacterial', 'Supports heart health', 'Nourishes skin & hair', 'Traditional cooking use'],
    specifications: ['Kachi Ghani', 'Pungent Aroma', '100% Pure', 'Cold Pressed'],
    howToUse: 'Use for pickles, cooking, hair oil, or winter body massage.'
},
{
    id: 'co-005',
    name: 'Safflower Oil',
    category: 'coldoils',
    description: 'Cold pressed sunflower oil',
    image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Safflower_Oil_ocalgf.webp',
    sizes: [
      { size: '1L', price: 370, inStock: true },
      { size: '5L', price: 1800, inStock: true }
    ],
    benefits: ['Light & healthy', 'High in Vitamin E', 'Gentle on skin', 'Neutral flavor for cooking'],
    specifications: ['Cold Pressed', 'Light Color', 'Mild Flavor', 'Natural'],
    howToUse: 'Best for cooking, baking, and salad dressings.'
},
/* -----------------------------
     ✔ CORRECTED GHEE PRODUCTS
------------------------------*/

{
  id: 'gh-001',
  name: 'Pure Cow Ghee',
  category: 'ghee',
  description: 'Premium homemade pure cow ghee with rich aroma and superior quality.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894365/Coconut_Oil_wy6uds.jpg',
  sizes: [
    { size: '250g', price: 350, inStock: true },
    { size: '500g', price: 680, inStock: true },
    { size: '1kg', price: 1300, inStock: true }
  ],
  benefits: ['Improves digestion', 'Boosts immunity', 'Good for heart health', 'Rich in Omega fats'],
  specifications: ['Pure Cow Milk Ghee', 'No Preservatives', 'Traditional Method', 'Golden Texture'],
  howToUse: 'Use for daily cooking, sweets, or as a nutrition supplement.'
},

{
  id: 'gh-002',
  name: 'A2 Desi Cow Ghee',
  category: 'ghee',
  description: 'Made from A2 Gir cow milk using traditional Bilona method.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Sesame_Oil_b3vxnf.avif',
  sizes: [
    { size: '250g', price: 550, inStock: true },
    { size: '500g', price: 1050, inStock: true },
    { size: '1kg', price: 2000, inStock: true }
  ],
  benefits: ['Supports brain health', 'Good for bones', 'Boosts energy', 'High in natural nutrients'],
  specifications: ['A2 Milk', 'Bilona Method', 'No Chemicals', 'Premium Quality'],
  howToUse: 'Use in cooking, Ayurvedic remedies, or as a daily health booster.'
},

{
  id: 'gh-003',
  name: 'Buffalo Ghee',
  category: 'ghee',
  description: 'Rich and creamy buffalo ghee ideal for cooking and sweets.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Peanut_Oil_msppyp.webp',
  sizes: [
    { size: '500g', price: 450, inStock: true },
    { size: '1kg', price: 850, inStock: true }
  ],
  benefits: ['Rich taste', 'Perfect for cooking', 'High in calcium', 'Long shelf life'],
  specifications: ['Buffalo Milk Ghee', 'No Preservatives', 'Thick Texture', 'Traditional'],
  howToUse: 'Ideal for sweets, deep cooking, and Indian dishes.'
},

{
  id: 'gh-004',
  name: 'Herbal Ghee',
  category: 'ghee',
  description: 'Ghee infused with traditional herbs for health benefits.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763890872/cold_oil_ggu81b.webp',
  sizes: [
    { size: '250g', price: 380, inStock: true },
    { size: '500g', price: 720, inStock: true }
  ],
  benefits: ['Improves metabolism', 'Strengthens immunity', 'Supports digestion'],
  specifications: ['Herbal Infused', 'Ayurvedic Blend', 'Chemical Free', 'Pure Ingredients'],
  howToUse: 'Use 1 spoon daily in warm milk or food.'
},

{
  id: 'gh-005',
  name: 'Organic Cow Ghee',
  category: 'ghee',
  description: 'Certified organic cow ghee with rich flavor and aroma.',
  image: 'https://res.cloudinary.com/dd4oiwnep/image/upload/v1763894364/Safflower_Oil_ocalgf.webp',
  sizes: [
    { size: '250g', price: 420, inStock: true },
    { size: '500g', price: 820, inStock: true }
  ],
  benefits: ['100% natural', 'Supports heart health', 'Good for metabolism'],
  specifications: ['Organic Certified', 'Pure Cow Milk', 'Golden Yellow Color', 'Premium Aroma'],
  howToUse: 'Use in traditional cooking, baking, or as a health supplement.'
}



];
