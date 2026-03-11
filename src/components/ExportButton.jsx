import { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileDown, ChevronDown } from 'lucide-react';

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function toCSV(headers, rows) {
  const headerLine = headers.join(',');
  const dataLines = rows.map(row =>
    row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  );
  return [headerLine, ...dataLines].join('\n');
}

function toPDFText(title, headers, rows) {
  const separator = '='.repeat(80);
  const headerLine = headers.map((h, i) => h.padEnd(i === headers.length - 1 ? 0 : 20)).join('');
  const dataLines = rows.map(row =>
    row.map((v, i) => String(v).padEnd(i === row.length - 1 ? 0 : 20)).join('')
  );
  return [
    separator,
    `  ${title}`,
    `  Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    separator,
    '',
    headerLine,
    '-'.repeat(80),
    ...dataLines,
    '',
    separator,
    `  Total records: ${rows.length}`,
    separator,
  ].join('\n');
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

  function handleCSV() {
    const csv = toCSV(headers, rows);
    downloadFile(csv, `${filenameBase}.csv`, 'text/csv;charset=utf-8;');
    setOpen(false);
    showToast('CSV downloaded successfully');
  }

  function handlePDF() {
    const reportTitle = title || filenameBase.replace(/-/g, ' ');
    const text = toPDFText(reportTitle, headers, rows);
    downloadFile(text, `${filenameBase}-report.txt`, 'text/plain;charset=utf-8;');
    setOpen(false);
    showToast('Report downloaded successfully');
  }

  return (
    <>
      <div className="export-wrap" ref={ref}>
        <button className="btn btn-secondary btn-sm" onClick={() => setOpen(o => !o)}>
          <Download size={14} /> Export <ChevronDown size={12} />
        </button>
        {open && (
          <div className="export-dropdown">
            <button className="export-dropdown__item" onClick={handleCSV}>
              <FileSpreadsheet size={14} /> Export as CSV
            </button>
            <button className="export-dropdown__item" onClick={handlePDF}>
              <FileDown size={14} /> Export as Report
            </button>
          </div>
        )}
      </div>
      {toast && <div className="export-toast">{toast}</div>}
    </>
  );
}
