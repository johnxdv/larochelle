/**
 * Portrait d'équipe sans photographie : un médaillon de verre portant
 * les initiales, teinté dans la palette de la maison.
 */

const TEINTES = [
  "linear-gradient(145deg,#dbe9ec,#9ec4d2)",
  "linear-gradient(145deg,#efe7d8,#d3c2a5)",
  "linear-gradient(145deg,#d6e4e9,#8fb6c6)",
  "linear-gradient(145deg,#e8e0d0,#c4b091)",
] as const;

function initiales(nom: string): string {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase() ?? "")
    .join("");
}

function teinte(nom: string): string {
  let somme = 0;
  for (const caractere of nom) somme += caractere.charCodeAt(0);
  return TEINTES[somme % TEINTES.length];
}

export function Medaillon({
  nom,
  className = "",
}: {
  nom: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${className}`}
      style={{ background: teinte(nom) }}
    >
      {/* Reflet de verre */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(70% 55% at 30% 18%, rgba(255,255,255,.85), transparent 60%)",
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.55)" }}
      />
      <span className="titre relative text-atlantique" style={{ fontSize: "0.42em" }}>
        {initiales(nom)}
      </span>
    </span>
  );
}
