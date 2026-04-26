import React, { forwardRef } from "react";
import { CartItem } from "../types";

interface InvoiceProps {
  formData: any;
  cart: CartItem[];
  total: number;
  invoiceNumber: string;
  date: string;
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(
  ({ formData, cart, total, invoiceNumber, date }, ref) => {
    return (
      <div ref={ref} className="p-12 w-[210mm] mx-auto bg-white text-gray-800 font-sans shadow-2xl">
        
        {/* PREMIUM HEADER */}
        <div className="flex justify-between items-start mb-12 border-b-4 border-[#9EA233] pb-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-[#9EA233] overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center">
              <img src="/coldLogo.jpg" className="w-full h-full object-cover" alt="logo" />
            </div>
            <div>
              <h1 className="text-3xl font-medium text-[#9EA233] tracking-tighter leading-none">Prakruthi</h1>
              <p className="text-[10px] font-medium tracking-[0.4em] text-gray-400 mt-1">Cold Pressed Oils</p>
              <div className="mt-4 text-[10px] font-medium text-gray-500 tracking-widest leading-relaxed">
                <p>Tata Nagar, Bengaluru</p>
                <p>Karnataka 560094</p>
                <p>Phone: +91 80735 16982</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-5xl font-medium text-gray-100 tracking-tighter mb-2">Invoice</h2>
            <div className="space-y-1">
              <p className="text-[10px] font-medium tracking-widest text-gray-400">Invoice Number</p>
              <p className="text-sm font-medium text-gray-900"># {invoiceNumber}</p>
              <p className="text-[10px] font-medium tracking-widest text-gray-400 mt-2">Issue Date</p>
              <p className="text-sm font-medium text-gray-900">{date}</p>
            </div>
          </div>
        </div>

        {/* CLIENT DETAILS */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <p className="text-[10px] font-medium tracking-[0.3em] text-[#9EA233] mb-4">Billed To</p>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{formData.name}</h3>
            <div className="text-xs font-medium text-gray-500 space-y-1 leading-relaxed">
              <p>{formData.phone}</p>
              <p className="max-w-[250px]">{formData.address}</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-[10px] font-medium tracking-widest text-gray-400">Payment Status</span>
                <span className="px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-600 text-[9px] font-medium tracking-[0.2em]">Cash on Delivery</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium tracking-widest text-gray-400">Shipping Mode</span>
                <span className="text-[10px] font-medium text-gray-900">Express Harvest Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="mb-12">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-medium tracking-[0.3em] text-[#9EA233] border-b-2 border-gray-100">
                <th className="py-6 px-4">Item Details</th>
                <th className="py-6 px-4 text-center">Qty</th>
                <th className="py-6 px-4 text-right">Unit Price</th>
                <th className="py-6 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cart.map((item, index) => (
                <tr key={index} className="group">
                  <td className="py-6 px-4">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-[9px] font-medium text-gray-400 tracking-widest mt-1">{item.selectedSize.size}</p>
                  </td>
                  <td className="py-6 px-4 text-center text-sm font-medium text-gray-600">{item.quantity}</td>
                  <td className="py-6 px-4 text-right text-sm font-medium text-gray-600">₹{item.unitPrice.toLocaleString()}</td>
                  <td className="py-6 px-4 text-right text-sm font-medium text-gray-900">₹{(item.unitPrice * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-4">
            <div className="flex justify-between text-xs font-medium tracking-widest text-gray-400">
              <span>Subtotal</span>
              <span className="text-gray-900">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-medium tracking-widest text-[#9EA233]">
               <span>Delivery</span>
               <span>Free</span>
            </div>
            <div className="pt-6 border-t-2 border-[#9EA233] flex justify-between items-end">
              <span className="text-xs font-medium tracking-[0.2em] text-gray-400">Grand Total</span>
              <span className="text-3xl font-medium text-gray-900">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-12 border-t border-gray-100 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] text-gray-300 mb-8">Pure Harvest. Traditional Extraction. Ancient Wisdom.</p>
          <div className="flex justify-between items-end mt-12">
            <div className="text-left">
              <p className="text-[9px] font-medium tracking-widest text-gray-400 mb-1">Generated by</p>
              <p className="text-[10px] font-medium text-[#9EA233]">Prakruthi Cold Pressed Oils</p>
            </div>
            <div className="text-right">
              <div className="w-48 border-b-2 border-gray-100 mb-2"></div>
              <p className="text-[9px] font-medium tracking-widest text-gray-400">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Invoice;
