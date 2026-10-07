import Link from "next/link";
import { Photo } from "@/components/photo";
import { Apparition } from "@/components/apparition";
import { BoutonEstimer } from "@/components/bouton-estimer";

type Props = {
  surtitre?: string;
  titre: string;
  texte: string;
  image?: string;
  imageAlt?: string;
  actionPrincipale?: { href: string; libelle: string };
  actionSecondaire?: { href: string; libelle: string };
};

/** Appel à l'action pleine largeur, sur fond photographique voilé de bleu. */
export function BandeauCta({
  surtitre = "Passer à l’action",
  titre,
  texte,
  image = "dunes-sable",
  imageAlt = "Dunes et océan sur la côte atlantique",
  actionPrincipale = { href: "/estimation", libelle: "Estimer mon bien" },
  actionSecondaire,
}: Props) {
  return (
    <section className="mx-auto max-w-[78rem] px-5 sm:px-8">
      <Apparition>
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <Photo
            src={image}
            alt={imageAlt}
            plein
            sizes="(max-width: 1280px) 100vw, 72rem"
            flottement="decale"
            cadrage={55}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-atlantique/88 via-atlantique/72 to-atlantique-3/62"
          />

          <div className="relative px-6 py-14 sm:px-14 sm:py-20">
            <p className="surtitre text-azur-2">{surtitre}</p>
            <h2 className="titre mt-4 max-w-[20ch] text-[clamp(2rem,5.6vw,3.5rem)] text-calcaire">
              {titre}
            </h2>
            <p className="plume mt-5 max-w-[52ch] text-ecume/85">{texte}</p>

            {/* Le bouton d'estimation garde partout le même traitement : dès
                qu'une action mène à /estimation, elle passe par son composant. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actionPrincipale.href === "/estimation" ? (
                <BoutonEstimer className="px-7 py-4 text-base" />
              ) : (
                <Link
                  href={actionPrincipale.href}
                  className="btn btn-verre verre-reflet px-7 py-4 text-base"
                >
                  {actionPrincipale.libelle}
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
              {actionSecondaire ? (
                actionSecondaire.href === "/estimation" ? (
                  <BoutonEstimer className="px-7 py-4 text-base" />
                ) : (
                  <Link
                    href={actionSecondaire.href}
                    className="btn px-7 py-4 text-base text-calcaire ring-1 ring-calcaire/35 transition-colors hover:bg-calcaire/10"
                  >
                    {actionSecondaire.libelle}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </Apparition>
    </section>
  );
}
