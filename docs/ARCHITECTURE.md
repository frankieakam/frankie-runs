# Architecture

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · pnpm · Base UI · Framer Motion · React Hook Form · Zod · Lucide React · React Icons.

No Material UI, Chakra, Bootstrap, Mantine, CSS Modules, or styled-components — Tailwind utilities plus a small hand-built component layer (`components/ui`) instead.

## Rendering strategy

Every route is fully static (`○ Static` in the build output — confirm with `pnpm build`). There's no data fetching, no database, no API routes. The entire site is server-rendered at build time and shipped as static HTML/JSON, which is why performance and SEO work (Steps 6–9) had so much room to matter — there's no server-side bottleneck to work around.

Most components are Client Components (`"use client"`) because they use either Framer Motion or an interactive hook (`useOrderDialog`, `useIsDesktop`, `useScrolled`). A few stay Server Components where nothing forces otherwise — `Footer` is the clearest example (it delegates its one interactive piece, the WhatsApp icon, to a small dedicated client child, `FooterWhatsAppButton`, rather than making the whole footer a client boundary).

The root layout (`src/app/layout.tsx`) exports `metadata`, which requires it to stay a Server Component — this is why global client-side concerns (Framer Motion's reduced-motion config) live in a dedicated wrapper (`src/providers/MotionProvider.tsx`) instead of directly in the layout.

## The business config as single source of truth

`src/config/business.ts` holds everything that could plausibly change per-deployment or per-city: service area, contact details, pricing, payment terms, the site URL, social links. Nothing in the UI hardcodes "Uyo," the WhatsApp number, or the site URL directly — components read from this config. This is what makes expanding to a second city later, or updating the WhatsApp number, a one-file edit instead of a grep-and-replace across the codebase.

The one exception worth knowing: `NEXT_PUBLIC_SITE_URL` overrides `businessConfig.site.url` via an environment variable (see `DEPLOYMENT.md`), because the site URL is the one value that must differ between Preview and Production deployments on Vercel — a config constant can't do that, an env var can.

## Content vs. features vs. components

Three layers, each with a specific job:

- **`content/`** — pure data (arrays of services, FAQ items, nav links). No JSX, no logic. If you're changing *what the site says* rather than *how it behaves*, this is almost always where the edit belongs.
- **`features/`** — composed, page-specific UI built from the design system (`Hero`, `Services`, the entire order flow). These know about business logic and content; they're not meant to be reused outside their one purpose.
- **`components/ui/`** — the design system. Generic, reusable, no knowledge of "Frankie Runs" as a business — a `Button` doesn't know what a WhatsApp order is.

## The order flow

This is the most architecturally involved part of the app, because the brief's core requirement — "every WhatsApp CTA opens the same dialog" — needed a shared, app-wide piece of state.

`OrderDialogProvider` (in `features/order/`) wraps the whole site (mounted in `src/app/(site)/layout.tsx`) and exposes `useOrderDialog()`, returning a single `openOrderDialog()` function. Every CTA — Navbar, Hero, Pricing, Final CTA, the footer's WhatsApp icon — calls the same function rather than each rendering its own dialog.

The dialog's content (`OrderForm`, plus React Hook Form and Zod) is loaded via `next/dynamic` and only mounted after `openOrderDialog()` is called for the first time — see `docs/ARCHITECTURE.md`'s Performance note below and `OrderDialogProvider.tsx`'s comments for why it then *stays* mounted across subsequent opens/closes rather than unmounting every time (unmounting immediately on close would cut off the dialog's exit animation mid-transition).

The dialog itself (`ResponsiveDialog`, in `components/ui/`) picks between Base UI's `Dialog` (centered modal) and `Drawer` (bottom sheet, swipe-to-dismiss) based on `useIsDesktop()` — a real breakpoint check, not a CSS-only trick, because the two need fundamentally different Base UI primitives underneath.

## The brand system

Colors, fonts, radii, and shadows are CSS custom properties defined once in `src/app/globals.css` and wired into Tailwind v4's `@theme`. The signature route motif (dashed line, amber pickup dot, sage drop-off dot) is a real React component (`RouteMotif`), not a static image — the same component renders at every scale from the tiny nav logo mark to the large decorative hero graphic, so there's no risk of the icon and the "real" motif drifting apart visually over time. The PWA icons and OG image were generated from the same underlying drawing logic (see the Python generation scripts referenced in project history) specifically to avoid that drift.

One brand-system detail that exists for accessibility reasons, not aesthetics: `amber` and `sage` fail WCAG contrast against the paper background at any opacity. `amber-deep` and `sage-deep` are darkened variants that pass, and the `Label` component (`components/ui/Text.tsx`) picks between them automatically via a `surface` prop rather than leaving it to each call site to remember. See `docs/MAINTENANCE.md` before using raw `amber`/`sage` as text color anywhere.

## Environment-aware behavior

`src/lib/env.ts` exports `isProductionDeployment()`, which reads Vercel's auto-injected `VERCEL_ENV`. This drives one real behavior: `robots.txt` and the `robots` meta tag block indexing everywhere except a confirmed Production deployment, so preview URLs and local builds never leak into search results. See `DEPLOYMENT.md` for how this was verified.

## Performance decisions

- The order form (React Hook Form + Zod + resolvers, ~320KB) is code-split via `next/dynamic` and confirmed absent from the homepage's initial JS via the build manifest.
- Framer Motion is used via `LazyMotion` + `m` components with the `domAnimation` feature set (not the larger `domMax`), because nothing in this app uses drag or layout animations — see `src/providers/MotionProvider.tsx`. `strict` mode is enabled there, which throws at runtime if any component ever uses the full `motion.*` API by mistake instead of `m.*`.
- Fonts are self-hosted (`next/font/local`) rather than fetched from Google Fonts at runtime — better for both performance and PWA offline reliability.
