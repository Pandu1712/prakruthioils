import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useData } from "../context/DataContext";
import { Product } from "../types";

interface BestsellersSectionProps {
  onViewProduct: (product: Product) => void;
  onViewAll: () => void;
}

export default function BestsellersSection({ onViewProduct, onViewAll }: BestsellersSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { products } = useData();

  // Selection logic: 1 Oil product first, then variety from other categories
  const getBestsellers = () => {
    const selected: Product[] = [];
    const firstOil = products.find(p => p.category.toLowerCase() === 'coldoils');
    if (firstOil) selected.push(firstOil);
    
    const otherCategories = ['millets', 'ghee', 'snacks'];
    otherCategories.forEach(catId => {
      const product = products.find(p => 
        p.category.toLowerCase() === catId.toLowerCase() && 
        !selected.find(s => s.id === p.id)
      );
      if (product) selected.push(product);
    });

    // Fill the rest with general products to make a decent list for scrolling
    const extra = products.filter(p => !selected.find(s => s.id === p.id)).slice(0, 16);
    selected.push(...extra);
    
    return selected;
  };

  const bestsellers = getBestsellers();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 pb-48 md:pb-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent"></div>
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-[13px] md:text-base font-medium text-[#9EA233] uppercase tracking-[0.3em] mb-3 md:mb-4 block">Popular Choice</span>
            <h2 className="text-[32px] md:text-[44px] font-bold text-gray-900 tracking-tight leading-none">Our Bestsellers</h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#9EA233] hover:text-[#9EA233] hover:bg-[#9EA233]/10 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#9EA233] hover:text-[#9EA233] hover:bg-[#9EA233]/10 transition-all shadow-sm font-medium"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 md:pb-12 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[260px] sm:min-w-[320px] lg:min-w-[calc(25%-24px)] snap-start"
            >
              <ProductCard 
                product={product} 
                onViewDetails={onViewProduct} 
              />
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
            <button 
              onClick={onViewAll}
              className="group inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-5 bg-zinc-900 text-white rounded-xl font-bold text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-black hover:-translate-y-1 transition-all shadow-2xl shadow-zinc-900/20"
            >
                View All Products
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
}
