import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the browser from MIME-sniffing a response away from the declared content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Blocks the site from being embedded in an iframe elsewhere (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Only send the origin (not full URL/path) as a referrer on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Explicitly disable browser features this site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Removes the "X-Powered-By: Next.js" response header.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
