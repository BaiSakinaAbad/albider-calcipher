import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // Changed min-h-screen to flex-1 flex flex-col
    <div className="flex-1 flex flex-col bg-albider-bg">
      {children}
    </div>
  );
}