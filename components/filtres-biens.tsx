"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BIENS, BORNES, TYPES_BIEN, type Bien, type TypeBien } from "@/lib/biens";
import { QUARTIERS } from "@/lib/quartiers";
import { prixCourt } from "@/lib/format";
import { CarteBien } from "@/components/carte-bien";
import { DoubleCurseur } from "@/components/double-curseur";
import { Apparition } from "@/components/apparition";

type Tri = "recommande" | "prix-asc" | "prix-desc" | "surface-desc";

const TRIS: readonly { valeur: Tri; libelle: string }[] = [
  { valeur: "recommande", libelle: "Notre sélection" },
  { valeur: "prix-asc", libelle: "Prix croissant" },
  { valeur: "prix-desc", libelle: "Prix décroissant" },
  { valeur: "surface-desc", libelle: "Plus grandes surfaces" },
];

const PAS_PRIX = 25_000;
const PAS_SURFACE = 5;

const PRIX_MIN = Math.floor(BORNES.prix[0] / PAS_PRIX) * PAS_PRIX;
const PRIX_MAX = Math.ceil(BORNES.prix[1] / PAS_PRIX) * PAS_PRIX;
const SURFACE_MIN = Math.floor(BORNES.surface[0] / PAS_SURFACE) * PAS_SURFACE;
const SURFACE_MAX = Math.ceil(BORNES.surface[1] / PAS_SURFACE) * PAS_SURFACE;

function basculer<T>(liste: readonly T[], valeur: T): T[] {
  return liste.includes(valeur)
    ? liste.filter((v) => v !== valeur)
    : [...liste, valeur];
}

export function FiltresBiens() {
  const parametres = useSearchParams();
  const quartierInitial = parametres.get("quartier");
  const typeInitial = parametres.get("type");

  const [types, setTypes] = useState<TypeBien[]>(
    typeInitial && TYPES_BIEN.includes(typeInitial as TypeBien)
      ? [typeInitial as TypeBien]
      : [],
  );
  const [quartiers, setQuartiers] = useState<string[]>(
    quartierInitial && QUARTIERS.some((q) => q.slug === quartierInitial)
      ? [quartierInitial]
      : [],
  );
  const [budget, setBudget] = useState<[number, number]>([PRIX_MIN, PRIX_MAX]);
  const [surfaces, setSurfaces] = useState<[number, number]>([
    SURFACE_MIN,
    SURFACE_MAX,
  ]);
  const [piecesMin, setPiecesMin] = useState(0);
  const [tri, setTri] = useState<Tri>("recommande");
  const [tiroirOuvert, setTiroirOuvert] = useState(false);

  // Défilement bloqué derrière le tiroir, et fermeture à la touche Échap.
  useEffect(() => {
    document.body.style.overflow = tiroirOuvert ? "hidden" : "";
    if (!tiroirOuvert) return;

    const auClavier = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") setTiroirOuvert(false);
    };
    window.addEventListener("keydown", auClavier);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", auClavier);
    };
  }, [tiroirOuvert]);

  const resultats = useMemo(() => {
    const filtres = BIENS.filter(
      (bien) =>
        (types.length === 0 || types.includes(bien.type)) &&
        (quartiers.length === 0 || quartiers.includes(bien.quartier)) &&
        bien.prix >= budget[0] &&
        bien.prix <= budget[1] &&
        bien.surface >= surfaces[0] &&
        bien.surface <= surfaces[1] &&
        bien.pieces >= piecesMin,
    );

    const ordonner = (a: Bien, b: Bien) => {
      switch (tri) {
        case "prix-asc":
          return a.prix - b.prix;
        case "prix-desc":
          return b.prix - a.prix;
        case "surface-desc":
          return b.surface - a.surface;
        default:
          return (
            Number(b.coupDeCoeur) - Number(a.coupDeCoeur) ||
            Number(b.exclusivite) - Number(a.exclusivite) ||
            b.prix - a.prix
          );
      }
    };

    return [...filtres].sort(ordonner);
  }, [types, quartiers, budget, surfaces, piecesMin, tri]);

  const nombreFiltres =
    types.length +
    quartiers.length +
    (budget[0] !== PRIX_MIN || budget[1] !== PRIX_MAX ? 1 : 0) +
    (surfaces[0] !== SURFACE_MIN || surfaces[1] !== SURFACE_MAX ? 1 : 0) +
    (piecesMin > 0 ? 1 : 0);

  const reinitialiser = () => {
    setTypes([]);
    setQuartiers([]);
    setBudget([PRIX_MIN, PRIX_MAX]);
    setSurfaces([SURFACE_MIN, SURFACE_MAX]);
    setPiecesMin(0);
  };

  const panneau = (
    <div className="space-y-7">
      <fieldset>
        <legend className="surtitre">Type de bien</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES_BIEN.map((type) => {
            const actif = types.includes(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={actif}
                onClick={() => setTypes(basculer(types, type))}
                className={`rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-300 ${
                  actif
                    ? "border-transparent bg-atlantique text-calcaire shadow-[0_8px_20px_-10px_rgba(12,46,66,.8)]"
                    : "border-[var(--filet)] text-encre-2 hover:border-atlantique/35 hover:text-atlantique"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="surtitre">Quartier</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUARTIERS.map((quartier) => {
            const actif = quartiers.includes(quartier.slug);
            return (
              <button
                key={quartier.slug}
                type="button"
                aria-pressed={actif}
                onClick={() => setQuartiers(basculer(quartiers, quartier.slug))}
                className={`rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-300 ${
                  actif
                    ? "border-transparent bg-atlantique text-calcaire shadow-[0_8px_20px_-10px_rgba(12,46,66,.8)]"
                    : "border-[var(--filet)] text-encre-2 hover:border-atlantique/35 hover:text-atlantique"
                }`}
              >
                {quartier.nom}
              </button>
            );
          })}
        </div>
      </fieldset>

      <DoubleCurseur
        libelle="Budget"
        min={PRIX_MIN}
        max={PRIX_MAX}
        pas={PAS_PRIX}
        valeurs={budget}
        onChange={setBudget}
        format={prixCourt}
      />

      <DoubleCurseur
        libelle="Surface habitable"
        min={SURFACE_MIN}
        max={SURFACE_MAX}
        pas={PAS_SURFACE}
        valeurs={surfaces}
        onChange={setSurfaces}
        format={(v) => `${v} m²`}
      />

      <fieldset>
        <legend className="surtitre">Nombre de pièces</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 2, 3, 4, 5, 6].map((seuil) => (
            <button
              key={seuil}
              type="button"
              aria-pressed={piecesMin === seuil}
              onClick={() => setPiecesMin(seuil)}
              className={`min-w-[3rem] rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-300 ${
                piecesMin === seuil
                  ? "border-transparent bg-atlantique text-calcaire shadow-[0_8px_20px_-10px_rgba(12,46,66,.8)]"
                  : "border-[var(--filet)] text-encre-2 hover:border-atlantique/35 hover:text-atlantique"
              }`}
            >
              {seuil === 0 ? "Toutes" : `${seuil}+`}
            </button>
          ))}
        </div>
      </fieldset>

      {nombreFiltres > 0 ? (
        <button
          type="button"
          onClick={reinitialiser}
          className="text-[0.8125rem] font-medium text-azur underline underline-offset-4 transition-colors hover:text-atlantique"
        >
          Effacer les filtres ({nombreFiltres})
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
      <div className="lg:grid lg:grid-cols-[17.5rem_1fr] lg:gap-12">
        {/* Panneau de filtres — écrans larges */}
        <aside className="hidden lg:block">
          <div className="verre sticky top-28 rounded-[1.75rem] p-6">
            <h2 className="titre text-[1.4rem] text-atlantique">Affiner</h2>
            <div className="mt-6">{panneau}</div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-encre-2">
              <span className="chiffre text-[1.15rem] text-atlantique">
                {resultats.length}
              </span>{" "}
              {resultats.length > 1 ? "biens disponibles" : "bien disponible"}
            </p>

            <label className="hidden items-center gap-2 text-sm text-encre-3 lg:flex">
              Trier par
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value as Tri)}
                className="cursor-pointer rounded-full border border-[var(--filet)] bg-white/60 py-2 pr-9 pl-4 text-[0.8125rem] font-medium text-encre transition-colors outline-none hover:border-atlantique/35 focus:border-azur/50 focus:ring-4 focus:ring-azur/12"
                style={{
                  appearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%233b525f' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.85rem center",
                  backgroundSize: "0.9rem",
                }}
              >
                {TRIS.map((option) => (
                  <option key={option.valeur} value={option.valeur}>
                    {option.libelle}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {resultats.length === 0 ? (
            <div className="verre rounded-[2rem] px-6 py-16 text-center">
              <h3 className="titre text-[1.75rem] text-atlantique">
                Aucun bien ne correspond
              </h3>
              <p className="plume mx-auto mt-3 max-w-[42ch] text-sm">
                Élargissez vos critères, ou confiez-nous votre recherche : une
                part de notre portefeuille ne paraît jamais en ligne.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={reinitialiser}
                  className="btn btn-primaire"
                >
                  Effacer les filtres
                </button>
                <a href="/contact" className="btn btn-contour">
                  Nous confier la recherche
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 pb-24 sm:grid-cols-2 lg:pb-0 xl:grid-cols-2">
              {resultats.map((bien, index) => (
                <Apparition key={bien.slug} delai={Math.min(index, 5) * 70}>
                  <CarteBien bien={bien} prioritaire={index < 2} />
                </Apparition>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barre flottante — mobile et tablette */}
      <div className="fixed inset-x-0 bottom-5 z-30 flex justify-center px-5 lg:hidden">
        <div className="verre flex items-center gap-1 rounded-full p-1.5 shadow-[0_18px_40px_-18px_rgba(12,46,66,.5)]">
          <button
            type="button"
            onClick={() => setTiroirOuvert(true)}
            className="btn btn-primaire px-5 py-3 text-sm"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M4 8h8M6.5 12h3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Filtrer
            {nombreFiltres > 0 ? (
              <span className="chiffre grid h-5 min-w-5 place-items-center rounded-full bg-calcaire px-1 text-[0.6875rem] font-bold text-atlantique">
                {nombreFiltres}
              </span>
            ) : null}
          </button>
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value as Tri)}
            aria-label="Trier les biens"
            className="cursor-pointer rounded-full bg-transparent py-3 pr-8 pl-3 text-[0.8125rem] font-medium text-atlantique outline-none"
            style={{
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%230c2e42' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.6rem center",
              backgroundSize: "0.9rem",
            }}
          >
            {TRIS.map((option) => (
              <option key={option.valeur} value={option.valeur}>
                {option.libelle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tiroir de filtres — mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${tiroirOuvert ? "" : "pointer-events-none"}`}
        aria-hidden={!tiroirOuvert}
      >
        <div
          onClick={() => setTiroirOuvert(false)}
          className={`absolute inset-0 bg-atlantique/30 backdrop-blur-md transition-opacity duration-500 ${
            tiroirOuvert ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`verre absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-[2rem] p-6 pb-8 transition-transform duration-500 ease-[var(--ease-douce)] ${
            tiroirOuvert ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-encre/15" />
          <div className="mb-6 flex items-center justify-between">
            <h2 className="titre text-[1.6rem] text-atlantique">Affiner</h2>
            <button
              type="button"
              onClick={() => setTiroirOuvert(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--filet)] text-atlantique"
            >
              <span className="sr-only">Fermer les filtres</span>
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

          {panneau}

          <button
            type="button"
            onClick={() => setTiroirOuvert(false)}
            className="btn btn-primaire mt-8 w-full"
          >
            Voir les {resultats.length} biens
          </button>
        </div>
      </div>
    </div>
  );
}
