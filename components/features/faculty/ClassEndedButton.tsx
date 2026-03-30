"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ClassEndedButton() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClassEnded = async () => {
    setIsSending(true);
    // TODO: Wire up Supabase edge function or SMS API (like Twilio) here
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 1500); // Mocking network request
  };

  return (
    <button
      onClick={handleClassEnded}
      disabled={isSending || sent}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all shadow-md
        ${sent 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-albider-green hover:bg-emerald-600 hover:shadow-lg active:scale-95'
        }`}
    >
      <Send className={`h-5 w-5 ${isSending ? 'animate-pulse' : ''}`} />
      {isSending ? 'Notifying Parents...' : sent ? 'Parents Notified' : 'Class Ended - Notify Parents'}
    </button>
  );
}