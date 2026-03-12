import { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileDown, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generatePDF(headers, rows, title, filenameBase) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title || filenameBase.replace(/-/g, ' '), 14, 20);

  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 28);
  doc.text(`Total records: ${rows.length}`, 14, 34);

  // Table
  autoTable(doc, {
    startY: 42,
    head: [headers],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    styles: {
      lineColor: [220, 220, 220],
      lineWidth: 0.5,
    },
    margin: { left: 14, right: 14 },
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, doc.internal.pageSize.getHeight() - 10);
    doc.text('SmileRoute Referral Portal', 14, doc.internal.pageSize.getHeight() - 10);
  }

  doc.save(`${filenameBase}.pdf`);
}

function generateExcel(headers, rows, title, filenameBase) {
  const wb = XLSX.utils.book_new();
  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Auto-size columns
  const colWidths = headers.map((h, i) => {
    const maxLen = Math.max(
      h.length,
      ...rows.map(r => String(r[i] || '').length)
    );
    return { wch: Math.min(maxLen + 4, 40) };
  });
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, title ? title.substring(0, 31) : 'Data');
  XLSX.writeFile(wb, `${filenameBase}.xlsx`);
}

export default function ExportButton({ headers, rows, filenameBase, title }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleExcel() {
    generateExcel(headers, rows, title, filenameBase);
    setOpen(false);
    showToast('Excel file downloaded');
  }

  function handlePDF() {
    generatePDF(headers, rows, title, filenameBase);
    setOpen(false);
    showToast('PDF downloaded');
  }

  return (
    <>
      <div className="export-wrap" ref={ref}>
        <button className="btn btn-secondary btn-sm" onClick={() => setOpen(o => !o)}>
          <Download size={14} /> Export <ChevronDown size={12} />
        </button>
        {open && (
          <div className="export-dropdown">
            <button className="export-dropdown__item" onClick={handleExcel}>
              <FileSpreadsheet size={14} /> Export as Excel
            </button>
            <button className="export-dropdown__item" onClick={handlePDF}>
              <FileDown size={14} /> Export as PDF
            </button>
          </div>
        )}
      </div>
      {toast && <div className="export-toast">{toast}</div>}
    </>
  );
}
