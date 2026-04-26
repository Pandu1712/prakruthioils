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
      className="fixed right-6 bottom-6 md:right-10 md:bottom-10 bg-zinc-900 hover:bg-[#9EA233] text-white rounded-full shadow-2xl shadow-zinc-900/20 px-6 py-4 transition-all duration-500 hover:-translate-y-2 z-40 group flex items-center gap-4 border border-zinc-800 hover:border-[#9EA233]"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
        <span className="absolute -top-2 -right-3 bg-[#9EA233] text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-md border-2 border-zinc-900 group-hover:border-[#9EA233] transition-colors">
          {totalItems}
        </span>
      </div>
      
      <div className="flex flex-col items-start border-l border-zinc-700 group-hover:border-white/20 pl-4 transition-colors">
        <span className="text-[9px] text-zinc-400 group-hover:text-white/80 font-medium uppercase tracking-widest leading-none mb-1">Checkout</span>
        <span className="text-sm md:text-base font-medium tracking-tight leading-none">₹{getTotalPrice().toLocaleString()}</span>
      </div>
    </button>
  );
}
