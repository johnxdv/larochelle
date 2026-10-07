import Image from "next/image";

type Flottement = "aucun" | "normal" | "lent" | "decale";

type Props = {
  /** Nom du fichier dans public/images, sans extension */
  src: string;
  alt: string;
  /** Classes du cadre : arrondi, proportions, position */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Léger mouvement de flottement de l'image dans son cadre */
  flottement?: Flottement;
  /** Voile dégradé posé sur l'image, pour faire passer du texte par-dessus */
  voile?: boolean;
  /**
   * Image de fond occupant tout le parent positionné.
   * À préférer à une classe `absolute` dans `className` : les deux
   * utilitaires de position se disputeraient la cascade, et le cadre
   * se retrouverait sans hauteur.
   */
  plein?: boolean;
  /**
   * Décalage vertical du cadrage, de 0 (haut) à 100 (bas).
   * Laisser vide pour piloter le cadrage par classes utilitaires
   * (object-position), par exemple pour varier selon la largeur d'écran.
   */
  cadrage?: number;
};

const CLASSES_FLOTTEMENT: Record<Flottement, string> = {
  aucun: "",
  normal: "flotte",
  lent: "flotte-lent",
  decale: "flotte-decale",
};

/**
 * Image d'ambiance : cadre arrondi, recadrage par remplissage,
 * et léger flottement continu.
 */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  flottement = "normal",
  voile = false,
  plein = false,
  cadrage,
}: Props) {
  return (
    <div
      className={`${
        plein ? "absolute inset-0" : "relative"
      } overflow-hidden bg-calcaire-3 ${className}`}
    >
      <Image
        src={`/images/${src}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${CLASSES_FLOTTEMENT[flottement]}`}
        style={cadrage === undefined ? undefined : { objectPosition: `50% ${cadrage}%` }}
      />
      {voile ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-atlantique/75 via-atlantique/15 to-transparent"
        />
      ) : null}
    </div>
  );
}
