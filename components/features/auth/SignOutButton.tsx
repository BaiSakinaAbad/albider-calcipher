"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { LogOut, Loader2 } from 'lucide-react';

export default function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    // Tell Supabase to destroy the session cookie
    await supabase.auth.signOut();
    
    // Send the user back to the login page
    router.push('/login');
    
    // Force Next.js to re-evaluate the middleware and server components
    router.refresh(); 
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-red-500/20 text-red-100 hover:text-white transition-colors text-left disabled:opacity-50"
    >
      {isSigningOut ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
      <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
    </button>
  );
}   