"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Retard en millisecondes, pour décaler les éléments d'une même rangée */
  delai?: number;
  /** Proportion de l'élément devant être visible avant déclenchement */
  seuil?: number;
  style?: CSSProperties;
};

/**
 * Révèle son contenu lorsqu'il entre dans le champ de vision.
 * L'animation est portée par la CSS ([data-reveal]) ; ce composant ne fait
 * que basculer l'attribut, et se retire de l'observation une fois joué.
 */
export function Apparition({
  children,
  className = "",
  delai = 0,
  seuil = 0.12,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.setAttribute("data-reveal", "vu");
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) {
            entree.target.setAttribute("data-reveal", "vu");
            observateur.unobserve(entree.target);
          }
        }
      },
      { threshold: seuil, rootMargin: "0px 0px -8% 0px" },
    );

    observateur.observe(element);
    return () => observateur.disconnect();
  }, [seuil]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ...style, ["--delai" as string]: `${delai}ms` }}
    >
      {children}
    </div>
  );
}
