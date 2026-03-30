import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/features/auth/SignOutButton';
import { ShieldCheck, Users, QrCode, User } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  // SECURE CHECK: This happens on the server before the page renders
  const { data: { user }, error } = await supabase.auth.getUser();

  // If Supabase says "I don't know this guy," kick them out
  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen w-full bg-albider-bg text-albider-text font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-albider-blue text-white flex flex-col shadow-lg z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <ShieldCheck className="h-8 w-8 text-albider-green" />
          <h1 className="text-2xl font-bold tracking-tight">Albider</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/faculty" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            <QrCode className="h-5 w-5" />
            <span>Manage Students</span>
          </Link>
          {/* Add other links as needed */}
        </nav>
        <div className="p-4 border-t border-white/10">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-albider-text">Dashboard</h2>
          <div className="flex items-center gap-3 pr-4 pl-1.5 py-1.5 bg-gray-50 rounded-full border border-gray-200">
             {user.user_metadata?.avatar_url && (
               <img src={user.user_metadata.avatar_url} className="h-8 w-8 rounded-full" referrerPolicy="no-referrer" />
             )}
             <span className="font-semibold text-sm">{user.user_metadata?.full_name || user.email}</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Small helper component for the link
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}</a>;
}