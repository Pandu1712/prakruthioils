import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface StickyCartIconProps {
  onClick: () => void;
}

export default function StickyCartIcon({ onClick }: StickyCartIconProps) {
  const { getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-24 bg-lime-400 hover:bg-lime-200 text-white rounded-2xl shadow-2xl p-4 transition-all duration-300 hover:scale-110 z-40 group animate-bounce"
    >
      <div className="relative">
        <ShoppingCart className="w-8 h-8" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {totalItems}
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold">
        ₹{getTotalPrice()}
      </div>
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-lime-400 rounded-full animate-ping"></div>
    </button>
  );
}
