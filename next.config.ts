import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve files from library/ for video/PDF playback
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  // Bind to all interfaces for LAN access
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
