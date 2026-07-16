import type { MetadataRoute } from "next";
import { businessConfig } from "@/config/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${businessConfig.name} \u2014 ${businessConfig.tagline}`,
    short_name: businessConfig.name,
    description: `Founder-led errand and delivery service in ${businessConfig.serviceArea.city}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#FBF7F0",
    theme_color: "#0F2A2E",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-72.png", sizes: "72x72", type: "image/png", purpose: "any" },
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/icons/icon-128.png", sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/icons/icon-144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/icons/icon-152.png", sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
