"use client";

import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, CheckCircle2 } from 'lucide-react';

interface QrGeneratorProps {
  studentName: string;
  guardianName: string;
  // In a real app, this value should be a secure, hashed token from Supabase
  qrValue: string; 
}

export default function QrGenerator({ studentName, guardianName, qrValue }: QrGeneratorProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    // Convert the canvas to a data URL (PNG format)
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // Create a temporary link element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `Albider_Pass_${studentName.replace(/\s+/g, '_')}.png`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show temporary success state
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-sm mx-auto">
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-albider-blue">Pick-up Pass</h3>
        <p className="text-sm text-gray-500 mt-1">
          Authorized for: <span className="font-semibold text-albider-text">{guardianName}</span>
        </p>
      </div>

      {/* QR Code Container */}
      <div className="p-4 bg-white border-2 border-dashed border-gray-200 rounded-xl mb-6">
        <QRCodeCanvas
          ref={qrRef}
          value={qrValue}
          size={200}
          bgColor={"#ffffff"}
          fgColor={"#1E3A8A"} // Using Albider Blue for the QR pattern
          level={"H"} // High error correction so it scans easily on tablets
          includeMargin={false}
        />
      </div>

      {/* Download Action */}
      <button
        onClick={handleDownload}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all
          ${downloaded 
            ? 'bg-green-50 text-albider-green border border-green-200' 
            : 'bg-albider-bg text-albider-text hover:bg-gray-100 border border-gray-200'
          }`}
      >
        {downloaded ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            <span>Saved to Device</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Download PNG Pass</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Student: {studentName}
      </p>
    </div>
  );
}