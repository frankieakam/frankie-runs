# Frankie Runs

Founder-led errand and delivery service in Uyo, Akwa Ibom State, Nigeria. One person, one phone, no fleet, no middlemen — customers message on WhatsApp, Frankie picks it up himself, and brings it straight to the door.

This repo is the production PWA: a premium Next.js landing page plus a WhatsApp-first order flow, built to be maintained for years, not a one-off template.

**Tagline:** You name it. I go get it.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · pnpm · Base UI · Framer Motion · React Hook Form · Zod · Lucide React · React Icons

## Quick start

Requires Node >=20 and pnpm (pinned via `packageManager` in `package.json` — run `corepack enable` if you don't have pnpm yet).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The design system components are also viewable in isolation at `/style-guide` (noindexed, not part of the real site).

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build (also runs typecheck) |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` on its own, without a full build |

Run `pnpm lint && pnpm typecheck && pnpm build` before pushing — it's exactly what CI runs, so a clean local pass means CI will pass too.

## Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — rendering strategy, the business-config-as-source-of-truth pattern, the order flow, the brand system, performance decisions.
- **[docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md)** — annotated tree, "where does X go" guide.
- **[docs/COMPONENTS.md](docs/COMPONENTS.md)** — the design system, prop tables and usage.
- **[docs/HOOKS.md](docs/HOOKS.md)** / **[docs/UTILITIES.md](docs/UTILITIES.md)** — everything in `hooks/`, `lib/`, `utils/`.
- **[docs/MAINTENANCE.md](docs/MAINTENANCE.md)** — task-oriented how-tos (add a service, change pricing, swap in real photos) and a list of real pitfalls already caught once during development.
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Vercel setup, environment variables, CI/CD, how preview deployments are kept out of search engines.

## Brand system, quick reference

| | |
| --- | --- |
| Ink Teal (primary) | `#0F2A2E` |
| Amber (accent) | `#FF7A33` |
| Sage Green (secondary) | `#8FBF9F` |
| Warm Paper (background) | `#FBF7F0` |

Fraunces (headlines) · Inter (body) · JetBrains Mono (data/labels), all self-hosted. The signature visual motif — a dashed route line connecting an amber pickup dot to a sage drop-off dot — is a real component (`RouteMotif`), not a static image; see `docs/ARCHITECTURE.md`.

**Before touching `amber` or `sage` as a text color:** read the accessibility note in `docs/MAINTENANCE.md` first. It's a real, previously-caught bug, not a hypothetical one.

## Status

All 11 build phases complete: project setup, design system, component library, landing page, order flow, deployment config, production optimization, SEO, accessibility, performance, CI/CD, and this documentation. See `docs/ARCHITECTURE.md` for what's been verified versus what still needs a manual pass in a real browser (noted honestly where the build environment couldn't verify something directly, e.g. actual keyboard tab-through and the first live Vercel deploy).
