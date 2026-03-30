import Link from "next/link";
import { ShieldCheck, QrCode, Smartphone, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-albider-blue text-sm font-semibold mb-8">
          <Zap className="h-4 w-4 text-albider-green" />
          <span>Next-Generation Dismissal Security</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-albider-blue tracking-tight mb-8">
          Secure, verify, and streamline <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-albider-blue to-albider-green">
            student pick-ups.
          </span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Albider is a role-based management system that uses dynamic QR codes to ensure every student leaves campus safely, quickly, and with the right person.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-albider-blue text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Access Portal
          </Link>
          <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-albider-text border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-sm">
            Learn More
          </Link>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="bg-white border-t border-gray-100 py-24 px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-albider-blue">Built for the entire institution.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-albider-bg p-8 rounded-2xl border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <QrCode className="h-6 w-6 text-albider-blue" />
              </div>
              <h3 className="text-xl font-bold text-albider-text mb-3">Faculty Controls</h3>
              <p className="text-gray-500 leading-relaxed">
                Generate secure QR codes, manage classroom rosters, and instantly notify parents via SMS when class has ended.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-albider-bg p-8 rounded-2xl border border-gray-100">
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="h-6 w-6 text-albider-green" />
              </div>
              <h3 className="text-xl font-bold text-albider-text mb-3">Rapid Gate Scanning</h3>
              <p className="text-gray-500 leading-relaxed">
                A tablet-optimized interface for security personnel to scan parent QR codes and verify authorized guardians in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-albider-bg p-8 rounded-2xl border border-gray-100">
              <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-albider-text mb-3">Executive Oversight</h3>
              <p className="text-gray-500 leading-relaxed">
                Superadmins gain access to comprehensive analytics, real-time dismissal efficiency, and immutable audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}