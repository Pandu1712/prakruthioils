import { useState, useRef } from "react";
import {
  ArrowLeft,
  Send,
  User,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useData } from "../context/DataContext";
import Invoice from "../components/Invoice";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, getTotalItems, clearCart, getDeliveryCharges, getFinalTotal } = useCart();
  const { addOrder, orders } = useData();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    location: "",
  });

  const billDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryCharge = getDeliveryCharges();
  const totalAmount = getFinalTotal();
  
  // Sequential Invoice Number: Pra001, Pra002, etc.
  const nextInvoiceNumber = `Pra${(orders.length + 1).toString().padStart(3, '0')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Location access not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        setFormData(prev => ({ ...prev, location: link }));
      },
      () => alert("Please allow location access.")
    );
  };

  const generateInvoicePDF = async () => {
    const invoiceElement = invoiceRef.current;
    if (!invoiceElement) return;
    const canvas = await html2canvas(invoiceElement, { 
       scale: 3,
       useCORS: true,
       logging: false
    });
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, (canvas.height * pdfWidth) / canvas.width);
    pdf.save(`Prakruthi_Naturals_Invoice_${nextInvoiceNumber}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addOrder({
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        location: formData.location,
        items: cart,
        totalAmount: totalAmount
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
    await generateInvoicePDF();
    let msg = `*New Harvest Order - Prakruthi Naturals*\n\n`;
    msg += `*Customer:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*Address:* ${formData.address}\n\n`;
    msg += `*Items:*\n`;
    cart.forEach((item, i) => {
      msg += `${i+1}. ${item.product.name} (${item.selectedSize.size}) x ${item.quantity}\n`;
    });
    msg += `\n*Subtotal: ₹${subtotal.toLocaleString()}*`;
    msg += `\n*Delivery: ${deliveryCharge > 0 ? `₹${deliveryCharge}` : 'FREE'}*`;
    msg += `\n*Grand Total: ₹${totalAmount.toLocaleString()}*\n\n`;
    msg += formData.location ? `*Delivery Location:* ${formData.location}` : "";
    window.open(`https://wa.me/918073516982?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 md:pt-40 pb-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-12">
        
        {/* Standard Header */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-sm md:text-base tracking-widest mb-4 transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Selection
          </button>
          
          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-none mb-2">
            Confirm Your <span className="text-[#9EA233]">Order.</span>
          </h1>
          <p className="text-base text-gray-500 font-medium leading-relaxed">
            Secure & Encrypted Checkout — Ready for Harvest Delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-12 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1">
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
               <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40">
                  <h2 className="text-sm font-medium text-zinc-400 tracking-widest mb-6 uppercase">1. Delivery Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-medium tracking-widest text-gray-400 ml-2 uppercase">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-sm md:text-base text-zinc-900 placeholder:text-zinc-300" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-medium tracking-widest text-gray-400 ml-2 uppercase">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required type="tel" pattern="[0-9]{10}" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-sm md:text-base text-zinc-900 placeholder:text-zinc-300" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-6 md:mt-8 space-y-2">
                    <label className="text-[10px] font-medium tracking-widest text-gray-400 ml-2 uppercase">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-300" />
                       <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Full address including landmarks" className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-sm md:text-base text-zinc-900 resize-none placeholder:text-zinc-300" />
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 flex justify-center">
                    <button type="button" onClick={handleGetLocation} className="flex items-center gap-3 text-[10px] md:text-xs font-medium text-[#9EA233] tracking-widest hover:translate-x-2 transition-transform">
                       <MapPin className="w-4 h-4" /> {formData.location ? "Location Captured" : "Auto-detect current location"}
                    </button>
                  </div>
               </div>

               <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-100 shadow-xl shadow-zinc-200/40">
                  <h2 className="text-sm font-medium text-zinc-400 tracking-widest mb-6 uppercase">2. Payment Method</h2>
                  <div className="p-4 md:p-6 rounded-2xl bg-zinc-900 text-white flex items-center gap-6 group cursor-pointer border border-transparent hover:border-[#9EA233]/50 transition-all">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-[#9EA233]" />
                     </div>
                     <div className="flex-1">
                        <p className="text-lg font-medium text-white">Cash on Delivery</p>
                        <p className="text-[10px] text-white/50 font-medium tracking-widest mt-1 uppercase">Pay upon safe harvest delivery</p>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-[#9EA233] flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#9EA233] rounded-full"></div>
                     </div>
                  </div>
               </div>

               <div className="w-full">
                  <button type="submit" className="w-full bg-[#9EA233] text-white h-14 md:h-16 rounded-2xl font-medium text-sm md:text-base tracking-widest shadow-2xl shadow-[#9EA233]/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                     <Send className="w-5 h-5" /> Place Order via WhatsApp
                  </button>
               </div>
            </form>
          </div>
          {/* Right Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-40 order-2">
              <div className="bg-zinc-50 rounded-3xl p-6 space-y-6 border border-zinc-100 shadow-inner">
                 <h3 className="text-base font-medium text-zinc-400 tracking-widest uppercase">Order Summary ({getTotalItems()})</h3>
                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={`${item.product.id}-${item.selectedSize.size}`} className="flex items-center gap-3 md:gap-4">
                         <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl p-2 border border-zinc-100 flex-shrink-0">
                            <img src={item.product.image} className="w-full h-full object-contain" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm md:text-base text-zinc-900 truncate leading-tight">{item.product.name}</p>
                            <p className="text-[10px] md:text-xs font-medium text-zinc-400 tracking-widest mt-1">{item.selectedSize.size} x {item.quantity}</p>
                         </div>
                         <p className="font-medium text-sm md:text-base text-[#9EA233]">₹{item.unitPrice * item.quantity}</p>
                      </div>
                    ))}
                 </div>
                 
                 <div className="pt-4 md:pt-6 border-t border-zinc-200 space-y-3 md:space-y-4">
                    <div className="flex justify-between text-sm md:text-base font-medium tracking-widest text-zinc-400">
                       <span>Subtotal</span>
                       <span className="text-zinc-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base font-medium tracking-widest text-zinc-400">
                       <span>Delivery</span>
                       <span className={deliveryCharge === 0 ? "text-emerald-500" : "text-zinc-900"}>
                         {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                       </span>
                    </div>
                     <div className="flex justify-between items-center pt-4 md:pt-6 gap-4">
                        <span className="text-xs md:text-sm font-medium tracking-widest text-zinc-400 uppercase">Total</span>
                        <span className="text-2xl md:text-4xl font-medium tracking-tighter text-zinc-900 leading-none">₹{totalAmount.toLocaleString()}</span>
                     </div>
                 </div>

                 <div className="bg-[#9EA233]/5 p-4 rounded-2xl border border-[#9EA233]/10">
                    <p className="text-[10px] font-bold text-[#9EA233] leading-relaxed uppercase tracking-wider">
                      Free delivery on orders above ₹1,500!
                    </p>
                 </div>
  
                 <div className="bg-white p-4 rounded-2xl border border-zinc-100 flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6 text-[#9EA233]" />
                    <div>
                       <p className="text-[10px] font-bold tracking-widest text-[#9EA233] uppercase">Guaranteed Freshness</p>
                       <p className="text-[9px] text-zinc-400 font-medium tracking-widest mt-0.5 uppercase">Packed and shipped within 24h</p>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>

      {/* Hidden Invoice for PDF Generation */}
      <div className="absolute -left-[9999px] top-0 overflow-hidden">
         <Invoice 
            ref={invoiceRef}
            formData={formData}
            cart={cart}
            total={totalAmount}
            deliveryCharge={deliveryCharge}
            invoiceNumber={nextInvoiceNumber}
            date={billDate}
         />
      </div>
    </div>
  );
}
