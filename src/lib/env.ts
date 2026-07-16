/**
 * Vercel automatically injects `VERCEL_ENV` at build time: "production",
 * "preview", or "development". Locally (not on Vercel at all) it's
 * undefined. Treat anything other than a confirmed "production" build as
 * non-production — this is what keeps preview deployments (and local
 * builds) from accidentally getting indexed by search engines.
 */
export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production";
}
