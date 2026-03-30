import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure we aren't telling Vercel to use an old runtime
  typescript: {
    ignoreBuildErrors: false, 
  },
  // This is the "Proxy" approach you wanted
  async redirects() {
    return [
      {
        source: '/faculty/:path*',
        has: [
          {
            type: 'header',
            key: 'cookie',
            // If the Supabase auth cookie is NOT present, redirect to login
            value: '^(?!.*sb-.*-auth-token).*$', 
          },
        ],
        permanent: false,
        destination: '/login',
      },
    ];
  },
};

export default nextConfig;