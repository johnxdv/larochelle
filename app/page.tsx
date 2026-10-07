import Link from "next/link";
import { BIENS, coupsDeCoeur } from "@/lib/biens";
import { QUARTIERS } from "@/lib/quartiers";
import { VALEURS } from "@/lib/agence";
import { nombre } from "@/lib/format";
import { HeroIntro } from "@/components/hero-intro";
import { CarrouselBiens } from "@/components/carrousel-biens";
import { ChiffresCles } from "@/components/chiffres-cles";
import { Temoignages } from "@/components/temoignages";
import { BandeauCta } from "@/components/bandeau-cta";
import { Apparition } from "@/components/apparition";
import { Photo } from "@/components/photo";

export default function Accueil() {
  // La sélection met en avant les coups de cœur, complétés par les exclusivités.
  const selection = [
    ...coupsDeCoeur(),
    ...BIENS.filter((b) => !b.coupDeCoeur && b.exclusivite),
    ...BIENS.filter((b) => !b.coupDeCoeur && !b.exclusivite),
  ].slice(0, 8);

  const quartiersEnAvant = QUARTIERS.slice(0, 6);

  return (
    <>
      <HeroIntro />

      {/* ─── Manifeste ─────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Apparition>
            <p className="surtitre">La maison</p>
            <h2 className="titre mt-4 text-[clamp(2.1rem,5.6vw,3.75rem)] text-atlantique">
              Nous ne vendons pas des mètres carrés. Nous transmettons des
              adresses.
            </h2>
          </Apparition>

          <Apparition delai={120} className="lg:pt-6">
            <div className="space-y-5">
              <p className="plume">
                Une maison de La Genette, un dernier étage sur le Vieux-Port,
                une villa posée dans les pins de Saint-Maurice : chacun de ces
                biens a une histoire, une orientation, un bruit de rue. Nous
                prenons le temps de les comprendre avant de les présenter.
              </p>
              <p className="plume">
                Depuis 2008, Ashley Immobilier ne travaille que trois
                territoires — La Rochelle, Ré et Oléron — et refuse les mandats
                qu’elle ne peut pas défendre. C’est ce qui nous permet d’être
                justes sur un prix, et rapides sur une vente.
              </p>
              <Link
                href="/agence"
                className="group inline-flex items-center gap-2 pt-2 text-sm font-semibold text-atlantique"
              >
                Découvrir notre approche
                <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--filet)] transition-all duration-500 ease-[var(--ease-douce)] group-hover:border-transparent group-hover:bg-atlantique group-hover:text-calcaire">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
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
          </Apparition>
        </div>

        {/* Triptyque d'ambiance */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5 lg:grid-cols-4">
          <Apparition className="lg:col-span-2">
            <Photo
              src="quai-facades"
              alt="Façades claires au bord de l’eau à La Rochelle"
              className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem]"
              sizes="(max-width: 1024px) 46vw, 36rem"
              flottement="lent"
            />
          </Apparition>
          <Apparition delai={100}>
            <Photo
              src="sejour-chevrons"
              alt="Un séjour au parquet en point de Hongrie"
              className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] lg:aspect-[3/4]"
              sizes="(max-width: 1024px) 46vw, 18rem"
              flottement="decale"
            />
          </Apparition>
          <Apparition delai={200} className="col-span-2 lg:col-span-1">
            <Photo
              src="canal-bateaux"
              alt="Les tours de La Rochelle et les bateaux du chenal"
              className="aspect-[16/9] rounded-[1.5rem] sm:rounded-[2rem] lg:aspect-[3/4]"
              sizes="(max-width: 1024px) 92vw, 18rem"
              flottement="normal"
            />
          </Apparition>
        </div>
      </section>

      {/* ─── Sélection de biens ────────────────────────────── */}
      <section className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
          <Apparition>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="surtitre">Notre sélection</p>
                <h2 className="titre mt-4 max-w-[16ch] text-[clamp(2.1rem,5.6vw,3.75rem)] text-atlantique">
                  Biens d’exception à la vente
                </h2>
              </div>
              <Link href="/biens" className="btn btn-contour">
                Voir les {BIENS.length} biens
              </Link>
            </div>
          </Apparition>
        </div>

        <div className="mt-10 -mx-0">
          <CarrouselBiens biens={selection} />
        </div>
      </section>

      {/* ─── Quartiers ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <Apparition>
          <p className="surtitre">La Rochelle, rue par rue</p>
          <h2 className="titre mt-4 max-w-[18ch] text-[clamp(2.1rem,5.6vw,3.75rem)] text-atlantique">
            Chaque quartier a son prix, et ses raisons.
          </h2>
          <p className="plume mt-5 max-w-[54ch]">
            Les fourchettes ci-dessous sont celles que nous constatons sur nos
            propres transactions. Elles bougent d’une rue à l’autre, parfois
            d’un numéro à l’autre.
          </p>
        </Apparition>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quartiersEnAvant.map((quartier, index) => (
            <Apparition key={quartier.slug} delai={Math.min(index, 3) * 90}>
              <Link
                href={`/biens?quartier=${quartier.slug}`}
                className="group relative block overflow-hidden rounded-[1.75rem]"
              >
                <Photo
                  src={quartier.image}
                  alt={`${quartier.nom}, La Rochelle`}
                  className="aspect-[5/6] transition-transform duration-[1.4s] ease-[var(--ease-douce)] group-hover:scale-[1.05] sm:aspect-[4/5]"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24rem"
                  flottement={index % 2 === 0 ? "lent" : "decale"}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-atlantique/85 via-atlantique/20 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-ecume/90 uppercase">
                    {quartier.accroche}
                  </p>
                  <h3 className="titre mt-1.5 text-[1.75rem] text-calcaire">
                    {quartier.nom}
                  </h3>

                  {/* La description se déploie au survol */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-douce)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-ecume/80">
                      <span className="block pt-3">{quartier.description}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-calcaire/20 pt-3">
                    <span className="chiffre text-sm text-calcaire">
                      {nombre(quartier.prixM2[0])} – {nombre(quartier.prixM2[1])} €/m²
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 place-items-center rounded-full border border-calcaire/30 text-calcaire transition-all duration-500 group-hover:border-transparent group-hover:bg-calcaire group-hover:text-atlantique"
                    >
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ─── Chiffres clés ─────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <Apparition>
          <ChiffresCles />
        </Apparition>
      </section>

      {/* ─── Approche ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Apparition>
              <p className="surtitre">Notre approche</p>
              <h2 className="titre mt-4 text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
                Quatre principes, tenus depuis le premier mandat.
              </h2>
              <Photo
                src="yacht-quai"
                alt="Un yacht amarré le long d’un quai de La Rochelle"
                className="mt-8 hidden aspect-[4/5] rounded-[2rem] lg:block"
                sizes="28rem"
                flottement="lent"
              />
            </Apparition>
          </div>

          <ol className="space-y-px overflow-hidden rounded-[1.75rem] bg-[var(--filet)]">
            {VALEURS.map((valeur, index) => (
              <li key={valeur.titre}>
                <Apparition delai={index * 80}>
                  <div className="group bg-calcaire/75 px-6 py-8 backdrop-blur-sm transition-colors duration-500 hover:bg-white/80 sm:px-9 sm:py-10">
                    <div className="flex items-start gap-5">
                      <span className="chiffre mt-1 text-[1.15rem] text-azur tabular-nums">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="titre text-[1.6rem] text-atlantique">
                          {valeur.titre}
                        </h3>
                        <p className="plume mt-3 max-w-[56ch] text-[0.9375rem]">
                          {valeur.texte}
                        </p>
                      </div>
                    </div>
                  </div>
                </Apparition>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Témoignages ───────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <p className="surtitre">Ils nous ont confié leur bien</p>
          <h2 className="titre mt-4 mb-10 max-w-[16ch] text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
            Ce qu’en disent nos vendeurs
          </h2>
        </Apparition>
        <Apparition delai={100}>
          <Temoignages />
        </Apparition>
      </section>

      {/* ─── Appel à l'action ──────────────────────────────── */}
      <div className="pt-24 sm:pt-32">
        <BandeauCta
          surtitre="Vous vendez ?"
          titre="Sachez d’abord ce que vaut votre bien."
          texte="Un rendez-vous d’estimation chez vous, un avis de valeur écrit et argumenté sous quatre jours. C’est gratuit, sans engagement, et le document reste le vôtre."
          image="chemin-plage"
          imageAlt="Un chemin de sable descendant vers l’océan"
          actionPrincipale={{ href: "/estimation", libelle: "Estimer mon bien" }}
          actionSecondaire={{ href: "/vendre", libelle: "Comment nous vendons" }}
        />
      </div>
    </>
  );
}
