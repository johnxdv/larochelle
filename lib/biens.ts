/**
 * Catalogue des biens — données de démonstration.
 *
 * Tous les biens, descriptions, références et prix de ce fichier sont fictifs.
 * C'est le seul fichier à remplacer pour brancher un vrai portefeuille :
 * chaque image pointe simplement vers un fichier de public/images/.
 */

export type Classe = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type TypeBien =
  | "Appartement"
  | "Maison"
  | "Villa"
  | "Hôtel particulier"
  | "Studio";

export const TYPES_BIEN: readonly TypeBien[] = [
  "Appartement",
  "Maison",
  "Villa",
  "Hôtel particulier",
  "Studio",
];

export type Photo = {
  /** Nom du fichier dans public/images, sans extension */
  readonly src: string;
  readonly alt: string;
};

export type Repere = {
  readonly lieu: string;
  readonly duree: string;
};

export type Bien = {
  readonly slug: string;
  readonly reference: string;
  readonly titre: string;
  readonly accroche: string;
  readonly type: TypeBien;
  /** Slug du quartier, voir lib/quartiers.ts */
  readonly quartier: string;
  readonly prix: number;
  readonly surface: number;
  /** Surface du terrain en m², si le bien en dispose */
  readonly terrain?: number;
  readonly pieces: number;
  readonly chambres: number;
  readonly sallesDeBain: number;
  /** Étage du bien et nombre d'étages de l'immeuble */
  readonly etage?: { readonly niveau: number; readonly sur: number; readonly ascenseur: boolean };
  readonly annee: string;
  readonly dpe: { readonly classe: Classe; readonly valeur: number };
  readonly ges: { readonly classe: Classe; readonly valeur: number };
  readonly exposition: string;
  readonly taxeFonciere: number;
  readonly chargesAnnuelles?: number;
  readonly atouts: readonly string[];
  readonly prestations: readonly string[];
  readonly reperes: readonly Repere[];
  readonly description: readonly string[];
  readonly photos: readonly Photo[];
  readonly exclusivite: boolean;
  readonly coupDeCoeur: boolean;
};

export const BIENS: readonly Bien[] = [
  {
    slug: "hotel-particulier-saint-sauveur",
    reference: "AI-1042",
    titre: "Hôtel particulier Saint-Sauveur",
    accroche: "Une demeure d’armateur du XVIIIe, intacte, derrière un porche du centre historique.",
    type: "Hôtel particulier",
    quartier: "centre-historique",
    prix: 2450000,
    surface: 326,
    terrain: 180,
    pieces: 11,
    chambres: 6,
    sallesDeBain: 4,
    annee: "1784",
    dpe: { classe: "D", valeur: 214 },
    ges: { classe: "D", valeur: 42 },
    exposition: "Sud-ouest sur cour",
    taxeFonciere: 4180,
    atouts: [
      "Cour pavée et jardin clos de 180 m²",
      "Escalier d’honneur et boiseries d’origine",
      "Six chambres dont deux suites",
      "Caves voûtées sur toute l’emprise",
    ],
    prestations: [
      "Parquets en point de Hongrie",
      "Cinq cheminées en marbre",
      "Cuisine sur mesure",
      "Chauffage gaz à condensation",
      "Menuiseries bois double vitrage",
      "Deux places de stationnement",
    ],
    reperes: [
      { lieu: "Marché central", duree: "3 min à pied" },
      { lieu: "Tours du Vieux-Port", duree: "6 min à pied" },
      { lieu: "Gare de La Rochelle", duree: "12 min à pied" },
    ],
    description: [
      "On pousse un porche sur une rue à arcades et la ville s’arrête net. Une cour pavée, un tilleul, une façade de pierre de taille dont les proportions n’ont pas bougé depuis 1784 : cet hôtel particulier d’armateur est l’un des rares du centre historique à n’avoir jamais été divisé.",
      "Les trois cent vingt-six mètres carrés se déploient sur trois niveaux autour d’un escalier d’honneur à rampe de fer forgé. Au rez-de-chaussée, une enfilade de réceptions aux boiseries d’origine ouvre de plain-pied sur le jardin clos. Les étages accueillent six chambres, dont deux suites avec salle de bains attenante, et un dernier niveau mansardé qui attend son projet.",
      "La maison a été entretenue avec constance : toiture reprise, menuiseries bois en double vitrage, chauffage refait. Il reste la liberté d’y imprimer une écriture contemporaine, sans jamais avoir à défaire.",
    ],
    photos: [
      { src: "hotel-particulier", alt: "La façade de l’hôtel particulier et ses volets clairs" },
      { src: "sejour-chevrons", alt: "Le grand salon et son parquet en point de Hongrie" },
      { src: "couloir-portes", alt: "L’enfilade des réceptions du rez-de-chaussée" },
      { src: "cuisine-marbre", alt: "La cuisine sur mesure et son plan en marbre" },
      { src: "sdb-marbre", alt: "La salle de bains de la suite principale" },
    ],
    exclusivite: true,
    coupDeCoeur: true,
  },
  {
    slug: "belvedere-des-tours",
    reference: "AI-1043",
    titre: "Le Belvédère des Tours",
    accroche: "Cent quarante-huit mètres carrés et une terrasse qui regarde entrer les voiliers.",
    type: "Appartement",
    quartier: "vieux-port",
    prix: 1395000,
    surface: 148,
    pieces: 5,
    chambres: 3,
    sallesDeBain: 2,
    etage: { niveau: 3, sur: 4, ascenseur: true },
    annee: "1762, rénové en 2022",
    dpe: { classe: "C", valeur: 162 },
    ges: { classe: "C", valeur: 26 },
    exposition: "Plein ouest sur le port",
    taxeFonciere: 2240,
    chargesAnnuelles: 3360,
    atouts: [
      "Terrasse de 32 m² face aux deux tours",
      "Vue sur le chenal depuis quatre pièces",
      "Immeuble du XVIIIe avec ascenseur",
      "Rénovation complète livrée en 2022",
    ],
    prestations: [
      "Parquet chêne massif",
      "Baies à galandage sur la terrasse",
      "Cuisine équipée haut de gamme",
      "Climatisation réversible",
      "Cave voûtée",
      "Stationnement sécurisé en option",
    ],
    reperes: [
      { lieu: "Tour de la Chaîne", duree: "2 min à pied" },
      { lieu: "Marché central", duree: "5 min à pied" },
      { lieu: "Plage de la Concurrence", duree: "11 min à pied" },
    ],
    description: [
      "Au troisième étage d’un immeuble d’armateur posé sur le quai, cet appartement occupe tout le niveau. La rénovation menée en 2022 a ouvert les volumes vers l’ouest : quatre des cinq pièces regardent le chenal, et la lumière de fin de journée traverse l’appartement de part en part.",
      "La terrasse de trente-deux mètres carrés est l’événement. Elle fait face aux deux tours, à hauteur de mâts, et prolonge le séjour par de grandes baies à galandage. On y dîne en avril.",
      "Trois chambres, deux salles de bains, une cuisine équipée sur mesure, une cave voûtée et l’ascenseur : la rareté du Vieux-Port servie par un confort entièrement contemporain.",
    ],
    photos: [
      { src: "facade-balcons", alt: "La façade de l’immeuble sur le quai" },
      { src: "sejour-velours", alt: "Le séjour traversant et ses assises de velours" },
      { src: "terrasse-table", alt: "La terrasse de 32 m² face au port" },
      { src: "chambre-lin", alt: "La chambre principale habillée de lin" },
      { src: "hero-vieux-port", alt: "La vue sur le chenal depuis la terrasse" },
    ],
    exclusivite: true,
    coupDeCoeur: true,
  },
  {
    slug: "maison-de-maitre-la-genette",
    reference: "AI-1044",
    titre: "Maison de maître de La Genette",
    accroche: "Une villa 1900 et son jardin clos de 620 m², à six minutes de la plage.",
    type: "Maison",
    quartier: "la-genette",
    prix: 1590000,
    surface: 210,
    terrain: 620,
    pieces: 8,
    chambres: 5,
    sallesDeBain: 3,
    annee: "1902",
    dpe: { classe: "D", valeur: 198 },
    ges: { classe: "D", valeur: 38 },
    exposition: "Sud sur jardin",
    taxeFonciere: 3120,
    atouts: [
      "Jardin clos et arboré de 620 m²",
      "Cinq chambres sur deux niveaux",
      "Hauteurs sous plafond de 3,20 m",
      "Garage et atelier en fond de parcelle",
    ],
    prestations: [
      "Parquets et moulures d’origine",
      "Trois cheminées en état de marche",
      "Véranda exposée sud",
      "Chaudière gaz récente",
      "Combles aménageables de 60 m²",
      "Puits et arrosage automatique",
    ],
    reperes: [
      { lieu: "Parc Charruyer", duree: "3 min à pied" },
      { lieu: "Plage de la Concurrence", duree: "6 min à pied" },
      { lieu: "Vieux-Port", duree: "15 min à pied" },
    ],
    description: [
      "La Genette garde quelques-unes de ces villas balnéaires que les familles rochelaises se transmettent. Celle-ci, bâtie en 1902, n’était plus revenue sur le marché depuis trente ans.",
      "Deux cent dix mètres carrés habitables, des plafonds à trois mètres vingt, des parquets et des moulures que personne n’a eu la mauvaise idée de masquer. Le rez-de-chaussée enchaîne double séjour, salle à manger et véranda plein sud ; l’étage distribue quatre chambres, le second une cinquième et son cabinet de toilette.",
      "Le jardin clos de six cent vingt mètres carrés est planté de vieux arbres et fermé par un garage doublé d’un atelier. Soixante mètres carrés de combles restent à aménager pour qui veut aller plus loin.",
    ],
    photos: [
      { src: "demeure-jardin", alt: "La villa 1900 vue depuis le jardin" },
      { src: "sejour-cheminee-2", alt: "Le double séjour et sa cheminée" },
      { src: "sejour-parquet", alt: "La salle à manger et ses parquets d’origine" },
      { src: "chambre-balcon", alt: "Une chambre ouvrant sur le jardin" },
      { src: "maison-pierre-pelouse", alt: "Le jardin clos et ses arbres anciens" },
    ],
    exclusivite: false,
    coupDeCoeur: true,
  },
  {
    slug: "villa-cote-dunes",
    reference: "AI-1045",
    titre: "Villa Côté Dunes",
    accroche: "Une maison d’architecte de 2019, piscine chauffée, à neuf minutes des Minimes.",
    type: "Villa",
    quartier: "saint-maurice",
    prix: 1150000,
    surface: 185,
    terrain: 840,
    pieces: 7,
    chambres: 4,
    sallesDeBain: 3,
    annee: "2019",
    dpe: { classe: "B", valeur: 88 },
    ges: { classe: "A", valeur: 5 },
    exposition: "Sud-ouest sur piscine",
    taxeFonciere: 2460,
    atouts: [
      "Piscine chauffée de 10 × 4 m",
      "Terrain paysagé de 840 m²",
      "Suite parentale de plain-pied",
      "Consommation énergétique maîtrisée",
    ],
    prestations: [
      "Pompe à chaleur air-eau",
      "Plancher chauffant rafraîchissant",
      "Baies coulissantes à galandage",
      "Domotique et volets motorisés",
      "Garage double et carport",
      "Panneaux photovoltaïques en autoconsommation",
    ],
    reperes: [
      { lieu: "Parc des Pères", duree: "4 min à pied" },
      { lieu: "Plage des Minimes", duree: "9 min à pied" },
      { lieu: "Vieux-Port", duree: "7 min à vélo" },
    ],
    description: [
      "Livrée en 2019, cette maison d’architecte a été dessinée autour de sa lumière. Un volume unique, bas et long, posé sur huit cent quarante mètres carrés de terrain paysagé, qui s’ouvre au sud-ouest par une façade entièrement vitrée.",
      "Le séjour de soixante mètres carrés prolonge la terrasse et la piscine chauffée sans rupture de niveau. La suite parentale occupe une aile de plain-pied ; trois chambres et deux salles d’eau se partagent l’autre.",
      "La performance suit l’esthétique : pompe à chaleur, plancher chauffant rafraîchissant, photovoltaïque en autoconsommation. Classée B en énergie et A en émissions, la villa se chauffe pour une poignée d’euros par mètre carré.",
    ],
    photos: [
      { src: "villa-arbres", alt: "La villa contemporaine et son jardin paysagé" },
      { src: "piscine-aerienne", alt: "La piscine chauffée et sa terrasse" },
      { src: "sejour-lumineux", alt: "Le séjour de 60 m² ouvert sur la terrasse" },
      { src: "cuisine-blanche", alt: "La cuisine ouverte sur le séjour" },
      { src: "chambre-chevet", alt: "La suite parentale de plain-pied" },
    ],
    exclusivite: true,
    coupDeCoeur: false,
  },
  {
    slug: "duplex-cap-minimes",
    reference: "AI-1046",
    titre: "Duplex Cap Minimes",
    accroche: "Dernier étage, toit-terrasse de 45 m², la marina pour horizon.",
    type: "Appartement",
    quartier: "les-minimes",
    prix: 890000,
    surface: 120,
    pieces: 5,
    chambres: 3,
    sallesDeBain: 2,
    etage: { niveau: 4, sur: 4, ascenseur: true },
    annee: "2021",
    dpe: { classe: "B", valeur: 94 },
    ges: { classe: "B", valeur: 9 },
    exposition: "Ouest sur le port de plaisance",
    taxeFonciere: 1680,
    chargesAnnuelles: 2880,
    atouts: [
      "Toit-terrasse privatif de 45 m²",
      "Vue dégagée sur les trois mille anneaux",
      "Dernier étage, aucun vis-à-vis",
      "Deux stationnements en sous-sol",
    ],
    prestations: [
      "Résidence de 2021, RT 2012",
      "Cuisine équipée Bulthaup",
      "Escalier d’acier et chêne",
      "Climatisation réversible",
      "Local vélos sécurisé",
      "Ascenseur desservant le sous-sol",
    ],
    reperes: [
      { lieu: "Port de plaisance", duree: "2 min à pied" },
      { lieu: "Plage des Minimes", duree: "5 min à pied" },
      { lieu: "Vieux-Port", duree: "8 min en bus de mer" },
    ],
    description: [
      "Au dernier étage d’une résidence livrée en 2021, ce duplex de cent vingt mètres carrés n’a de vis-à-vis que le ciel. L’orientation plein ouest donne sur la forêt de mâts du plus grand port de plaisance d’Europe.",
      "Le niveau bas réunit un séjour de quarante-cinq mètres carrés, une cuisine Bulthaup et une chambre avec salle d’eau. Un escalier d’acier et de chêne mène à l’étage : deux chambres, une salle de bains, et surtout le toit-terrasse privatif de quarante-cinq mètres carrés.",
      "Construction récente, isolation soignée, climatisation réversible et deux stationnements en sous-sol : un bien sans travaux ni surprise, rare à cette hauteur sur les Minimes.",
    ],
    photos: [
      { src: "terrasse-ocean", alt: "Le toit-terrasse privatif de 45 m²" },
      { src: "sejour-canape-blanc", alt: "Le séjour du niveau bas" },
      { src: "cuisine-tabourets", alt: "La cuisine équipée et son comptoir" },
      { src: "sdb-lavabo", alt: "La salle de bains de l’étage" },
      { src: "bateaux-port", alt: "La vue sur le port de plaisance" },
    ],
    exclusivite: false,
    coupDeCoeur: true,
  },
  {
    slug: "maison-des-annees-trente",
    reference: "AI-1047",
    titre: "Maison des années trente",
    accroche: "Briques, pierre de taille et 410 m² de jardin, au calme de Fétilly.",
    type: "Maison",
    quartier: "fetilly",
    prix: 845000,
    surface: 165,
    terrain: 410,
    pieces: 7,
    chambres: 4,
    sallesDeBain: 2,
    annee: "1934",
    dpe: { classe: "D", valeur: 226 },
    ges: { classe: "C", valeur: 29 },
    exposition: "Sud-est sur jardin",
    taxeFonciere: 2080,
    atouts: [
      "Jardin exposé sud-est de 410 m²",
      "Sous-sol total aménageable",
      "Quatre chambres et un bureau",
      "Écoles à quatre minutes à pied",
    ],
    prestations: [
      "Carreaux ciment d’origine",
      "Cheminée en marbre dans le séjour",
      "Véranda chauffée",
      "Isolation des combles refaite en 2020",
      "Garage et buanderie au sous-sol",
      "Abri de jardin maçonné",
    ],
    reperes: [
      { lieu: "Écoles de Fétilly", duree: "4 min à pied" },
      { lieu: "Parc Charruyer", duree: "7 min à pied" },
      { lieu: "Centre-ville", duree: "14 min à pied" },
    ],
    description: [
      "Fétilly aligne depuis les années trente ses maisons de briques et de pierre de taille, sur des rues où l’on entend les enfants rentrer de l’école. Celle-ci en est un bel exemplaire, sur quatre cent dix mètres carrés de jardin exposé sud-est.",
      "Cent soixante-cinq mètres carrés habitables, distribués comme on les faisait alors : un séjour à cheminée de marbre, une salle à manger, une véranda chauffée, et à l’étage quatre chambres plus un bureau. Les carreaux ciment d’origine sont intacts dans l’entrée et la cuisine.",
      "Le sous-sol total, aménagé en garage et buanderie, offre une réserve de surface considérable. Les combles ont été isolés en 2020 ; le reste attend la main d’une famille.",
    ],
    photos: [
      { src: "maison-facade", alt: "La façade de briques et de pierre de taille" },
      { src: "sejour-table-basse", alt: "Le séjour et sa cheminée de marbre" },
      { src: "cuisine-bois", alt: "La cuisine et son vaisselier de bois" },
      { src: "chambre-draps", alt: "Une des quatre chambres de l’étage" },
      { src: "parquet-assise", alt: "Un détail des parquets d’origine" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
  {
    slug: "horizon-port-neuf",
    reference: "AI-1048",
    titre: "Horizon Port-Neuf",
    accroche: "Sixième étage, baie vitrée plein ouest, le pont de Ré en ligne de mire.",
    type: "Appartement",
    quartier: "port-neuf",
    prix: 465000,
    surface: 88,
    pieces: 4,
    chambres: 2,
    sallesDeBain: 1,
    etage: { niveau: 6, sur: 7, ascenseur: true },
    annee: "1972, rénové en 2022",
    dpe: { classe: "C", valeur: 148 },
    ges: { classe: "C", valeur: 24 },
    exposition: "Plein ouest sur la mer",
    taxeFonciere: 1140,
    chargesAnnuelles: 2040,
    atouts: [
      "Vue mer frontale sur le pont de l’île de Ré",
      "Balcon filant de 12 m²",
      "Rénovation intégrale en 2022",
      "Digue de promenade à deux minutes",
    ],
    prestations: [
      "Baies en aluminium à rupture de pont thermique",
      "Cuisine ouverte équipée",
      "Parquet contrecollé chêne",
      "Volets roulants motorisés",
      "Cave et stationnement privatif",
      "Chauffage collectif récent",
    ],
    reperes: [
      { lieu: "Digue de Port-Neuf", duree: "2 min à pied" },
      { lieu: "Pont de l’île de Ré", duree: "10 min à vélo" },
      { lieu: "Vieux-Port", duree: "9 min à vélo" },
    ],
    description: [
      "Il y a peu d’endroits à La Rochelle où la mer se tient aussi franchement dans l’encadrement d’une fenêtre. Au sixième étage d’une résidence des années soixante-dix, cet appartement de quatre-vingt-huit mètres carrés regarde l’arc du pont de Ré se détacher sur le couchant.",
      "La rénovation de 2022 a tout repris : baies à rupture de pont thermique, cuisine ouverte, parquet chêne, électricité. Le séjour et les deux chambres donnent sur le balcon filant de douze mètres carrés.",
      "Une cave, un stationnement privatif, un chauffage collectif récent, et la digue de promenade à deux minutes. Un pied-à-terre lumineux ou une résidence principale sans travaux.",
    ],
    photos: [
      { src: "terrasse-chaises", alt: "Le balcon filant et la vue sur la mer" },
      { src: "sejour-cuir", alt: "Le séjour ouvert sur la baie vitrée" },
      { src: "chambre-oreillers", alt: "La chambre principale face au couchant" },
      { src: "sdb-claire", alt: "La salle de bains rénovée en 2022" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
  {
    slug: "escale-des-minimes",
    reference: "AI-1049",
    titre: "L’Escale des Minimes",
    accroche: "Trois chambres, une terrasse plein sud, le port à deux minutes.",
    type: "Appartement",
    quartier: "les-minimes",
    prix: 679000,
    surface: 95,
    pieces: 4,
    chambres: 3,
    sallesDeBain: 2,
    etage: { niveau: 2, sur: 3, ascenseur: true },
    annee: "2016",
    dpe: { classe: "B", valeur: 102 },
    ges: { classe: "B", valeur: 10 },
    exposition: "Sud sur terrasse",
    taxeFonciere: 1320,
    chargesAnnuelles: 2280,
    atouts: [
      "Terrasse plein sud de 22 m²",
      "Trois chambres dont une suite",
      "Résidence de standing de 2016",
      "Deux stationnements en sous-sol",
    ],
    prestations: [
      "Cuisine ouverte entièrement équipée",
      "Salle d’eau et salle de bains",
      "Placards aménagés dans chaque chambre",
      "Chauffage gaz individuel",
      "Résidence close et arborée",
      "Local vélos et poussettes",
    ],
    reperes: [
      { lieu: "Port de plaisance", duree: "2 min à pied" },
      { lieu: "Plage des Minimes", duree: "6 min à pied" },
      { lieu: "Université", duree: "5 min à pied" },
    ],
    description: [
      "Dans une résidence de standing livrée en 2016 et refermée sur son jardin, cet appartement de quatre-vingt-quinze mètres carrés fait le pari de l’évidence : trois vraies chambres, deux pièces d’eau, et une terrasse plein sud de vingt-deux mètres carrés.",
      "Le séjour et la cuisine ouverte occupent l’angle le plus lumineux et donnent de plain-pied sur la terrasse. La chambre principale dispose de sa salle d’eau ; les deux autres partagent la salle de bains.",
      "Construction récente, charges contenues, deux stationnements en sous-sol et le port de plaisance au bout de la rue. Le confort familial au cœur des Minimes.",
    ],
    photos: [
      { src: "sejour-grande-fenetre", alt: "Le séjour ouvert sur la terrasse plein sud" },
      { src: "porte-parquet", alt: "La distribution des chambres" },
      { src: "sdb-baignoire", alt: "La salle de bains principale" },
      { src: "voilier-blanc", alt: "Le port de plaisance, au bout de la rue" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
  {
    slug: "maison-de-ville-lafond",
    reference: "AI-1050",
    titre: "Maison de ville de Lafond",
    accroche: "Une rochelaise en pierre de 1890 et son jardin de ville, à seize minutes des quais.",
    type: "Maison",
    quartier: "lafond",
    prix: 560000,
    surface: 125,
    terrain: 210,
    pieces: 6,
    chambres: 4,
    sallesDeBain: 2,
    annee: "1890",
    dpe: { classe: "D", valeur: 243 },
    ges: { classe: "D", valeur: 46 },
    exposition: "Ouest sur jardin",
    taxeFonciere: 1560,
    atouts: [
      "Jardin de ville clos de 210 m²",
      "Quatre chambres sur deux niveaux",
      "Pierre de taille apparente",
      "Aucune mitoyenneté à l’arrière",
    ],
    prestations: [
      "Tomettes et parquets anciens",
      "Cheminée en pierre dans le séjour",
      "Cuisine ouverte sur le jardin",
      "Chaudière gaz à condensation",
      "Dépendance de 15 m² à aménager",
      "Toiture révisée en 2021",
    ],
    reperes: [
      { lieu: "Marché de Lafond", duree: "5 min à pied" },
      { lieu: "Parc Franck-Delmas", duree: "8 min à pied" },
      { lieu: "Centre historique", duree: "16 min à pied" },
    ],
    description: [
      "Lafond a gardé l’échelle d’un faubourg : des venelles, des murs de pierre, et derrière chaque façade un jardin long et étroit. Cette maison de 1890 en est l’archétype, sur deux cent dix mètres carrés de terrain clos.",
      "Cent vingt-cinq mètres carrés habitables, des tomettes, une cheminée de pierre, et une cuisine ouverte qui a été reportée côté jardin pour capter l’ouest. Quatre chambres se répartissent sur les deux niveaux supérieurs.",
      "Une dépendance de quinze mètres carrés en fond de parcelle attend un bureau ou un atelier. La toiture a été révisée en 2021 ; la maison est habitable en l’état.",
    ],
    photos: [
      { src: "maison-pierre-toit", alt: "La façade en pierre de taille de 1890" },
      { src: "sejour-cheminee", alt: "Le séjour et sa cheminée de pierre" },
      { src: "facade-plantes", alt: "Le jardin de ville clos" },
      { src: "salle-a-manger", alt: "La salle à manger ouverte sur la cuisine" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
  {
    slug: "clos-de-tasdon",
    reference: "AI-1051",
    titre: "Le Clos de Tasdon",
    accroche: "Plain-pied rénové, piscine et 520 m² de jardin, en lisière des marais.",
    type: "Maison",
    quartier: "tasdon",
    prix: 595000,
    surface: 140,
    terrain: 520,
    pieces: 6,
    chambres: 4,
    sallesDeBain: 2,
    annee: "1998, rénovée en 2021",
    dpe: { classe: "C", valeur: 138 },
    ges: { classe: "C", valeur: 22 },
    exposition: "Sud sur piscine",
    taxeFonciere: 1420,
    atouts: [
      "Maison de plain-pied intégralement rénovée",
      "Piscine au sel de 8 × 4 m",
      "Jardin clos de 520 m²",
      "Parc naturel des marais à quatre minutes",
    ],
    prestations: [
      "Pompe à chaleur installée en 2021",
      "Cuisine ouverte équipée",
      "Pool house et terrasse en bois",
      "Volets roulants motorisés",
      "Garage et abri voiture",
      "Arrosage automatique",
    ],
    reperes: [
      { lieu: "Parc naturel des marais", duree: "4 min à pied" },
      { lieu: "Écoles de Tasdon", duree: "6 min à pied" },
      { lieu: "Vieux-Port", duree: "10 min à vélo" },
    ],
    description: [
      "Tasdon a changé de visage depuis la renaturation de ses marais : le quartier s’ouvre désormais sur soixante hectares de parc naturel urbain, à quatre minutes à pied de cette maison.",
      "Cent quarante mètres carrés de plain-pied, repris de fond en comble en 2021 : pompe à chaleur, cuisine ouverte, menuiseries, sols. Quatre chambres, deux pièces d’eau, et un séjour qui s’ouvre plein sud sur la terrasse en bois.",
      "La piscine au sel de huit mètres sur quatre est doublée d’un pool house. Le jardin clos de cinq cent vingt mètres carrés reste entièrement exploitable, sans vis-à-vis.",
    ],
    photos: [
      { src: "jardin-maison", alt: "La maison de plain-pied vue du jardin" },
      { src: "sejour-foyer", alt: "Le séjour ouvert sur la terrasse" },
      { src: "piscine-arbres", alt: "La piscine au sel et son pool house" },
      { src: "chambre-panier", alt: "Une des quatre chambres de plain-pied" },
    ],
    exclusivite: true,
    coupDeCoeur: false,
  },
  {
    slug: "maison-du-bourg-laleu",
    reference: "AI-1052",
    titre: "Maison du bourg de Laleu",
    accroche: "Une maison de pêcheur rénovée en 2023, à huit minutes de Chef-de-Baie.",
    type: "Maison",
    quartier: "laleu",
    prix: 449000,
    surface: 110,
    terrain: 230,
    pieces: 5,
    chambres: 3,
    sallesDeBain: 1,
    annee: "1930, rénovée en 2023",
    dpe: { classe: "C", valeur: 155 },
    ges: { classe: "C", valeur: 25 },
    exposition: "Sud-ouest sur cour",
    taxeFonciere: 1080,
    atouts: [
      "Rénovation complète livrée en 2023",
      "Cour close et exposée sud-ouest",
      "Trois chambres dont une de plain-pied",
      "Plage de Chef-de-Baie à huit minutes",
    ],
    prestations: [
      "Isolation intérieure refaite intégralement",
      "Cuisine équipée ouverte sur le séjour",
      "Salle d’eau à l’italienne",
      "Chauffage par pompe à chaleur",
      "Menuiseries aluminium double vitrage",
      "Appentis et local vélos",
    ],
    reperes: [
      { lieu: "Église Saint-Jean de Laleu", duree: "3 min à pied" },
      { lieu: "Plage de Chef-de-Baie", duree: "8 min à pied" },
      { lieu: "Centre-ville", duree: "12 min à vélo" },
    ],
    description: [
      "Laleu garde la mémoire de son bourg de pêcheurs : des maisons basses, une église romane, et la mer au bout de la rue. Celle-ci a été reprise intégralement en 2023.",
      "Cent dix mètres carrés sur deux niveaux, isolés par l’intérieur, chauffés par pompe à chaleur. Le rez-de-chaussée réunit séjour, cuisine ouverte et une chambre de plain-pied ; l’étage en compte deux autres.",
      "La cour close exposée sud-ouest de deux cent trente mètres carrés est l’atout du lieu, avec son appentis. Un bien sans travaux, à un quart d’heure de vélo du Vieux-Port.",
    ],
    photos: [
      { src: "maison-volets", alt: "La façade de la maison de bourg" },
      { src: "sejour-mural", alt: "Le séjour rénové en 2023" },
      { src: "cuisine-evier", alt: "La cuisine ouverte sur le séjour" },
      { src: "sdb-douche", alt: "La salle d’eau à l’italienne" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
  {
    slug: "pied-a-terre-des-arcades",
    reference: "AI-1053",
    titre: "Pied-à-terre des Arcades",
    accroche: "Vingt-six mètres carrés sous les galeries couvertes du centre historique.",
    type: "Studio",
    quartier: "centre-historique",
    prix: 189000,
    surface: 26,
    pieces: 1,
    chambres: 0,
    sallesDeBain: 1,
    etage: { niveau: 2, sur: 3, ascenseur: false },
    annee: "XVIIIe siècle, rénové en 2020",
    dpe: { classe: "E", valeur: 288 },
    ges: { classe: "E", valeur: 58 },
    exposition: "Est sur rue à arcades",
    taxeFonciere: 520,
    chargesAnnuelles: 960,
    atouts: [
      "Adresse au cœur du secteur sauvegardé",
      "Poutres apparentes et pierre de taille",
      "Rénové en 2020, meublé possible",
      "Marché central à deux minutes",
    ],
    prestations: [
      "Kitchenette équipée",
      "Salle d’eau refaite en 2020",
      "Rangements sur mesure",
      "Double vitrage sur menuiseries bois",
      "Chauffage électrique à inertie",
      "Copropriété de six lots",
    ],
    reperes: [
      { lieu: "Marché central", duree: "2 min à pied" },
      { lieu: "Vieux-Port", duree: "5 min à pied" },
      { lieu: "Gare de La Rochelle", duree: "11 min à pied" },
    ],
    description: [
      "Au deuxième étage d’un immeuble du XVIIIe siècle, sur l’une des rues à galeries couvertes qui font le centre historique, ce pied-à-terre de vingt-six mètres carrés tient dans une seule pièce bien dessinée.",
      "Poutres apparentes, pierre de taille, rangements sur mesure : la rénovation de 2020 a su garder le caractère sans sacrifier le confort. Kitchenette équipée, salle d’eau neuve, double vitrage sur menuiseries bois.",
      "Une copropriété de six lots, des charges légères, et une adresse où l’on vient à pied depuis la gare. L’entrée la plus juste dans le centre ancien de La Rochelle.",
    ],
    photos: [
      { src: "quai-facades", alt: "L’immeuble du XVIIIe siècle depuis la rue" },
      { src: "sejour-baie", alt: "La pièce de vie et sa fenêtre sur la rue" },
      { src: "sejour-salle-manger", alt: "Le coin repas et la kitchenette" },
      { src: "marche-centre", alt: "Le marché central, à deux minutes" },
    ],
    exclusivite: false,
    coupDeCoeur: false,
  },
] as const;

/* ─── Accès et utilitaires ──────────────────────────────────── */

export function bienParSlug(slug: string): Bien | undefined {
  return BIENS.find((b) => b.slug === slug);
}

export function biensDuQuartier(quartier: string): readonly Bien[] {
  return BIENS.filter((b) => b.quartier === quartier);
}

export function coupsDeCoeur(): readonly Bien[] {
  return BIENS.filter((b) => b.coupDeCoeur);
}

/** Les bornes réelles du portefeuille, utilisées par les filtres. */
export const BORNES = {
  prix: [
    Math.min(...BIENS.map((b) => b.prix)),
    Math.max(...BIENS.map((b) => b.prix)),
  ] as const,
  surface: [
    Math.min(...BIENS.map((b) => b.surface)),
    Math.max(...BIENS.map((b) => b.surface)),
  ] as const,
  pieces: [
    Math.min(...BIENS.map((b) => b.pieces)),
    Math.max(...BIENS.map((b) => b.pieces)),
  ] as const,
};

/** Suggère trois biens proches de celui consulté. */
export function biensSimilaires(bien: Bien, nombre = 3): readonly Bien[] {
  const autres = BIENS.filter((b) => b.slug !== bien.slug);
  const score = (b: Bien) =>
    (b.quartier === bien.quartier ? 0 : 2) +
    (b.type === bien.type ? 0 : 1) +
    Math.abs(b.prix - bien.prix) / 1_000_000;
  return [...autres].sort((a, b) => score(a) - score(b)).slice(0, nombre);
}
