"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { EVENEMENT_INTRO, INTRO_INACTIVE, type EtatIntro } from "@/lib/intro";

const LIENS = [
  { href: "/biens", libelle: "Nos biens" },
  { href: "/vendre", libelle: "Vendre" },
  { href: "/agence", libelle: "L’agence" },
  { href: "/contact", libelle: "Contact" },
] as const;

/** Contact est promu en bouton à droite : inutile de le répéter dans la barre.
    Le tiroir mobile, lui, affiche bien les quatre liens. */
const LIENS_BARRE = LIENS.filter((lien) => lien.href !== "/contact");

export function EnTete() {
  const chemin = usePathname();
  const [condense, setCondense] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  // Intro au défilement de l'accueil : logo et menu hamburger seuls le temps
  // de l'animation, puis menu complet sur une barre transparente jusqu'à la
  // fin de la section.
  const [intro, setIntro] = useState<EtatIntro>(INTRO_INACTIVE);

  useEffect(() => {
    const auDefilement = () => setCondense(window.scrollY > 28);
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });
    return () => window.removeEventListener("scroll", auDefilement);
  }, []);

  useEffect(() => {
    const maj = (evenement: Event) =>
      setIntro((evenement as CustomEvent<EtatIntro>).detail);
    window.addEventListener(EVENEMENT_INTRO, maj);
    return () => window.removeEventListener(EVENEMENT_INTRO, maj);
  }, []);

  // Le menu mobile se referme à chaque navigation, et l'en-tête reprend sa
  // forme habituelle en quittant l'accueil.
  useEffect(() => {
    setOuvert(false);
    setIntro(INTRO_INACTIVE);
  }, [chemin]);

  // On bloque le défilement de la page derrière le menu ouvert,
  // et la touche Échap le referme.
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    if (!ouvert) return;

    const auClavier = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", auClavier);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", auClavier);
    };
  }, [ouvert]);

  const estActif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href);

  const { reduit, transparent } = intro;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={`relative mx-auto flex max-w-[78rem] items-center justify-between rounded-full transition-[padding] duration-700 ease-[var(--ease-douce)] ${
            transparent
              ? "intro-ombre-ui px-3 py-3 sm:px-4 sm:py-4"
              : condense
                ? "px-4 py-2 sm:px-5 sm:py-2.5"
                : "px-4 py-3 sm:px-6 sm:py-4"
          }`}
        >
          {/* Le verre dépoli est un calque à part : son opacité peut ainsi
              fondre en douceur quand l'intro rend la barre transparente. */}
          <span
            aria-hidden="true"
            className={`verre absolute inset-0 rounded-full transition-opacity duration-700 ease-[var(--ease-douce)] ${
              transparent ? "opacity-0" : "opacity-100"
            }`}
          />

          <div className="relative">
            <Logo clair={transparent} />
          </div>

          <nav
            aria-label="Navigation principale"
            className={`relative hidden transition-[opacity,visibility] duration-700 ease-[var(--ease-douce)] lg:block ${
              reduit ? "lg:invisible lg:opacity-0" : "lg:visible lg:opacity-100"
            }`}
          >
            <ul className="flex items-center gap-1">
              {LIENS_BARRE.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    tabIndex={reduit ? -1 : 0}
                    aria-current={estActif(lien.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-500 ${
                      transparent
                        ? estActif(lien.href)
                          ? "text-calcaire"
                          : "text-ecume/80 hover:text-calcaire"
                        : estActif(lien.href)
                          ? "text-atlantique"
                          : "text-encre-2 hover:text-atlantique"
                    }`}
                  >
                    {lien.libelle}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-center transition-transform duration-500 ease-[var(--ease-douce)] ${
                        transparent ? "bg-calcaire" : "bg-azur"
                      } ${estActif(lien.href) ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative flex items-center gap-2">
            <Link
              href="/contact"
              tabIndex={reduit ? -1 : 0}
              aria-current={estActif("/contact") ? "page" : undefined}
              className={`btn reflet-lent hidden transition-[opacity,visibility] duration-700 ease-[var(--ease-douce)] sm:inline-flex ${
                transparent ? "btn-liquide" : "btn-primaire"
              } ${condense && !transparent ? "px-5 py-2.5 text-sm" : "px-6 py-3 text-sm"} ${
                reduit ? "sm:invisible sm:opacity-0" : "sm:visible sm:opacity-100"
              }`}
            >
              <span className="btn-libelle">Contact</span>
            </Link>

            <button
              type="button"
              onClick={() => setOuvert((v) => !v)}
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              className={`h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
                transparent
                  ? "border-calcaire/35 text-calcaire hover:bg-calcaire/10"
                  : "border-[var(--filet)] text-atlantique hover:bg-atlantique/5"
              } ${reduit ? "flex" : "flex lg:hidden"}`}
            >
              <span className="sr-only">
                {ouvert ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute inset-x-0 block h-px bg-current transition-all duration-500 ease-[var(--ease-douce)] ${
                    ouvert ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 block h-px bg-current transition-opacity duration-300 ${
                    ouvert ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 block h-px bg-current transition-all duration-500 ease-[var(--ease-douce)] ${
                    ouvert ? "top-1/2 -rotate-45" : "top-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — également sur grand écran le temps de l'intro, où le
          hamburger est la seule navigation. */}
      <div
        id="menu-mobile"
        aria-hidden={!ouvert}
        className={`fixed inset-0 z-40 ${reduit ? "" : "lg:hidden"} ${
          ouvert ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOuvert(false)}
          className={`absolute inset-0 bg-atlantique/25 backdrop-blur-xl transition-opacity duration-500 ${
            ouvert ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Navigation mobile"
          // Les règles lg: ne jouent que pendant l'intro : partout ailleurs
          // le tiroir est masqué à cette largeur.
          className={`verre absolute inset-x-3 top-[5.5rem] rounded-[2rem] p-5 transition-all duration-500 ease-[var(--ease-douce)] lg:inset-x-auto lg:right-5 lg:w-[24rem] ${
            ouvert
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            {LIENS.map((lien, i) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  tabIndex={ouvert ? 0 : -1}
                  style={{ transitionDelay: ouvert ? `${80 + i * 55}ms` : "0ms" }}
                  className={`titre block border-b border-[var(--filet)] py-4 text-[1.75rem] transition-all duration-500 ease-[var(--ease-douce)] ${
                    estActif(lien.href) ? "text-azur" : "text-atlantique"
                  } ${ouvert ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/estimation"
            tabIndex={ouvert ? 0 : -1}
            className="btn btn-primaire verre-reflet mt-5 w-full"
          >
            Estimer mon bien
          </Link>
        </nav>
      </div>
    </>
  );
}
