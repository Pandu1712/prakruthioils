import { useState } from "react";
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

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, getTotalItems, clearCart } = useCart();
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
  const totalSavings = cart.reduce((sum, item) => sum + ((item.originalPrice ?? item.unitPrice) - item.unitPrice) * item.quantity, 0);
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
    const invoiceElement = document.getElementById("prakruthi-invoice");
    if (!invoiceElement) return;
    const canvas = await html2canvas(invoiceElement, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, (canvas.height * pdfWidth) / canvas.width);
    pdf.save(`Prakruthi_Receipt_${Date.now()}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateInvoicePDF();
    
    let msg = `*New Harvest Order - Prakruthi Cold Oils*\n\n`;
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
    <div className="min-h-screen bg-[#FFFEF9] pt-40 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Cinematic Header */}
        <div className="mb-20">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-bold text-[14px] uppercase tracking-[0.3em] mb-10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Selection
          </button>
          
          <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-[1.1]">
            Confirm Your <br />
            <span className="text-[#9EA233]">Harvest Order.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-20 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
               <div className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-900 mb-12">1. Delivery Details</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Legal Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and last name" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input required type="tel" pattern="[0-9]{10}" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-6 w-4 h-4 text-gray-300" />
                      <textarea required name="address" value={formData.address} onChange={handleChange} rows={4} placeholder="Full address including landmarks" className="w-full pl-14 pr-6 py-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#9EA233]/20 font-bold resize-none" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <button type="button" onClick={handleGetLocation} className="flex items-center gap-3 text-xs font-bold text-[#9EA233] uppercase tracking-widest hover:translate-x-2 transition-transform">
                       <MapPin className="w-4 h-4" /> {formData.location ? "Location Captured" : "Auto-detect current location"}
                    </button>
                  </div>
               </div>

               <div className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-900 mb-12">2. Payment Method</h2>
                  <div className="p-8 rounded-3xl bg-gray-900 text-white flex items-center justify-between group cursor-pointer border border-transparent hover:border-[#9EA233]/50 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                           <CreditCard className="w-6 h-6 text-[#9EA233]" />
                        </div>
                        <div>
                           <p className="font-bold">Cash on Delivery</p>
                           <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Pay upon safe harvest delivery</p>
                        </div>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-[#9EA233] flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#9EA233] rounded-full"></div>
                     </div>
                  </div>
               </div>

               <button type="submit" className="w-full bg-[#9EA233] text-white h-20 rounded-[30px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#9EA233]/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
                  <Send className="w-5 h-5" /> Finalize Order via WhatsApp
               </button>
            </form>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-1 sticky top-32">
             <div className="bg-gray-50 rounded-[60px] p-10 space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-900">Your Selection ({getTotalItems()})</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {cart.map(item => (
                     <div key={item.product.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl p-2 border border-gray-100 flex-shrink-0">
                           <img src={item.product.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="font-bold text-sm text-gray-900 truncate">{item.product.name}</p>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.selectedSize.size} x {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm text-[#9EA233]">₹{item.unitPrice * item.quantity}</p>
                     </div>
                   ))}
                </div>
                
                <div className="pt-8 border-t border-gray-200 space-y-4">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-gray-900">₹{subtotal}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#9EA233]">
                      <span>Loyalty Gift</span>
                      <span>Free Shipping</span>
                   </div>
                   <div className="flex justify-between items-end pt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Total</span>
                      <span className="text-4xl font-bold tracking-tighter text-gray-900">₹{totalAmount}</span>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                   <ShieldCheck className="w-6 h-6 text-[#9EA233]" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#9EA233]">Guaranteed Freshness</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Packed and shipped within 24h</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Hidden Invoice */}
      <div id="prakruthi-invoice" className="absolute -left-[9999px] top-0 bg-white p-12 w-[800px] text-gray-900">
         <div className="flex justify-between border-b-4 border-[#9EA233] pb-10 mb-10">
            <div className="flex items-center gap-6">
               <img src="/coldLogo.jpg" className="w-24 h-24 rounded-full border-2 border-[#9EA233]" />
               <div>
                  <h1 className="text-3xl font-black text-[#9EA233]">PRAKRUTHI COLD OILS</h1>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pure Organic Heritage</p>
               </div>
            </div>
            <div className="text-right">
               <h2 className="text-4xl font-black mb-2">RECEIPT</h2>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{billDate}</p>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-10 mb-10 bg-gray-50 p-8 rounded-3xl">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Bill To</p>
               <p className="font-bold text-xl">{formData.name}</p>
               <p className="text-sm text-gray-500">{formData.phone}</p>
               <p className="text-sm text-gray-500">{formData.address}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Payable</p>
               <p className="font-bold text-4xl text-[#9EA233]">₹{totalAmount}</p>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Cash on Delivery</p>
            </div>
         </div>
         <table className="w-full mb-10">
            <thead className="border-b-2 border-gray-100">
               <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                 <th className="text-left py-4">Product</th>
                 <th className="text-center py-4">Size</th>
                 <th className="text-center py-4">Qty</th>
                 <th className="text-right py-4">Total</th>
               </tr>
            </thead>
            <tbody>
               {cart.map(item => (
                 <tr key={item.product.id} className="border-b border-gray-50 font-bold">
                    <td className="py-6">{item.product.name}</td>
                    <td className="text-center py-6">{item.selectedSize.size}</td>
                    <td className="text-center py-6">{item.quantity}</td>
                    <td className="text-right py-6">₹{item.unitPrice * item.quantity}</td>
                 </tr>
               ))}
            </tbody>
         </table>
         <div className="text-center pt-10 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Thank you for supporting pure, traditional roots.</p>
         </div>
      </div>
    </div>
  );
}
