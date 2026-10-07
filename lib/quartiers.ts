/**
 * Les quartiers de La Rochelle couverts par l'agence.
 * Les prix au mètre carré sont indicatifs et servent la démonstration.
 */

export type Quartier = {
  readonly slug: string;
  readonly nom: string;
  readonly accroche: string;
  readonly description: string;
  readonly image: string;
  /** Fourchette indicative, en euros par mètre carré */
  readonly prixM2: readonly [number, number];
};

export const QUARTIERS: readonly Quartier[] = [
  {
    slug: "vieux-port",
    nom: "Vieux-Port",
    accroche: "Entre les deux tours",
    description:
      "Le cœur maritime de la ville. Des immeubles du XVIIIe siècle alignés sur les quais, des terrasses qui regardent entrer les voiliers, et le son des drisses pour fond sonore. Les biens s'y comptent sur les doigts d'une main chaque année.",
    image: "tour-oiseaux",
    prixM2: [7200, 9800],
  },
  {
    slug: "centre-historique",
    nom: "Centre historique",
    accroche: "Sous les arcades",
    description:
      "Les rues à galeries couvertes, les hôtels particuliers d'armateurs, les cours pavées que l'on devine derrière un porche. Un patrimoine rare, protégé, où chaque vente est une transmission.",
    image: "marche-centre",
    prixM2: [6400, 8600],
  },
  {
    slug: "les-minimes",
    nom: "Les Minimes",
    accroche: "Le plus grand port de plaisance d'Europe",
    description:
      "Trois mille cinq cents anneaux, une plage urbaine, des immeubles contemporains dont les terrasses dominent la forêt de mâts. Le quartier où l'on vit les pieds dans l'eau sans quitter la ville.",
    image: "port-bateau",
    prixM2: [5600, 7600],
  },
  {
    slug: "la-genette",
    nom: "La Genette",
    accroche: "Villas balnéaires et parc Charruyer",
    description:
      "L'adresse la plus courue de La Rochelle. Des villas 1900 aux façades claires, de grands jardins clos, le parc Charruyer d'un côté et la plage de la Concurrence de l'autre. On y marche jusqu'au Vieux-Port.",
    image: "plage-marcheurs",
    prixM2: [6200, 8400],
  },
  {
    slug: "saint-maurice",
    nom: "Saint-Maurice",
    accroche: "À deux pas des plages",
    description:
      "Un quartier résidentiel discret, largement planté, entre le parc des Pères et les plages des Minimes. Des parcelles généreuses qui permettent encore la piscine et la maison d'architecte.",
    image: "dunes-sable",
    prixM2: [5200, 7000],
  },
  {
    slug: "tasdon",
    nom: "Tasdon",
    accroche: "L'ancien village et ses marais",
    description:
      "Un bourg devenu quartier, en lisière des marais réhabilités en parc naturel urbain. Des maisons rochelaises de plain-pied, des jardins, et le centre-ville à dix minutes de vélo.",
    image: "marais-roseaux",
    prixM2: [3900, 5100],
  },
  {
    slug: "fetilly",
    nom: "Fétilly",
    accroche: "Les maisons des années trente",
    description:
      "Des rues calmes bordées de maisons d'entre-deux-guerres, briques et pierre de taille, souvent sur sous-sol. Un quartier familial très recherché pour ses écoles et sa proximité immédiate du centre.",
    image: "maison-facade",
    prixM2: [4500, 5900],
  },
  {
    slug: "lafond",
    nom: "Lafond",
    accroche: "La ville-jardin",
    description:
      "Des maisons de ville en pierre, des venelles, des jardins longs et étroits qui se suivent. Lafond conserve l'échelle d'un faubourg tout en étant à un quart d'heure à pied des quais.",
    image: "facade-plantes",
    prixM2: [4100, 5400],
  },
  {
    slug: "laleu",
    nom: "Laleu",
    accroche: "L'ancien bourg de pêcheurs",
    description:
      "Entre le port de La Pallice et la plage de Chef-de-Baie, Laleu a gardé son église romane et ses maisons basses. Le quartier se transforme vite, porté par les rénovations.",
    image: "bateau-chenal",
    prixM2: [3700, 4700],
  },
  {
    slug: "port-neuf",
    nom: "Port-Neuf",
    accroche: "Face au pont de l'île de Ré",
    description:
      "Un front de mer dégagé, une digue pour promenade et, en ligne de mire, l'arc du pont de Ré. Les étages élevés y offrent des vues que l'on ne trouve nulle part ailleurs en ville.",
    image: "voilier-blanc",
    prixM2: [4300, 5700],
  },
] as const;

export const QUARTIERS_PAR_SLUG = new Map(QUARTIERS.map((q) => [q.slug, q]));

export function quartierParSlug(slug: string): Quartier | undefined {
  return QUARTIERS_PAR_SLUG.get(slug);
}

export function nomQuartier(slug: string): string {
  return QUARTIERS_PAR_SLUG.get(slug)?.nom ?? slug;
}
