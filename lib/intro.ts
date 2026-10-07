/**
 * Intro vidéo au défilement.
 *
 * Le héro de la page d'accueil sait lire une séquence d'images sur un canvas,
 * pilotée par le défilement. Tant qu'aucune séquence n'est fournie, il affiche
 * la photographie de repli ci-dessous.
 *
 * Pour brancher la séquence :
 *   1. déposer les images dans public/intro/ (voir public/intro/LISEZMOI.md) ;
 *   2. passer `actif` à true et renseigner `nombreImages` ;
 *   3. ajuster `longueurDefilement` selon la durée souhaitée.
 */

export const INTRO = {
  /** Tant que false, le héro affiche la photographie de repli. */
  actif: false,

  /** Nombre d'images de la séquence. */
  nombreImages: 0,

  /** public/intro/intro-0001.jpg, intro-0002.jpg, … */
  fichier(index: number): string {
    return `/intro/intro-${String(index + 1).padStart(4, "0")}.jpg`;
  },

  /**
   * Longueur du couloir de défilement, en hauteurs d'écran.
   * 3 signifie qu'il faut faire défiler trois écrans pour lire la séquence.
   */
  longueurDefilement: 3,

  /** Photographie affichée tant que la séquence n'est pas active. */
  repli: {
    src: "tours-la-rochelle",
    alt: "Les tours Saint-Nicolas et de la Chaîne à l’entrée du Vieux-Port de La Rochelle",
  },
} as const;
