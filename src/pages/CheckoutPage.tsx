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
  const { cart, getTotalItems, clearCart } = useCart();
  const { addOrder } = useData();
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
  const totalAmount = subtotal;

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
    pdf.save(`Prakruthi_Receipt_${Date.now()}.pdf`);
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
    let msg = `*New Harvest Order - Prakruthi cold pressed oils*\n\n`;
    msg += `*Customer:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*Address:* ${formData.address}\n\n`;
    msg += `*Items:*\n`;
    cart.forEach((item, i) => {
      msg += `${i+1}. ${item.product.name} (${item.selectedSize.size}) x ${item.quantity}\n`;
    });
    msg += `\n*Total Amount: ₹${totalAmount}*\n\n`;
    msg += formData.location ? `*Delivery Location:* ${formData.location}` : "";
    window.open(`https://wa.me/918073516982?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-12">
        
        {/* Cinematic Header */}
        <div className="mb-12 md:mb-20">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-sm md:text-base tracking-widest mb-8 md:mb-10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Selection
          </button>
          
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-[32px] md:text-[64px] font-medium text-gray-900 tracking-tighter leading-[1.1] mb-4">
            Confirm Your <br />
            <span className="text-[#9EA233]">Harvest Order.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium tracking-widest mt-4">Secure & Encrypted Harvest Checkout</p>
        </div>
      </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-16 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1">
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
               <div className="bg-white rounded-[32px] md:rounded-[50px] p-5 md:p-10 lg:p-12 border border-zinc-100 shadow-xl shadow-zinc-200/40">
                  <h2 className="text-lg md:text-xl font-medium text-zinc-400 tracking-widest mb-10 md:mb-16 text-center">1. Delivery Details</h2>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-xs md:text-sm font-medium tracking-widest text-gray-400 ml-4 md:ml-6">Full Legal Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" className="w-full h-16 md:h-20 pl-14 pr-6 rounded-[20px] md:rounded-[24px] bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-lg md:text-2xl text-zinc-900 placeholder:text-zinc-300" />
                        </div>
                     </div>
                     <div className="space-y-3 md:space-y-4">
                        <label className="text-xs md:text-sm font-medium tracking-widest text-gray-400 ml-4 md:ml-6">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required type="tel" pattern="[0-9]{10}" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" className="w-full h-16 md:h-20 pl-14 pr-6 rounded-[20px] md:rounded-[24px] bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-lg md:text-2xl text-zinc-900 placeholder:text-zinc-300" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
                    <label className="text-xs md:text-sm font-medium tracking-widest text-gray-400 ml-4 md:ml-6">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-6 md:top-8 w-4 h-4 text-gray-300" />
                       <textarea required name="address" value={formData.address} onChange={handleChange} rows={4} placeholder="Full address including landmarks" className="w-full pl-14 pr-6 py-6 md:py-8 rounded-[20px] md:rounded-[24px] bg-zinc-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-medium text-lg md:text-2xl text-zinc-900 resize-none placeholder:text-zinc-300" />
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 flex justify-center">
                    <button type="button" onClick={handleGetLocation} className="flex items-center gap-3 text-[10px] md:text-xs font-medium text-[#9EA233] tracking-widest hover:translate-x-2 transition-transform">
                       <MapPin className="w-4 h-4" /> {formData.location ? "Location Captured" : "Auto-detect current location"}
                    </button>
                  </div>
               </div>

               <div className="bg-white rounded-[32px] md:rounded-[50px] p-6 md:p-10 lg:p-12 border border-zinc-100 shadow-xl shadow-zinc-200/40">
                  <h2 className="text-lg md:text-xl font-medium text-zinc-400 tracking-widest mb-10 md:mb-16 text-center">2. Payment Method</h2>
                  <div className="p-6 md:p-10 rounded-[24px] md:rounded-3xl bg-zinc-900 text-white flex flex-col items-center justify-center gap-6 group cursor-pointer border border-transparent hover:border-[#9EA233]/50 transition-all text-center">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-[#9EA233]" />
                     </div>
                     <div>
                        <p className="text-xl md:text-3xl font-medium text-white">Cash on Delivery</p>
                        <p className="text-xs md:text-sm text-white/50 font-medium tracking-widest mt-2">Pay upon safe harvest delivery</p>
                     </div>
                     <div className="w-8 h-8 rounded-full border-2 border-[#9EA233] flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#9EA233] rounded-full"></div>
                     </div>
                  </div>
               </div>

               <div className="w-full">
                  <button type="submit" className="w-full bg-[#9EA233] text-white h-16 md:h-20 rounded-2xl md:rounded-[32px] font-medium text-base md:text-lg tracking-widest shadow-2xl shadow-[#9EA233]/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 md:gap-4">
                     <Send className="w-5 h-5 md:w-6 md:h-6" /> Place Order via WhatsApp
                  </button>
               </div>
            </form>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-40 order-2">
              <div className="bg-zinc-50 rounded-[32px] md:rounded-[40px] p-5 md:p-10 space-y-8 md:space-y-10 border border-zinc-100 shadow-inner">
                 <h3 className="text-lg md:text-xl font-medium text-zinc-400 tracking-widest">Order Summary ({getTotalItems()})</h3>
                 <div className="space-y-6 md:space-y-8 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={`${item.product.id}-${item.selectedSize.size}`} className="flex items-center gap-3 md:gap-6">
                         <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-zinc-100 flex-shrink-0">
                            <img src={item.product.image} className="w-full h-full object-contain" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="font-medium text-base md:text-xl text-zinc-900 truncate leading-tight">{item.product.name}</p>
                            <p className="text-xs md:text-sm font-medium text-zinc-400 tracking-widest mt-1 md:mt-2">{item.selectedSize.size} x {item.quantity}</p>
                         </div>
                         <p className="font-medium text-base md:text-xl text-[#9EA233]">₹{item.unitPrice * item.quantity}</p>
                      </div>
                    ))}
                 </div>
                 
                 <div className="pt-6 md:pt-10 border-t border-zinc-200 space-y-4 md:space-y-6">
                    <div className="flex justify-between text-base md:text-lg font-medium tracking-widest text-zinc-400">
                       <span>Subtotal</span>
                       <span className="text-zinc-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base md:text-lg font-medium tracking-widest text-emerald-500">
                       <span>Loyalty Gift</span>
                       <span>FREE</span>
                    </div>
                     <div className="flex justify-between items-center pt-6 md:pt-8 gap-4">
                        <span className="text-sm md:text-lg font-medium tracking-widest text-zinc-400">Total</span>
                        <span className="text-[24px] md:text-[48px] font-medium tracking-tighter text-zinc-900 leading-none">₹{totalAmount.toLocaleString()}</span>
                     </div>
                 </div>
 
                 <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-zinc-100 flex items-center gap-4 md:gap-6">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#9EA233]" />
                    <div>
                       <p className="text-xs md:text-sm font-medium tracking-widest text-[#9EA233]">Guaranteed Freshness</p>
                       <p className="text-[10px] md:text-sm text-zinc-400 font-medium tracking-widest mt-1">Packed and shipped within 24h</p>
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
            invoiceNumber={Date.now().toString().slice(-8)}
            date={billDate}
         />
      </div>
    </div>
  );
}
