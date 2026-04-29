import { useData } from "../context/DataContext";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

export default function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  const { categories } = useData();
  return (
    <section className="py-12 md:py-20 bg-[#FDFCF7]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[#9EA233] uppercase tracking-[0.4em] mb-3 block">Pure</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A3221] tracking-tight">Our Categories</h2>
          <div className="h-1 w-20 bg-[#9EA233] mx-auto mt-6 rounded-full opacity-30"></div>
        </div>

        {/* Categories Grid - Premium Circular Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10">
          {categories.map((cat, idx) => (
            <div 
               key={cat.id} 
               onClick={() => onCategoryClick(cat.id)}
               className="group cursor-pointer animate-fadeIn flex flex-col items-center"
               style={{ animationDelay: `${idx * 50}ms` }}
            >
               <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                  {/* Background Circle with Glow */}
                  <div className="absolute inset-0 bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_50px_-10px_rgba(158,162,51,0.2)] transition-all duration-500 scale-95 group-hover:scale-100 border border-zinc-100 group-hover:border-[#9EA233]/30"></div>
                  
                  {/* Image Container */}
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-[#F8FAF5] flex items-center justify-center p-2 group-hover:bg-white transition-colors duration-500">
                     <img 
                       src={cat.image} 
                       alt={cat.name} 
                       className="w-full h-full object-cover rounded-full transform transition-transform duration-700 group-hover:scale-110"
                     />
                  </div>

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#9EA233] opacity-0 group-hover:opacity-10 scale-110 group-hover:scale-100 transition-all duration-500"></div>
               </div>
               
               <h3 className="text-lg md:text-xl font-bold text-zinc-900 text-center tracking-tight leading-tight px-1 group-hover:text-[#9EA233] transition-all duration-300 transform group-hover:translate-y-[-2px]">
                  {cat.name}
               </h3>
               <span className="text-[10px] md:text-xs font-medium text-zinc-400 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">Explore Collection</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
