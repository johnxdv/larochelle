import Link from "next/link";
import { AGENCE } from "@/lib/agence";

type Props = {
  /** Variante claire pour les fonds bleu atlantique */
  clair?: boolean;
  className?: string;
};

/** Le monogramme : les deux tours du chenal, vues de face, dans un médaillon. */
export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinecap="round"
    >
      <circle cx="17" cy="17" r="15.6" stroke="currentColor" strokeWidth="1" opacity="0.32" />
      <path
        d="M11.4 22.2V13.6a2.1 2.1 0 0 1 4.2 0v8.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M18.9 22.2V10.8a2.25 2.25 0 0 1 4.5 0v11.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.6 25.1c1.9 0 1.9 1.25 3.8 1.25s1.9-1.25 3.8-1.25 1.9 1.25 3.8 1.25 1.9-1.25 3.8-1.25 1.9 1.25 3.8 1.25"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
  );
}

export function Logo({ clair = false, className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${AGENCE.nom} — accueil`}
    >
      <Monogramme
        className={`h-9 w-9 shrink-0 transition-[transform,color] duration-700 ease-[var(--ease-douce)] group-hover:rotate-[8deg] ${
          clair ? "text-calcaire" : "text-atlantique"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`titre text-[1.4rem] tracking-[0.02em] transition-colors duration-700 ease-[var(--ease-douce)] ${
            clair ? "text-calcaire" : "text-atlantique"
          }`}
        >
          Ashley
        </span>
        <span
          className={`mt-[0.2rem] text-[0.5625rem] font-semibold tracking-[0.3em] uppercase transition-colors duration-700 ease-[var(--ease-douce)] ${
            clair ? "text-ecume/70" : "text-encre-3"
          }`}
        >
          Immobilier
        </span>
      </span>
    </Link>
  );
}
