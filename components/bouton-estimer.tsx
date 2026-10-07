import Link from "next/link";

type Props = {
  /** Classes de taille et de placement, propres à chaque emplacement */
  className?: string;
  /**
   * Surface du bouton : verre dépoli sur les fonds photographiques et sombres,
   * bleu atlantique sur les fonds clairs, où le verre blanc s'effacerait.
   */
  variante?: "verre" | "primaire";
  tabIndex?: number;
};

/**
 * Le bouton « Estimer mon bien » — le même partout sur le site.
 *
 * Verre liquide, lumière qui fait le tour de la bordure en continu, halo qui
 * respire autour, éclat plus marqué au survol (où le halo se fige au plus
 * fort et le tour s'accélère). Les trois effets sont neutralisés sous
 * prefers-reduced-motion, qui ne laisse qu'un halo fixe.
 */
export function BoutonEstimer({
  className = "",
  variante = "verre",
  tabIndex,
}: Props) {
  return (
    <Link
      href="/estimation"
      tabIndex={tabIndex}
      className={`btn btn-vivant reflet-lent ${
        variante === "verre" ? "btn-liquide" : "btn-primaire"
      } ${className}`}
    >
      <span aria-hidden="true" className="btn-anneau" />
      <span className="btn-libelle">
        Estimer mon bien
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
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
  );
}
