import Link from "next/link";
import { Photo } from "@/components/photo";

export default function Introuvable() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-32 sm:px-8">
      <Photo
        src="bateau-chenal"
        alt=""
        plein
        sizes="100vw"
        priority
        flottement="lent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-calcaire/92 via-calcaire/88 to-calcaire"
      />

      <div className="relative mx-auto max-w-[40rem] text-center">
        <p className="surtitre">Erreur 404</p>
        <h1 className="titre mt-4 text-[clamp(2.4rem,8vw,4.5rem)] text-atlantique">
          Cette page a pris le large.
        </h1>
        <p className="plume mx-auto mt-5 max-w-[42ch]">
          Le bien que vous cherchiez a peut-être été vendu, ou l’adresse a
          changé. Le portefeuille complet reste à un clic.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/biens" className="btn btn-primaire verre-reflet">
            Voir nos biens
          </Link>
          <Link href="/" className="btn btn-contour">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
