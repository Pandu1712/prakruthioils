import { useState } from 'react';
import { ArrowLeft, Send, User, MapPin, Mail, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    location: '' // NEW FIELD
  });

  /* -------------------------
      INPUT HANDLER
  -------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* -------------------------
      GET CURRENT LOCATION
  -------------------------- */
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Your device doesn't support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const link = `https://www.google.com/maps?q=${lat},${lon}`;

        setFormData((prev) => ({ ...prev, location: link }));
        alert("Location added successfully!");
      },
      () => {
        alert("Please allow location permission.");
      }
    );
  };

  /* -------------------------
      SEND TO WHATSAPP
  -------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `*New Order from Prakruthi Cold Oils*\n\n`;

    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}\n`;
    message += `Location: ${formData.location || "Not Provided"}\n\n`;

    message += `*Order Details:*\n`;

    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.product.name}\n`;
      message += `Size: ${item.selectedSize.size}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ₹${item.selectedSize.price} x ${item.quantity} = ₹${
        item.selectedSize.price * item.quantity
      }\n`;
    });

    message += `\n*Total Amount: ₹${getTotalPrice()}*`;

    const whatsappNumber = '918073516982';
    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');

    clearCart();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9EA233] to-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9EA233] font-semibold mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ----------------------------- 
                CUSTOMER DETAILS FORM 
          ------------------------------ */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Information
              </h2>

              <div className="space-y-6">

                {/* NAME */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-[#9EA233]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-[#9EA233]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233]"
                    placeholder="10 digit mobile number"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-[#9EA233]" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233]"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-[#9EA233]" />
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233] resize-none"
                    placeholder="Full address with pincode"
                  />
                </div>

                {/* -------------------------
                     CURRENT LOCATION (NEW)
                -------------------------- */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Current Location (Optional)
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      readOnly
                      className="w-full px-4 py-3 border-2 rounded-xl bg-gray-100 border-gray-300"
                      placeholder="Click 'Get' to auto-fill location"
                    />

                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="px-4 py-3 bg-[#9EA233] text-white rounded-xl font-semibold hover:scale-105 transition"
                    >
                      Get
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full mt-8 bg-[#9EA233] text-white py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 transition-all"
              >
                <Send className="w-6 h-6" /> Send Order to WhatsApp
              </button>

              <p className="mt-2 text-sm text-gray-600 text-center">
                Your order will be sent to WhatsApp for confirmation.
              </p>
            </form>
          </div>

          {/* -----------------------------
                ORDER SUMMARY
          ------------------------------ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize.size}`}
                    className="flex gap-3 pb-4 border-b border-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {item.selectedSize.size} × {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-[#9EA233] mt-1">
                        ₹{item.selectedSize.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#9EA233]">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#9EA233]">₹{getTotalPrice()}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
