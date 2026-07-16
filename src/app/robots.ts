import type { MetadataRoute } from "next";
import { businessConfig } from "@/config/business";
import { isProductionDeployment } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    // Preview deployments and local builds: block everything, don't even
    // point search engines at a sitemap for them.
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/style-guide" },
    ],
    sitemap: `${businessConfig.site.url}/sitemap.xml`,
  };
}
