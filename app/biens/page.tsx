import type { Metadata } from "next";
import { Suspense } from "react";
import { BIENS } from "@/lib/biens";
import { FiltresBiens } from "@/components/filtres-biens";
import { Apparition } from "@/components/apparition";
import { BandeauCta } from "@/components/bandeau-cta";

export const metadata: Metadata = {
  title: "Nos biens à la vente",
  description:
    "Propriétés d’exception, maisons de caractère et appartements avec vue à La Rochelle, sur l’île de Ré et l’île d’Oléron.",
};

export default function PageBiens() {
  return (
    <>
      <header className="mx-auto max-w-[78rem] px-5 pt-32 pb-12 sm:px-8 sm:pt-40 sm:pb-16">
        <Apparition>
          <p className="surtitre">Le portefeuille</p>
          <h1 className="titre mt-4 max-w-[17ch] text-[clamp(2.4rem,7vw,4.5rem)] text-atlantique">
            {BIENS.length} biens à la vente
          </h1>
          <p className="plume mt-5 max-w-[56ch]">
            Du pied-à-terre sous les arcades à l’hôtel particulier d’armateur.
            Une part de notre portefeuille ne paraît jamais ici&nbsp;:{" "}
            <a
              href="/contact"
              className="font-medium text-atlantique underline underline-offset-4 decoration-azur/40 transition-colors hover:decoration-azur"
            >
              confiez-nous votre recherche
            </a>
            .
          </p>
        </Apparition>
      </header>

      <Suspense
        fallback={
          <div className="mx-auto max-w-[78rem] px-5 py-20 text-sm text-encre-3 sm:px-8">
            Chargement du portefeuille…
          </div>
        }
      >
        <FiltresBiens />
      </Suspense>

      <div className="pt-24 sm:pt-32">
        <BandeauCta
          surtitre="Rien ne vous correspond ?"
          titre="Dites-nous ce que vous cherchez."
          texte="Nous suivons plus de quatre cents acquéreurs. Décrivez-nous votre projet : vous serez prévenu avant la mise en ligne, et parfois avant même la signature du mandat."
          image="dunes-mer"
          imageAlt="Dunes et océan sous un ciel pâle"
          actionPrincipale={{ href: "/contact", libelle: "Nous confier la recherche" }}
          actionSecondaire={{ href: "/estimation", libelle: "Estimer mon bien" }}
        />
      </div>
    </>
  );
}
