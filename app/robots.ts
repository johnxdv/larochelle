import type { MetadataRoute } from "next";

/**
 * Site de démonstration : on interdit l'indexation à l'ensemble des robots.
 * Le site reste normalement accessible par son adresse.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
