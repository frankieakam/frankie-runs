# Utilities Reference

## `cn()` — `utils/cn.ts`

```tsx
className={cn("base classes", isActive && "active-classes", className)}
```

`clsx` (conditional class joining) + `tailwind-merge` (resolves conflicting Tailwind utilities, last one wins). Use this for every component that accepts a `className` prop and merges it with internal defaults — plain string concatenation will silently produce broken output when two conflicting utilities (e.g. two different `px-*` values) both end up in the class list.

### `lib/motion.ts` — Framer Motion variants

Shared animation tokens, imported wherever a section reveals on scroll:

```tsx
import { fadeInUp, staggerContainer, scrollRevealViewport } from "@/lib/motion";

<m.div initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={staggerContainer}>
  <m.div variants={fadeInUp}>...</m.div>
</m.div>
```

- `fadeInUp` / `fadeIn` / `scaleIn` — individual element variants.
- `staggerContainer` — parent wrapper that staggers `fadeInUp` children by 90ms.
- `scrollRevealViewport` — `{ once: true, margin: "-80px" }`, the standard viewport config so reveals fire once, slightly before fully visible, rather than replaying on every scroll up/down.

Import `m` from `"framer-motion"`, not `motion` — see `docs/ARCHITECTURE.md`'s Performance section for why, and note that `providers/MotionProvider.tsx` runs in `strict` mode, which will throw immediately if a bare `motion.*` is used anywhere.

### `lib/env.ts` — `isProductionDeployment()`

```tsx
if (isProductionDeployment()) { /* ... */ }
```

Reads Vercel's auto-injected `VERCEL_ENV`. `true` only for a confirmed Production deployment — Preview and local dev both return `false`. Drives `robots.txt`/`robots` meta (see `DEPLOYMENT.md`).

### `lib/structured-data.ts` — `buildLocalBusinessJsonLd()`

Builds the schema.org `LocalBusiness` JSON-LD object from `businessConfig` — no hardcoded duplicate of the business's city/phone/name that could drift out of sync with the actual config. Rendered as a `<script type="application/ld+json">` in `src/app/(site)/layout.tsx`.

### `features/order/whatsapp.ts` — message + URL builders

```tsx
const message = buildWhatsAppMessage(formValues);
const url = buildWhatsAppUrl(message);
window.open(url, "_blank", "noopener,noreferrer");
```

`buildWhatsAppMessage` turns the validated form values into the exact plain-text message Frankie receives — this is the one place that message format is defined; changing the wording or field order happens here, not in the form components. `buildWhatsAppUrl` handles the `wa.me` link + URL-encoding. Both are pure functions with no side effects — the `window.open()` call itself lives in `OrderForm.tsx`'s submit handler, deliberately kept synchronous with the user's click (see `docs/ARCHITECTURE.md` / `docs/MAINTENANCE.md` for why that matters for avoiding popup blockers).

### `config/business.ts` — not a utility file, but read this before writing one

If what you're building needs the WhatsApp number, the city name, the site URL, or the payment terms — it's already in `businessConfig`. Import it rather than re-deriving or hardcoding the value. See `docs/ARCHITECTURE.md`'s "single source of truth" section.
