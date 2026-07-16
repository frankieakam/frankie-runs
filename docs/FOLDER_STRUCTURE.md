# Folder Structure

``
src/
├── app/                      Routes only (App Router). If it's not a page,
│   │                         layout, or route-level file, it doesn't belong here.
│   ├── layout.tsx            Root layout. Fonts, global <html>/<body>, metadata
│   │                         (robots, OG, Twitter, canonical, icons).
│   ├── globals.css           Design tokens (colors/radius/shadow) + Tailwind import.
│   ├── manifest.ts           PWA manifest (installable app metadata + icons).
│   ├── robots.ts             robots.txt, environment-aware (see lib/env.ts).
│   ├── sitemap.ts            sitemap.xml.
│   ├── (site)/                Route group for the actual marketing site.
│   │   ├── layout.tsx          Navbar + Footer + OrderDialogProvider + skip link
│   │   │                       + JSON-LD. Wraps every real page.
│   │   └── page.tsx            The landing page — just composes the sections
│   │                           from features/landing in order.
│   └── style-guide/            Internal, noindexed component preview page.
│       ├── layout.tsx           Sets robots: noindex for this route specifically.
│       └── page.tsx
│
├── components/ui/            The design system. Generic, reusable, brand-agnostic.
│   ├── Button.tsx / IconButton.tsx
│   ├── Card.tsx / Container.tsx / Section.tsx
│   ├── Heading.tsx / Text.tsx (also exports Label)
│   ├── Input.tsx / Textarea.tsx / Select.tsx
│   ├── Logo.tsx / IconMark.tsx / RouteMotif.tsx    the brand signature system
│   └── ResponsiveDialog.tsx   Desktop modal / mobile bottom sheet switcher.
│
├── features/                 Page-specific, composed UI. Knows about the
│   │                         business; not meant to be reused elsewhere.
│   ├── landing/               One file per landing page section (Hero,
│   │                           Services, HowItWorks, Pricing, WhyFrankieRuns,
│   │                           Faq, FinalCta).
│   ├── navigation/             Navbar, MobileMenu, Footer, FooterWhatsAppButton.
│   └── order/                  The order flow:
│       ├── OrderDialogProvider.tsx   app-wide context, owns the dialog instance
│       ├── OrderForm.tsx             the 3-step wizard shell
│       ├── schema.ts                 Zod schema + per-step field groups
│       ├── whatsapp.ts               message + wa.me URL builders
│       ├── StepIndicator.tsx
│       ├── SuccessScreen.tsx
│       └── steps/                    ServiceStep, CustomerStep, ReviewStep
│
├── config/
│   └── business.ts           Single source of truth: city, contact, pricing,
│                              payment terms, site URL, social links.
│
├── content/                  Pure data — no JSX, no logic. Services, FAQ,
│                              how-it-works steps, trust points, nav links.
│
├── constants/
│   ├── icons.ts               Curated Lucide re-exports (the approved UI icon set).
│   ├── social-icons.ts        Curated React Icons re-exports (brand icons only).
│   └── breakpoints.ts         Shared JS/Tailwind breakpoint constant.
│
├── hooks/
│   ├── useIsDesktop.ts        Drives ResponsiveDialog's modal-vs-drawer choice.
│   └── useScrolled.ts         Drives the Navbar's blur-on-scroll.
│
├── lib/
│   ├── motion.ts              Framer Motion variants (fadeInUp, staggerContainer, etc).
│   ├── env.ts                 isProductionDeployment() — Vercel env detection.
│   └── structured-data.ts     JSON-LD LocalBusiness builder.
│
├── providers/
│   └── MotionProvider.tsx     LazyMotion + MotionConfig (reduced-motion, bundle size).
│
├── types/
│   └── ui.ts                  Shared prop types (Size, Tone, ButtonVariant).
│
├── utils/
│   └── cn.ts                  clsx + tailwind-merge className helper.
│
└── assets/fonts/              Self-hosted variable fonts (Fraunces, Inter,
                                JetBrains Mono) for next/font/local.
``

## Top-level (repo root)

``
.github/
├── workflows/ci.yml          Lint/typecheck/build quality gate + advisory Lighthouse.
└── dependabot.yml             Weekly dependency update PRs.

docs/                         You are here. Deeper reference docs.
public/                       Static assets: icons, og-image.png, service placeholder
                                images, favicon.ico, apple-touch-icon.png.

DEPLOYMENT.md                 How to actually deploy this to Vercel.
.env.example                  Documents NEXT_PUBLIC_SITE_URL.
vercel.json                   Explicit framework/build command config.
``

## Where does X go?

A quick decision guide for the ambiguous cases:

- **A new page section for the landing page** → `features/landing/`, composed of `components/ui` primitives, content pulled from `content/`.
- **New copy or a new FAQ item** → `content/`. Never hardcode strings that already have a home there.
- **A new reusable button style or form field** → `components/ui/`. If it needs to know what a "service" or "order" is, it doesn't belong here — that's a feature.
- **A new business fact** (new city, new phone number, new price) → `config/business.ts`.
- **A new icon** → check `constants/icons.ts` (Lucide, UI chrome) or `constants/social-icons.ts` (React Icons, brand-only) first. Don't import directly from `lucide-react`/`react-icons` elsewhere — it defeats the point of having a curated, approved set.
