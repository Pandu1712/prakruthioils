import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export generic array of objects to an Excel (.xlsx) file.
 * @param data Array of objects representing rows. Keys are column headers.
 * @param filename Name of the downloaded file (without extension).
 */
export const exportToExcel = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert JSON to worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Auto-size columns (basic implementation)
  const colWidths = Object.keys(data[0]).map(key => ({
    wch: Math.max(
      key.length,
      ...data.map(item => item[key] ? item[key].toString().length : 0)
    ) + 2
  }));
  ws['!cols'] = colWidths;

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Export");

  // Save the file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

/**
 * Export structured data to a beautifully formatted PDF.
 * @param headers Array of string headers for the table.
 * @param body Array of arrays (rows) corresponding to the headers.
 * @param title The title displayed at the top of the PDF.
 * @param filename Name of the downloaded file (without extension).
 */
export const exportToPDF = (headers: string[], body: any[][], title: string, filename: string) => {
  if (!body || body.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Create a new jsPDF instance (landscape orientation usually better for data tables)
  const doc = new jsPDF({ orientation: 'landscape' });

  // Add a nice title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(title, 14, 22);

  // Add a subtitle with the generation date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const dateStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  doc.text(`Generated on: ${dateStr}`, 14, 30);

  // Generate the table
  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 35,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: [60, 60, 60],
      font: 'helvetica',
    },
    headStyles: {
      fillColor: [158, 162, 51], // Olive Green branding (#9EA233)
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250] // Zinc 50
    },
    columnStyles: {
      // General alignment fallback
      0: { halign: 'left' }
    }
  });

  // Save the file
  doc.save(`${filename}.pdf`);
};
