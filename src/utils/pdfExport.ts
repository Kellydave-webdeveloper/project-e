import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportReceiptToPDF(elementId: string, filename: string = 'transaction-receipt.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Center vertically if shorter than A4, or scale
    const margin = 15;
    const availableWidth = pdfWidth - (margin * 2);
    const scaledHeight = (canvas.height * availableWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, scaledHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function exportReceiptToImage(elementId: string, filename: string = 'transaction-receipt.png') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
