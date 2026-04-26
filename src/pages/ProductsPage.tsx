import { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Search, 
  X, 
  Filter as FilterIcon,
  ShoppingCart,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
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
  const { products, categories: categoryData } = useData();
  const [activeCategory, setActiveCategory] = useState(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCount, setShowCount] = useState(32);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 2130]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState('all');
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
  const [isWeightMenuOpen, setIsWeightMenuOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setActiveCategory(initialCategoryId || 'all');
  }, [initialCategoryId]);

  // Extract all unique weights from products
  const availableWeights = useMemo(() => {
    const weights = new Set<string>();
    products.forEach(p => {
      p.sizes.forEach(s => weights.add(s.size));
    });
    return Array.from(weights).sort();
  }, [products]);

  // Get filtered products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category match: either from URL (initialCategoryId) OR from sidebar selection (selectedCats)
      // If selectedCats has items, only those categories match. 
      // If activeCategory is not 'all', it acts as a primary filter.
      const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
      
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const pPrice = p.sizes[0]?.offerPrice ?? p.sizes[0]?.price ?? 0;
      const matchesPrice = pPrice >= priceRange[0] && pPrice <= priceRange[1];

      const matchesSelectedCats = selectedCats.length === 0 || selectedCats.includes(p.category);
      
      const matchesWeight = selectedWeight === 'all' || p.sizes.some(s => s.size === selectedWeight);

      return matchesCategory && matchesSearch && matchesPrice && matchesSelectedCats && matchesWeight;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.sizes[0]?.offerPrice ?? a.sizes[0]?.price) - (b.sizes[0]?.offerPrice ?? b.sizes[0]?.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.sizes[0]?.offerPrice ?? b.sizes[0]?.price) - (a.sizes[0]?.offerPrice ?? a.sizes[0]?.price));
    }

    return result;
  }, [activeCategory, searchQuery, priceRange, selectedCats, selectedWeight, sortBy, products]);

  const toggleCategory = (catId: string) => {
    setSelectedCats(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] pt-32 md:pt-40 pb-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Top Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">
              <FilterIcon className="w-4 h-4" />
              Filter
            </button>
            <div className="flex items-center gap-1 border-l border-zinc-200 pl-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#0A3221] text-white' : 'text-zinc-400 hover:bg-zinc-50'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#0A3221] text-white' : 'text-zinc-400 hover:bg-zinc-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 border-l border-zinc-200 pl-4">
              <span>Show:</span>
              <select 
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 font-medium cursor-pointer"
              >
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={64}>64</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-zinc-400">
              Showing 1–{Math.min(showCount, filteredProducts.length)} of {filteredProducts.length} results
            </p>
            <div className="relative group">
              <button className="flex items-center gap-8 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium">
                <span>{sortBy === 'default' ? 'Default sorting' : sortBy === 'price-low' ? 'Price: low to high' : 'Price: high to low'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-zinc-100 rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                <div className="p-3">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-4 py-2 bg-zinc-50 rounded-lg text-xs outline-none" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button onClick={() => setSortBy('default')} className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-50 rounded-lg">Default sorting</button>
                  <button onClick={() => setSortBy('price-low')} className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-50 rounded-lg">Sort by price: low to high</button>
                  <button onClick={() => setSortBy('price-high')} className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-50 rounded-lg">Sort by price: high to low</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setIsCatMenuOpen(!isCatMenuOpen); setIsWeightMenuOpen(false); }}
              className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium flex items-center gap-4 hover:bg-zinc-50"
            >
              <span>{activeCategory === 'all' ? 'All Categories' : categoryData.find(c => c.id === activeCategory)?.name || activeCategory}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {isCatMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-100 rounded-xl shadow-2xl z-[60] py-2 animate-dropdown">
                <button 
                  onClick={() => { setActiveCategory('all'); setIsCatMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                >
                  All Categories
                </button>
                {categoryData.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setIsCatMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Weight/Quantity Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setIsWeightMenuOpen(!isWeightMenuOpen); setIsCatMenuOpen(false); }}
              className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium flex items-center gap-4 hover:bg-zinc-50"
            >
              <span>{selectedWeight === 'all' ? 'All Quantity' : selectedWeight}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {isWeightMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-2xl z-[60] py-2 animate-dropdown">
                <button 
                  onClick={() => { setSelectedWeight('all'); setIsWeightMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                >
                  All Quantity
                </button>
                {availableWeights.map(w => (
                  <button 
                    key={w}
                    onClick={() => { setSelectedWeight(w); setIsWeightMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="px-10 py-3 bg-[#0A3221] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#0A3221]/10 hover:bg-[#0E442D] transition-all">
            Filter
          </button>
          <button 
            onClick={() => {
              setActiveCategory('all');
              setSelectedCats([]);
              setPriceRange([0, 2130]);
              setSearchQuery('');
              setSelectedWeight('all');
            }}
            className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-4"
              }>
                {filteredProducts.slice(0, showCount).map((product, index) => (
                  <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 30}ms` }}>
                    <ProductCard product={product} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-zinc-200">
                <Search className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No products found</h3>
                <p className="text-zinc-400 text-sm">Adjust your filters to find what you're looking for</p>
              </div>
            )}

            {filteredProducts.length > showCount && (
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setShowCount(prev => prev + 16)}
                  className="px-10 py-4 bg-zinc-900 text-white rounded-md font-medium text-base uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:w-80 space-y-8">
            
            {/* Filter by Price */}
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0A3221] mb-6 flex items-center gap-2">
                Filter by price
                <div className="h-0.5 w-12 bg-[#9EA233]/30"></div>
              </h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="2130" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#9EA233]"
                />
                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 py-1 border border-zinc-200 rounded text-xs text-center font-medium mb-1">
                      ₹{priceRange[0]}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Min. Price</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 py-1 border border-zinc-200 rounded text-xs text-center font-medium mb-1">
                      ₹{priceRange[1]}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Max. Price</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0A3221] mb-6 flex items-center gap-2">
                Product Categories
                <div className="h-0.5 w-12 bg-[#9EA233]/30"></div>
              </h3>
              <div className="space-y-4">
                {categoryData.map((cat) => {
                  const count = products.filter(p => p.category === cat.id).length;
                  const isChecked = selectedCats.includes(cat.id);
                  return (
                    <div key={cat.id} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleCategory(cat.id)}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-[#9EA233] border-[#9EA233]' : 'border-zinc-200 group-hover:border-[#9EA233]'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-[13px] font-medium transition-colors ${isChecked ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}>{cat.name}</span>
                      </div>
                      <span className="text-[12px] text-zinc-300 font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
