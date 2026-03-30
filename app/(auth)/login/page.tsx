import React from 'react';
import { ShieldCheck } from 'lucide-react';
import GoogleSignInButton from '@/components/features/auth/GoogleSignInButton';

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-albider-bg p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-albider-blue p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full">
              <ShieldCheck className="h-10 w-10 text-albider-green" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Albider Platform</h1>
          <p className="text-blue-100 mt-2 text-sm">Student Pick-up Management System</p>
        </div>

        {/* Action Section */}
        <div className="p-8">
          <p className="text-center text-sm text-gray-500 mb-6">
            Secure access restricted to authorized institutional personnel.
          </p>
          
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}