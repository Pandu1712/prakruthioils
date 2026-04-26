import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star,
  Award,
} from "lucide-react";
import { Product, ProductSize } from "../types";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useData } from "../context/DataContext";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailPage({
  product,
  onBack,
}: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs' | 'usage'>('benefits');
  const { addToCart } = useCart();
  const { products } = useData();

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedSize,
      quantity,
      unitPrice: selectedSize.offerPrice ?? selectedSize.price,
      originalPrice: selectedSize.price,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-xs md:text-base tracking-[0.2em] transition-all"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-gray-300">
             <button onClick={onBack} className="hover:text-[#9EA233] transition-colors">Shop</button>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span className="text-[#9EA233]">{product.category}</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span className="text-gray-900">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-16 md:mb-24">
          
          {/* Left: Premium Image Section */}
          <div className="relative group">
            <div className="relative aspect-square overflow-hidden rounded-[30px] md:rounded-[60px] bg-zinc-50/80 flex items-center justify-center p-8 md:p-16 transition-all duration-700">
               <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full max-w-[280px] md:max-w-[400px] object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                />
                
                {selectedSize.offerPrice && (
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-medium text-xs md:text-base uppercase tracking-widest shadow-xl">
                    {Math.round(((selectedSize.price - selectedSize.offerPrice) / selectedSize.price) * 100)}% OFF
                  </div>
                )}
            </div>
          </div>

          {/* Right: Premium Product Info */}
          <div className="md:col-span-1 space-y-8 animate-fadeIn">
            {/* Product Category Tag */}
            <div className="inline-block px-3 py-1 bg-[#9EA233]/5 text-[#9EA233] text-[10px] font-medium uppercase tracking-[0.2em] rounded-full">
              {product.category}
            </div>

            <div className="space-y-4">
              <h1 className="text-[36px] font-medium text-gray-900 tracking-tight leading-none">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-[#9EA233]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-base font-medium text-gray-400">50+ Reviews</span>
              </div>

              {/* Trust Badges moved to Product Info area */}
              <div className="flex flex-wrap gap-2 pt-2">
                 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg text-xs font-medium uppercase tracking-widest text-emerald-600">
                    <Leaf className="w-4 h-4" /> 100% Raw & Pure
                 </div>
                 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9EA233]/10 rounded-lg text-xs font-medium uppercase tracking-widest text-[#9EA233]">
                    <ShieldCheck className="w-4 h-4" /> Trusted Quality
                 </div>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-end gap-6 mb-12">
               <div className="flex flex-col">
                  {selectedSize.offerPrice && (
                    <span className="text-[24px] text-gray-300 line-through font-medium decoration-2 leading-none mb-1">₹{selectedSize.price}</span>
                  )}
                  <span className="text-[36px] font-medium text-[#9EA233] tracking-tight leading-none">
                    ₹{selectedSize.offerPrice ?? selectedSize.price}
                  </span>
               </div>
               <span className="bg-gray-100 px-4 py-2 rounded-xl text-base font-medium text-gray-400 uppercase tracking-widest mb-1">
                 Per {selectedSize.size}
               </span>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
               <h3 className="text-base font-medium uppercase tracking-widest text-zinc-400 mb-4">Available Sizes</h3>
               <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!size.inStock}
                      className={`h-14 px-8 rounded-xl text-base font-medium transition-all duration-300 border-2 tracking-widest
                        ${selectedSize.size === size.size
                          ? "bg-[#9EA233] border-[#9EA233] text-white shadow-lg shadow-[#9EA233]/20"
                          : size.inStock
                          ? "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                          : "bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed line-through"}`}
                    >
                      {size.size}
                    </button>
                  ))}
               </div>
            </div>

            {/* Quantity and CTA */}
            <div className="flex gap-4 mt-auto pt-8 border-t border-zinc-100">
               <div className="flex items-center h-14 rounded-xl bg-zinc-50 border border-zinc-200 px-3 flex-shrink-0">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Minus className="w-5 h-5" /></button>
                  <span className="w-10 text-center text-base font-medium text-zinc-900">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Plus className="w-5 h-5" /></button>
               </div>
               <button 
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 h-14 rounded-xl font-medium text-base uppercase tracking-widest transition-all duration-300 shadow-xl
                  ${isAdded 
                    ? "bg-zinc-900 text-white shadow-zinc-900/20" 
                    : "bg-[#9EA233] text-white hover:bg-[#7D8128] hover:-translate-y-0.5 shadow-[#9EA233]/20"}`}
               >
                 <ShoppingCart className="w-5 h-5" />
                 {isAdded ? "Added!" : "Add to Cart"}
               </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="mb-16 md:mb-24">
           <div className="flex border-b border-gray-100 mb-16 overflow-x-auto scrollbar-hide">
              {[
                { id: 'benefits', label: 'Nutritional Benefits', icon: Zap },
                { id: 'specs', label: 'Specifications', icon: Award },
                { id: 'usage', label: 'How to Use', icon: Star }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-10 py-6 text-base font-medium uppercase tracking-widest transition-all relative whitespace-nowrap
                    ${activeTab === tab.id ? "text-zinc-900" : "text-gray-400 hover:text-gray-900"}`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 rounded-t-full"></div>}
                </button>
              ))}
           </div>

           <div className="max-w-4xl animate-fadeIn">
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {product.benefits.map((b, i) => (
                     <div key={i} className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <CheckCircle2 className="w-6 h-6 text-[#9EA233]" />
                        <span className="text-gray-700 font-medium">{b}</span>
                     </div>
                   ))}
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {product.specifications.map((s, i) => (
                     <div key={i} className="flex items-center gap-4 border-l-4 border-[#9EA233] pl-6 py-2">
                        <span className="text-gray-900 font-medium">{s}</span>
                     </div>
                   ))}
                </div>
              )}
              {activeTab === 'usage' && (
                <div className="bg-[#9EA233]/5 p-12 rounded-[50px] border-2 border-dashed border-[#9EA233]/20">
                   <p className="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed italic">
                    "{product.howToUse}"
                   </p>
                </div>
              )}
           </div>
        </div>

         {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-12">
               <div>
                  <span className="text-base font-medium text-[#9EA233] uppercase tracking-widest mb-4 block">More Choice</span>
                  <h2 className="text-[36px] font-medium text-gray-900 tracking-tight leading-none">You might also like</h2>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {relatedProducts.map(p => (
                 <ProductCard key={p.id} product={p} onViewDetails={() => {}} />
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
