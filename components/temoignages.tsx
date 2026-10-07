"use client";

import { useEffect, useState } from "react";
import { TEMOIGNAGES } from "@/lib/agence";

export function Temoignages() {
  const [index, setIndex] = useState(0);
  const [enPause, setEnPause] = useState(false);

  useEffect(() => {
    if (enPause) return;
    const minuteur = setInterval(
      () => setIndex((i) => (i + 1) % TEMOIGNAGES.length),
      7500,
    );
    return () => clearInterval(minuteur);
  }, [enPause]);

  return (
    <div
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
      className="verre relative overflow-hidden rounded-[2rem] px-6 py-10 sm:rounded-[2.5rem] sm:px-12 sm:py-14"
    >
      <svg
        viewBox="0 0 48 36"
        aria-hidden="true"
        className="h-8 w-10 text-azur/25 sm:h-10 sm:w-14"
        fill="currentColor"
      >
        <path d="M0 36V20.5C0 9.2 6.6 1.7 18.6 0l1.8 5.2C13.3 7 9.6 11 9.3 16.4H19V36H0Zm28 0V20.5C28 9.2 34.6 1.7 46.6 0l1.8 5.2C41.3 7 37.6 11 37.3 16.4H47V36H28Z" />
      </svg>

      {/* Hauteur réservée pour éviter tout saut à la rotation */}
      <div className="relative mt-5 grid">
        {TEMOIGNAGES.map((temoignage, i) => (
          <blockquote
            key={temoignage.auteur}
            aria-hidden={i !== index}
            className="col-start-1 row-start-1 transition-all duration-700 ease-[var(--ease-douce)]"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? "none" : "translateY(0.75rem)",
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            <p className="titre text-[clamp(1.35rem,3.6vw,2rem)] leading-[1.35] text-atlantique">
              {temoignage.texte}
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <cite className="font-semibold text-encre not-italic">
                {temoignage.auteur}
              </cite>
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-[var(--filet)] sm:block"
              />
              <span className="w-full text-encre-3 sm:w-auto">
                {temoignage.contexte}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2">
        {TEMOIGNAGES.map((temoignage, i) => (
          <button
            key={temoignage.auteur}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index}
            className="group py-2"
          >
            <span className="sr-only">Témoignage de {temoignage.auteur}</span>
            <span
              className={`block h-[3px] rounded-full transition-all duration-500 ease-[var(--ease-douce)] ${
                i === index
                  ? "w-10 bg-atlantique"
                  : "w-4 bg-encre/20 group-hover:bg-encre/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
