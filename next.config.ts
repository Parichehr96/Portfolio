import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  /* The four mobile-aware routes are rendered with a per-request
     User-Agent check, so they must vary by UA at the cache layer.
     A short private cache lets the browser/CDN reuse responses
     within a session while still re-fetching when the UA changes. */
  async headers() {
    const sharedHeaders = [
      { key: "Vary", value: "User-Agent" },
      {
        key: "Cache-Control",
        value: "private, max-age=0, must-revalidate",
      },
    ];
    return [
      { source: "/", headers: sharedHeaders },
      { source: "/about", headers: sharedHeaders },
      { source: "/work", headers: sharedHeaders },
      { source: "/contact", headers: sharedHeaders },
    ];
  },
};

export default nextConfig;
