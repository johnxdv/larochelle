"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  INTRO_INACTIVE,
  REPERES,
  cheminImage,
  prevenirEntete,
  type EtatIntro,
} from "@/lib/intro";

/** Suite vivante de la dernière image : la boucle part et revient sur elle. */
const SCENE = "/intro/scene.mp4";

/**
 * Préférence système pour les mouvements réduits. Un seul point de vérité :
 * les trois effets du composant s'arrêtent là-dessus, et la mise en forme
 * suit par les variantes CSS motion-reduce:.
 */
function mouvementsReduits() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Dessine l'image en « cover » dans le canvas, comme object-fit: cover. */
function dessinerCouvrant(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const cl = canvas.width;
  const ch = canvas.height;
  const il = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!il || !ih) return;
  const echelle = Math.max(cl / il, ch / ih);
  const dl = il * echelle;
  const dh = ih * echelle;
  ctx.drawImage(img, (cl - dl) / 2, (ch - dh) / 2, dl, dh);
}

/** Image la plus proche de `cible` déjà chargée : le défilement n'attend jamais. */
function plusProcheChargee(chargees: Uint8Array, cible: number) {
  const total = chargees.length;
  if (chargees[cible]) return cible;
  for (let d = 1; d < total; d++) {
    const bas = cible - d;
    const haut = cible + d;
    if (bas >= 0 && chargees[bas]) return bas;
    if (haut < total && chargees[haut]) return haut;
  }
  return -1;
}

/**
 * Accueil — intro au défilement : les images de la séquence sont rendues sur un
 * canvas (jamais de scrubbing vidéo), la section reste fixée à l'écran et le
 * défilement avance ou recule dans la séquence.
 *
 * Au chargement, la première image occupe l'écran sous un voile radial doux et
 * l'accroche est centrée ; l'en-tête se réduit au logo et au hamburger. Dès le
 * premier mouvement, le texte et le voile s'effacent et l'image seule défile.
 * Arrivé à la dernière image, une boucle vidéo muette prend la place du canvas
 * sans saut visible : elle part de cette même image, qui lui sert de poster.
 * En remontant, elle se met en pause et le canvas reprend la main.
 *
 * À la fin, le voile et l'accroche reviennent en fondu, accompagnés du bouton
 * d'estimation, et l'en-tête reprend son menu complet sur une barre
 * transparente — qui redevient claire dès que l'on descend plus bas.
 *
 * Sous prefers-reduced-motion : la dernière image seule, posée en fond CSS
 * (donc aucune image de séquence n'est téléchargée), avec le texte, le bouton
 * et le menu habituels.
 */
export function IntroDefilement({ nombreImages }: { nombreImages: number }) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const calque = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const chargees = useRef(new Uint8Array(nombreImages));
  const index = useRef(0);
  const etatEntete = useRef<EtatIntro>(INTRO_INACTIVE);

  // Le bouton ne prend sa place qu'une fois le texte effacé, et paraît à la fin.
  const [placeBouton, setPlaceBouton] = useState(false);
  const [boutonVisible, setBoutonVisible] = useState(false);
  // La boucle vidéo prend le relais du canvas sur la dernière image.
  const [scene, setScene] = useState(false);

  const dessiner = useCallback(() => {
    const toile = canvas.current;
    if (!toile) return;
    const i = plusProcheChargee(chargees.current, index.current);
    if (i < 0) return;
    const img = images.current[i];
    if (img) dessinerCouvrant(toile, img);
  }, []);

  const redimensionner = useCallback(() => {
    const toile = canvas.current;
    if (!toile) return;
    const densite = Math.min(window.devicePixelRatio || 1, 2);
    const cadre = toile.getBoundingClientRect();
    toile.width = Math.max(1, Math.round(cadre.width * densite));
    toile.height = Math.max(1, Math.round(cadre.height * densite));
    dessiner();
  }, [dessiner]);

  /** Prévient l'en-tête, une seule fois par changement d'état. */
  const prevenir = useCallback((etat: EtatIntro) => {
    const prec = etatEntete.current;
    if (prec.reduit === etat.reduit && prec.transparent === etat.transparent) {
      return;
    }
    etatEntete.current = etat;
    prevenirEntete(etat);
  }, []);

  // Préchargement progressif des images, par lots, jamais tout d'un bloc : la
  // première est déjà dans le HTML, les autres arrivent en arrière-plan.
  useEffect(() => {
    if (mouvementsReduits()) return;

    // La boucle n'est téléchargée que si elle peut servir.
    if (video.current) video.current.preload = "auto";

    const tableau = new Array<HTMLImageElement>(nombreImages);
    const etat = new Uint8Array(nombreImages);
    images.current = tableau;
    chargees.current = etat;

    redimensionner();
    const surRedimension = () => redimensionner();
    window.addEventListener("resize", surRedimension);

    let annule = false;
    let suivante = 0;
    let encours = 0;
    const SIMULTANEES = 6;

    const pomper = () => {
      while (!annule && encours < SIMULTANEES && suivante < nombreImages) {
        const i = suivante++;
        encours++;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (annule) return;
          etat[i] = 1;
          encours--;
          dessiner();
          pomper();
        };
        img.onerror = () => {
          if (annule) return;
          encours--;
          pomper();
        };
        img.src = cheminImage(i + 1);
        tableau[i] = img;
      }
    };
    pomper();

    return () => {
      annule = true;
      window.removeEventListener("resize", surRedimension);
    };
  }, [nombreImages, dessiner, redimensionner]);

  // La boucle tourne tant qu'elle est à l'écran ; sinon elle se remet sur sa
  // première image, celle du canvas, pour repartir sans saut.
  useEffect(() => {
    const lecteur = video.current;
    if (!lecteur) return;
    if (scene) {
      void lecteur.play().catch(() => {});
      return;
    }
    lecteur.pause();
    if (lecteur.currentTime !== 0) lecteur.currentTime = 0;
  }, [scene]);

  // L'en-tête se réduit au logo et au hamburger pendant toute l'animation.
  useEffect(() => {
    if (mouvementsReduits()) return;
    prevenir({ reduit: true, transparent: true });
    return () => prevenir(INTRO_INACTIVE);
  }, [prevenir]);

  // Position de défilement → image affichée, fondu du texte, état de l'en-tête.
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    if (mouvementsReduits()) return;

    let trame = 0;

    const calculer = () => {
      trame = 0;
      const cadre = element.getBoundingClientRect();
      const course = Math.max(1, cadre.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -cadre.top / course));

      // Avancée dans la séquence.
      const avance = Math.min(Math.max(p / REPERES.finSequence, 0), 1);
      index.current = Math.round(avance * (nombreImages - 1));
      dessiner();

      // Texte et voile : fondu de sortie au premier mouvement, retour à la fin.
      if (calque.current) {
        const opacite =
          p <= REPERES.finSortie
            ? 1 - p / REPERES.finSortie
            : p < REPERES.debutRetour
              ? 0
              : Math.min(
                  1,
                  (p - REPERES.debutRetour) /
                    (REPERES.finRetour - REPERES.debutRetour),
                );
        calque.current.style.opacity = opacite.toFixed(3);
      }

      const place = p > REPERES.finSortie;
      setPlaceBouton((prec) => (prec === place ? prec : place));
      const visible = p >= REPERES.debutRetour;
      setBoutonVisible((prec) => (prec === visible ? prec : visible));
      const boucle = p >= REPERES.finSequence;
      setScene((prec) => (prec === boucle ? prec : boucle));

      prevenir({
        reduit: p < REPERES.debutRetour,
        transparent: p < REPERES.finTransparent,
      });
    };

    const auDefilement = () => {
      if (trame) return;
      trame = requestAnimationFrame(calculer);
    };

    calculer();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      if (trame) cancelAnimationFrame(trame);
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, [nombreImages, dessiner, prevenir]);

  return (
    <section
      ref={section}
      aria-label="Ashley Immobilier, immobilier de prestige à La Rochelle"
      className="relative h-[320vh] bg-atlantique motion-reduce:h-[100svh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Première image : présente dans le HTML, donc affichée immédiatement */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cheminImage(1)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        />

        {/* Mouvements réduits : la dernière image seule. En fond CSS, elle n'est
            téléchargée que si la préférence est active. */}
        <div
          aria-hidden="true"
          style={{ backgroundImage: `url(${cheminImage(nombreImages)})` }}
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
        />

        {/* Séquence d'images rendue sur canvas */}
        <canvas
          ref={canvas}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full motion-reduce:hidden"
        />

        {/* Boucle vivante, posée sur le canvas à partir de la dernière image.
            Son poster est cette image : rien ne saute, même avant son
            chargement. Pas de fondu — les deux montrent la même image. */}
        <video
          ref={video}
          src={SCENE}
          poster={cheminImage(nombreImages)}
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover motion-reduce:hidden ${
            scene ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Accroche centrée, sur un voile radial doux. Les deux suivent le même
            fondu : pendant la séquence, l'image reste intacte. */}
        <div
          ref={calque}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div aria-hidden="true" className="intro-voile absolute inset-0" />

          <div className="relative flex max-w-[54rem] flex-col items-center px-5 text-center sm:px-8">
            <h1 className="titre intro-ombre text-[clamp(2.55rem,8.5vw,6.25rem)] text-calcaire">
              Des adresses que la ville ne montre pas.
            </h1>

            {/* Le bouton ne prend sa place qu'une fois le texte effacé : il ne
                décale jamais l'accroche au chargement. */}
            <div
              className={`transition-opacity duration-700 ease-[var(--ease-douce)] motion-reduce:pointer-events-auto motion-reduce:block motion-reduce:opacity-100 ${
                placeBouton ? "block" : "hidden"
              } ${boutonVisible ? "pointer-events-auto opacity-100" : "opacity-0"}`}
            >
              <Link
                href="/estimation"
                className="btn btn-liquide reflet-lent mt-10 px-8 py-4 text-base sm:mt-12"
              >
                <span className="btn-libelle">
                  Estimer mon bien
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
