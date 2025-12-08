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
      <div ref={ref} className="p-6 w-[210mm] mx-auto bg-white text-black border">

        {/* HEADER */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <img src="/coldLogo.jpg" className="w-24 h-24" alt="logo" />
          <div>
            <h1 className="text-2xl font-bold">PRAKRUTHI COLD PRESS OIL</h1>
            <p>TATA NAGAR</p>
            <p>BENGALURU KARNATAKA 560094</p>
            <p>8073516982</p>
          </div>
          <div className="ml-auto text-xl font-bold">INVOICE</div>
        </div>

        {/* BILL DETAILS */}
        <div className="border p-4 grid grid-cols-2 gap-2">
          <div>
            <p><strong>Bill # :</strong> {invoiceNumber}</p>
            <p><strong>Bill Date :</strong> {date}</p>
            <p><strong>Bill Type :</strong> Customer Copy</p>
          </div>
          <div>
            <p><strong>Bill to:</strong></p>
            <p>{formData.name}</p>
            <p>{formData.phone}</p>
            <p>{formData.address}</p>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full border mt-4 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.product.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">₹{item.selectedSize.price}</td>
                <td className="border p-2">
                  ₹{item.selectedSize.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="mt-4 text-right">
          <p><strong>Sub Total:</strong> ₹{total}</p>
          <p><strong>Discount:</strong> ₹0</p>
          <p className="text-xl font-bold mt-2">TOTAL AMOUNT: ₹{total}</p>
        </div>

        <div className="mt-12">
          Signature _______________________
        </div>
      </div>
    );
  }
);

export default Invoice;
