"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { Bien } from "@/lib/biens";
import { nomQuartier } from "@/lib/quartiers";
import { prix, surface } from "@/lib/format";
import { Photo } from "@/components/photo";
import { PastilleClasse } from "@/components/etiquette-energie";

type Props = {
  bien: Bien;
  prioritaire?: boolean;
  /** Carte à largeur fixe pour les carrousels horizontaux */
  largeurFixe?: boolean;
};

export function CarteBien({ bien, prioritaire = false, largeurFixe = false }: Props) {
  // Le halo suit le curseur à l'intérieur de la carte.
  const suivreCurseur = (evenement: MouseEvent<HTMLElement>) => {
    const cadre = evenement.currentTarget.getBoundingClientRect();
    evenement.currentTarget.style.setProperty(
      "--x",
      `${evenement.clientX - cadre.left}px`,
    );
    evenement.currentTarget.style.setProperty(
      "--y",
      `${evenement.clientY - cadre.top}px`,
    );
  };

  return (
    <article
      onMouseMove={suivreCurseur}
      className={`carte carte-levee carte-halo group relative overflow-hidden ${
        largeurFixe ? "w-[82vw] shrink-0 snap-start sm:w-[23rem]" : ""
      }`}
    >
      <Link href={`/biens/${bien.slug}`} className="block focus-visible:outline-none">
        <span className="absolute inset-0 z-20" aria-hidden="true" />

        <div className="relative m-2 overflow-hidden rounded-[1.6rem]">
          <Photo
            src={bien.photos[0].src}
            alt={bien.photos[0].alt}
            className="aspect-[4/3] transition-transform duration-[1.2s] ease-[var(--ease-douce)] group-hover:scale-[1.035]"
            sizes={largeurFixe ? "(max-width: 640px) 82vw, 23rem" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"}
            priority={prioritaire}
            flottement="lent"
          />

          <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
            {bien.exclusivite ? (
              <span className="verre-sombre rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-calcaire uppercase">
                Exclusivité
              </span>
            ) : null}
            {bien.coupDeCoeur ? (
              <span className="verre rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-atlantique uppercase">
                Coup de cœur
              </span>
            ) : null}
          </div>

          <div className="pointer-events-none absolute right-3 bottom-3">
            <span className="verre rounded-full px-3.5 py-1.5 text-sm font-semibold text-atlantique">
              {prix(bien.prix)}
            </span>
          </div>
        </div>

        <div className="relative z-10 px-5 pt-3 pb-5">
          <p className="surtitre">
            {nomQuartier(bien.quartier)} · {bien.type}
          </p>

          <h3 className="titre mt-2 text-[1.5rem] text-atlantique transition-colors duration-300 group-hover:text-azur">
            {bien.titre}
          </h3>

          <p className="plume mt-2 line-clamp-2 text-sm">{bien.accroche}</p>

          {/* Pas de filet séparateur : la ligne passe à la ligne sur
              les petits écrans, et le filet s'y retrouverait orphelin. */}
          <dl className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-sm text-encre-2">
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Surface</dt>
              <dd className="chiffre text-[1.05rem] text-encre">
                {surface(bien.surface)}
              </dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Pièces</dt>
              <dd>
                <span className="chiffre text-[1.05rem] text-encre">
                  {bien.pieces}
                </span>{" "}
                pièces
              </dd>
            </div>
            {bien.chambres > 0 ? (
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">Chambres</dt>
                <dd>
                  <span className="chiffre text-[1.05rem] text-encre">
                    {bien.chambres}
                  </span>{" "}
                  ch.
                </dd>
              </div>
            ) : null}
            {bien.terrain ? (
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">Terrain</dt>
                <dd>
                  <span className="chiffre text-[1.05rem] text-encre">
                    {bien.terrain}
                  </span>{" "}
                  m² terrain
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              <PastilleClasse nature="dpe" classe={bien.dpe.classe} />
              <PastilleClasse nature="ges" classe={bien.ges.classe} />
            </div>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--filet)] text-atlantique transition-all duration-500 ease-[var(--ease-douce)] group-hover:border-transparent group-hover:bg-atlantique group-hover:text-calcaire"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
