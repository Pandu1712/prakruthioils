import { useState, useEffect } from "react";
import { Product, ProductSize } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  // Sort sizes by weight/price to find the highest variant
  const sortedSizes = [...product.sizes].sort((a, b) => {
    const getWeight = (s: string) => {
      const lower = s.toLowerCase();
      const match = lower.match(/(\d+(\.\d+)?)/);
      const val = match ? parseFloat(match[1]) : 0;
      
      // Liters and Kilograms should be multiplied by 1000, 
      // but Milliliters (ML) should stay as is.
      if (lower.includes('kg') || (lower.includes('l') && !lower.includes('ml'))) {
        return val * 1000;
      }
      return val;
    };
    return getWeight(b.size) - getWeight(a.size);
  });

  const [selectedSize, setSelectedSize] = useState<ProductSize>(sortedSizes[0]);
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
      className="group relative bg-white rounded-[24px] p-4 border border-zinc-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 animate-fadeIn flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square mb-4 rounded-xl bg-white overflow-hidden cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain"
        />
        {/* Offer Badge */}
        {selectedSize.offerPrice && (
          <div className="absolute top-0 left-0 bg-[#0A3221] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg">
            {Math.round(((selectedSize.price - selectedSize.offerPrice) / selectedSize.price) * 100)}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <div className="mb-2">
          <p className="text-[11px] text-zinc-400 font-medium mb-1">{product.category}</p>
          <h3 className="text-[15px] font-bold text-zinc-900 line-clamp-1 cursor-pointer" onClick={() => onViewDetails(product)}>
            {product.name}
          </h3>
        </div>

        {/* Variants Dropdown */}
        <div className="mb-4">
          <select 
            value={selectedSize.size}
            onChange={(e) => {
              const size = product.sizes.find(s => s.size === e.target.value);
              if (size) setSelectedSize(size);
            }}
            className="w-full bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2 text-xs font-bold text-zinc-600 outline-none focus:border-[#9EA233] transition-all cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
          >
            {product.sizes.map((size) => (
              <option key={size.size} value={size.size}>
                {size.size} - ₹{size.offerPrice ?? size.price}
              </option>
            ))}
          </select>
        </div>

        {/* Bottom Section: Price + Add Button */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-zinc-900">
              ₹{selectedSize.offerPrice ?? selectedSize.price}.00
            </span>
            {selectedSize.offerPrice && (
              <span className="text-[12px] text-zinc-300 line-through">
                ₹{selectedSize.price}.00
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isAdded 
                ? "bg-zinc-900 text-white" 
                : "bg-[#F7F3E9] text-[#9EA233] hover:bg-[#9EA233] hover:text-white"
            }`}
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
