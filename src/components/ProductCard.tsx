import { useState, useEffect } from "react";
import { Product, ProductSize } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const defaultSize =
    product.sizes.find(
      (s) => s.size.toLowerCase() === "1l" || s.size.toLowerCase() === "1ltr"
    ) || product.sizes[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const exists = cart.some(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize.size === selectedSize.size
    );
    setIsAdded(exists);
  }, [cart, product.id, selectedSize.size]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdded) return;
    
    addToCart({
      product,
      selectedSize,
      quantity: 1,
      unitPrice: selectedSize.offerPrice ?? selectedSize.price,
      originalPrice: selectedSize.price,
    });
    setIsAdded(true);
  };

  return (
    <div 
      className="group relative bg-[#9EA233]/[0.03] rounded-[40px] p-6 border border-gray-100 hover:border-[#9EA233]/20 hover:bg-white transition-all duration-700 animate-fadeIn flex flex-col h-full"
    >
      {/* Image Container with Yellow-Green Accent bg */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square mb-8 rounded-[30px] bg-[#9EA233]/[0.05] overflow-hidden p-6 cursor-pointer group-hover:scale-105 transition-transform duration-700"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
        {/* Offer Badge */}
        {selectedSize.offerPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            {Math.round(((selectedSize.price - selectedSize.offerPrice) / selectedSize.price) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:underline cursor-pointer" onClick={() => onViewDetails(product)}>
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">{product.category}</p>
        </div>

        {/* Size Selection Pills */}
        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size.size}
              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                selectedSize.size === size.size
                  ? "bg-[#9EA233] text-white border-[#9EA233]"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-[#9EA233]"
              }`}
            >
              {size.size}
            </button>
          ))}
        </div>

        {/* Bottom Section: Price + Add Button */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-dotted border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#9EA233]">
              ₹{selectedSize.offerPrice ?? selectedSize.price}
            </span>
            {selectedSize.offerPrice && (
              <span className="text-[10px] text-gray-400 line-through font-medium leading-none">
                ₹{selectedSize.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isAdded 
                ? "bg-green-500 text-white" 
                : "bg-[#9EA233]/10 text-[#9EA233] hover:bg-[#9EA233] hover:text-white"
            }`}
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
