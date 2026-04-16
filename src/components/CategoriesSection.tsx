interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

const categories: Category[] = [
  {
    id: "coldoils",
    name: "Pure Oils",
    image: "https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png",
  },
  {
    id: "ghee",
    name: "Pure Ghee",
    image: "https://cdn.shopify.com/s/files/1/0586/8234/3501/files/cow_desi_ghee_image.webp?v=1742634983",
  },
  {
    id: "millets",
    name: "Millets",
    image: "https://img1.exportersindia.com/product_images/bc-full/dir_115/3435522/organic-millets-1762979.jpg",
  },
  {
    id: "snacks",
    name: "Snacks",
    image: "https://res.cloudinary.com/dgky6sudx/image/upload/v1767329160/ChatGPT_Image_Jan_2_2026_10_14_53_AM_c5xwq9.png",
  },
  {
    id: "honey",
    name: "Honey",
    image: "https://ishavasyamproducts.com/cdn/shop/products/9.jpg?v=1634646181",
  }
];

export default function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="text-xs font-bold text-[#9EA233] uppercase tracking-widest bg-[#9EA233]/10 px-4 py-2 rounded-full">Our Selection</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 mb-4">Explore Our Categories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">From pure oils to healthy snacks, find everything you need for a better lifestyle.</p>
        </div>

        {/* Categories Grid - Circular Style */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {categories.map((cat, idx) => (
            <div 
               key={cat.id} 
               onClick={() => onCategoryClick(cat.id)}
               className="group flex flex-col items-center cursor-pointer animate-slideUp"
               style={{ animationDelay: `${idx * 100}ms` }}
            >
               <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-gray-100 group-hover:border-[#9EA233] transition-colors duration-500"></div>
                  
                  {/* Image Container */}
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
                     <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                     />
                  </div>
               </div>
               
               <h3 className="text-sm md:text-base font-bold text-gray-800 uppercase tracking-tighter group-hover:text-[#9EA233] transition-colors">
                  {cat.name}
               </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
