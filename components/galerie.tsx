"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo as PhotoBien } from "@/lib/biens";
import { Photo } from "@/components/photo";

export function Galerie({ photos, titre }: { photos: readonly PhotoBien[]; titre: string }) {
  const [ouverte, setOuverte] = useState(false);
  const [index, setIndex] = useState(0);
  const [actif, setActif] = useState(0);
  const piste = useRef<HTMLDivElement>(null);
  const fermeture = useRef<HTMLButtonElement>(null);

  const ouvrir = (depart: number) => {
    setIndex(depart);
    setOuverte(true);
  };

  const suivante = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length],
  );
  const precedente = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );

  /* Clavier et défilement bloqué pendant la visionneuse. */
  useEffect(() => {
    if (!ouverte) return;

    const auClavier = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") setOuverte(false);
      if (evenement.key === "ArrowRight") suivante();
      if (evenement.key === "ArrowLeft") precedente();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", auClavier);
    fermeture.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", auClavier);
    };
  }, [ouverte, suivante, precedente]);

  /* Suivi de la photo visible dans le carrousel mobile. */
  const auDefilement = () => {
    const element = piste.current;
    if (!element) return;
    setActif(Math.round(element.scrollLeft / element.clientWidth));
  };

  return (
    <>
      {/* Mobile : carrousel plein cadre */}
      <div className="sm:hidden">
        <div
          ref={piste}
          onScroll={auDefilement}
          className="defile-x flex snap-x snap-mandatory overflow-x-auto"
        >
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => ouvrir(i)}
              className="w-full shrink-0 snap-center px-5"
            >
              <Photo
                src={photo.src}
                alt={photo.alt}
                className="aspect-[4/3] w-full rounded-[1.5rem]"
                sizes="92vw"
                priority={i === 0}
                flottement="lent"
              />
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-1.5">
          {photos.map((photo, i) => (
            <span
              key={photo.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === actif ? "w-6 bg-atlantique" : "w-1.5 bg-encre/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Écrans larges : mosaïque */}
      <div className="hidden sm:block">
        <div className="relative grid h-[30rem] grid-cols-3 gap-2.5 overflow-hidden rounded-[2rem] lg:h-[34rem]">
          <button
            type="button"
            onClick={() => ouvrir(0)}
            className="group relative col-span-2 overflow-hidden rounded-l-[2rem] rounded-r-xl focus-visible:z-10"
          >
            <Photo
              src={photos[0].src}
              alt={photos[0].alt}
              className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-douce)] group-hover:scale-[1.03]"
              sizes="(max-width: 1280px) 62vw, 46rem"
              priority
              flottement="lent"
            />
          </button>

          <div className="grid grid-rows-2 gap-2.5">
            {photos.slice(1, 3).map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => ouvrir(i + 1)}
                className={`group relative overflow-hidden rounded-xl focus-visible:z-10 ${
                  i === 0 ? "rounded-tr-[2rem]" : "rounded-br-[2rem]"
                }`}
              >
                <Photo
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-douce)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1280px) 31vw, 23rem"
                  flottement={i === 0 ? "decale" : "lent"}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => ouvrir(0)}
            className="btn btn-verre verre-reflet absolute right-5 bottom-5 px-5 py-3 text-sm"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
              <rect
                x="1.75"
                y="3.25"
                width="12.5"
                height="9.5"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <circle cx="5.75" cy="6.75" r="1.1" fill="currentColor" />
              <path
                d="m2.5 11.5 3.2-3 2.3 2.1 2.6-2.6 3 3.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voir les {photos.length} photos
          </button>
        </div>
      </div>

      {/* Visionneuse */}
      {ouverte ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photographies — ${titre}`}
          className="fixed inset-0 z-[90] flex flex-col bg-atlantique/90 backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-7">
            <p className="chiffre text-sm text-ecume/80">
              {index + 1} / {photos.length}
            </p>
            <button
              ref={fermeture}
              type="button"
              onClick={() => setOuverte(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ecume/25 text-ecume transition-colors duration-300 hover:bg-ecume/10"
            >
              <span className="sr-only">Fermer la visionneuse</span>
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="m4 4 8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-3 pb-3 sm:px-16">
            <Photo
              src={photos[index].src}
              alt={photos[index].alt}
              className="h-full w-full rounded-[1.5rem]"
              sizes="100vw"
              flottement="aucun"
            />

            <button
              type="button"
              onClick={precedente}
              className="verre-sombre absolute left-4 grid h-12 w-12 place-items-center rounded-full text-calcaire transition-transform duration-300 hover:scale-105 sm:left-5"
            >
              <span className="sr-only">Photo précédente</span>
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M13 8H3m4-4-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={suivante}
              className="verre-sombre absolute right-4 grid h-12 w-12 place-items-center rounded-full text-calcaire transition-transform duration-300 hover:scale-105 sm:right-5"
            >
              <span className="sr-only">Photo suivante</span>
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 pb-5 sm:px-7">
            <p className="mb-3 text-center text-sm text-ecume/70">
              {photos[index].alt}
            </p>
            <div className="defile-x flex justify-start gap-2 overflow-x-auto sm:justify-center">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                    i === index
                      ? "ring-2 ring-calcaire"
                      : "opacity-50 hover:opacity-85"
                  }`}
                >
                  <span className="sr-only">{photo.alt}</span>
                  <Photo
                    src={photo.src}
                    alt=""
                    className="h-full w-full"
                    sizes="80px"
                    flottement="aucun"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
