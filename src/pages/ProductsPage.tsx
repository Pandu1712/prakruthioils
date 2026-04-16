import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, SlidersHorizontal, ChevronRight, Search } from 'lucide-react';
import { products, categories as categoryData } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  categoryId: string;
  initialSearchQuery?: string;
  onBack: () => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductsPage({
  categoryId: initialCategoryId,
  initialSearchQuery = '',
  onBack,
  onViewDetails,
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setActiveCategory(initialCategoryId || 'all');
  }, [initialCategoryId]);

  // Get filtered products based on category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFFEF9] pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-[#9EA233] font-bold text-xs uppercase tracking-widest mb-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {activeCategory === 'all' ? 'All Products' : categoryData.find(c => c.id === activeCategory)?.name}
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-2">Showing {filteredProducts.length} results</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#9EA233]/20 focus:border-[#9EA233] transition-all outline-none font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filter */}
          <aside className="lg:w-64 flex-shrink-0">
             <div className="sticky top-28 space-y-8">
                <div>
                   <div className="flex items-center gap-2 mb-6">
                      <SlidersHorizontal className="w-4 h-4 text-[#9EA233]" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Categories</h3>
                   </div>
                   <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => setActiveCategory('all')}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                          activeCategory === 'all' 
                            ? "bg-[#9EA233] text-white shadow-lg" 
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                        }`}
                      >
                         <span>All Products</span>
                         <ChevronRight className={`w-4 h-4 opacity-50 ${activeCategory === 'all' ? "translate-x-1" : ""}`} />
                      </button>
                      
                      {categoryData.map((cat) => (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeCategory === cat.id 
                              ? "bg-[#9EA233] text-white shadow-lg" 
                              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                          }`}
                        >
                           <span>{cat.name}</span>
                           <ChevronRight className={`w-4 h-4 opacity-50 ${activeCategory === cat.id ? "translate-x-1" : ""}`} />
                        </button>
                      ))}
                   </div>
                </div>

                {/* Promotional/Info Box */}
                <div className="p-6 rounded-2xl bg-[#9EA233]/5 border border-[#9EA233]/10">
                   <h4 className="text-xs font-black uppercase tracking-widest text-[#7D8128] mb-2">Purity Promise</h4>
                   <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      All our products are extracted through traditional wooden Ghani methods to preserve natural nutrients.
                   </p>
                </div>
             </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="mt-8 text-[#9EA233] font-bold text-sm underline"
                >
                   Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
