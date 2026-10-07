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

Les biens sont référencés par `slug` : la fiche `/biens/<slug>` est générée
automatiquement pour chaque entrée de `BIENS`, de même que les filtres, dont
les bornes de prix et de surface se calculent sur le portefeuille réel.

## Intro vidéo au défilement

Le héro de l'accueil sait déjà lire une **séquence d'images sur un canvas**,
pilotée par le défilement. Tant qu'aucune séquence n'est fournie, il affiche
une photographie. Pour la brancher :

1. déposer les images dans `public/intro/` (voir `public/intro/LISEZMOI.md`) ;
2. dans `lib/intro.ts`, passer `actif: true` et renseigner `nombreImages`.

Le composant bascule seul du mode photographie au mode canvas.

## Moteur d'estimation

La page `/estimation` est un écran d'attente. Le point de montage est balisé
dans `app/estimation/page.tsx` :

```tsx
<div id="moteur-estimation" />
```

Le bloc d'attente qui le précède est à remplacer par le composant du moteur.

## Formulaires

Les formulaires de contact et de demande de visite **ne sont reliés à aucun
envoi**. Ils valident la saisie et affichent une confirmation à l'écran. Le
traitement se branche dans `components/formulaire-contact.tsx`, fonction
`soumettre`.

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
components/             en-tête, héro, cartes, galerie, filtres, formulaires…
lib/                    données et mise en forme
public/
  images/               67 photographies Unsplash
  intro/                séquence du héro (vide par défaut)
```

## Crédits

Photographies sous licence Unsplash, typographies sous SIL Open Font
License : voir [CREDITS.md](CREDITS.md).
