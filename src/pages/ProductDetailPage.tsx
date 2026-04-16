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
import { products } from "../data/products";

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
      <div className="container mx-auto px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-bold text-xs uppercase tracking-[0.3em] transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
             <span>Shop</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span>{product.category}</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span className="text-gray-900">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          
          {/* Left: Cinematic Image Section */}
          <div className="relative group">
            <div className="relative aspect-square overflow-hidden rounded-[80px] bg-gray-50 border-[20px] border-gray-50 shadow-2xl transition-all duration-700 group-hover:shadow-[#9EA233]/10">
               <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                />
                
                {selectedSize.offerPrice && (
                  <div className="absolute top-10 right-10 bg-red-600 text-white px-6 py-3 rounded-full font-black shadow-2xl animate-bounce-slow">
                    {Math.round(((selectedSize.price - selectedSize.offerPrice) / selectedSize.price) * 100)}% OFF
                  </div>
                )}

                <div className="absolute bottom-10 left-10 flex flex-col gap-3">
                   <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-xl text-[10px] font-black uppercase tracking-widest text-[#9EA233]">
                      <Leaf className="w-4 h-4" /> 100% Raw & Pure
                   </div>
                   <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#9EA233] rounded-full shadow-xl text-[10px] font-black uppercase tracking-widest text-white">
                      <ShieldCheck className="w-4 h-4" /> Trusted Quality
                   </div>
                </div>
            </div>
          </div>

          {/* Right: Premium Product Info */}
          <div className="md:col-span-1 space-y-8 animate-fadeIn">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-gray-400">
              <button onClick={onBack} className="hover:text-[#9EA233] transition-colors">Shop</button>
              <span>/</span>
              <span className="text-[#9EA233]">{product.category}</span>
            </nav>

            <div className="space-y-4">
              <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-none">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[14px] font-bold text-gray-400">50+ Reviews</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-end gap-6 mb-12">
               <div className="flex flex-col">
                  {selectedSize.offerPrice && (
                    <span className="text-lg text-gray-300 line-through font-bold decoration-2">₹{selectedSize.price}</span>
                  )}
                  <span className="text-5xl font-bold text-[#9EA233] tracking-tighter">
                    ₹{selectedSize.offerPrice ?? selectedSize.price}
                  </span>
               </div>
               <span className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                 Per {selectedSize.size}
               </span>
            </div>

            {/* Size Selector */}
            <div className="mb-12">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Available Sizes</h3>
               <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!size.inStock}
                      className={`h-14 px-8 rounded-2xl text-sm font-bold transition-all duration-500 border-2
                        ${selectedSize.size === size.size
                          ? "bg-[#9EA233] border-[#9EA233] text-white shadow-2xl shadow-[#9EA233]/40"
                          : size.inStock
                          ? "bg-white border-gray-100 text-gray-600 hover:border-[#9EA233] hover:text-[#9EA233]"
                          : "bg-gray-50 border-gray-50 text-gray-300 cursor-not-allowed line-through"}`}
                    >
                      {size.size}
                    </button>
                  ))}
               </div>
            </div>

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row gap-6 mt-auto pt-10 border-t border-gray-50">
               <div className="flex items-center h-16 rounded-2xl bg-gray-50 border border-gray-100 px-4">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-400 hover:text-gray-900"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center text-lg font-bold text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-400 hover:text-gray-900"><Plus className="w-4 h-4" /></button>
               </div>
               <button 
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-4 h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl
                  ${isAdded 
                    ? "bg-green-500 text-white" 
                    : "bg-[#9EA233] text-white hover:bg-[#7D8128] hover:-translate-y-1"}`}
               >
                 <ShoppingCart className="w-5 h-5" />
                 {isAdded ? "Successfully Added!" : "Add to Cart"}
               </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="mb-32">
           <div className="flex border-b border-gray-100 mb-16 overflow-x-auto scrollbar-hide">
              {[
                { id: 'benefits', label: 'Nutritional Benefits', icon: Zap },
                { id: 'specs', label: 'Specifications', icon: Award },
                { id: 'usage', label: 'How to Use', icon: Star }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-10 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative
                    ${activeTab === tab.id ? "text-[#9EA233]" : "text-gray-400 hover:text-gray-900"}`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#9EA233] rounded-t-full"></div>}
                </button>
              ))}
           </div>

           <div className="max-w-4xl animate-fadeIn">
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {product.benefits.map((b, i) => (
                     <div key={i} className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <CheckCircle2 className="w-6 h-6 text-[#9EA233]" />
                        <span className="text-gray-700 font-bold">{b}</span>
                     </div>
                   ))}
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {product.specifications.map((s, i) => (
                     <div key={i} className="flex items-center gap-4 border-l-4 border-[#9EA233] pl-6 py-2">
                        <span className="text-gray-900 font-bold">{s}</span>
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
                  <span className="text-xs font-bold text-[#9EA233] uppercase tracking-[0.3em] mb-4 block">More Choice</span>
                  <h2 className="text-4xl font-bold text-gray-900 tracking-tight">You might also like</h2>
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
