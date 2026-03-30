import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // If someone tries to hit a dashboard without ANY supabase cookie, 
        // send them to login immediately.
        source: '/faculty/:path*',
        has: [
          {
            type: 'header',
            key: 'cookie',
            // This checks if the supabase auth cookie is MISSING
            value: '^(?!.*sb-.*-auth-token).*$', 
          },
        ],
        permanent: false,
        destination: '/login',
      },
      {
        source: '/security/:path*',
        has: [
          {
            type: 'header',
            key: 'cookie',
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