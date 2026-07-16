# Deploying Frankie Runs to Vercel

## First-time setup

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the GitHub repo.
3. Vercel auto-detects Next.js and pnpm from `vercel.json` / `pnpm-lock.yaml` — you shouldn't need to change any build settings.
4. Before the first deploy, set environment variables (see below).
5. Deploy.

## Environment variables

Set these under **Project Settings → Environment Variables**. Copy `.env` for the full list with explanations.

| Variable | Production | Preview | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://frankieruns.vercel.app` (or your real domain once you have one) | leave unset | Used for canonical URLs, Open Graph tags, and `metadataBase`. Must reflect the domain that deployment actually serves. |

`VERCEL_ENV` is injected automatically by Vercel — you don't set it yourself. It's what the site uses to tell preview deployments apart from production (see **Preview deployments and search engines** below).

## Preview deployments and search engines

Every pull request gets its own preview URL on Vercel. Without a safeguard, Google can index those preview URLs too — which means your in-progress work (or an old version) shows up in search results next to your real site.

This project already handles it: `src/lib/env.ts` checks `VERCEL_ENV`, and the root layout sets `robots: noindex` on anything that isn't a confirmed **Production** deployment. Local dev and preview deployments are noindexed by default; only Production allows indexing. There's nothing you need to configure for this — it's automatic.

## Custom domain

Once you have a real domain (instead of `frankieruns.vercel.app`):

1. Add it under **Project Settings → Domains**.
2. Update `NEXT_PUBLIC_SITE_URL` for the Production environment to the new domain.
3. Redeploy (or it'll pick up on the next deploy).

## Verifying a deployment before sharing it

- Check the deployment's build log for any errors — Vercel will show these directly in the dashboard.
- Visit the preview URL and confirm the page loads, the mobile menu opens, and the order dialog opens from at least one button.
- View page source and confirm `<meta name="robots">` says `noindex` on preview URLs, and does **not** say `noindex` once promoted to Production.

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request against `master`. It does **not** deploy anything — Vercel's own GitHub integration already builds and deploys previews/production on push, independently. This workflow's only job is to catch broken lint, types, or a broken production build *before* a bad commit gets merged.

To make it actually block bad merges (not just report after the fact):

1. Go to **GitHub repo → Settings → Branches → Branch protection rules**.
2. Add a rule for `master`.
3. Enable **Require status checks to pass before merging**, and select the `Lint, typecheck, build` check.

There's a second job in the same workflow, `Lighthouse`, which runs Lighthouse against the production build and reports accessibility/SEO/best-practices scores. It's deliberately advisory (`continue-on-error: true`) — a dip in performance score can come from CI runner load rather than an actual regression, so it's there to prompt a look, not to block a merge.

Dependabot (`.github/dependabot.yml`) opens a PR weekly for dependency updates, grouping minor/patch bumps together and leaving majors (e.g. a future Next.js major version) as individual PRs to review on their own.

## Local production build (sanity check before pushing)

```bash
pnpm build
pnpm start
```

This runs the exact same build Vercel runs. If it succeeds locally with no errors, Vercel's build will succeed too — the environment is otherwise identical.
