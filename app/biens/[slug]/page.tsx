import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BIENS, bienParSlug, biensSimilaires } from "@/lib/biens";
import { quartierParSlug } from "@/lib/quartiers";
import { chambres, nombre, pieces, prix, prixAuM2, surface } from "@/lib/format";
import { AGENCE } from "@/lib/agence";
import { Galerie } from "@/components/galerie";
import { EtiquetteEnergie } from "@/components/etiquette-energie";
import { FormulaireContact } from "@/components/formulaire-contact";
import { CarteBien } from "@/components/carte-bien";
import { Apparition } from "@/components/apparition";
import { Photo } from "@/components/photo";

/**
 * Les douze fiches sont prérendues (voir generateStaticParams), et la page
 * entière dépend du slug : il n'y a pas de coquille utile à afficher avant
 * de connaître le bien. On autorise donc une route bloquante plutôt que
 * d'envelopper tout le contenu dans un Suspense qui ne montrerait rien.
 */
export const instant = false;

export function generateStaticParams() {
  return BIENS.map((bien) => ({ slug: bien.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/biens/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const bien = bienParSlug(slug);
  if (!bien) return { title: "Bien introuvable" };

  return {
    title: `${bien.titre} — ${prix(bien.prix)}`,
    description: bien.accroche,
  };
}

/** Une ligne du tableau de caractéristiques. */
function Caracteristique({
  libelle,
  valeur,
}: {
  libelle: string;
  valeur: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--filet)] py-3 last:border-b-0">
      <dt className="text-sm text-encre-3">{libelle}</dt>
      <dd className="text-right text-sm font-medium text-encre">{valeur}</dd>
    </div>
  );
}

export default async function FicheBien({ params }: PageProps<"/biens/[slug]">) {
  const { slug } = await params;
  const bien = bienParSlug(slug);
  if (!bien) notFound();

  const quartier = quartierParSlug(bien.quartier);
  const similaires = biensSimilaires(bien);

  const caracteristiques = [
    { libelle: "Type de bien", valeur: bien.type },
    { libelle: "Surface habitable", valeur: surface(bien.surface) },
    ...(bien.terrain
      ? [{ libelle: "Terrain", valeur: surface(bien.terrain) }]
      : []),
    { libelle: "Pièces", valeur: pieces(bien.pieces) },
    { libelle: "Chambres", valeur: chambres(bien.chambres) },
    {
      libelle: "Salles de bains",
      valeur: `${bien.sallesDeBain} salle${bien.sallesDeBain > 1 ? "s" : ""} d’eau`,
    },
    ...(bien.etage
      ? [
          {
            libelle: "Étage",
            valeur: `${bien.etage.niveau}ᵉ sur ${bien.etage.sur}${
              bien.etage.ascenseur ? ", avec ascenseur" : ", sans ascenseur"
            }`,
          },
        ]
      : []),
    { libelle: "Année", valeur: bien.annee },
    { libelle: "Exposition", valeur: bien.exposition },
    { libelle: "Prix au m²", valeur: prixAuM2(bien.prix, bien.surface) },
    {
      libelle: "Taxe foncière",
      valeur: `${nombre(bien.taxeFonciere)} € / an`,
    },
    ...(bien.chargesAnnuelles
      ? [
          {
            libelle: "Charges de copropriété",
            valeur: `${nombre(bien.chargesAnnuelles)} € / an`,
          },
        ]
      : []),
    { libelle: "Référence", valeur: bien.reference },
  ];

  return (
    <article className="pt-28 sm:pt-36">
      {/* ─── Titre ─────────────────────────────────────────── */}
      <header className="mx-auto max-w-[78rem] px-5 pb-8 sm:px-8 sm:pb-10">
        <nav aria-label="Fil d’Ariane" className="mb-7 text-[0.8125rem] text-encre-3">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-atlantique">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href="/biens" className="transition-colors hover:text-atlantique">
                Nos biens
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-encre-2">{bien.titre}</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="surtitre">
                {quartier?.nom} · {bien.type}
              </span>
              {bien.exclusivite ? (
                <span className="rounded-full bg-atlantique px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-calcaire uppercase">
                  Exclusivité
                </span>
              ) : null}
              {bien.coupDeCoeur ? (
                <span className="rounded-full bg-sable px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-atlantique uppercase">
                  Coup de cœur
                </span>
              ) : null}
            </div>

            <h1 className="titre mt-3 max-w-[18ch] text-[clamp(2.3rem,6.4vw,4.25rem)] text-atlantique">
              {bien.titre}
            </h1>
            <p className="plume mt-4 max-w-[54ch]">{bien.accroche}</p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="chiffre text-[clamp(2rem,5vw,2.75rem)] leading-none text-atlantique">
              {prix(bien.prix)}
            </p>
            <p className="mt-2 text-[0.8125rem] text-encre-3">
              Soit {prixAuM2(bien.prix, bien.surface)} · Honoraires à la charge
              du vendeur
            </p>
          </div>
        </div>
      </header>

      {/* ─── Galerie ───────────────────────────────────────── */}
      <section className="sm:mx-auto sm:max-w-[78rem] sm:px-8">
        <Galerie photos={bien.photos} titre={bien.titre} />
      </section>

      {/* ─── Description et caractéristiques ───────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16">
          <div>
            <Apparition>
              <h2 className="titre text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
                Le bien
              </h2>
              <div className="mt-6 space-y-5">
                {bien.description.map((paragraphe) => (
                  <p key={paragraphe.slice(0, 40)} className="plume text-[1.0625rem]">
                    {paragraphe}
                  </p>
                ))}
              </div>
            </Apparition>

            <Apparition delai={80}>
              <h3 className="titre mt-12 text-[1.6rem] text-atlantique">
                Ce qui fait sa valeur
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {bien.atouts.map((atout) => (
                  <li
                    key={atout}
                    className="flex items-start gap-3 rounded-2xl bg-white/55 px-4 py-3.5 text-sm text-encre-2 backdrop-blur-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-azur/15 text-azur"
                    >
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path
                          d="m3.5 8.5 3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {atout}
                  </li>
                ))}
              </ul>
            </Apparition>

            <Apparition delai={120}>
              <h3 className="titre mt-12 text-[1.6rem] text-atlantique">
                Prestations
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {bien.prestations.map((prestation) => (
                  <li
                    key={prestation}
                    className="rounded-full border border-[var(--filet)] px-3.5 py-2 text-[0.8125rem] text-encre-2"
                  >
                    {prestation}
                  </li>
                ))}
              </ul>
            </Apparition>
          </div>

          {/* Colonne latérale */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="carte rounded-[1.75rem] p-6">
              <h2 className="titre text-[1.5rem] text-atlantique">
                Caractéristiques
              </h2>
              <dl className="mt-4">
                {caracteristiques.map((ligne) => (
                  <Caracteristique key={ligne.libelle} {...ligne} />
                ))}
              </dl>
            </div>

            <div className="verre mt-5 rounded-[1.75rem] p-6">
              <p className="surtitre">Visiter ce bien</p>
              <p className="plume mt-3 text-sm">
                Les visites sont accompagnées par le consultant en charge du
                bien, du mardi au samedi.
              </p>
              <a href="#contact-bien" className="btn btn-primaire verre-reflet mt-5 w-full">
                Demander une visite
              </a>
              <a
                href={`tel:${AGENCE.telephoneLien}`}
                className="btn btn-contour mt-2.5 w-full"
              >
                {AGENCE.telephone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Diagnostics ───────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-24">
        <Apparition>
          <h2 className="titre text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
            Diagnostic de performance énergétique
          </h2>
          <p className="plume mt-4 max-w-[56ch] text-sm">
            Réalisé selon la méthode réglementaire en vigueur. Les montants
            d’énergie sont estimés pour un usage standardisé du logement.
          </p>
        </Apparition>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Apparition>
            <EtiquetteEnergie
              nature="dpe"
              classe={bien.dpe.classe}
              valeur={bien.dpe.valeur}
            />
          </Apparition>
          <Apparition delai={90}>
            <EtiquetteEnergie
              nature="ges"
              classe={bien.ges.classe}
              valeur={bien.ges.valeur}
            />
          </Apparition>
        </div>
      </section>

      {/* ─── Localisation ──────────────────────────────────── */}
      {quartier ? (
        <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-24">
          <Apparition>
            <p className="surtitre">Localisation</p>
            <h2 className="titre mt-4 text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
              {quartier.nom}, {AGENCE.adresse.ville}
            </h2>
          </Apparition>

          <Apparition delai={80}>
            <div className="relative mt-8 overflow-hidden rounded-[2rem]">
              <Photo
                src={quartier.image}
                alt={`${quartier.nom}, ${AGENCE.adresse.ville}`}
                className="aspect-[4/5] sm:aspect-[16/9]"
                sizes="(max-width: 1280px) 100vw, 72rem"
                flottement="lent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-atlantique/88 via-atlantique/35 to-transparent sm:bg-gradient-to-r sm:from-atlantique/90 sm:via-atlantique/45 sm:to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:inset-y-0 sm:right-auto sm:flex sm:w-[30rem] sm:flex-col sm:justify-center sm:p-10">
                <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-azur-2 uppercase">
                  {quartier.accroche}
                </p>
                <p className="plume mt-3 text-sm text-ecume/85">
                  {quartier.description}
                </p>

                <dl className="mt-6 space-y-2.5">
                  {bien.reperes.map((repere) => (
                    <div
                      key={repere.lieu}
                      className="flex items-center justify-between gap-4 border-b border-calcaire/15 pb-2.5 text-sm last:border-b-0"
                    >
                      <dt className="flex items-center gap-2.5 text-ecume/85">
                        <span
                          aria-hidden="true"
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-calcaire/25"
                        >
                          <span className="block h-1.5 w-1.5 rounded-full bg-azur-2" />
                        </span>
                        {repere.lieu}
                      </dt>
                      <dd className="chiffre shrink-0 text-calcaire">
                        {repere.duree}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-xs text-ecume/60">
                  Prix constatés dans le quartier :{" "}
                  <span className="chiffre text-ecume/85">
                    {nombre(quartier.prixM2[0])} – {nombre(quartier.prixM2[1])} €/m²
                  </span>
                </p>
              </div>
            </div>
          </Apparition>
        </section>
      ) : null}

      {/* ─── Contact ───────────────────────────────────────── */}
      <section
        id="contact-bien"
        className="mx-auto max-w-[78rem] scroll-mt-28 px-5 pt-20 sm:px-8 sm:pt-24"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Apparition>
            <p className="surtitre">Ce bien vous intéresse</p>
            <h2 className="titre mt-4 text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
              Demander une visite
            </h2>
            <p className="plume mt-4 text-sm">
              Indiquez-nous vos disponibilités : nous vous proposons un créneau
              sous vingt-quatre heures. Référence du bien :{" "}
              <span className="chiffre font-medium text-encre">
                {bien.reference}
              </span>
              .
            </p>
          </Apparition>

          <Apparition delai={80}>
            <FormulaireContact
              compact
              libelleEnvoi="Demander une visite"
              messageInitial={`Bonjour, je souhaite visiter le bien ${bien.reference} — ${bien.titre}.`}
            />
          </Apparition>
        </div>
      </section>

      {/* ─── Biens similaires ──────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="titre text-[clamp(1.8rem,4.4vw,2.6rem)] text-atlantique">
              Vous aimerez aussi
            </h2>
            <Link href="/biens" className="btn btn-contour">
              Tout le portefeuille
            </Link>
          </div>
        </Apparition>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similaires.map((autre, index) => (
            <Apparition key={autre.slug} delai={index * 90}>
              <CarteBien bien={autre} />
            </Apparition>
          ))}
        </div>
      </section>
    </article>
  );
}
