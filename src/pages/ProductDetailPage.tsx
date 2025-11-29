import { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Leaf, Star, Circle } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ product, selectedSize, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-[#9EA233] to-white pt-24 pb-20">
      <div className="container mx-auto px-6">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9EA233] hover:text-[#9EA233] font-semibold mb-12 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Hero Section */}
        <div className="relative lg:flex lg:items-start gap-12">

          {/* Product Image */}
          <div className="relative lg:w-1/2 mb-8 lg:mb-0">
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#9EA233]/30 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-yellow-200/30 blur-3xl animate-pulse"></div>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-3xl shadow-2xl w-full h-[28rem] object-cover transform hover:scale-105 transition-all duration-500"
            />
            <div className="absolute bottom-6 left-6 flex flex-col gap-3">
              <span className="bg-[#9EA233] text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                <Leaf className="w-4 h-4" /> 100% Natural
              </span>
              <span className="bg-white text-[#9EA233] px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                <Star className="w-4 h-4" /> Premium Quality
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#9EA233]/20 blur-3xl"></div>
            <h1 className="text-5xl font-extrabold text-[#9EA233] mb-6">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            {/* Sizes */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700 mb-2 block">Select Size:</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      selectedSize.size === size.size
                        ? 'bg-[#9EA233] text-white shadow-lg scale-105'
                        : size.inStock
                        ? 'bg-yellow-50 text-[#9EA233] hover:bg-[#9EA233] hover:text-[#9EA233] hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-3xl font-bold text-[#9EA233]">
                ₹{selectedSize.price} <span className="text-gray-500 text-lg">/{selectedSize.size}</span>
              </div>
              <div className="flex items-center border-2 border-[#9EA233] rounded-full overflow-hidden">
                <button onClick={decreaseQuantity} className="px-3 py-2 hover:bg-[#9EA233 ">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 font-bold text-gray-900 text-lg">{quantity}</span>
                <button onClick={increaseQuantity} className="px-3 py-2  hover:bg-[#9EA233] ">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize.inStock}
              className={`w-full py-4 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                isAdded
                  ? 'bg-[#9EA233] text-white shadow-2xl scale-105'
                  : selectedSize.inStock
                    ? 'bg-[#9EA233] text-white hover:bg-[#9EA233] hover:shadow-2xl hover:scale-[1.03]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Benefits & Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#9EA233]/30 blur-3xl animate-pulse"></div>
            <h2 className="text-2xl font-bold text-[#9EA233] mb-4 flex items-center gap-2">
              <Circle className="w-6 h-6" /> Benefits
            </h2>
            <ul className="space-y-3">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-[#9EA233] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-3xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-yellow-200/20 blur-3xl animate-pulse"></div>
            <h2 className="text-2xl font-bold text-[#9EA233] mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" /> Specifications
            </h2>
            <ul className="space-y-3">
              {product.specifications.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Circle className="w-5 h-5 text-[#9EA233] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-16 bg-[#9EA233]  rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-yellow-200/30 blur-3xl animate-pulse"></div>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="text-lg leading-relaxed">{product.howToUse}</p>
        </div>
      </div>
    </div>
  );
}
