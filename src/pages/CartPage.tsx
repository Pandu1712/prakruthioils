import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { cart, updateQuantity, updateSize, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9EA233] via-[#9EA233] to-white px-4">
        <ShoppingBag className="w-32 h-32 text-yellow-300 mb-6 animate-bounce" />
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Oops! Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Looks like you haven't added any goodies yet. Start shopping and fill your cart with natural goodness!
        </p>
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-[#9EA233] to-[#9EA233] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9EA233] via-lime-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-lime-700 font-semibold mb-8 hover:text-lime-800 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </button>

        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize.size}`}
                className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-40 h-40 rounded-xl object-cover mb-4 md:mb-0 md:mr-6"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 w-full flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-500 mt-1">{item.product.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize.size)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Size Selector */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {item.product.sizes.map((size) => (
                      <button
                        key={size.size}
                        className={`px-4 py-1 rounded-full text-sm font-semibold border transition
                          ${
                            item.selectedSize.size === size.size
                              ? 'bg-[#9EA233] text-white border-[#9EA233]'
                              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-[#9EA233]'
                          }`}
                        onClick={() => updateSize(item.product.id, item.selectedSize.size, size)}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border-2 border-[#9EA233] rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize.size, item.quantity - 1)
                        }
                        className="p-2 bg-lime-50 hover:bg-lime-100 text-lime-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-2 font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize.size, item.quantity + 1)
                        }
                        className="p-2 bg- hover:bg-lime-100 text-lime-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-2xl font-extrabold text-[#9EA233]">
                      ₹{item.selectedSize.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-[#9EA233]">Free</span>
              </div>
              <div className="border-t mt-2 pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span className="text-[#9EA233]">₹{getTotalPrice()}</span>
              </div>

              <button
                onClick={onCheckout}
                className="mt-6 bg-gradient-to-r from-[#9EA233] to-[#9EA233] hover:from-lime-500 hover:to-lime-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
