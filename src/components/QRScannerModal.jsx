import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

export default function QRScannerModal({ isOpen, onClose, onScan }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          scanner.clear();
          onScan(decodedText);
          onClose();
        },
        (errorMessage) => {
          // Ignore frequent error callbacks for empty scans
          // setError(errorMessage);
        }
      );

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }
  }, [isOpen, onScan, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-800">Escanear QR de Lote</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div id="reader" className="w-full"></div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <p className="text-sm text-gray-500 text-center mt-4">
            Apunta la cámara al código QR del lote para ver su historial.
          </p>
        </div>
      </div>
    </div>
  );
}
