import type { Classe } from "@/lib/biens";
import {
  CLASSES,
  COULEURS_DPE,
  COULEURS_GES,
  LIBELLES_DPE,
  largeurBarre,
  texteSurClasse,
  texteSurGes,
} from "@/lib/format";

type Nature = "dpe" | "ges";

function couleur(nature: Nature, classe: Classe) {
  return nature === "dpe" ? COULEURS_DPE[classe] : COULEURS_GES[classe];
}

function texte(nature: Nature, classe: Classe) {
  return nature === "dpe" ? texteSurClasse(classe) : texteSurGes(classe);
}

/** Pastille compacte, pour les cartes et les listes. */
export function PastilleClasse({
  nature,
  classe,
  className = "",
}: {
  nature: Nature;
  classe: Classe;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 text-[0.6875rem] font-semibold tracking-wide ${className}`}
      style={{ backgroundColor: `${couleur(nature, classe)}1f` }}
    >
      <span
        className="grid h-5 w-5 place-items-center rounded-full text-[0.6875rem] font-bold"
        style={{
          backgroundColor: couleur(nature, classe),
          color: texte(nature, classe),
        }}
      >
        {classe}
      </span>
      <span className="text-encre-2 uppercase">
        {nature === "dpe" ? "DPE" : "GES"}
      </span>
    </span>
  );
}

/** L'étiquette réglementaire complète, de A à G. */
export function EtiquetteEnergie({
  nature,
  classe,
  valeur,
}: {
  nature: Nature;
  classe: Classe;
  valeur: number;
}) {
  const titre =
    nature === "dpe" ? "Consommation énergétique" : "Émissions de gaz à effet de serre";
  const unite = nature === "dpe" ? "kWh/m²/an" : "kg CO₂/m²/an";

  return (
    <figure className="carte rounded-[1.5rem] p-5 sm:p-6">
      <figcaption>
        <p className="surtitre">{nature === "dpe" ? "DPE" : "GES"}</p>
        <h3 className="titre mt-1.5 text-[1.35rem] text-atlantique">{titre}</h3>
        <p className="mt-1 text-sm text-encre-3">
          <span className="chiffre text-[1.05rem] text-encre">{valeur}</span>{" "}
          {unite}
        </p>
      </figcaption>

      <div className="mt-5 flex flex-col gap-1.5">
        {CLASSES.map((lettre) => {
          const actif = lettre === classe;
          return (
            <div key={lettre} className="flex items-center gap-2.5">
              <div
                className="flex h-7 items-center rounded-r-full rounded-l-md pr-2.5 pl-2.5 transition-all duration-500 ease-[var(--ease-douce)]"
                style={{
                  width: `${largeurBarre(lettre)}%`,
                  backgroundColor: couleur(nature, lettre),
                  opacity: actif ? 1 : 0.34,
                  transform: actif ? "none" : "scale(0.985)",
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: texte(nature, lettre) }}
                >
                  {lettre}
                </span>
              </div>
              {actif ? (
                <span className="chiffre rounded-full bg-atlantique px-2.5 py-0.5 text-xs font-semibold text-calcaire">
                  {valeur}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {nature === "dpe" ? (
        <p className="mt-4 text-xs text-encre-3">{LIBELLES_DPE[classe]}</p>
      ) : (
        <p className="mt-4 text-xs text-encre-3">
          Émissions estimées selon la méthode réglementaire en vigueur.
        </p>
      )}
    </figure>
  );
}
