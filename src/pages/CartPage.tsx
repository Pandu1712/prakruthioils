import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Trophy } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { cart, updateQuantity, removeFromCart, getTotalItems } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.unitPrice) * item.quantity,
    0
  );

  const totalSavings = cart.reduce(
    (sum, item) =>
      sum + ((item.originalPrice ?? item.unitPrice) - item.unitPrice) * item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFEF9] px-6">
        <div className="w-24 h-24 bg-[#9EA233]/10 rounded-full flex items-center justify-center mb-10">
           <ShoppingBag className="w-12 h-12 text-[#9EA233]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your cart is empty.</h2>
        <button
          onClick={onBack}
          className="bg-[#9EA233] text-white font-bold py-4 px-10 rounded-2xl transition-all text-xs uppercase tracking-widest shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-10">
           <div>
              <h1 className="text-[36px] font-bold text-gray-900">My <span className="text-[#9EA233]">Cart</span></h1>
              <p className="text-[14px] text-gray-400 font-medium mt-1">{getTotalItems()} Product{getTotalItems() > 1 ? 's' : ''} • Ready for Checkout</p>
           </div>
           <button onClick={onBack} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm text-gray-400 hover:text-gray-900 transition-all">
              <ArrowLeft className="w-6 h-6" />
           </button>
        </div>


        {/* CART ITEMS LIST (Simplified Responsive Cards) */}
        <div className="space-y-4 mb-12">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize.size}`}
              className="bg-white rounded-[35px] p-6 border border-gray-100 flex items-center gap-4 md:gap-8"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-3xl overflow-hidden p-4 flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
                {item.originalPrice && item.originalPrice > item.unitPrice && (
                  <div className="absolute top-2 left-2 bg-[#9EA233] text-white text-[9px] font-black px-2 py-1 rounded-lg">
                    {Math.round(((item.originalPrice - item.unitPrice) / item.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{item.selectedSize.size}</p>
                   </div>
                   <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize.size)}
                    className="p-2 bg-red-50 text-red-300 hover:text-red-500 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6">
                   <div className="flex items-center">
                      <p className="text-xl font-bold text-gray-900">₹{item.unitPrice * item.quantity}</p>
                      {item.originalPrice && item.originalPrice > item.unitPrice && (
                        <p className="text-sm text-gray-300 line-through font-bold ml-3">₹{item.originalPrice * item.quantity}</p>
                      )}
                   </div>

                   {/* Compact Quantity Selector */}
                   <div className="flex items-center h-10 bg-gray-50 rounded-xl px-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-gray-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.size, item.quantity + 1)}
                        className="p-2 text-[#9EA233] hover:bg-[#9EA233] hover:text-white rounded-lg transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY (Simplified) */}
        <div className="bg-white border border-gray-100 rounded-[35px] p-10">
           <h3 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-widest">Order Summary</h3>
           <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                 <span>Subtotal</span>
                 <span className="text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#9EA233] uppercase tracking-widest">
                 <span>Discount</span>
                 <span>- ₹{totalSavings}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                 <span>Shipping</span>
                 <span className="text-[#9EA233]">Free</span>
              </div>
              <div className="pt-8 mt-8 border-t border-gray-50 flex justify-between items-end">
                 <span className="text-sm font-black uppercase tracking-widest text-gray-400">Total Payable</span>
                 <span className="text-4xl font-bold text-gray-900">₹{totalAmount}</span>
              </div>
           </div>

           <button
             onClick={onCheckout}
             className="w-full mt-12 h-16 bg-[#9EA233] text-white font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-xs uppercase tracking-widest"
           >
              Proceed to checkout
           </button>

           <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                 <ShieldCheck className="w-4 h-4 text-[#9EA233]" /> Secure Payment
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                 <Truck className="w-4 h-4 text-[#9EA233]" /> Fast Delivery
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
