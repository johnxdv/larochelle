/**
 * Identité, discours et contenus éditoriaux de l'agence.
 * Données de démonstration : l'agence, l'équipe et les témoignages sont fictifs.
 */

export const AGENCE = {
  nom: "Ashley Immobilier",
  signature: "L’immobilier d’exception sur la côte atlantique",
  baseline: "La Rochelle · Île de Ré · Île d’Oléron",
  depuis: 2008,
  adresse: {
    rue: "12 quai Duperré",
    codePostal: "17000",
    ville: "La Rochelle",
  },
  telephone: "05 46 00 00 00",
  telephoneLien: "+33546000000",
  email: "contact@ashley-immobilier.fr",
  horaires: [
    { jours: "Mardi – vendredi", heures: "9 h 30 – 19 h" },
    { jours: "Samedi", heures: "10 h – 18 h" },
    { jours: "Lundi", heures: "Sur rendez-vous" },
  ],
} as const;

export const SECTEURS = [
  "La Rochelle",
  "Île de Ré",
  "Île d’Oléron",
  "Châtelaillon",
  "Angoulins",
] as const;

export const CHIFFRES = [
  { valeur: 2008, suffixe: "", libelle: "Maison fondée", prefixe: "Depuis " },
  { valeur: 640, suffixe: "", libelle: "Transactions accompagnées" },
  { valeur: 52, suffixe: " j", libelle: "Délai de vente médian" },
  { valeur: 9.6, suffixe: "/10", libelle: "Satisfaction de nos vendeurs", decimales: 1 },
] as const;

export const VALEURS = [
  {
    titre: "La discrétion d’abord",
    texte:
      "Une part de nos ventes ne paraît jamais en vitrine. Nous présentons d’abord un bien à notre fichier d’acquéreurs qualifiés, et nous n’allons au-delà que si vous le décidez.",
  },
  {
    titre: "Une exigence de présentation",
    texte:
      "Photographe d’architecture, plans redessinés, visite immersive, textes écrits à la main. Un bien d’exception mérite une mise en scène à sa hauteur — c’est à nos frais, et sans condition.",
  },
  {
    titre: "L’ancrage, pas le réseau",
    texte:
      "Nous ne couvrons que La Rochelle, Ré et Oléron. Nous connaissons la valeur d’une rue, l’orientation d’une cour, le bruit d’un quai en août. C’est ce qui fait la justesse d’une estimation.",
  },
  {
    titre: "La clarté des chiffres",
    texte:
      "Honoraires annoncés dès le premier rendez-vous, compte rendu de visite systématique, point de marché mensuel. Vous savez toujours où en est votre vente.",
  },
] as const;

export type Membre = {
  readonly nom: string;
  readonly role: string;
  readonly note: string;
};

export const EQUIPE: readonly Membre[] = [
  {
    nom: "Ashley Vaneau",
    role: "Fondatrice",
    note: "Rochelaise, dix-huit ans de transaction de prestige. Suit personnellement les biens classés et les hôtels particuliers.",
  },
  {
    nom: "Camille Ferron",
    role: "Directrice des ventes",
    note: "Pilote le portefeuille Vieux-Port, centre historique et La Genette. Spécialiste des copropriétés anciennes.",
  },
  {
    nom: "Thibault Rousseau",
    role: "Consultant propriétés d’exception",
    note: "Demeures avec terrain, maisons d’architecte, biens sur les îles. Ancien architecte du patrimoine.",
  },
  {
    nom: "Louise Bariteau",
    role: "Location & gestion",
    note: "Locations longue durée et résidences secondaires. Gère la relation avec les propriétaires non-résidents.",
  },
  {
    nom: "Mathis Gendron",
    role: "Direction artistique",
    note: "Photographie d’architecture, plans, visites immersives. Chaque bien passe par son studio avant diffusion.",
  },
  {
    nom: "Inès Ravaud",
    role: "Administration des ventes",
    note: "Diagnostics, pièces d’urbanisme, relation notaire. Veille à ce qu’aucun dossier ne prenne de retard.",
  },
];

export type Temoignage = {
  readonly texte: string;
  readonly auteur: string;
  readonly contexte: string;
};

export const TEMOIGNAGES: readonly Temoignage[] = [
  {
    texte:
      "Nous vendions la maison de famille, ce qui n’était simple pour personne. Tout a été fait sans bruit, avec une délicatesse que je n’attendais pas d’une agence. Trois visites, une offre au prix.",
    auteur: "Hélène et Patrick B.",
    contexte: "Maison de maître, La Genette",
  },
  {
    texte:
      "L’estimation était trente mille euros sous ce qu’une autre agence m’avait annoncé. C’est pourtant celle-là qui s’est révélée juste : j’ai vendu en six semaines, au prix de présentation.",
    auteur: "Jean-Marc L.",
    contexte: "Appartement, Vieux-Port",
  },
  {
    texte:
      "Nous achetions depuis Paris, sans pouvoir nous déplacer souvent. Les visites filmées étaient d’une honnêteté rare — on nous montrait aussi ce qui n’allait pas. On a signé en confiance.",
    auteur: "Sarah et Nicolas D.",
    contexte: "Villa, Saint-Maurice",
  },
  {
    texte:
      "Un pied-à-terre de vingt-six mètres carrés traité avec le même soin qu’un hôtel particulier. Cela en dit long sur une maison.",
    auteur: "Claire M.",
    contexte: "Studio, centre historique",
  },
];

export type Etape = {
  readonly numero: string;
  readonly titre: string;
  readonly texte: string;
  readonly duree: string;
};

export const ETAPES_VENTE: readonly Etape[] = [
  {
    numero: "01",
    titre: "Le rendez-vous d’estimation",
    texte:
      "Nous venons chez vous, sans engagement. Une heure et demie pour comprendre le bien, relever ce qui fait sa valeur et ce qui la retient, puis confronter notre lecture aux ventes réellement signées dans la rue.",
    duree: "Sous 48 h",
  },
  {
    numero: "02",
    titre: "L’avis de valeur écrit",
    texte:
      "Vous recevez un document argumenté : fourchette de prix, comparables commentés, scénarios de mise en marché. Il est à vous, que vous nous confiiez la vente ou non.",
    duree: "4 jours",
  },
  {
    numero: "03",
    titre: "La préparation du bien",
    texte:
      "Reportage photo d’architecture, plans redessinés à l’échelle, visite immersive, texte de présentation. Nous prenons l’intégralité de ce travail à notre charge.",
    duree: "1 à 2 semaines",
  },
  {
    numero: "04",
    titre: "La mise en marché",
    texte:
      "D’abord notre fichier d’acquéreurs qualifiés, en confidentialité. Puis, si vous le souhaitez, la diffusion publique sur nos supports et les portails de prestige.",
    duree: "Jour J",
  },
  {
    numero: "05",
    titre: "Les visites et la négociation",
    texte:
      "Nous ne faisons visiter qu’à des acquéreurs dont le financement est vérifié. Compte rendu après chaque visite, point de marché tous les quinze jours.",
    duree: "En continu",
  },
  {
    numero: "06",
    titre: "La signature",
    texte:
      "Constitution du dossier, relation avec les notaires, suivi des conditions suspensives. Nous restons à vos côtés jusqu’à la remise des clés, et après.",
    duree: "2 à 3 mois",
  },
];

export const ARGUMENTS_VENDEUR = [
  {
    titre: "Une estimation que nous assumons",
    texte:
      "Nous refusons les estimations de complaisance. Un prix trop haut use un bien : il reste en ligne, se négocie, et finit sous sa valeur. Notre fourchette est documentée, et nous la défendons.",
  },
  {
    titre: "Un fichier d’acquéreurs qualifiés",
    texte:
      "Plus de quatre cents acquéreurs suivis, dont le projet et le financement sont vérifiés. Près d’une vente sur trois se conclut sans que le bien ait jamais été diffusé publiquement.",
  },
  {
    titre: "Une production prise en charge",
    texte:
      "Photographe d’architecture, plans, visite immersive, rédaction. Aucun frais à avancer, aucune facture si la vente ne se fait pas.",
  },
  {
    titre: "Un seul interlocuteur",
    texte:
      "Le consultant qui estime votre bien est celui qui le présente, le fait visiter et vous accompagne chez le notaire. Vous n’aurez jamais à vous répéter.",
  },
] as const;
