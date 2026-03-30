import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Albider | Student Pick-up Management",
  description: "Secure, QR-based student dismissal and verification system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-albider-bg text-albider-text antialiased flex flex-col min-h-screen`}>
        {/* The Navbar automatically manages its own visibility */}
        <Navbar />
        
        {/* Main content expands to fill remaining space */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}