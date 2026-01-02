import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ onBack, onCheckout }: CartPageProps) {
  const { cart, updateQuantity, updateSize, removeFromCart } = useCart();

  // 🔢 Calculations
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9EA233] via-[#9EA233] to-white px-4">
        <ShoppingBag className="w-32 h-32 text-yellow-300 mb-6 animate-bounce" />
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Oops! Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Looks like you haven't added any items yet.
        </p>
        <button
          onClick={onBack}
          className="bg-[#9EA233] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition"
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
          className="flex items-center gap-2 text-lime-700 font-semibold mb-8 hover:text-lime-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize.size}`}
                className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl p-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-40 h-40 rounded-xl object-cover"
                />

                <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500">
                        Size: {item.selectedSize.size}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedSize.size
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Size Switch */}
                  <div className="flex gap-2 mt-3">
                    {item.product.sizes.map((size) => (
                      <button
                        key={size.size}
                        onClick={() =>
                          updateSize(
                            item.product.id,
                            item.selectedSize.size,
                            size
                          )
                        }
                        className={`px-4 py-1 rounded-full text-sm font-semibold border
                          ${
                            item.selectedSize.size === size.size
                              ? "bg-[#9EA233] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-[#9EA233] hover:text-white"
                          }`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border-2 border-[#9EA233] rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize.size,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-lime-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-6 py-2 font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize.size,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-lime-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                     {item.originalPrice !== undefined &&
  item.originalPrice > item.unitPrice && (
    <p className="text-sm text-gray-400 line-through">
      ₹{item.originalPrice * item.quantity}
    </p>
  )}

                      <p className="text-2xl font-bold text-[#9EA233]">
                        ₹{item.unitPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-green-600 mb-2">
                  <span>You Saved</span>
                  <span>- ₹{totalSavings}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#9EA233]">₹{totalAmount}</span>
              </div>

              <button
                onClick={onCheckout}
                className="mt-6 w-full bg-[#9EA233] text-white font-bold py-4 rounded-2xl hover:scale-105 transition"
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
