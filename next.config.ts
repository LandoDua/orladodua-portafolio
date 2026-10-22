import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Nudges coding agents toward security upgrades (16.4.0 → 16.4.2 advisory).
  experimental: {
    agentUpgrade: "security",
  },
  // Permite abrir el dev server desde cualquier origen local: sin esto Next
  // bloquea el HMR (websocket) cross-origin y la hidratación no llega a
  // completarse (la landing se quedaría sin animaciones). La IP de red la
  // asigna el DHCP: si cambia, añade la IP actual aquí.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "[::1]",
    "192.168.1.112",
    "192.168.1.121",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
