"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const LIENS = [
  { href: "/biens", libelle: "Nos biens" },
  { href: "/vendre", libelle: "Vendre" },
  { href: "/agence", libelle: "L’agence" },
  { href: "/contact", libelle: "Contact" },
] as const;

export function EnTete() {
  const chemin = usePathname();
  const [condense, setCondense] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const auDefilement = () => setCondense(window.scrollY > 28);
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });
    return () => window.removeEventListener("scroll", auDefilement);
  }, []);

  // Le menu mobile se referme à chaque navigation.
  useEffect(() => setOuvert(false), [chemin]);

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={`verre mx-auto flex max-w-[78rem] items-center justify-between rounded-full transition-[padding,box-shadow,background-color] duration-500 ease-[var(--ease-douce)] ${
            condense ? "px-4 py-2 sm:px-5 sm:py-2.5" : "px-4 py-3 sm:px-6 sm:py-4"
          }`}
        >
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {LIENS.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    aria-current={estActif(lien.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                      estActif(lien.href)
                        ? "text-atlantique"
                        : "text-encre-2 hover:text-atlantique"
                    }`}
                  >
                    {lien.libelle}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-azur transition-transform duration-500 ease-[var(--ease-douce)] ${
                        estActif(lien.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/estimation"
              className={`btn btn-primaire verre-reflet hidden sm:inline-flex ${
                condense ? "px-5 py-2.5 text-sm" : "px-6 py-3 text-sm"
              }`}
            >
              Estimer mon bien
            </Link>

            <button
              type="button"
              onClick={() => setOuvert((v) => !v)}
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--filet)] text-atlantique transition-colors duration-300 hover:bg-atlantique/5 lg:hidden"
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

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        aria-hidden={!ouvert}
        className={`fixed inset-0 z-40 lg:hidden ${
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
          className={`verre absolute inset-x-3 top-[5.5rem] rounded-[2rem] p-5 transition-all duration-500 ease-[var(--ease-douce)] ${
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
