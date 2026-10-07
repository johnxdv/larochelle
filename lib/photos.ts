/**
 * Crédits photographiques.
 *
 * Toutes les images de public/images/ proviennent d'Unsplash et sont
 * utilisées sous licence Unsplash. Ce fichier est la source de CREDITS.md.
 */

export type Credit = {
  /** Nom du fichier dans public/images, sans extension */
  readonly fichier: string;
  /** Identifiant de la photographie sur Unsplash */
  readonly reference: string;
  /** Nom affiché de l'auteur */
  readonly auteur: string;
  /** Pseudonyme Unsplash de l'auteur */
  readonly compte: string;
  /** Description de la photographie */
  readonly description: string;
};

export const CREDITS: readonly Credit[] = [
  { fichier: "bateau-chenal", reference: "photo-1685116394561-8141a5ee83c0", auteur: "Xavier Foucrier", compte: "xavierfoucrier", description: "Petit bateau dans le chenal au pied des remparts" },
  { fichier: "bateaux-port", reference: "photo-1535728669519-adf26699ddbb", auteur: "Cody Board", compte: "codypboard", description: "Bateaux au mouillage" },
  { fichier: "canal-bateaux", reference: "photo-1710330489377-9fb3a07abdae", auteur: "Lucas Gallone", compte: "lucasgallone", description: "Les tours du Vieux-Port et les bateaux du chenal" },
  { fichier: "chambre-balcon", reference: "photo-1644955052489-10bda5c94b19", auteur: "Samuel Regan-Asante", compte: "reganography", description: "Chambre ouvrant sur un balcon" },
  { fichier: "chambre-chevet", reference: "photo-1646572961739-58557003b037", auteur: "mk. s", compte: "mk__s", description: "Chambre épurée et table de chevet" },
  { fichier: "chambre-draps", reference: "photo-1582224163312-0735047647c6", auteur: "Storiès", compte: "allthestories", description: "Linge de lit blanc froissé" },
  { fichier: "chambre-lin", reference: "photo-1601276174812-63280a55656e", auteur: "Liz Vo", compte: "lvphotos", description: "Lit habillé de lin blanc" },
  { fichier: "chambre-oreillers", reference: "photo-1649817018876-c05473c7e5a4", auteur: "mk. s", compte: "mk__s", description: "Lit, oreillers et table de nuit" },
  { fichier: "chambre-panier", reference: "photo-1667915981646-3ec32877dfbf", auteur: "mk. s", compte: "mk__s", description: "Chambre claire et panier d'osier" },
  { fichier: "chateau-tourelles", reference: "photo-1760439616940-2bfc532136a3", auteur: "Christel F.", compte: "christelsphotos", description: "Château à tourelles entouré d'arbres" },
  { fichier: "chemin-plage", reference: "photo-1645551596939-0825f1daa661", auteur: "Jérôme CHESNEAU", compte: "studiograindesel", description: "Chemin de sable descendant vers l'océan" },
  { fichier: "couloir-portes", reference: "photo-1722029976858-c2a290fc5ee7", auteur: "Tommy Bond", compte: "bondomovies", description: "Enfilade de portes dans un couloir" },
  { fichier: "cuisine-blanche", reference: "photo-1722605090433-41d1183a792d", auteur: "Stephen Owen", compte: "stephenowen23", description: "Cuisine aux façades blanches" },
  { fichier: "cuisine-bois", reference: "photo-1769745402932-4c93d9e76d98", auteur: "Clay Banks", compte: "claybanks", description: "Cuisine rustique aux façades de bois" },
  { fichier: "cuisine-evier", reference: "photo-1683629357935-f3f4777ddf41", auteur: "Brian Zajac", compte: "brianzajac", description: "Îlot central et évier de cuisine" },
  { fichier: "cuisine-marbre", reference: "photo-1683629357963-adf2b1fa9ad9", auteur: "Brian Zajac", compte: "brianzajac", description: "Plan de travail en marbre" },
  { fichier: "cuisine-tabourets", reference: "photo-1671197244266-73129c97c096", auteur: "Medea Dzagnidze", compte: "medeadza", description: "Cuisine contemporaine et tabourets" },
  { fichier: "demeure-jardin", reference: "photo-1705591936362-aaaab3083cbe", auteur: "Colin Watts", compte: "colinwatts", description: "Demeure en pierre précédée d'un jardin" },
  { fichier: "dunes-mer", reference: "photo-1743239508197-870f32379ad1", auteur: "Ombeline Leprince", compte: "ombelinelpc", description: "Dunes et océan sous un ciel pâle" },
  { fichier: "dunes-sable", reference: "photo-1693999940204-ef846e120f5b", auteur: "paola capelletto", compte: "___pi___", description: "Étendue d'eau bordée de dunes de sable" },
  { fichier: "facade-balcons", reference: "photo-1760355223365-cdfe570936c6", auteur: "Santiago Franco", compte: "santiago_franco", description: "Façade ornée de balcons en fer forgé" },
  { fichier: "facade-plantes", reference: "photo-1689174518492-89757035337e", auteur: "Jorgen Hendriksen", compte: "jor9en", description: "Façade en pierre et plantes en pot" },
  { fichier: "hero-vieux-port", reference: "photo-1617111641010-39cc2d207f4b", auteur: "Xavier Foucrier", compte: "xavierfoucrier", description: "Le Vieux-Port de La Rochelle et ses tours sous un ciel d'été" },
  { fichier: "hotel-particulier", reference: "photo-1650020972195-9d48d1c2a14c", auteur: "Yevhenii Ometsynskyi", compte: "yevhenii_ometsynskyi", description: "Grande demeure aux volets blancs" },
  { fichier: "jardin-maison", reference: "photo-1663146857072-9d455ea8a213", auteur: "snap wander", compte: "passimage", description: "Jardin planté devant une maison ancienne" },
  { fichier: "maison-facade", reference: "photo-1567590997573-a0cfe69ee335", auteur: "Jonathan Farber", compte: "farber", description: "Façade d'une maison de caractère" },
  { fichier: "maison-pierre-pelouse", reference: "photo-1685731073947-b6b534343f35", auteur: "snap wander", compte: "passimage", description: "Maison en pierre et pelouse close de murs" },
  { fichier: "maison-pierre-toit", reference: "photo-1694171738257-76d1260d491d", auteur: "Xavier Foucrier", compte: "xavierfoucrier", description: "Maison de pierre ancienne au toit sombre" },
  { fichier: "maison-volets", reference: "photo-1683538503557-a63efc7c3f3e", auteur: "Jametlene Reskp", compte: "reskp", description: "Maison de pierre aux volets colorés" },
  { fichier: "marais-roseaux", reference: "photo-1761943841002-a0b5aae49af4", auteur: "Eduard Galitsky", compte: "echogolf", description: "Hautes herbes de marais bordant une eau calme" },
  { fichier: "marche-centre", reference: "photo-1614020124467-cd66081a993d", auteur: "Jade Marchand", compte: "jadjie", description: "Promeneurs au marché du centre historique" },
  { fichier: "parquet-assise", reference: "photo-1590938272761-c11f74452660", auteur: "Rumman Amin", compte: "rumanamin", description: "Assise de bois sur un parquet ancien" },
  { fichier: "piscine-aerienne", reference: "photo-1711110065992-6d6aff9ae35c", auteur: "Zoshua Colah", compte: "zoshuacolah", description: "Vue aérienne d'une piscine et de sa terrasse" },
  { fichier: "piscine-arbres", reference: "photo-1636484807510-bc2ffbaf3241", auteur: "allPhoto Bangkok", compte: "allphotobangkok", description: "Piscine entourée d'arbres" },
  { fichier: "plage-marcheurs", reference: "photo-1731862235615-7e0fcaa44755", auteur: "Alexandre TOPOLEWSKI", compte: "alexandretopolewski", description: "Deux promeneurs sur un sentier de plage" },
  { fichier: "port-bateau", reference: "photo-1592900086621-4cd9d2ecb7ac", auteur: "Simon PALLARD", compte: "simonpallard", description: "Bateau amarré dans le port de La Rochelle" },
  { fichier: "porte-parquet", reference: "photo-1722942116037-97e84b56c990", auteur: "Lisa Anna", compte: "lisaanna195", description: "Porte blanche ouverte sur un parquet" },
  { fichier: "quai-facades", reference: "photo-1597226290016-764e1f4767dd", auteur: "Steven Roussel", compte: "stevenrsl", description: "Façades claires au bord de l'eau à La Rochelle" },
  { fichier: "salle-a-manger", reference: "photo-1600488999593-83309d5d766e", auteur: "Collov Home Design", compte: "collovhome", description: "Table de salle à manger et chaises claires" },
  { fichier: "sdb-baignoire", reference: "photo-1644068298141-6333cb147520", auteur: "Patrick Langwallner", compte: "patresinger", description: "Baignoire blanche et tabouret de bois" },
  { fichier: "sdb-claire", reference: "photo-1610178167104-488495443e01", auteur: "Jean-Philippe Delberghe", compte: "jipy32", description: "Salle de bains claire et minérale" },
  { fichier: "sdb-douche", reference: "photo-1646489553899-c4c4b5a72ccc", auteur: "mk. s", compte: "mk__s", description: "Salle d'eau avec banc et douche" },
  { fichier: "sdb-lavabo", reference: "photo-1765371512612-86600e661f4d", auteur: "Caroline Badran", compte: "___atmos", description: "Lavabo de pierre et miroir" },
  { fichier: "sdb-marbre", reference: "photo-1756079664354-34944e001f6d", auteur: "Ela De Pure", compte: "eladepure", description: "Salle de bains en marbre" },
  { fichier: "sejour-baie", reference: "photo-1704040686428-7534b262d0d8", auteur: "Ariel Domenden", compte: "hypvisual", description: "Séjour ouvert sur une grande baie" },
  { fichier: "sejour-canape-blanc", reference: "photo-1613545325268-9265e1609167", auteur: "Zac Gudakov", compte: "zacgudakov", description: "Canapé blanc près d'une baie vitrée" },
  { fichier: "sejour-cheminee", reference: "photo-1638885930125-85350348d266", auteur: "Lotus Design N Print", compte: "lotusdnp", description: "Séjour avec cheminée" },
  { fichier: "sejour-cheminee-2", reference: "photo-1649083048269-8bfb755e7b87", auteur: "Bailey Alexander", compte: "baileyal3xander", description: "Salon avec cheminée et assises claires" },
  { fichier: "sejour-chevrons", reference: "photo-1769736436809-eab3de70b175", auteur: "Sayless studios", compte: "saylessstudio", description: "Séjour au parquet en point de Hongrie" },
  { fichier: "sejour-cuir", reference: "photo-1628744876525-f2678d8af47f", auteur: "Zac Gudakov", compte: "zacgudakov", description: "Canapé de cuir clair dans un salon" },
  { fichier: "sejour-foyer", reference: "photo-1632120377007-c2adc3017b1e", auteur: "Spacejoy", compte: "spacejoy", description: "Salon réuni autour d'un foyer" },
  { fichier: "sejour-grande-fenetre", reference: "photo-1656122381069-9ec666d95cf1", auteur: "Jake Goossen", compte: "jakegoossen", description: "Séjour ouvert sur une grande fenêtre" },
  { fichier: "sejour-lumineux", reference: "photo-1757924461488-ef9ad0670978", auteur: "Aalo Lens", compte: "aalolens", description: "Séjour contemporain très lumineux" },
  { fichier: "sejour-mural", reference: "photo-1680770638423-6d4c1089bd7a", auteur: "Nadi Spasibenko", compte: "nadispasibenko", description: "Salon et toile contemporaine" },
  { fichier: "sejour-parquet", reference: "photo-1680773525468-eda783c5bfe7", auteur: "Nadi Spasibenko", compte: "nadispasibenko", description: "Séjour et parquet ancien" },
  { fichier: "sejour-salle-manger", reference: "photo-1722942114580-04958c43a04a", auteur: "Lisa Anna", compte: "lisaanna195", description: "Séjour prolongé d'une salle à manger" },
  { fichier: "sejour-table-basse", reference: "photo-1704040686413-2c607dbd2f06", auteur: "Ariel Domenden", compte: "hypvisual", description: "Séjour, canapé et table basse" },
  { fichier: "sejour-velours", reference: "photo-1628744876497-eb30460be9f6", auteur: "Zac Gudakov", compte: "zacgudakov", description: "Deux canapés de velours se faisant face" },
  { fichier: "terrasse-chaises", reference: "photo-1784841525371-197d22736101", auteur: "Arno Senoner", compte: "arnosenoner", description: "Chaises métalliques sur un balcon lumineux" },
  { fichier: "terrasse-ocean", reference: "photo-1702830499141-a0634d87d6af", auteur: "David Kuvaev", compte: "dkuva", description: "Balcon ouvert sur l'océan" },
  { fichier: "terrasse-table", reference: "photo-1714919286244-6f3f6cce6e65", auteur: "Romina Denti", compte: "sistalisca", description: "Table et chaises sur une terrasse face à la mer" },
  { fichier: "tour-oiseaux", reference: "photo-1581878611389-78121d751dd9", auteur: "Romain HUNEAU", compte: "honni", description: "Tour de pierre de La Rochelle et vol d'oiseaux" },
  { fichier: "tours-la-rochelle", reference: "photo-1587931693473-9598be66ae1c", auteur: "Guillaume QL", compte: "georges015", description: "Les tours de La Rochelle au bord du chenal" },
  { fichier: "villa-arbres", reference: "photo-1614291486355-ba4fc328156b", auteur: "Baptiste Pilot", compte: "baptiste_pilot", description: "Maison claire entourée d'arbres" },
  { fichier: "voilier-blanc", reference: "photo-1541777594744-addc2de9d110", auteur: "Cristina Gottardi", compte: "cristina_gottardi", description: "Voilier blanc sur une mer calme" },
  { fichier: "vue-aerienne-ville", reference: "photo-1592900102891-963e9359b59e", auteur: "Simon PALLARD", compte: "simonpallard", description: "Vue aérienne des toits de La Rochelle" },
  { fichier: "yacht-quai", reference: "photo-1533315318720-a6538dcefcae", auteur: "Karim MANJRA", compte: "karim_manjra", description: "Yacht blanc amarré le long du quai" },
];

/** URL du profil Unsplash d'un auteur. */
export function profilUnsplash(compte: string): string {
  return `https://unsplash.com/@${compte}`;
}
