import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  env: {
    // Calculée à la construction : `new Date()` pendant le rendu empêcherait
    // le prérendu statique des pages.
    ANNEE_COURANTE: String(new Date().getFullYear()),
  },
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      {
        // Site de démonstration : on double la balise noindex par un en-tête,
        // qui couvre aussi les ressources non HTML (images, fichiers).
        source: "/:chemin*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
