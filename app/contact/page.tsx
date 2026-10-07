import type { Metadata } from "next";
import { AGENCE } from "@/lib/agence";
import { FormulaireContact } from "@/components/formulaire-contact";
import { Apparition } from "@/components/apparition";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à Ashley Immobilier, 12 quai Duperré à La Rochelle. Vente, estimation, recherche de bien et location sur La Rochelle, Ré et Oléron.",
};

export default function PageContact() {
  return (
    <>
      <header className="mx-auto max-w-[78rem] px-5 pt-32 sm:px-8 sm:pt-40">
        <Apparition>
          <p className="surtitre">Nous écrire</p>
          <h1 className="titre mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,4.5rem)] text-atlantique">
            Dites-nous où vous en êtes.
          </h1>
          <p className="plume mt-6 max-w-[54ch] text-[1.0625rem]">
            Que vous soyez à six mois d’un projet ou sur le point de signer, le
            premier échange est toujours utile — et sans engagement.
          </p>
        </Apparition>
      </header>

      <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <Apparition>
            <FormulaireContact />
          </Apparition>

          <Apparition delai={120} className="space-y-5">
            <div className="carte rounded-[1.75rem] p-6 sm:p-7">
              <h2 className="titre text-[1.5rem] text-atlantique">L’agence</h2>
              <address className="mt-4 space-y-4 text-sm not-italic text-encre-2">
                <p>
                  {AGENCE.adresse.rue}
                  <br />
                  {AGENCE.adresse.codePostal} {AGENCE.adresse.ville}
                </p>
                <p className="flex flex-col gap-1.5">
                  <a
                    href={`tel:${AGENCE.telephoneLien}`}
                    className="font-medium text-atlantique transition-colors hover:text-azur"
                  >
                    {AGENCE.telephone}
                  </a>
                  <a
                    href={`mailto:${AGENCE.email}`}
                    className="font-medium text-atlantique transition-colors hover:text-azur"
                  >
                    {AGENCE.email}
                  </a>
                </p>
              </address>

              <h3 className="surtitre mt-7">Horaires</h3>
              <dl className="mt-3 space-y-2 text-sm">
                {AGENCE.horaires.map((creneau) => (
                  <div
                    key={creneau.jours}
                    className="flex justify-between gap-4 border-b border-[var(--filet)] pb-2 last:border-b-0"
                  >
                    <dt className="text-encre-3">{creneau.jours}</dt>
                    <dd className="font-medium text-encre">{creneau.heures}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem]">
              <Photo
                src="yacht-quai"
                alt="Un yacht amarré le long d’un quai de La Rochelle"
                className="aspect-[4/3]"
                sizes="(max-width: 1024px) 92vw, 22rem"
                flottement="lent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-atlantique/80 to-transparent"
              />
              <p className="absolute inset-x-0 bottom-0 p-5 text-sm text-ecume/90">
                À deux pas des tours, face au bassin des yachts. Le parking de la
                Verdière est à quatre minutes à pied.
              </p>
            </div>
          </Apparition>
        </div>

        <Apparition delai={200}>
          <p className="mt-8 text-xs text-encre-3">
            Site de démonstration : l’adresse, le téléphone et l’adresse
            électronique ci-dessus sont fictifs, et le formulaire n’envoie
            réellement aucun message.
          </p>
        </Apparition>
      </section>
    </>
  );
}
