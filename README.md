# Ashley Immobilier — site de démonstration

Site vitrine d'une agence immobilière de prestige à **La Rochelle**, île de Ré
et île d'Oléron. Démonstration destinée à être présentée à des agences : tous
les biens, prix, membres de l'équipe et témoignages sont fictifs.

**Pile technique** — Next.js 16 (App Router), React 19, TypeScript, Tailwind
CSS 4. Rendu entièrement statique, prêt pour un déploiement sur Vercel.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi sur <http://localhost:3000>.

```bash
npm run build   # construction de production
npm run start   # servir la construction
```

## Déploiement sur Vercel

Le projet est à la racine du dépôt et ne demande aucune configuration :
importer le dépôt dans Vercel, qui détecte Next.js, construit et déploie.
Aucune variable d'environnement n'est nécessaire.

## Pas d'indexation

Le site est volontairement invisible des moteurs de recherche, tout en
restant accessible normalement par son adresse. Trois verrous :

| Où | Quoi |
| --- | --- |
| `app/layout.tsx` | métadonnée `robots` + balise `<meta name="robots">` sur toutes les pages |
| `app/robots.ts` | `robots.txt` avec `Disallow: /` pour tous les agents |
| `next.config.ts` | en-tête HTTP `X-Robots-Tag`, qui couvre aussi les images |

Pour ouvrir le site à l'indexation, retirer ces trois éléments.

## Où modifier quoi

| Fichier | Contenu |
| --- | --- |
| `lib/biens.ts` | **les 12 biens** : prix, surfaces, DPE, descriptions, photos. Le seul fichier à remplacer pour brancher un vrai portefeuille. |
| `lib/quartiers.ts` | les quartiers de La Rochelle et leurs fourchettes de prix au m² |
| `lib/agence.ts` | identité, coordonnées, équipe, valeurs, étapes de vente, témoignages |
| `lib/photos.ts` | crédits photo (source de `CREDITS.md`) |
| `app/globals.css` | palette, typographies, rayons, effets de verre, animations |
| `lib/intro.ts` | repères de l'intro au défilement et contrat avec l'en-tête |

Les biens sont référencés par `slug` : la fiche `/biens/<slug>` est générée
automatiquement pour chaque entrée de `BIENS`, de même que les filtres, dont
les bornes de prix et de surface se calculent sur le portefeuille réel.

## Intro au défilement

L'accueil s'ouvre sur une **séquence d'images rendue sur un canvas**, pilotée
par le défilement — jamais de lecture vidéo. La section reste fixée à l'écran
et le défilement avance ou recule dans la séquence.

Le déroulé :

1. **au chargement** — la première image en plein écran sous un voile radial
   doux, l'accroche centrée, et pour tout en-tête le logo et le hamburger ;
2. **au premier mouvement** — le texte et le voile s'effacent, l'image seule
   défile ;
3. **à la dernière image** — une boucle vidéo muette (`public/intro/scene.mp4`)
   prend la place du canvas sans saut visible : elle part de cette même image,
   qui lui sert de poster. En remontant, elle se met en pause et le canvas
   reprend la main ;
4. **à la fin** — le voile et l'accroche reviennent en fondu avec le bouton
   « Estimer mon bien », et l'en-tête reprend son menu complet sur une barre
   transparente ;
5. **plus bas dans la page** — la barre redevient claire. En remontant, tout
   se rejoue à l'envers.

La section prévient l'en-tête de son état par un évènement, dont le contrat
vit dans [lib/intro.ts](lib/intro.ts) : l'en-tête n'a ainsi rien à savoir de
l'accueil.

**Remplacer la séquence** : déposer les images dans `public/intro/`
(`frame-001.jpg`, `frame-002.jpg`, …). Le nombre d'images est compté à la
compilation, il n'y a aucun réglage à mettre à jour. Voir
[public/intro/LISEZMOI.md](public/intro/LISEZMOI.md).

Sous `prefers-reduced-motion`, la section se réduit à la dernière image seule,
avec le texte, le bouton et le menu habituels — ni les images de séquence ni
la vidéo ne sont alors téléchargées.

## Moteur d'estimation

La page `/estimation` porte le parcours complet : adresse, repérage du bâtiment
sur photo aérienne IGN, saisie de l'étage et de la surface, analyse, fourchette
de prix, puis récupération du contact.

| Où | Quoi |
| --- | --- |
| `components/estimation/` | le parcours (panneaux, carte Leaflet, décor 3D) |
| `lib/estimation/` | la logique, dont `serveur/` qui porte le calcul |
| `app/api/estimation/` | la route appelée par le parcours |
| `app/api/monaco-adresses/` | recherche d'adresses monégasques, utilisée par le moteur |

**Aucune clé d'API n'est nécessaire** : le moteur interroge des services
publics ouverts — Base Adresse Nationale, Géoplateforme IGN, BDNB et DVF. Les
deux variables facultatives sont décrites dans [.env.example](.env.example).

Le calcul n'a pas été touché : aucun coefficient n'a bougé. Pour recaler les
prix sur un secteur, la variable `ESTIMATION_PRIX_M2` est prévue pour cela et
se règle sans modifier le code.

L'habillage passe par un **pont de jetons** en fin de `app/globals.css` : les
composants gardent leurs classes d'origine (`bg-ink`, `text-brass`,
`rounded-carte`…), et ces noms sont redéfinis vers la palette et les
typographies de la maison. Rien n'a été réécrit dans leur balisage.

## Formulaires

Les formulaires **ne sont reliés à aucun envoi**. Ils valident la saisie et
affichent une confirmation à l'écran.

- Contact et demande de visite : `components/formulaire-contact.tsx`,
  fonction `soumettre`.
- Récupération du contact en fin d'estimation : `lib/formulaires.ts`,
  fonction `soumettreFormulaire` — point unique à brancher, documenté en tête
  de fichier.

## Direction artistique

- **Palette** — blanc calcaire, sable, bleu atlantique profond, azur et écume.
  Aucun texte doré ni grande surface noire.
- **Matière** — verre dépoli (`.verre`, `.verre-sombre`), lumières douces en
  dégradés radiaux, reflets au survol (`.verre-reflet`).
- **Typographies** — Cormorant Garamond pour les titres, Manrope pour le
  texte. Auto-hébergées dans `app/fonts/`, sous-ensemble latin, WOFF2
  variable : aucune requête vers un service tiers.
- **Mouvement** — apparitions au défilement (`components/apparition.tsx`),
  flottement continu des images, micro-interactions sur les cartes. Tout est
  neutralisé sous `prefers-reduced-motion`.
- **Mobile d'abord** — vérifié à 390 px de large sur l'ensemble des pages.

## Structure

```
app/
  page.tsx              accueil
  biens/                liste filtrable et fiches /biens/<slug>
  vendre/ agence/
  contact/ estimation/
  globals.css           système de design
  fonts/                WOFF2 auto-hébergés
  api/                  routes du moteur d'estimation
components/             en-tête, héro, cartes, galerie, filtres, formulaires…
  estimation/           le parcours d'estimation
lib/                    données et mise en forme
  estimation/           la logique du moteur
public/
  images/               67 photographies Unsplash
  intro/                séquence de l'intro au défilement
```

## Crédits

Photographies sous licence Unsplash, typographies sous SIL Open Font
License : voir [CREDITS.md](CREDITS.md).
