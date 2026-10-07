import Link from "next/link";
import { AGENCE, SECTEURS } from "@/lib/agence";
import { QUARTIERS } from "@/lib/quartiers";
import { Logo } from "@/components/logo";

const PAGES = [
  { href: "/biens", libelle: "Nos biens" },
  { href: "/vendre", libelle: "Vendre un bien" },
  { href: "/estimation", libelle: "Estimer mon bien" },
  { href: "/agence", libelle: "L’agence" },
  { href: "/contact", libelle: "Nous écrire" },
];

export function PiedDePage() {
  const annee = process.env.ANNEE_COURANTE;

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-atlantique text-ecume sm:mt-32 sm:rounded-t-[3.5rem]">
      {/* Lumières douces */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(42rem 26rem at 8% 0%, rgba(78,160,188,.3), transparent 65%), radial-gradient(34rem 24rem at 92% 12%, rgba(228,216,195,.16), transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[78rem] px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo clair />
            <p className="plume mt-5 max-w-xs text-sm text-ecume/70">
              {AGENCE.signature}. Vente et location de propriétés d’exception
              depuis {AGENCE.depuis}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SECTEURS.map((secteur) => (
                <li
                  key={secteur}
                  className="rounded-full border border-ecume/20 px-3 py-1 text-xs text-ecume/70"
                >
                  {secteur}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pages du site">
            <h2 className="surtitre text-azur-2">Le site</h2>
            <ul className="mt-5 space-y-3">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm text-ecume/75 transition-colors duration-300 hover:text-calcaire"
                  >
                    {page.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quartiers">
            <h2 className="surtitre text-azur-2">Quartiers</h2>
            <ul className="mt-5 space-y-3">
              {QUARTIERS.slice(0, 6).map((quartier) => (
                <li key={quartier.slug}>
                  <Link
                    href={`/biens?quartier=${quartier.slug}`}
                    className="text-sm text-ecume/75 transition-colors duration-300 hover:text-calcaire"
                  >
                    {quartier.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="surtitre text-azur-2">L’agence</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-ecume/75">
              <p>
                {AGENCE.adresse.rue}
                <br />
                {AGENCE.adresse.codePostal} {AGENCE.adresse.ville}
              </p>
              <p>
                <a
                  href={`tel:${AGENCE.telephoneLien}`}
                  className="transition-colors duration-300 hover:text-calcaire"
                >
                  {AGENCE.telephone}
                </a>
                <br />
                <a
                  href={`mailto:${AGENCE.email}`}
                  className="transition-colors duration-300 hover:text-calcaire"
                >
                  {AGENCE.email}
                </a>
              </p>
            </address>
            <dl className="mt-5 space-y-1.5 text-xs text-ecume/55">
              {AGENCE.horaires.map((creneau) => (
                <div key={creneau.jours} className="flex justify-between gap-4">
                  <dt>{creneau.jours}</dt>
                  <dd className="tabular-nums">{creneau.heures}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ecume/15 pt-7 text-xs text-ecume/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {annee} {AGENCE.nom}. Site de démonstration — biens, prix et
            témoignages fictifs.
          </p>
          <p>
            Photographies&nbsp;:{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 transition-colors duration-300 hover:text-calcaire"
            >
              licence Unsplash
            </a>{" "}
            — crédits dans CREDITS.md
          </p>
        </div>
      </div>
    </footer>
  );
}
