import { useState } from "react";
import {
  ArrowLeft,
  Send,
  User,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    location: "",
  });

  const billDate = new Date().toLocaleDateString();

  // Calculate total amount for invoice
  const totalAmount = getTotalPrice();

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- GET CURRENT LOCATION ---------------- */
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

  /* ---------------- GENERATE PDF INVOICE ---------------- */
  const generateInvoicePDF = async () => {
    const invoiceElement = document.getElementById("prakruthi-invoice");
    if (!invoiceElement) return;

    const canvas = await html2canvas(invoiceElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Prakruthi_Invoice_${Date.now()}.pdf`);
  };

  /* ---------------- SEND ORDER TO WHATSAPP ---------------- */
  const sendOrderToWhatsApp = () => {
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

    const whatsappNumber = "918073516982";
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, "_blank");
  };

  /* ---------------- HANDLE SUBMIT ----------------
     Flow:
     1) Generate & download Invoice PDF
     2) Open WhatsApp with order text + location
  ------------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Generate PDF invoice (auto download)
    await generateInvoicePDF();

    // 2. Open WhatsApp with full order + location
    sendOrderToWhatsApp();

    // 3. Clear cart & call success handler
    clearCart();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9EA233] to-white pt-24 pb-16 relative">
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
          {/* ---------------- CUSTOMER FORM ---------------- */}
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
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233] focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-[#9EA233]" />
                    Phone Number * (10 digits)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233] focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233] focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 focus:border-[#9EA233] focus:outline-none resize-none"
                    placeholder="Full address with pincode"
                  />
                </div>

                {/* CURRENT LOCATION */}
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
                      className="w-full px-4 py-3 border-2 rounded-xl bg-gray-100 border-gray-300 focus:outline-none"
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
                className="w-full mt-8 bg-[#9EA233] hover:bg-[#8a932d] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <Send className="w-6 h-6" />
                Generate Invoice & Send to WhatsApp
              </button>

              <p className="mt-3 text-sm text-gray-600 text-center">
                We will download your invoice and open WhatsApp with your full
                order details. You can attach the invoice PDF from your
                downloads if needed.
              </p>
            </form>
          </div>

          {/* ---------------- ORDER SUMMARY ---------------- */}
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

      {/* ---------- HIDDEN INVOICE LAYOUT FOR PDF (OFFSCREEN, NOT VISIBLE) ---------- */}
     <div
        id="prakruthi-invoice"
        className="absolute -left-[9999px] top-0 bg-white text-black p-8 w-[794px] border border-[#9EA233]"
      >
        {/* Header with green theme */}
        <div className="flex items-center border-b-4 border-[#9EA233] pb-4 mb-4">
          <div className="w-20 h-20 mr-4 rounded-full border-2 border-[#9EA233] flex items-center justify-center overflow-hidden bg-white">
            <img
              src="/coldLogo.jpg"
              alt="Prakruthi Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-[#4a5c0f]">
              PRAKRUTHI COLD PRESS OIL
            </h1>
            <p className="text-sm text-gray-700">Tata Nagar, Bengaluru, Karnataka - 560094</p>
            <p className="text-sm text-gray-700">Phone: 8073516982</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#9EA233]">INVOICE</div>
           
            <div className="text-xs text-gray-600">
              Date: <span className="font-semibold">{billDate}</span>
            </div>
          </div>
        </div>

        {/* Customer + Location */}
        <div className="grid grid-cols-2 gap-4 mb-4 rounded-lg border border-[#d9f99d] bg-[#fefce8] p-4">
          <div>
            <h2 className="font-semibold text-[#4a5c0f] mb-1">Bill To:</h2>
            <p className="text-sm"><span className="font-semibold">Name:</span> {formData.name}</p>
            <p className="text-sm"><span className="font-semibold">Phone:</span> {formData.phone}</p>
            <p className="text-sm"><span className="font-semibold">Email:</span> {formData.email}</p>
            <p className="text-sm"><span className="font-semibold">Address:</span> {formData.address}</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#4a5c0f] mb-1">Delivery Location:</h2>
            <p className="text-xs break-all">
              {formData.location ? formData.location : "Not Provided"}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-sm border-collapse mb-6">
          <thead>
            <tr className="bg-[#ecfccb] text-[#4a5c0f]">
              <th className="border border-[#d4d4d4] p-2 text-left w-10">No</th>
              <th className="border border-[#d4d4d4] p-2 text-left">Item Name</th>
              <th className="border border-[#d4d4d4] p-2 text-left w-24">Size</th>
              <th className="border border-[#d4d4d4] p-2 text-left w-16">Qty</th>
              <th className="border border-[#d4d4d4] p-2 text-left w-24">Rate</th>
              <th className="border border-[#d4d4d4] p-2 text-left w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={`${item.product.id}-${item.selectedSize.size}`}>
                <td className="border border-[#e5e5e5] p-2">{index + 1}</td>
                <td className="border border-[#e5e5e5] p-2">{item.product.name}</td>
                <td className="border border-[#e5e5e5] p-2">{item.selectedSize.size}</td>
                <td className="border border-[#e5e5e5] p-2">{item.quantity}</td>
                <td className="border border-[#e5e5e5] p-2">₹{item.selectedSize.price}</td>
                <td className="border border-[#e5e5e5] p-2">
                  ₹{item.selectedSize.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Signature */}
        <div className="flex justify-between items-start mt-4">
          <div className="text-xs text-gray-600 max-w-xs">
            <p className="font-semibold text-[#4a5c0f] mb-1">
              Notes:
            </p>
            <p>
              Thank you for choosing Prakruthi Cold Press Oil. Consume fresh, natural, and chemical-free
              products for a healthy lifestyle.
            </p>
          </div>

          <div className="w-64 text-sm">
            <div className="flex justify-between mb-1">
              <span>Sub Total:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Discount:</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between font-bold border-t border-[#d4d4d4] pt-2 mt-2 text-[#4a5c0f]">
              <span>TOTAL AMOUNT:</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="mt-8 text-right">
              <p className="text-xs text-gray-600 mb-8">Authorised Signature</p>
              <div className="border-t border-black w-32 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
