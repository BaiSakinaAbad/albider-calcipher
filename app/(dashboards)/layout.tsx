import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, QrCode, User } from 'lucide-react'; // Added User icon for fallback
import SignOutButton from '@/components/features/auth/SignOutButton';
import { createClient } from '@/lib/supabase/server'; // Import the server client

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user session securely on the server
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex h-screen w-full bg-albider-bg text-albider-text font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-albider-blue text-white flex flex-col shadow-lg z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <ShieldCheck className="h-8 w-8 text-albider-green" />
          <h1 className="text-2xl font-bold tracking-tight">Albider</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/superadmin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            <Users className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link href="/faculty" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            <QrCode className="h-5 w-5" />
            <span>Manage Students</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-albider-text">Dashboard</h2>
          
          {/* --- UPDATED USER PROFILE HEADER --- */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pr-4 pl-1.5 py-1.5 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt={user.user_metadata?.full_name || "User Avatar"} 
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-albider-blue text-white flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              )}
              <span className="font-semibold text-sm text-albider-text hidden sm:block">
                {user?.user_metadata?.full_name || user?.email || 'Authorized User'}
              </span>
            </div>
          </div>
          {/* ---------------------------------- */}
          
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}