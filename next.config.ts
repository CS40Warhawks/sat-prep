import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links from the first version of the site working.
  async redirects() {
    return [
      { source: "/course", destination: "/learn", permanent: true },
      { source: "/course/:skill/practice", destination: "/learn", permanent: true },
      { source: "/course/:skill", destination: "/guide/:skill", permanent: true },
    ];
  },
};

export default nextConfig;
