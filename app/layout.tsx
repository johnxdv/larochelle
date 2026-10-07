import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AGENCE } from "@/lib/agence";
import { EnTete } from "@/components/en-tete";
import { PiedDePage } from "@/components/pied-de-page";

const cormorant = localFont({
  src: "./fonts/CormorantGaramond-Variable.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["ui-serif", "Georgia", "serif"],
});

const manrope = localFont({
  src: "./fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "300 800",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: `${AGENCE.nom} — ${AGENCE.signature}`,
    template: `%s — ${AGENCE.nom}`,
  },
  description:
    "Agence immobilière de prestige à La Rochelle, île de Ré et île d’Oléron. Propriétés d’exception, demeures de caractère, appartements avec vue mer, à la vente et à la location.",
  applicationName: AGENCE.nom,
  // Site de démonstration : aucune indexation par les moteurs de recherche.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: AGENCE.nom,
    title: `${AGENCE.nom} — ${AGENCE.signature}`,
    description: AGENCE.baseline,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="btn btn-verre sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Aller au contenu
        </a>
        <EnTete />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <PiedDePage />
      </body>
    </html>
  );
}
