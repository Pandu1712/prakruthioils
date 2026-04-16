import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { Product } from "../types";

interface BestsellersSectionProps {
  onViewProduct: (product: Product) => void;
  onViewAll: () => void;
}

export default function BestsellersSection({ onViewProduct, onViewAll }: BestsellersSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    const extra = products.filter(p => !selected.find(s => s.id === p.id)).slice(0, 8);
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[14px] font-black text-[#9EA233] uppercase tracking-[0.3em] mb-3 block">Popular Choice</span>
            <h2 className="text-[36px] font-black text-gray-900 tracking-tight">Our Bestsellers</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#9EA233] hover:text-[#9EA233] hover:bg-[#9EA233]/10 transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#9EA233] hover:text-[#9EA233] hover:bg-[#9EA233]/10 transition-all shadow-sm font-bold"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[calc(25%-24px)] snap-start"
            >
              <ProductCard 
                product={product} 
                onViewDetails={onViewProduct} 
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <button 
              onClick={onViewAll}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#9EA233] text-white rounded-md font-black text-xs uppercase tracking-[0.2em] hover:bg-[#7D8128] transition-all shadow-xl"
            >
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
}
