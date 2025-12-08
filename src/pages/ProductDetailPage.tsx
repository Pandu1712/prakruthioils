import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Leaf,
  Star,
  Circle,
} from "lucide-react";
import { Product, ProductSize } from "../types";
import { useCart } from "../context/CartContext";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailPage({
  product,
  onBack,
}: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ product, selectedSize, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-[#9EA233]/10 to-white pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 xl:px-12">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9EA233] font-semibold mb-10 hover:text-[#7c8a27]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Layout Wrapper */}
        <div className="lg:flex lg:items-start gap-10">

          {/* PRODUCT IMAGE SECTION */}
          <div className="relative w-full lg:w-1/2 mb-10 lg:mb-0">

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] xl:h-[38rem]
                object-cover 
                rounded-3xl shadow-2xl
                transition-transform duration-700
                hover:scale-105
              "
            />

            {/* Floating tags */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
              <span className="bg-[#9EA233] text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg text-sm">
                <Leaf className="w-4 h-4" /> 100% Natural
              </span>
              <span className="bg-white text-[#9EA233] px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg text-sm">
                <Star className="w-4 h-4" /> Premium Quality
              </span>
            </div>
          </div>

          {/* PRODUCT INFO SECTION */}
          <div className="lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 relative">

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#9EA233] mb-4">
              {product.name}
            </h1>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* SIZE SELECTOR */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700 mb-2 block">Select Size</label>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`
                      px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300
                      ${
                        selectedSize.size === size.size
                          ? "bg-[#9EA233] text-white shadow-md scale-105"
                          : size.inStock
                          ? "bg-yellow-50 text-[#9EA233] hover:bg-[#9EA233] hover:text-white shadow"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed line-through"
                      }
                    `}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE + QUANTITY */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl md:text-3xl font-bold text-[#9EA233]">
                ₹{selectedSize.price}
                <span className="text-gray-500 text-sm md:text-lg ml-1">
                  /{selectedSize.size}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-[#9EA233] rounded-full overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 hover:bg-[#9EA233]/10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 font-bold text-gray-900 text-lg">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 hover:bg-[#9EA233]/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              className={`
                w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3
                transition-all duration-300
                ${
                  isAdded
                    ? "bg-green-600 text-white shadow-xl scale-105"
                    : "bg-[#9EA233] text-white hover:bg-[#7c8a27] hover:shadow-2xl hover:scale-[1.03]"
                }
              `}
            >
              <ShoppingCart className="w-6 h-6" />
              {isAdded ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* BENEFITS & SPECIFICATIONS */}
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#9EA233] mb-4 flex items-center gap-2">
              <Circle className="w-5 h-5" /> Benefits
            </h2>
            <ul className="space-y-3">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#9EA233] rounded-full mt-2"></div>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#9EA233] mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" /> Specifications
            </h2>
            <ul className="space-y-3">
              {product.specifications.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Circle className="w-4 h-4 text-[#9EA233]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* HOW TO USE */}
        <div className="mt-14 bg-[#9EA233] rounded-3xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="text-lg leading-relaxed">{product.howToUse}</p>
        </div>
      </div>
    </div>
  );
}
