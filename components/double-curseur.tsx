"use client";

type Props = {
  libelle: string;
  min: number;
  max: number;
  pas: number;
  valeurs: readonly [number, number];
  onChange: (valeurs: [number, number]) => void;
  /** Mise en forme des bornes affichées */
  format: (valeur: number) => string;
};

/** Curseur à deux poignées, pour les fourchettes de prix et de surface. */
export function DoubleCurseur({
  libelle,
  min,
  max,
  pas,
  valeurs,
  onChange,
  format,
}: Props) {
  const [bas, haut] = valeurs;
  const pourcent = (valeur: number) => ((valeur - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.8125rem] font-medium text-encre-2">{libelle}</span>
        <span className="chiffre text-[0.8125rem] text-atlantique">
          {format(bas)} – {format(haut)}
        </span>
      </div>

      <div className="relative mt-4 h-6">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-encre/10" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-azur to-atlantique"
          style={{
            left: `${pourcent(bas)}%`,
            right: `${100 - pourcent(haut)}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={pas}
          value={bas}
          aria-label={`${libelle} — minimum`}
          onChange={(e) =>
            onChange([Math.min(Number(e.target.value), haut - pas), haut])
          }
          className="curseur"
          // La poignée basse passe devant quand les deux se rejoignent en haut
          style={{ zIndex: bas > max - (max - min) / 10 ? 4 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={pas}
          value={haut}
          aria-label={`${libelle} — maximum`}
          onChange={(e) =>
            onChange([bas, Math.max(Number(e.target.value), bas + pas)])
          }
          className="curseur"
          style={{ zIndex: 3 }}
        />
      </div>
    </div>
  );
}
