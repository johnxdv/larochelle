import type { Metadata } from "next";
import { AGENCE, EQUIPE, SECTEURS, VALEURS } from "@/lib/agence";
import { Medaillon } from "@/components/medaillon";
import { ChiffresCles } from "@/components/chiffres-cles";
import { BandeauCta } from "@/components/bandeau-cta";
import { Apparition } from "@/components/apparition";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "L’agence",
  description:
    "Ashley Immobilier : une maison de transaction fondée en 2008 à La Rochelle, spécialisée dans les propriétés d’exception sur la côte atlantique.",
};

const JALONS = [
  {
    annee: "2008",
    titre: "Une pièce, quai Duperré",
    texte:
      "Ashley Vaneau ouvre l’agence avec un seul mandat : une maison de la rue Saint-Jean-du-Pérot. Elle se vend en trois semaines.",
  },
  {
    annee: "2013",
    titre: "Le passage aux îles",
    texte:
      "Les premiers mandats sur Ré, puis Oléron. Le périmètre est arrêté ce jour-là, et n’a pas bougé depuis.",
  },
  {
    annee: "2017",
    titre: "Un studio photo intégré",
    texte:
      "Plutôt que de sous-traiter, l’agence recrute un photographe d’architecture. Chaque bien passe désormais par son studio avant diffusion.",
  },
  {
    annee: "2024",
    titre: "Six cents ventes",
    texte:
      "Le cap est franchi sans élargir le territoire ni ouvrir d’autre adresse. C’était le pari du départ.",
  },
] as const;

export default function PageAgence() {
  return (
    <>
      {/* ─── En-tête ───────────────────────────────────────── */}
      <header className="mx-auto max-w-[78rem] px-5 pt-32 sm:px-8 sm:pt-40">
        <Apparition>
          <p className="surtitre">La maison</p>
          <h1 className="titre mt-4 max-w-[17ch] text-[clamp(2.4rem,7vw,4.5rem)] text-atlantique">
            Une agence, trois territoires, aucune succursale.
          </h1>
          <p className="plume mt-6 max-w-[58ch] text-[1.0625rem]">
            Ashley Immobilier est née en 2008 d’une conviction simple&nbsp;: on
            ne peut bien vendre que ce que l’on connaît intimement. Nous avons
            donc choisi de rester petits, et de ne jamais sortir de La Rochelle,
            de Ré et d’Oléron.
          </p>
        </Apparition>

        <Apparition delai={120}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            <Photo
              src="vue-aerienne-ville"
              alt="Vue aérienne des toits de La Rochelle"
              className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] lg:col-span-2 lg:aspect-[16/10]"
              sizes="(max-width: 1024px) 46vw, 46rem"
              priority
              flottement="lent"
            />
            <Photo
              src="voilier-blanc"
              alt="Un voilier blanc sur une mer calme"
              className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] lg:aspect-[16/10]"
              sizes="(max-width: 1024px) 46vw, 23rem"
              flottement="decale"
            />
          </div>
        </Apparition>
      </header>

      {/* ─── Chiffres ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-20 sm:px-8 sm:pt-24">
        <Apparition>
          <ChiffresCles />
        </Apparition>
      </section>

      {/* ─── Histoire ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Apparition>
              <p className="surtitre">Notre histoire</p>
              <h2 className="titre mt-4 text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
                Dix-huit ans, une seule adresse.
              </h2>
            </Apparition>
          </div>

          <ol className="space-y-px overflow-hidden rounded-[1.75rem] bg-[var(--filet)]">
            {JALONS.map((jalon, index) => (
              <li key={jalon.annee}>
                <Apparition delai={index * 70}>
                  <div className="bg-calcaire/75 px-6 py-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/80 sm:px-9 sm:py-9">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <span className="chiffre text-[1.75rem] leading-none text-azur">
                        {jalon.annee}
                      </span>
                      <h3 className="titre text-[1.5rem] text-atlantique">
                        {jalon.titre}
                      </h3>
                    </div>
                    <p className="plume mt-3 max-w-[58ch] text-[0.9375rem]">
                      {jalon.texte}
                    </p>
                  </div>
                </Apparition>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Valeurs ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <p className="surtitre">Nos valeurs</p>
          <h2 className="titre mt-4 max-w-[18ch] text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
            Ce à quoi nous nous tenons
          </h2>
        </Apparition>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALEURS.map((valeur, index) => (
            <Apparition key={valeur.titre} delai={index * 80}>
              <div className="carte carte-levee h-full rounded-[1.75rem] p-7 sm:p-9">
                <h3 className="titre text-[1.6rem] text-atlantique">
                  {valeur.titre}
                </h3>
                <p className="plume mt-3 text-[0.9375rem]">{valeur.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ─── Équipe ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <p className="surtitre">L’équipe</p>
          <h2 className="titre mt-4 max-w-[18ch] text-[clamp(2.1rem,5.6vw,3.5rem)] text-atlantique">
            Six personnes, et un seul interlocuteur par vente.
          </h2>
        </Apparition>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPE.map((membre, index) => (
            <Apparition key={membre.nom} delai={Math.min(index, 3) * 80}>
              <div className="carte carte-levee group h-full rounded-[1.75rem] p-6 sm:p-7">
                <Medaillon
                  nom={membre.nom}
                  className="h-20 w-20 text-[3rem] transition-transform duration-700 ease-[var(--ease-douce)] group-hover:scale-105"
                />
                <h3 className="titre mt-5 text-[1.45rem] text-atlantique">
                  {membre.nom}
                </h3>
                <p className="mt-1 text-[0.8125rem] font-semibold tracking-wide text-azur uppercase">
                  {membre.role}
                </p>
                <p className="plume mt-3 text-sm">{membre.note}</p>
              </div>
            </Apparition>
          ))}
        </div>

        <Apparition delai={120}>
          <p className="mt-6 text-xs text-encre-3">
            Les portraits sont représentés par leurs initiales : ce site de
            démonstration n’utilise aucune photographie de personne réelle.
          </p>
        </Apparition>
      </section>

      {/* ─── Secteurs ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[78rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <Apparition>
          <div className="verre flex flex-col gap-8 rounded-[2rem] px-6 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="surtitre">Notre périmètre</p>
              <h2 className="titre mt-3 text-[clamp(1.7rem,4vw,2.4rem)] text-atlantique">
                Là où nous intervenons
              </h2>
              <p className="plume mt-3 max-w-[48ch] text-sm">
                Au-delà de ces communes, nous préférons vous orienter vers un
                confrère plutôt que de prendre un mandat que nous ne pourrions
                pas défendre.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {SECTEURS.map((secteur) => (
                <li
                  key={secteur}
                  className="rounded-full border border-[var(--filet)] bg-white/50 px-4 py-2.5 text-sm font-medium text-atlantique"
                >
                  {secteur}
                </li>
              ))}
            </ul>
          </div>
        </Apparition>
      </section>

      {/* ─── Appel à l'action ──────────────────────────────── */}
      <div className="pt-24 sm:pt-32">
        <BandeauCta
          surtitre="Faisons connaissance"
          titre="Venez nous voir, quai Duperré."
          texte={`Notre porte est ouverte du mardi au samedi, au ${AGENCE.adresse.rue}. Un café, une heure, et une lecture honnête de votre projet.`}
          image="canal-bateaux"
          imageAlt="Les quais de La Rochelle et les bateaux du chenal"
          actionPrincipale={{ href: "/contact", libelle: "Nous écrire" }}
          actionSecondaire={{ href: "/estimation", libelle: "Estimer mon bien" }}
        />
      </div>
    </>
  );
}
