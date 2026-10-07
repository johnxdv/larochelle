"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Bien } from "@/lib/biens";
import { CarteBien } from "@/components/carte-bien";

/** Sélection de biens qui défile horizontalement, au doigt ou aux flèches. */
export function CarrouselBiens({ biens }: { biens: readonly Bien[] }) {
  const piste = useRef<HTMLDivElement>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  const mesurer = useCallback(() => {
    const element = piste.current;
    if (!element) return;
    setDebut(element.scrollLeft < 8);
    setFin(
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 8,
    );
  }, []);

  useEffect(() => {
    mesurer();
    const element = piste.current;
    if (!element) return;
    element.addEventListener("scroll", mesurer, { passive: true });
    window.addEventListener("resize", mesurer);
    return () => {
      element.removeEventListener("scroll", mesurer);
      window.removeEventListener("resize", mesurer);
    };
  }, [mesurer]);

  const glisser = (sens: 1 | -1) => {
    const element = piste.current;
    if (!element) return;
    const pas = Math.min(element.clientWidth * 0.8, 400);
    element.scrollBy({ left: pas * sens, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={piste}
        // scroll-pl aligne les points d'accroche sur le retrait latéral :
        // sans lui, la première carte se recale d'elle-même au chargement.
        className="defile-x flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 scroll-smooth px-5 pt-2 pb-6 sm:scroll-pl-8 sm:px-8"
      >
        {biens.map((bien, index) => (
          <CarteBien key={bien.slug} bien={bien} largeurFixe prioritaire={index === 0} />
        ))}
        <div aria-hidden="true" className="w-1 shrink-0 sm:w-4" />
      </div>

      <div className="hidden justify-end gap-2 px-8 sm:flex">
        <button
          type="button"
          onClick={() => glisser(-1)}
          disabled={debut}
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--filet)] text-atlantique transition-all duration-300 hover:bg-atlantique hover:text-calcaire disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="sr-only">Biens précédents</span>
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
          onClick={() => glisser(1)}
          disabled={fin}
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--filet)] text-atlantique transition-all duration-300 hover:bg-atlantique hover:text-calcaire disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="sr-only">Biens suivants</span>
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
    </div>
  );
}
