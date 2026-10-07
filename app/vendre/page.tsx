import type { Metadata } from "next";
import Link from "next/link";
import { ARGUMENTS_VENDEUR, ETAPES_VENTE } from "@/lib/agence";
import { ChiffresCles } from "@/components/chiffres-cles";
import { BandeauCta } from "@/components/bandeau-cta";
import { Apparition } from "@/components/apparition";
import { BoutonEstimer } from "@/components/bouton-estimer";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Vendre un bien",
  description:
    "Confier la vente de sa maison, de son appartement ou de sa propriété à La Rochelle : notre méthode, nos étapes, et une estimation écrite sous quatre jours.",
};

export default function PageVendre() {
  return (
    <>
      {/* ─── En-tête ───────────────────────────────────────── */}
      <header className="mx-auto max-w-[78rem] px-5 pt-32 sm:px-8 sm:pt-40">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <Apparition>
            <p className="surtitre">Vendre avec nous</p>
            <h1 className="titre mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,4.5rem)] text-atlantique">
              Une vente se prépare avant d’être annoncée.
            </h1>
            <p className="plume mt-6 max-w-[56ch] text-[1.0625rem]">
              Un bien bien présenté, au bon prix, se vend en quelques semaines.
              Mal présenté ou surévalué, il s’use en ligne pendant des mois et
              finit sous sa valeur. Tout notre travail tient dans cet écart.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BoutonEstimer variante="primaire" />
              <Link href="/contact" className="btn btn-contour">
                Parler à un conseiller
              </Link>
            </div>
          </Apparition>

          <Apparition delai={140}>
            <Photo
              src="chateau-tourelles"
              alt="Une demeure à tourelles entourée d’arbres"
              className="aspect-[4/3] rounded-[2rem] lg:aspect-[5/6]"
              sizes="(max-width: 1024px) 92vw, 30rem"
              flottement="lent"
            />
          </Apparition>
        </div>
      </header>

      {/* ─── Pourquoi nous confier sa vente ────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <p className="surtitre">Pourquoi nous</p>
          <h2 className="titre mt-4 max-w-[20ch] text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
            Quatre raisons de nous confier votre bien
          </h2>
        </Apparition>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {ARGUMENTS_VENDEUR.map((argument, index) => (
            <Apparition key={argument.titre} delai={index * 80}>
              <div className="carte carte-levee h-full rounded-[1.75rem] p-7 sm:p-9">
                <span className="chiffre text-[1.1rem] text-azur">
                  0{index + 1}
                </span>
                <h3 className="titre mt-3 text-[1.65rem] text-atlantique">
                  {argument.titre}
                </h3>
                <p className="plume mt-3 text-[0.9375rem]">{argument.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ─── Chiffres ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-24">
        <Apparition>
          <ChiffresCles />
        </Apparition>
      </section>

      {/* ─── Les étapes ────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Apparition>
              <p className="surtitre">Le déroulé</p>
              <h2 className="titre mt-4 text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
                Six étapes, de la première visite aux clés.
              </h2>
              <p className="plume mt-5 max-w-[42ch] text-sm">
                Vous recevez un point d’avancement à chaque étape. Aucune
                surprise, aucun frais avancé.
              </p>
              <Photo
                src="porte-parquet"
                alt="Une porte blanche ouverte sur un parquet ancien"
                className="mt-8 hidden aspect-[4/5] rounded-[2rem] lg:block"
                sizes="26rem"
                flottement="decale"
              />
            </Apparition>
          </div>

          <ol className="relative">
            {/* Filet vertical reliant les étapes */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[1.35rem] w-px bg-gradient-to-b from-azur/35 via-[var(--filet)] to-transparent"
            />
            {ETAPES_VENTE.map((etape, index) => (
              <li key={etape.numero} className="relative pb-9 last:pb-0">
                <Apparition delai={index * 70}>
                  <div className="flex gap-6">
                    <span className="verre chiffre relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm text-atlantique">
                      {etape.numero}
                    </span>
                    <div className="pt-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="titre text-[1.55rem] text-atlantique">
                          {etape.titre}
                        </h3>
                        <span className="rounded-full bg-ecume px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-atlantique-3 uppercase">
                          {etape.duree}
                        </span>
                      </div>
                      <p className="plume mt-2.5 max-w-[56ch] text-[0.9375rem]">
                        {etape.texte}
                      </p>
                    </div>
                  </div>
                </Apparition>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Honoraires ────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <div className="verre overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <p className="surtitre">Honoraires</p>
                <h2 className="titre mt-4 text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
                  Annoncés au premier rendez-vous, dus à la signature.
                </h2>
              </div>
              <div className="space-y-4">
                <p className="plume text-[0.9375rem]">
                  Nos honoraires sont dégressifs selon le prix de vente et
                  figurent sur le mandat. Ils ne sont dus qu’à la signature de
                  l’acte authentique : si la vente ne se fait pas, vous ne nous
                  devez rien.
                </p>
                <p className="plume text-[0.9375rem]">
                  La production — photographie d’architecture, plans, visite
                  immersive, rédaction — est intégralement prise en charge par
                  l’agence, et reste à votre disposition quoi qu’il advienne.
                </p>
              </div>
            </div>
          </div>
        </Apparition>
      </section>

      {/* ─── Appel à l'action ──────────────────────────────── */}
      <div className="pt-24 sm:pt-32">
        <BandeauCta
          surtitre="Première étape"
          titre="Combien vaut votre bien aujourd’hui ?"
          texte="Un rendez-vous chez vous, une analyse des ventes réellement signées dans votre rue, et un avis de valeur écrit sous quatre jours. Sans engagement."
          image="plage-marcheurs"
          imageAlt="Deux promeneurs sur un sentier de plage"
          actionPrincipale={{ href: "/estimation", libelle: "Estimer mon bien" }}
          actionSecondaire={{ href: "/contact", libelle: "Nous écrire" }}
        />
      </div>
    </>
  );
}
