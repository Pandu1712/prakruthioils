import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Search, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { Product } from "../types";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Shop", id: "products" },
  { name: "Gallery", id: "gallery" },
  { name: "Reviews", id: "reviews" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function Navbar({ onNavigate, currentPage, onSearch, onViewProduct }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { products } = useData();
  const { getTotalItems } = useCart();
  const totalItemsCount = getTotalItems();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setLiveResults(filtered);
      setShowDropdown(true);
    } else {
      setLiveResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowDropdown(false);
      setSearchTerm("");
    }
  };

  const handleProductClick = (product: Product) => {
    onViewProduct(product);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Announcement Banner */}
      <div className="bg-[#9EA233] text-white py-2 px-4 text-center shadow-sm">
        <p className="text-[11px] md:text-sm font-medium tracking-wide">
          Free delivery on orders above ₹1,500! Delivered within 24 hours.
        </p>
      </div>
      <nav
        className={`transition-all duration-700 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-zinc-100" 
            : "bg-white py-6"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-12">
          <div className="flex items-center justify-between gap-6 md:gap-10">
            {/* Logo Section */}
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 md:gap-4 cursor-pointer group flex-shrink-0 max-w-[50%] md:max-w-none"
            >
              <div className="relative overflow-hidden rounded-full shadow-lg border border-[#9EA233]/20 group-hover:border-[#9EA233] transition-all duration-500 flex-shrink-0">
                <img
                  src="/coldLogo.jpg"
                  alt="Logo"
                  className="w-10 h-10 md:w-14 md:h-14 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base md:text-2xl font-medium text-zinc-900 tracking-tight leading-none truncate">Prakruthi</span>
                <span className="text-[11px] font-bold tracking-[0.25em] md:tracking-widest text-[#1E4620] mt-1.5 truncate">COLD PRESSED OILS</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-base font-medium tracking-wide transition-all duration-300 relative group
                    ${currentPage === item.id ? "text-[#1E4620] font-semibold" : "text-gray-900 hover:text-[#1E4620]"}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#1E4620] transition-all duration-500 ${currentPage === item.id ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </button>
              ))}
            </div>

            {/* Search Bar & Icons */}
            <div className="flex-1 max-w-xl flex items-center gap-6 justify-end">
              <div ref={searchRef} className="relative w-full hidden md:block">
                 <form onSubmit={handleSearchSubmit}>
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#9EA233] transition-colors" />
                       <input 
                         type="text" 
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         onFocus={() => searchTerm.trim().length >= 2 && setShowDropdown(true)}
                         placeholder="Search pure oils, ghee, millets..." 
                         className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-50 border border-gray-100 text-base font-medium focus:ring-2 focus:ring-[#9EA233]/10 focus:border-[#9EA233] focus:bg-white transition-all outline-none"
                       />
                    </div>
                 </form>

                 {/* Live Dropdown Results */}
                 {showDropdown && (
                   <div className="absolute top-full mt-3 left-0 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slideUp z-[70]">
                      <div className="p-2">
                        {liveResults.length > 0 ? (
                          <>
                            {liveResults.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all group text-left"
                              >
                                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-100 p-1 flex-shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-base font-medium text-gray-900 truncate">{product.name}</p>
                                  <p className="text-xs text-gray-400 font-medium tracking-widest">{product.category}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#9EA233] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </button>
                            ))}
                            <button 
                              onClick={handleSearchSubmit}
                              className="w-full p-4 text-center border-t border-gray-50 text-[#9EA233] text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-50 transition-all mt-1"
                            >
                               View all results — "{searchTerm}"
                            </button>
                          </>
                        ) : (
                          <div className="p-8 text-center">
                             <p className="text-base text-gray-500 font-medium">No products found for "{searchTerm}"</p>
                          </div>
                        )}
                      </div>
                   </div>
                 )}
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <button
                  onClick={() => onNavigate("cart")}
                  className="relative p-3 text-white bg-[#9EA233] rounded-full hover:bg-[#7D8128] transition-all shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-[#9EA233] text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {totalItemsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="xl:hidden p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-900 border border-gray-100"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

      </nav>
    </div>

    {/* Premium Mobile Menu (Side Drawer) */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-[100] xl:hidden">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* Drawer */}
        <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 z-50">
            
            {/* Drawer Header */}
            <div className="px-6 py-6 border-b border-zinc-100 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                  <img src="/coldLogo.jpg" alt="Logo" className="w-12 h-12 rounded-full border border-[#9EA233]/20" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-medium text-zinc-900 tracking-tight leading-none">Prakruthi</span>
                    <span className="text-xs font-medium tracking-widest text-[#9EA233] mt-1">Cold Oils</span>
                  </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                  <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Drawer Body (Scrollable) */}
            <div className="px-6 py-8 space-y-2 flex-1 overflow-y-auto bg-white" style={{ overscrollBehavior: 'contain' }}>
              <div className="mb-8">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-xl py-4 pl-12 pr-4 text-base font-medium text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-[#9EA233] focus:ring-1 focus:ring-[#9EA233] transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                </form>
              </div>

              <span className="text-xs font-medium tracking-widest text-zinc-400 block mb-4 ml-2">Navigation</span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-4 rounded-xl text-base font-medium tracking-wide transition-all
                    ${currentPage === item.id 
                      ? "bg-[#9EA233] text-white shadow-md shadow-[#9EA233]/20" 
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* Drawer Footer */}
            <div className="px-6 py-8 border-t border-zinc-100 bg-zinc-50 flex-shrink-0">
              <span className="text-xs font-medium tracking-widest text-zinc-400 block mb-4">Need Help?</span>
              <a href="tel:8073516982" className="flex items-center gap-3 text-base font-medium text-zinc-800 hover:text-[#9EA233] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-zinc-200/50 flex items-center justify-center">
                    <span className="text-lg">📞</span>
                  </div>
                  +91 80735 16982
              </a>
            </div>
        </div>
      </div>
    )}
    </>
  );
}
