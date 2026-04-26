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
  const brandColor = [158, 162, 51]; // #9EA233
  
  // PREMIUM HEADER BACKGROUND
  doc.setFillColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // LOGO FRAME
  doc.setFillColor(255, 255, 255);
  doc.circle(35, 25, 18, 'F');
  
  // LOAD AND ADD LOGO
  try {
    const logo = await loadImage('/coldLogo.jpg');
    // Center the image in the circle (circle is at 35, 25 with r=18)
    // Image box: x=21, y=11, size=28 (approx)
    doc.addImage(logo, 'JPEG', 21, 11, 28, 28);
  } catch (e) {
    console.error("Logo load failed, falling back to text", e);
  }

  // BRANDING TEXT
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('PRAKRUTHI', 60, 25);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('COLD PRESSED OILS', 60, 32);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - 20, 30, { align: 'right' });
  
  // SUB-HEADER INFO
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL FROM:', 20, 65);
  doc.setFont('helvetica', 'normal');
  doc.text('Prakruthi cold pressed oils', 20, 72);
  doc.text('Tata Nagar, Bengaluru', 20, 77);
  doc.text('Karnataka 560094', 20, 82);
  doc.text('Phone: +91 80735 16982', 20, 87);
  
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 120, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(order.customerName, 120, 72);
  doc.text(order.phone, 120, 77);
  const addressLines = doc.splitTextToSize(order.address, 70);
  doc.text(addressLines, 120, 82);
  
  // INVOICE METADATA
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 105, pageWidth - 40, 15, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`INVOICE NO: #${order.id.slice(0, 8).toUpperCase()}`, 25, 115);
  doc.text(`DATE: ${order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}`, 80, 115);
  doc.text(`STATUS: ${order.status.toUpperCase()}`, 140, 115);
  
  // TABLE HEADER
  const tableTop = 135;
  doc.setFillColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.rect(20, tableTop, pageWidth - 40, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('DESCRIPTION', 25, tableTop + 7);
  doc.text('SIZE', 100, tableTop + 7);
  doc.text('QTY', 130, tableTop + 7);
  doc.text('RATE', 150, tableTop + 7);
  doc.text('AMOUNT', 180, tableTop + 7);
  
  // TABLE CONTENT
  let currentY = tableTop + 20;
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  
  order.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(252, 252, 252);
      doc.rect(20, currentY - 7, pageWidth - 40, 10, 'F');
    }
    
    doc.text(item.product.name, 25, currentY);
    doc.text(item.selectedSize.size, 100, currentY);
    doc.text(item.quantity.toString(), 130, currentY);
    doc.text(`INR ${item.unitPrice}`, 150, currentY);
    doc.text(`INR ${item.unitPrice * item.quantity}`, 180, currentY);
    currentY += 10;
  });
  
  // TOTALS
  const totalY = currentY + 15;
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.setLineWidth(1);
  doc.line(130, totalY, 190, totalY);
  
  doc.setFont('helvetica', 'bold');
  doc.text('SUBTOTAL:', 130, totalY + 10);
  doc.text(`INR ${order.totalAmount}`, 190, totalY + 10, { align: 'right' });
  
  doc.text('SHIPPING:', 130, totalY + 17);
  doc.text('FREE', 190, totalY + 17, { align: 'right' });
  
  doc.setFillColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.rect(130, totalY + 22, 60, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('TOTAL:', 135, totalY + 30);
  doc.text(`INR ${order.totalAmount}`, 185, totalY + 30, { align: 'right' });
  
  // FOOTER
  const footerTop = 260;
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer generated invoice. No signature required.', pageWidth / 2, footerTop, { align: 'center' });
  doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for choosing Prakruthi cold pressed oils!', pageWidth / 2, footerTop + 10, { align: 'center' });
  
  // Save PDF
  doc.save(`Invoice_${order.id.slice(0, 8)}.pdf`);
};
