"use client";

import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ScanLine, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function QrScannerPanel() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scannedData, setScannedData] = useState<string | null>(null);

  // This handles the payload when the camera detects a QR code
  const handleScan = (detectedCodes: any[]) => {
    if (detectedCodes.length > 0 && status === 'scanning') {
      const payload = detectedCodes[0].rawValue;
      setStatus('idle'); // Stop scanning immediately to prevent duplicate scans
      setScannedData(payload);
      verifyPayload(payload);
    }
  };

  // Mock verification logic (later, this will query Supabase)
  const verifyPayload = (payload: string) => {
    // Simulate network delay
    setTimeout(() => {
      // For testing, we assume any payload starting with 'sec_token_' is valid
      if (payload.startsWith('sec_token_')) {
        setStatus('success');
      } else {
        setStatus('error');
      }

      // Automatically reset the scanner after 3 seconds to keep the line moving
      setTimeout(() => {
        setStatus('scanning');
        setScannedData(null);
      }, 3000);
    }, 800); 
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. IDLE STATE: Big button to start the camera */}
      {status === 'idle' && !scannedData && (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 w-full min-h-[400px]">
          <ScanLine className="h-16 w-16 text-gray-400 mb-6" />
          <button 
            onClick={() => setStatus('scanning')}
            className="bg-albider-blue text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-lg hover:bg-blue-800 transition-colors active:scale-95 flex items-center gap-3"
          >
            <ScanLine className="h-6 w-6" />
            Start Scanner
          </button>
          <p className="text-gray-500 mt-4 text-center max-w-sm">
            Tap to activate the camera and begin verifying pick-up passes.
          </p>
        </div>
      )}

      {/* 2. SCANNING STATE: Live camera feed */}
      {status === 'scanning' && (
        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border-4 border-albider-blue relative bg-black">
          <Scanner 
            onScan={handleScan}
            formats={['qr_code']}
            styles={{
              container: { width: '100%', aspectRatio: '1/1' },
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button 
              onClick={() => setStatus('idle')}
              className="bg-white/90 backdrop-blur text-albider-text px-6 py-2 rounded-full font-bold shadow-md hover:bg-white"
            >
              Cancel Scan
            </button>
          </div>
        </div>
      )}

      {/* 3. SUCCESS STATE: Verified Green */}
      {status === 'success' && (
        <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-2xl border-2 border-green-200 w-full min-h-[400px] animate-in zoom-in duration-300">
          <div className="h-24 w-24 bg-albider-green rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-800 mb-2">Verified</h2>
          <p className="text-green-700 font-medium text-lg">Pick-up Authorized</p>
          <div className="mt-8 flex items-center gap-2 text-green-600 animate-pulse">
            <RefreshCw className="h-5 w-5" />
            <span>Readying next scan...</span>
          </div>
        </div>
      )}

      {/* 4. ERROR STATE: Invalid Red */}
      {status === 'error' && (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border-2 border-red-200 w-full min-h-[400px] animate-in zoom-in duration-300">
          <div className="h-24 w-24 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-200">
            <XCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-red-800 mb-2">Invalid Pass</h2>
          <p className="text-red-700 font-medium text-lg">Do not authorize dismissal.</p>
          <button 
            onClick={() => setStatus('scanning')}
            className="mt-8 bg-red-100 text-red-700 px-8 py-3 rounded-xl font-bold hover:bg-red-200 transition-colors"
          >
            Scan Again Now
          </button>
        </div>
      )}

    </div>
  );
}