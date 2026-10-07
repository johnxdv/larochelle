import type { Metadata } from "next";
import { Suspense } from "react";
import Estimer from "@/components/estimation/Estimer";

export const metadata: Metadata = {
  title: "Estimer mon bien",
  description:
    "Estimez gratuitement votre maison ou votre appartement : adresse, repérage du bâtiment sur photo aérienne, analyse et fourchette de prix en quelques secondes.",
};

/**
 * Parcours d'estimation, repris tel quel du moteur (voir components/estimation).
 *
 * `?type=maison|appartement` est transmis au parcours sans modifier le calcul :
 * le type reste détecté par le moteur, le type annoncé accompagne la demande.
 * Sa lecture est isolée dans un Suspense, pour que la page garde une coquille
 * statique.
 */
async function Parcours({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const typeAnnonce = type === "maison" || type === "appartement" ? type : null;
  return <Estimer typeAnnonce={typeAnnonce} />;
}

/** Le temps que le type soit lu : la place du parcours, sans rien y afficher. */
function Attente() {
  return <div aria-hidden="true" className="min-h-[100svh]" />;
}

export default function PageEstimation(props: PageProps<"/estimation">) {
  return (
    <Suspense fallback={<Attente />}>
      <Parcours searchParams={props.searchParams} />
    </Suspense>
  );
}
