import React, { forwardRef } from "react";
import { CartItem } from "../types";

interface InvoiceProps {
  formData: any;
  cart: CartItem[];
  total: number;
  deliveryCharge: number;
  invoiceNumber: string;
  date: string;
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(
  ({ formData, cart, total, deliveryCharge, invoiceNumber, date }, ref) => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
      <div ref={ref} className="p-10 w-[210mm] mx-auto bg-white text-gray-900 border border-gray-100" style={{ fontFamily: 'Arial, sans-serif' }}>
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-start gap-12">
             {/* Logo Circle */}
             <div className="w-24 h-24 rounded-full border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold tracking-tighter overflow-hidden flex-shrink-0">
                <img src="/coldLogo.jpg" className="w-full h-full object-cover" alt="logo" />
             </div>
             <div className="space-y-1">
                <h1 className="text-3xl font-bold text-[#1E4620] mb-2">Prakruthi Naturals</h1>
                <div className="text-sm text-gray-600 font-medium leading-relaxed">
                   <p>No.839, 14th Cross Rd,</p>
                   <p>Near Nandini milk parlour,</p>
                   <p>A Block, Sahakar Nagar, Bengaluru,</p>
                   <p>prakruthioilsales@gmail.com | 8073516982</p>
                   <p>Prakruthicoldpressedoils.com</p>
                </div>
             </div>
          </div>
          <div className="text-right">
             <h2 className="text-4xl font-bold text-[#EEF2C1] opacity-90 uppercase tracking-[0.2em]">INVOICE</h2>
          </div>
        </div>

        {/* ADDRESSES & INFO */}
        <div className="grid grid-cols-3 gap-8 mb-12">
           {/* Bill To */}
           <div>
              <p className="text-sm font-black uppercase mb-3 border-b-2 border-gray-900 pb-1 w-fit">BILL TO</p>
              <div className="text-sm font-medium text-gray-700 space-y-1">
                 <p className="font-bold text-gray-900 text-base">{formData.name}</p>
                 <p className="max-w-[220px] leading-snug">{formData.address}</p>
                 <p className="pt-1">{formData.phone}</p>
              </div>
           </div>

           {/* Shipping Address */}
           <div>
              <p className="text-sm font-black uppercase mb-3 border-b-2 border-gray-900 pb-1 w-fit">Shipping Address</p>
              <div className="text-sm font-medium text-gray-700 space-y-1">
                 <p className="font-bold text-gray-900 text-base">{formData.name} (Shipping)</p>
                 <p className="max-w-[220px] leading-snug">{formData.address}</p>
                 <p className="pt-1">{formData.phone}</p>
              </div>
           </div>

           {/* Invoice Info */}
           <div className="text-sm font-medium text-right flex flex-col justify-end">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                 <span className="font-bold">Invoice No:</span>
                 <span className="text-gray-900">{invoiceNumber}</span>
                 <span className="font-bold">Invoice Date:</span>
                 <span className="text-gray-900">{date}</span>
                 <span className="font-bold">Due Date:</span>
                 <span className="text-gray-900">{date}</span>
                 <span className="font-bold">PO No:</span>
                 <span className="text-gray-900">PO-{invoiceNumber.slice(-3)}</span>
              </div>
           </div>
        </div>

        {/* TABLE */}
        <div className="mb-10">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-[#EEF2C1]/30 text-sm font-bold text-[#1E4620]">
                    <th className="py-3 px-4 border-y-2 border-gray-200 w-16 text-center">Sl.</th>
                    <th className="py-3 px-4 border-y-2 border-gray-200">Description</th>
                    <th className="py-3 px-4 border-y-2 border-gray-200 text-center w-24">Qty</th>
                    <th className="py-3 px-4 border-y-2 border-gray-200 text-right w-32">Rate</th>
                    <th className="py-3 px-4 border-y-2 border-gray-200 text-right w-36">Amount</th>
                 </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-700">
                 {cart.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                       <td className="py-4 px-4 text-center">{idx + 1}</td>
                       <td className="py-4 px-4">
                          <p className="font-bold text-gray-900 text-base">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.selectedSize.size}</p>
                       </td>
                       <td className="py-4 px-4 text-center text-base">{item.quantity}</td>
                       <td className="py-4 px-4 text-right text-base">₹{item.unitPrice.toLocaleString()}</td>
                       <td className="py-4 px-4 text-right font-bold text-gray-900 text-base">₹{(item.unitPrice * item.quantity).toLocaleString()}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* FOOTER & TOTALS */}
        <div className="flex justify-between items-start">
           {/* Left Note */}
           <div className="w-1/2">
              <p className="text-xs font-bold text-gray-600 mb-12 italic leading-relaxed">
                 Thank you for your order! We are committed to providing fresh, high-quality items. Stay healthy!
              </p>
              
              <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <p className="text-sm font-bold text-[#1E4620] underline mb-3 uppercase tracking-wider">Payment Instructions</p>
                 <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Please make the payment once your item is ready for dispatch. After payment is completed, we will share the live location of the item.
                 </p>
              </div>
           </div>

           {/* Right Totals */}
           <div className="w-5/12 text-sm font-medium space-y-3">
              <div className="flex justify-between text-gray-600 px-2">
                 <span>Subtotal</span>
                 <span className="text-gray-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 px-2">
                 <span>Delivery Charges</span>
                 <span className="text-gray-900 font-bold">₹{deliveryCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 border-t border-gray-100 pt-3 px-2">
                 <span>Tax Rate (0%)</span>
                 <span className="text-gray-900 font-bold">0.00</span>
              </div>
              <div className="flex justify-between text-gray-600 px-2">
                 <span>Total Tax</span>
                 <span className="text-gray-900 font-bold">0.00</span>
              </div>
              
              <div className="bg-[#EEF2C1]/50 p-5 mt-6 flex justify-between items-center border-2 border-[#1E4620]/20 rounded-xl">
                 <span className="text-base font-black uppercase text-[#1E4620]">Balance Due</span>
                 <span className="text-2xl font-black text-gray-900">₹{total.toLocaleString()}</span>
              </div>

              <div className="mt-16 text-center pt-10 border-t-2 border-gray-100">
                 <div className="h-14"></div>
                 <p className="text-sm font-black uppercase text-[#1E4620] tracking-widest">Authorized Signatory</p>
              </div>
           </div>
        </div>

        {/* BOTTOM ACCENT */}
        <div className="mt-12 border-t border-zinc-100 pt-6 text-center">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.6em]">Pure Harvest • Traditional Roots • Ancient Wisdom</p>
        </div>
      </div>
    );
  }
);

export default Invoice;
