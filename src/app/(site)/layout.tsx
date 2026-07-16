import { OrderDialogProvider } from "@/features/order/OrderDialogProvider";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/navigation/Footer";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <OrderDialogProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Visually hidden until focused — first focusable element on the page,
          lets keyboard users jump past the nav straight to the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-ink-teal focus:px-4 focus:py-2 focus:text-paper focus:outline-none focus:ring-2 focus:ring-amber-deep"
      >
        Skip to main content
      </a>
      {/* #page-shell scales down slightly while the mobile nav sheet is open (see globals.css).
          Wrapping the fixed Navbar in here too means it recedes along with the content,
          matching the Stripe/Linear-style effect — the Drawer itself portals to <body>,
          outside this wrapper, so the sheet stays crisp while the backdrop shows the scale. */}
      <div id="page-shell" className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </OrderDialogProvider>
  );
}
