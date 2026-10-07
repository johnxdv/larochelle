/**
 * Intro au défilement de l'accueil.
 *
 * La séquence d'images vit dans public/intro/ (frame-001.jpg, frame-002.jpg…).
 * La section prévient l'en-tête de son état : celui-ci se réduit alors au logo
 * et au menu hamburger le temps de l'animation, reprend son menu complet sur
 * une barre transparente à la fin, puis passe en version claire dès que le
 * visiteur descend plus bas dans le site.
 *
 * Le nom de l'évènement vit ici pour que l'en-tête, rendu par la mise en page,
 * n'ait pas à importer le composant de l'accueil.
 */

export const EVENEMENT_INTRO = "intro-entete";

export type EtatIntro = {
  /** L'en-tête n'affiche que le logo et le menu hamburger. */
  reduit: boolean;
  /** La barre de navigation est posée sur l'image, sans fond. */
  transparent: boolean;
};

/** Hors de l'accueil, ou passé l'intro : en-tête habituel. */
export const INTRO_INACTIVE: EtatIntro = { reduit: false, transparent: false };

export function prevenirEntete(etat: EtatIntro) {
  window.dispatchEvent(
    new CustomEvent<EtatIntro>(EVENEMENT_INTRO, { detail: etat }),
  );
}

/** public/intro/frame-001.jpg, frame-002.jpg, … (numérotation à partir de 1). */
export function cheminImage(n: number): string {
  return `/intro/frame-${String(n).padStart(3, "0")}.jpg`;
}

/**
 * Répartition du défilement sur la section : 0 au chargement, 1 tout en bas.
 * Ces repères décident du moment où le texte s'efface, où la séquence se
 * termine, et où l'en-tête reprend son menu puis sa version claire.
 */
export const REPERES = {
  /** Le texte et le voile ont fini de s'effacer. */
  finSortie: 0.05,
  /** Dernière image de la séquence. */
  finSequence: 0.66,
  /** Le texte, le bouton et le menu complet commencent à revenir. */
  debutRetour: 0.68,
  finRetour: 0.8,
  /** Au-delà, l'en-tête passe en version claire. */
  finTransparent: 0.99,
} as const;
