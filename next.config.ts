import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // If someone tries to access ANY dashboard route...
        source: '/:path(faculty|security|superadmin)/:slug*',
        has: [
          {
            type: 'header',
            key: 'cookie',
            // ...but doesn't have the Supabase auth cookie, send them to login
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