import fs from "node:fs";
import path from "node:path";
import { IntroDefilement } from "@/components/intro-defilement";

const DOSSIER = path.join("public", "intro");
const MOTIF = /^frame-\d+\.jpg$/i;

/**
 * Repli si public/ n'est pas lisible au moment du rendu, selon la plateforme.
 * L'accueil étant prérendu à la compilation, c'est le comptage réel qui est
 * servi.
 */
const REPLI = 1;

/**
 * Nombre réel d'images de la séquence présentes dans public/intro.
 * Lu une seule fois, à la compilation.
 */
const NOMBRE_IMAGES = (() => {
  try {
    const fichiers = fs.readdirSync(path.join(process.cwd(), DOSSIER));
    const total = fichiers.filter((f) => MOTIF.test(f)).length;
    return total > 0 ? total : REPLI;
  } catch {
    return REPLI;
  }
})();

/** Intro au défilement de l'accueil : voir IntroDefilement. */
export function IntroAccueil() {
  return <IntroDefilement nombreImages={NOMBRE_IMAGES} />;
}
