import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/faculty/:path*',
        has: [{ type: 'header', key: 'cookie', value: '^(?!.*sb-.*-auth-token).*$' }],
        permanent: false,
        destination: '/login',
      },
      {
        source: '/security/:path*',
        has: [{ type: 'header', key: 'cookie', value: '^(?!.*sb-.*-auth-token).*$' }],
        permanent: false,
        destination: '/login',
      },
    ];
  },
};

export default nextConfig;