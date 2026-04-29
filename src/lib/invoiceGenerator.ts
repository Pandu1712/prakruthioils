import jsPDF from 'jspdf';
import { Order } from '../types';

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
};

export const generateInvoice = async (order: Order) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Premium Colors
  const darkGreen = [30, 70, 32];    // #1E4620
  const goldAccent = [212, 175, 55]; // #D4AF37
  const textDark = [40, 40, 40];
  const textGray = [100, 100, 100];
  
  // LOGO
  try {
    const logo = await loadImage('/coldLogo.jpg');
    // Draw logo at top left
    doc.addImage(logo, 'JPEG', 20, 20, 25, 25);
  } catch (e) {
    console.error("Logo load failed, falling back to text", e);
  }

  // COMPANY INFO (Next to Logo)
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Prakruthi', 55, 30);
  
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('COLD PRESSED OILS', 55, 36);

  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('No.839, 14th Cross Rd, near Nandini milk parlour,', 55, 42);
  doc.text('A Block, Sahakar Nagar, Bengaluru, Karnataka', 55, 46);
  doc.text('Phone: +91 80735 16982', 55, 50);

  // INVOICE TITLE & META (Top Right)
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - 20, 32, { align: 'right' });

  doc.setFontSize(9);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Invoice Number:', pageWidth - 60, 42);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`#${order.id.slice(0, 8).toUpperCase()}`, pageWidth - 20, 42, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('Issue Date:', pageWidth - 60, 47);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  const formattedDate = order.createdAt?.toDate 
    ? order.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) 
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(formattedDate, pageWidth - 20, 47, { align: 'right' });

  // DECORATIVE LINE
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 58, pageWidth - 20, 58);

  // BILLING INFO
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(20, 65, 85, 35, 3, 3, 'F');
  
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Billed To', 25, 73);
  
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(order.customerName, 25, 80);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text(order.phone, 25, 86);
  const addressLines = doc.splitTextToSize(order.address, 75);
  doc.text(addressLines, 25, 92);

  // ORDER META (Payment & Status)
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Status:', 120, 75);
  doc.text('Shipping Mode:', 120, 85);
  
  // Custom styled badges for status
  doc.setFillColor(255, 250, 230); // light yellow
  doc.roundedRect(155, 71, 35, 6, 1, 1, 'F');
  doc.setTextColor(200, 150, 0);
  doc.text('Cash on Delivery', 172.5, 75.5, { align: 'center' });
  
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Express Home Delivery', 155, 85);

  // TABLE HEADER
  const tableTop = 115;
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.5);
  doc.line(20, tableTop, pageWidth - 20, tableTop);
  doc.line(20, tableTop + 8, pageWidth - 20, tableTop + 8);
  
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Item Details', 25, tableTop + 5);
  doc.text('Qty', 115, tableTop + 5, { align: 'center' });
  doc.text('Unit Price', 150, tableTop + 5, { align: 'right' });
  doc.text('Amount', 190, tableTop + 5, { align: 'right' });
  
  // TABLE CONTENT
  let currentY = tableTop + 16;
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  order.items.forEach((item) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(item.product.name, 25, currentY);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(item.selectedSize.size, 25, currentY + 4);
    
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(9);
    doc.text(item.quantity.toString(), 115, currentY, { align: 'center' });
    doc.text(`INR ${item.unitPrice}`, 150, currentY, { align: 'right' });
    doc.text(`INR ${item.unitPrice * item.quantity}`, 190, currentY, { align: 'right' });
    
    currentY += 12;
  });
  
  // TOTALS SECTION
  const totalTop = currentY + 10;
  
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal', 140, totalTop);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`INR ${order.totalAmount}`, 190, totalTop, { align: 'right' });
  
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.text('Delivery', 140, totalTop + 8);
  doc.text('Free', 190, totalTop + 8, { align: 'right' });
  
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.line(140, totalTop + 12, 190, totalTop + 12);
  
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('Grand Total', 140, totalTop + 20);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.setFontSize(14);
  doc.text(`INR ${order.totalAmount}`, 190, totalTop + 20, { align: 'right' });
  
  // FOOTER
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(240, 240, 240);
  doc.setLineWidth(0.5);
  doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);
  
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text('Pure Harvest. Traditional Extraction. Ancient Wisdom.', pageWidth / 2, footerY - 3, { align: 'center', charSpace: 1.5 });
  
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by Prakruthi System', 20, footerY + 5);
  
  // Save PDF
  doc.save(`Invoice_${order.id.slice(0, 8)}.pdf`);
};
