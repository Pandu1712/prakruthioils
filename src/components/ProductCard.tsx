import { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ product, selectedSize, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1);
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="group relative bg-gradient-to-br from-[#fef08a]/50 to-[#9EA233]/50 rounded-3xl backdrop-blur-lg border border-[#d9f99d]/40 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500">
      
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-3xl cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 left-3 flex flex-col gap-2">
          <span className="px-3 py-1 bg-[#9EA233]/90 text-white text-xs font-semibold rounded-full">
            Natural
          </span>
          <span className="px-3 py-1 bg-[#fef08a]/90 text-gray-900 text-xs font-semibold rounded-full">
            Organic Free
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#9EA233] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>

        {/* Sizes */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-2 block">Select Size</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(size)}
                disabled={!size.inStock}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
                  ${selectedSize.size === size.size 
                    ? "bg-[#9EA233] text-white border-[#9EA233] shadow-md"
                    : size.inStock
                      ? "bg-white text-gray-800 border-gray-300 hover:border-[#9EA233] hover:text-[#9EA233]"
                      : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed line-through"
                  }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-extrabold text-[#9EA233]">
          ₹{selectedSize.price} <span className="text-sm text-gray-700 font-medium">/{selectedSize.size}</span>
        </div>

        {/* Quantity + Add To Cart */}
        <div className="flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center bg-white rounded-full border border-[#9EA233] overflow-hidden">
            <button onClick={decreaseQuantity} className="px-3 py-2 text-[#9EA233] hover:bg-[#fef08a]/20 transition-all">-</button>
            <span className="px-4 text-gray-900 font-semibold">{quantity}</span>
            <button onClick={increaseQuantity} className="px-3 py-2 text-[#9EA233] hover:bg-[#fef08a]/20 transition-all">+</button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize.inStock}
            className={`
              flex-1 py-3 rounded-full font-semibold text-white transition-all duration-300
              ${isAdded ? "bg-[#9EA233]" : selectedSize.inStock ? "bg-gradient-to-r from-[#fef08a] to-[#9EA233] hover:scale-[1.03] shadow-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
          >
            {isAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
