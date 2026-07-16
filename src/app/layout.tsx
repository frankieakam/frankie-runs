import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { businessConfig } from "@/config/business";
import { isProductionDeployment } from "@/lib/env";
import { MotionProvider } from "@/providers/MotionProvider";
import "./globals.css";

/**
 * Self-hosted brand fonts (variable-weight), rather than next/font/google.
 * Self-hosting removes a third-party network request at runtime, which is
 * better for both performance and PWA offline reliability.
 */
const fraunces = localFont({
  src: "../assets/fonts/Fraunces-Variable.ttf",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
});

const inter = localFont({
  src: "../assets/fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const jetbrainsMono = localFont({
  src: "../assets/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "100 800",
});

const { name, tagline } = businessConfig;
const description =
  "Founder-led errand and delivery service in Uyo. Message on WhatsApp, Frankie picks it up himself, and brings it straight to your door.";

export const metadata: Metadata = {
  metadataBase: new URL(businessConfig.site.url),
  title: {
    default: `${name} \u2014 ${tagline}`,
    template: `%s \u2014 ${name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  // Never let a preview deployment or local build get indexed — see src/lib/env.ts.
  robots: isProductionDeployment()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: businessConfig.site.url,
    siteName: name,
    title: `${name} \u2014 ${tagline}`,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${name} \u2014 ${tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} \u2014 ${tagline}`,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2A2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
