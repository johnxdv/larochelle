"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO } from "@/lib/intro";
import { Photo } from "@/components/photo";

/**
 * Héro plein écran.
 *
 * Deux modes, un seul code :
 *  — séquence inactive : une photographie de repli, légèrement animée ;
 *  — séquence active : un canvas qui lit public/intro/ au rythme du défilement.
 *
 * Dans les deux cas, la progression du défilement est exposée en variable CSS
 * (--progression) pour animer le contenu posé par-dessus.
 */
export function HeroIntro() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const progression = useRef(0);
  const [pret, setPret] = useState(false);

  const actif = INTRO.actif && INTRO.nombreImages > 0;

  /* Préchargement de la séquence. */
  useEffect(() => {
    if (!actif) return;

    let annule = false;
    let charges = 0;

    images.current = Array.from({ length: INTRO.nombreImages }, (_, i) => {
      const image = new Image();
      image.src = INTRO.fichier(i);
      image.onload = () => {
        charges += 1;
        // On démarre dès la première image, sans attendre toute la séquence.
        if (!annule && (i === 0 || charges === INTRO.nombreImages)) setPret(true);
      };
      return image;
    });

    return () => {
      annule = true;
      images.current = [];
    };
  }, [actif]);

  /* Dessine l'image correspondant à la progression, au cadrage « couvrant ». */
  const dessiner = useCallback(() => {
    if (!actif || !pret) return;

    const toile = canvas.current;
    const contexte = toile?.getContext("2d");
    if (!toile || !contexte) return;

    const index = Math.min(
      INTRO.nombreImages - 1,
      Math.max(0, Math.round(progression.current * (INTRO.nombreImages - 1))),
    );
    const image = images.current[index];
    if (!image?.complete || image.naturalWidth === 0) return;

    const densite = Math.min(window.devicePixelRatio || 1, 2);
    const largeur = toile.clientWidth;
    const hauteur = toile.clientHeight;

    if (toile.width !== largeur * densite || toile.height !== hauteur * densite) {
      toile.width = largeur * densite;
      toile.height = hauteur * densite;
    }
    contexte.setTransform(densite, 0, 0, densite, 0, 0);

    const echelle = Math.max(
      largeur / image.naturalWidth,
      hauteur / image.naturalHeight,
    );
    const l = image.naturalWidth * echelle;
    const h = image.naturalHeight * echelle;
    contexte.clearRect(0, 0, largeur, hauteur);
    contexte.drawImage(image, (largeur - l) / 2, (hauteur - h) / 2, l, h);
  }, [actif, pret]);

  /* Suivi du défilement, lissé par requestAnimationFrame. */
  useEffect(() => {
    const element = section.current;
    if (!element) return;

    let trame = 0;

    const calculer = () => {
      trame = 0;
      const cadre = element.getBoundingClientRect();
      const course = Math.max(1, cadre.height - window.innerHeight);
      const valeur = Math.min(1, Math.max(0, -cadre.top / course));
      progression.current = valeur;
      element.style.setProperty("--progression", valeur.toFixed(4));
      dessiner();
    };

    const auDefilement = () => {
      if (trame) return;
      trame = requestAnimationFrame(calculer);
    };

    calculer();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      if (trame) cancelAnimationFrame(trame);
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, [dessiner]);

  return (
    <section
      ref={section}
      aria-label="Ashley Immobilier, immobilier de prestige à La Rochelle"
      className="relative"
      style={
        actif
          ? { height: `${INTRO.longueurDefilement * 100}svh` }
          : { height: "100svh", minHeight: "36rem" }
      }
    >
      <div className="sticky top-0 h-[100svh] min-h-[36rem] overflow-hidden">
        {/* Fond : canvas de la séquence, ou photographie de repli */}
        <div className="absolute inset-0">
          {actif ? (
            <canvas
              ref={canvas}
              className="h-full w-full"
              aria-hidden="true"
              style={{
                transform: "scale(calc(1 + var(--progression, 0) * 0.04))",
              }}
            />
          ) : (
            <Photo
              src={INTRO.repli.src}
              alt={INTRO.repli.alt}
              // En portrait, on décale le cadrage vers la droite pour garder
              // la tour Saint-Nicolas dans le champ.
              className="h-full w-full [&_img]:object-[72%_46%] sm:[&_img]:object-[50%_46%]"
              sizes="100vw"
              priority
              flottement="lent"
            />
          )}
        </div>

        {/* Voiles : un léger voile général, un fort dégradé sous le texte,
            et une retombée en haut pour détacher l'en-tête de verre. */}
        <div aria-hidden="true" className="absolute inset-0 bg-atlantique/20" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-atlantique/95 via-atlantique/55 via-45% to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-atlantique/45 to-transparent"
        />

        {/* Contenu */}
        <div
          className="relative mx-auto flex h-full max-w-[78rem] flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24"
          style={{
            opacity: "calc(1 - var(--progression, 0) * 1.15)",
            transform: "translateY(calc(var(--progression, 0) * -2.5rem))",
          }}
        >
          <p
            className="surtitre text-ecume/85"
            style={{ textShadow: "0 1px 12px rgba(12,46,66,.5)" }}
          >
            La Rochelle · Île de Ré · Île d’Oléron
          </p>

          <h1
            className="titre mt-4 max-w-[18ch] text-[clamp(2.55rem,8.5vw,6.25rem)] text-calcaire"
            style={{ textShadow: "0 2px 30px rgba(12,46,66,.45)" }}
          >
            Des adresses que la ville ne montre pas.
          </h1>

          <p className="plume mt-6 max-w-[46ch] text-[1.0625rem] text-ecume/90 sm:text-lg">
            Propriétés d’exception, demeures de caractère et appartements avec
            vue mer. Une maison de transaction qui ne travaille que trois
            territoires, et les connaît rue par rue.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/estimation"
              className="btn btn-verre verre-reflet px-7 py-4 text-base"
            >
              Estimer mon bien
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
            <Link
              href="/biens"
              className="btn px-7 py-4 text-base text-calcaire ring-1 ring-calcaire/35 transition-colors hover:bg-calcaire/10"
            >
              Voir les biens
            </Link>
          </div>
        </div>

        {/* Invitation à faire défiler */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
          style={{ opacity: "calc(1 - var(--progression, 0) * 2.5)" }}
        >
          <span className="relative block h-11 w-6 overflow-hidden rounded-full border border-calcaire/35">
            <span
              className="absolute inset-x-0 top-0 mx-auto mt-2 block h-2 w-px bg-calcaire/75"
              style={{ animation: "glisse-bas 2.6s var(--ease-marine) infinite" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
