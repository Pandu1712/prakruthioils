import { ShoppingCart, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileBottomBarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function MobileBottomBar({ onNavigate, currentPage }: MobileBottomBarProps) {
  const { getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0 || currentPage === "cart" || currentPage === "checkout") return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] md:hidden">
      <button 
        onClick={() => onNavigate("cart")}
        className="w-full flex items-center justify-between gap-4 bg-gradient-to-r from-[#9EA233] to-[#0A3221] text-white h-16 px-8 rounded-3xl shadow-[0_20px_50px_rgba(158,162,51,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
      >
         <div className="flex flex-col items-start text-left">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] leading-none mb-1.5">{totalItems} Item{totalItems > 1 ? 's' : ''} in cart</span>
            <span className="text-lg font-bold leading-none tracking-tight">₹{getTotalPrice().toLocaleString()}</span>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-[0.2em]">View Cart</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
               <ShoppingCart className="w-5 h-5 text-white" />
            </div>
         </div>
      </button>
    </div>
  );
}
