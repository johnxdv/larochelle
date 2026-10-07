import type { Classe } from "@/lib/biens";

const EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const NOMBRE = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** 1 395 000 → « 1 395 000 € » */
export function prix(valeur: number): string {
  return EURO.format(valeur);
}

/** 1 395 000 → « 1,40 M€ », 465 000 → « 465 k€ » — pour les étiquettes compactes */
export function prixCourt(valeur: number): string {
  if (valeur >= 1_000_000) {
    return `${(valeur / 1_000_000).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} M€`;
  }
  return `${Math.round(valeur / 1000)} k€`;
}

export function nombre(valeur: number): string {
  return NOMBRE.format(valeur);
}

/** 148 → « 148 m² » */
export function surface(valeur: number): string {
  return `${NOMBRE.format(valeur)} m²`;
}

/** Prix au mètre carré arrondi à la centaine. */
export function prixAuM2(prixTotal: number, surfaceBien: number): string {
  return `${NOMBRE.format(Math.round(prixTotal / surfaceBien / 100) * 100)} €/m²`;
}

export function pieces(valeur: number): string {
  return valeur <= 1 ? "1 pièce" : `${valeur} pièces`;
}

export function chambres(valeur: number): string {
  if (valeur === 0) return "Sans chambre séparée";
  return valeur === 1 ? "1 chambre" : `${valeur} chambres`;
}

export const CLASSES: readonly Classe[] = ["A", "B", "C", "D", "E", "F", "G"];

/** Couleurs officielles de l'étiquette énergie française. */
export const COULEURS_DPE: Record<Classe, string> = {
  A: "#319a68",
  B: "#52b153",
  C: "#8fc13e",
  D: "#f2e31a",
  E: "#f2ab1a",
  F: "#eb7d2d",
  G: "#d7221f",
};

/** Dégradé violet de l'étiquette climat (émissions de gaz à effet de serre). */
export const COULEURS_GES: Record<Classe, string> = {
  A: "#e9dff0",
  B: "#d6c2e2",
  C: "#bb9cd1",
  D: "#9f74bd",
  E: "#8350a6",
  F: "#67328a",
  G: "#4b1c6b",
};

/** Le jaune et l'orange de l'étiquette demandent un texte sombre. */
export function texteSurClasse(classe: Classe): string {
  return classe === "D" || classe === "E" || classe === "F"
    ? "#2b2000"
    : "#ffffff";
}

/** Les trois premières classes de l'étiquette climat sont trop claires. */
export function texteSurGes(classe: Classe): string {
  return classe === "A" || classe === "B" || classe === "C"
    ? "#331846"
    : "#ffffff";
}

export const LIBELLES_DPE: Record<Classe, string> = {
  A: "Logement extrêmement performant",
  B: "Logement très performant",
  C: "Logement performant",
  D: "Logement assez performant",
  E: "Logement peu performant",
  F: "Logement très peu performant",
  G: "Logement extrêmement peu performant",
};

/** Largeur relative des barres de l'étiquette, de A (la plus courte) à G. */
export function largeurBarre(classe: Classe): number {
  return 42 + CLASSES.indexOf(classe) * 9.5;
}
