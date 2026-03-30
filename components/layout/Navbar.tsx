"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, User, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/client';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient();

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const hiddenRoutes = ['/superadmin', '/faculty', '/security'];
  const isHidden = hiddenRoutes.some(route => pathname?.startsWith(route));

  if (isHidden) return null;

  const logoDestination = user ? '/faculty' : '/';

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href={logoDestination} className="flex items-center gap-2 group">
            <div className="p-2 bg-albider-blue rounded-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6 text-albider-green" />
            </div>
            <span className="font-extrabold text-2xl text-albider-blue tracking-tight">Albider</span>
          </Link>

          <div className="flex items-center gap-6">
            {isLoading ? (
              <div className="flex items-center justify-end w-24">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                
                {/* --- UPDATED USER PROFILE BADGE --- */}
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 pr-4 pl-1.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt={user.user_metadata?.full_name || "User Avatar"} 
                      className="h-7 w-7 rounded-full object-cover border border-gray-200"
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-albider-blue text-white flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span className="font-semibold text-albider-text">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                {/* ---------------------------------- */}

                <Link href="/faculty" className="text-sm font-bold bg-albider-blue text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95">
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-albider-text hover:text-albider-blue transition-colors">
                  Sign In
                </Link>
                <Link href="/login" className="text-sm font-bold bg-albider-blue text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}