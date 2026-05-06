import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import TrustedBadge from "../components/TrustedBadge";

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { cart, updateQuantity, removeFromCart, getTotalItems, getDeliveryCharges, getFinalTotal, getTotalPrice } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.unitPrice) * item.quantity,
    0
  );

  const totalSavings = cart.reduce(
    (sum, item) =>
      sum + ((item.originalPrice ?? item.unitPrice) - item.unitPrice) * item.quantity,
    0
  );

  const totalAmount = getFinalTotal();
  const deliveryCharge = getDeliveryCharges();
  const freeDeliveryThreshold = 1500;
  const remainingForFree = freeDeliveryThreshold - getTotalPrice();
  const progress = Math.min((getTotalPrice() / freeDeliveryThreshold) * 100, 100);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFEF9] px-6">
        <div className="w-24 h-24 bg-[#9EA233]/10 rounded-full flex items-center justify-center mb-10">
           <ShoppingBag className="w-12 h-12 text-[#9EA233]" />
        </div>
        <h2 className="text-[36px] font-medium text-gray-900 mb-6 tracking-tight leading-none">Your cart is empty.</h2>
        <button
          onClick={onBack}
          className="bg-[#9EA233] text-white font-medium py-4 px-10 rounded-2xl transition-all text-xs uppercase tracking-widest shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 md:pt-48 pb-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-12">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-none">My <span className="text-[#9EA233]">Cart</span></h1>
              <p className="text-xs text-gray-400 font-medium mt-3 uppercase tracking-widest">{getTotalItems()} Product{getTotalItems() > 1 ? 's' : ''} • Ready for Checkout</p>
            </div>
           <button onClick={onBack} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm text-gray-400 hover:text-gray-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
           </button>
        </div>
        {/* CART ITEMS LIST */}
        <div className="space-y-6 mb-12">
          {cart.map((item) => {
            const hasDiscount = (item.originalPrice ?? item.unitPrice) > item.unitPrice;
            const discountPercentage = hasDiscount 
              ? Math.round(((item.originalPrice! - item.unitPrice) / item.originalPrice!) * 100) 
              : 0;

            return (
              <div
                key={`${item.product.id}-${item.selectedSize.size}`}
                className="bg-white rounded-3xl md:rounded-[100px] p-3 md:p-4 pr-4 md:pr-10 border border-zinc-100 flex items-center gap-4 md:gap-6 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Product Image with Discount Badge */}
                <div className="relative w-20 h-20 md:w-32 md:h-32 bg-[#F8FAF5] rounded-2xl md:rounded-[40px] overflow-hidden p-2 md:p-4 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {hasDiscount && (
                    <div className="absolute top-0 left-0 bg-[#00A859] text-white text-[10px] font-bold px-3 py-1 rounded-br-2xl shadow-lg">
                      {discountPercentage}%
                    </div>
                  )}
                </div>
  
                {/* Product Details */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 leading-tight">{item.product.name}</h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.selectedSize.size}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xl font-bold text-zinc-900">₹{item.unitPrice.toLocaleString()}</p>
                      {hasDiscount && (
                        <p className="text-sm text-zinc-300 line-through font-medium">₹{item.originalPrice?.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
  
                  <div className="flex items-center gap-4 md:gap-8">
                    {/* Quantity Controls */}
                    <div className="flex items-center h-10 md:h-12 bg-zinc-50 border border-zinc-100 rounded-full px-1.5 md:px-2">
                       <button
                         onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity - 1)}
                         className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-400 hover:text-zinc-900"
                       >
                         <Minus className="w-3 h-3 md:w-4 md:h-4" />
                       </button>
                       <span className="text-sm md:text-base font-bold w-8 md:w-10 text-center text-zinc-900">{item.quantity}</span>
                       <button
                         onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity + 1)}
                         className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-[#00A859] text-white shadow-lg shadow-[#00A859]/20 hover:bg-[#008F4C] transition-all"
                       >
                         <Plus className="w-3 h-3 md:w-4 md:h-4" />
                       </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize.size)}
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 rounded-full transition-all border border-red-100/50 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* COMPACT GRID FOR SUMMARY & PROGRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
           
           {/* FREE DELIVERY PROGRESS (COMPACT) */}
           <div className="bg-white rounded-[32px] p-6 border border-zinc-100 shadow-sm flex flex-col justify-between">
              <div>
                 <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-sm font-bold text-zinc-900 tracking-tight">
                      {remainingForFree > 0 
                        ? `Add ₹${remainingForFree.toLocaleString()} for FREE delivery!` 
                        : "FREE delivery unlocked! 🎉"}
                    </p>
                    <p className="text-[9px] font-bold text-[#9EA233] uppercase tracking-widest">
                      Threshold: ₹1,500
                    </p>
                 </div>
                 <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#9EA233] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(158,162,51,0.3)]"
                      style={{ width: `${progress}%` }}
                    />
                 </div>
                 <p className="text-[10px] font-medium text-zinc-400 mt-4 tracking-widest leading-relaxed">
                   Free delivery on orders above ₹1,500! Delivery within 5 km of Sahakar Nagar in 24 hours.
                 </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 </div>
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Guaranteed Fresh Delivery</span>
              </div>
           </div>

           {/* ORDER SUMMARY (COMPACT) */}
           <div className="bg-white border border-zinc-100 rounded-[32px] p-6 shadow-xl shadow-zinc-200/40">
              <h3 className="text-base font-medium text-zinc-900 tracking-tight mb-6">Order Summary</h3>
              <div className="space-y-4">
                 <div className="flex justify-between text-xs font-medium tracking-widest text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-zinc-900">₹{subtotal.toLocaleString()}</span>
                 </div>
                 {totalSavings > 0 && (
                   <div className="flex justify-between text-xs font-medium tracking-widest text-[#9EA233]">
                      <span>Discount</span>
                      <span>- ₹{totalSavings.toLocaleString()}</span>
                   </div>
                 )}
                  <div className="flex justify-between text-xs font-medium tracking-widest text-zinc-400">
                     <span>Shipping</span>
                     <span className={deliveryCharge === 0 ? "text-emerald-500" : "text-zinc-900"}>
                       {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                     </span>
                  </div>
                 <div className="pt-4 mt-4 border-t border-zinc-50 flex justify-between items-end">
                    <span className="text-xs font-medium tracking-widest text-zinc-400">Total Payable</span>
                    <span className="text-3xl font-medium text-zinc-900 leading-none tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                 </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-8 h-14 bg-[#9EA233] text-white font-medium rounded-2xl shadow-xl shadow-[#9EA233]/20 hover:bg-[#7D8128] hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 whitespace-nowrap"
              >
                 Confirm Order <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
