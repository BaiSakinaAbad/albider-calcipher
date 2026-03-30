import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, QrCode, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-albider-bg text-albider-text font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-albider-blue text-white flex flex-col shadow-lg">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <ShieldCheck className="h-8 w-8 text-albider-green" />
          <h1 className="text-2xl font-bold tracking-tight">Albider</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* We will dynamically render these links later based on the user's role */}
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
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-white/10 transition-colors text-left">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-albider-text">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-albider-blue text-white flex items-center justify-center font-bold text-sm">
              U {/* Placeholder for User Initial */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}