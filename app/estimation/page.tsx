import type { Metadata } from "next";
import Link from "next/link";
import { AGENCE } from "@/lib/agence";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Estimer mon bien",
  description:
    "Estimation en ligne de votre maison ou de votre appartement à La Rochelle, sur l’île de Ré et l’île d’Oléron.",
};

export default function PageEstimation() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-32 sm:px-8">
      {/* Fond */}
      <Photo
        src="dunes-mer"
        alt=""
        plein
        sizes="100vw"
        priority
        flottement="lent"
        cadrage={58}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-calcaire/92 via-calcaire/88 to-calcaire"
      />

      <div className="relative mx-auto w-full max-w-[42rem]">
        <div className="verre grain relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:rounded-[2.5rem] sm:px-14 sm:py-20">
          {/* Halo respirant */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(78,160,188,.55), transparent 65%)",
              animation: "respire 7s var(--ease-marine) infinite",
            }}
          />

          {/* Cercles concentriques */}
          <div
            aria-hidden="true"
            className="relative mx-auto grid h-28 w-28 place-items-center"
          >
            {[0, 1, 2].map((anneau) => (
              <span
                key={anneau}
                className="absolute rounded-full border border-azur/35"
                style={{
                  inset: `${anneau * 14}%`,
                  animation: `respire ${5 + anneau * 1.6}s var(--ease-marine) infinite`,
                  animationDelay: `${anneau * -1.4}s`,
                }}
              />
            ))}
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-atlantique text-calcaire">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M4 11.5 12 5l8 6.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 10.5V19h11v-8.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <p className="surtitre mt-9">Estimation</p>
          <h1 className="titre mt-4 text-[clamp(2.1rem,6vw,3.5rem)] text-atlantique">
            Notre moteur d’estimation arrive.
          </h1>
          <p className="plume mx-auto mt-5 max-w-[44ch]">
            Nous finalisons l’outil qui croisera les ventes réellement signées
            dans votre rue, l’état de votre bien et la tension du marché pour
            vous donner une fourchette en trois minutes.
          </p>

          {/* Barre de progression indéterminée */}
          <div
            aria-hidden="true"
            className="mx-auto mt-9 h-1 w-40 overflow-hidden rounded-full bg-encre/10"
          >
            <span
              className="block h-full w-1/3 rounded-full bg-gradient-to-r from-azur to-atlantique"
              style={{
                animation: "glisse-droite 2.2s var(--ease-marine) infinite",
              }}
            />
          </div>

          {/*
            Point de montage du moteur d'estimation.
            Remplacer le bloc ci-dessus par le composant du moteur
            (formulaire multi-étapes, appel d'API, restitution de la fourchette).
          */}
          <div id="moteur-estimation" />

          <div className="mt-11 border-t border-[var(--filet)] pt-9">
            <p className="plume text-sm">
              En attendant, rien ne remplace une visite. Un conseiller se
              déplace chez vous sous quarante-huit heures et vous remet un avis
              de valeur écrit.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primaire verre-reflet">
                Prendre rendez-vous
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href={`tel:${AGENCE.telephoneLien}`}
                className="btn btn-contour"
              >
                {AGENCE.telephone}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-encre-3">
          <Link href="/vendre" className="underline underline-offset-4 hover:text-atlantique">
            Comment nous préparons une vente
          </Link>
        </p>
      </div>
    </section>
  );
}
