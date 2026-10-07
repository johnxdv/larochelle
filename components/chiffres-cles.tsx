"use client";

import { useEffect, useRef, useState } from "react";
import { CHIFFRES } from "@/lib/agence";

/** Compteur qui s'anime une fois, à l'entrée dans le champ de vision. */
function Compteur({
  valeur,
  decimales = 0,
}: {
  valeur: number;
  decimales?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [affiche, setAffiche] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit || typeof IntersectionObserver === "undefined") {
      setAffiche(valeur);
      return;
    }

    let trame = 0;
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        observateur.disconnect();

        const duree = 1500;
        const depart = performance.now();
        const avancer = (maintenant: number) => {
          const t = Math.min(1, (maintenant - depart) / duree);
          // Sortie en douceur
          const adouci = 1 - Math.pow(1 - t, 3);
          setAffiche(valeur * adouci);
          if (t < 1) trame = requestAnimationFrame(avancer);
        };
        trame = requestAnimationFrame(avancer);
      },
      { threshold: 0.4 },
    );

    observateur.observe(element);
    return () => {
      observateur.disconnect();
      if (trame) cancelAnimationFrame(trame);
    };
  }, [valeur]);

  return (
    <span ref={ref}>
      {affiche.toLocaleString("fr-FR", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,
      })}
    </span>
  );
}

export function ChiffresCles() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-[var(--filet)] lg:grid-cols-4">
      {CHIFFRES.map((chiffre) => (
        <div
          key={chiffre.libelle}
          className="group bg-calcaire/70 px-5 py-8 text-center backdrop-blur-sm transition-colors duration-500 hover:bg-calcaire sm:px-6 sm:py-10"
        >
          <dt className="sr-only">{chiffre.libelle}</dt>
          <dd>
            <span className="chiffre block text-[clamp(2.4rem,7vw,3.4rem)] leading-none text-atlantique">
              {"prefixe" in chiffre && chiffre.prefixe ? (
                <span className="text-[0.5em] align-middle text-encre-3">
                  {chiffre.prefixe}
                </span>
              ) : null}
              <Compteur
                valeur={chiffre.valeur}
                decimales={"decimales" in chiffre ? chiffre.decimales : 0}
              />
              {chiffre.suffixe ? (
                <span className="text-azur">{chiffre.suffixe}</span>
              ) : null}
            </span>
            <span className="mt-3 block text-[0.8125rem] leading-snug text-encre-2">
              {chiffre.libelle}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
