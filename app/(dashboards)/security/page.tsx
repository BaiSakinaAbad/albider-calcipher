import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import QrScannerPanel from '@/components/features/security/QrScannerPanel';

export default function SecurityDashboard() {
  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      
      {/* Left Column: Active Scanner Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-albider-blue">Gate Verification</h1>
          <p className="text-gray-500">Scan parent/guardian QR code to verify pick-up.</p>
        </div>

        {/* The Client Component we just created */}
        <div className="flex-1 flex items-center justify-center">
          <QrScannerPanel />
        </div>
      </div>

      {/* Right Column: Real-time Scan History */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px] lg:h-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-albider-text">Recent Verifications</h2>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {/* Mock Verification Items */}
          <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-albider-green shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-albider-text">Mario Rossi</p>
              <p className="text-sm text-gray-600">Grade 3 - Apollo</p>
              <div className="mt-2 text-xs bg-white px-2 py-1 rounded inline-block border border-green-200 text-green-800 font-medium">
                Verified: Luigi Rossi (Uncle)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start opacity-75">
            <CheckCircle2 className="h-6 w-6 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-gray-700">Peach Toadstool</p>
              <p className="text-sm text-gray-500">Grade 3 - Apollo</p>
              <p className="text-xs text-gray-400 mt-1">Verified 5 mins ago</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}