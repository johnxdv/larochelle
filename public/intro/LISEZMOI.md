# Séquence d'intro au défilement

Ce dossier accueille la séquence d'images lue sur un canvas par le héro de la
page d'accueil (`components/hero-intro.tsx`).

## Déposer une séquence

1. Exporter la vidéo en images numérotées, par exemple avec ffmpeg :

   ```bash
   ffmpeg -i intro.mp4 -vf "fps=24,scale=1920:-2" -q:v 4 public/intro/intro-%04d.jpg
   ```

   Viser 90 à 180 images : au-delà, le préchargement devient lourd sur mobile.

2. Ouvrir `lib/intro.ts` et renseigner :

   ```ts
   actif: true,
   nombreImages: 120,        // le nombre réel d'images exportées
   longueurDefilement: 3,    // en hauteurs d'écran
   ```

3. C'est tout. Le héro bascule du mode photographie au mode canvas, et la
   lecture suit le défilement.

## Nommage attendu

`intro-0001.jpg`, `intro-0002.jpg`, … (quatre chiffres, à partir de 1).
Le format est configurable dans `INTRO.fichier()`.

## Tant que la séquence est absente

Le héro affiche la photographie de repli définie dans `INTRO.repli`
— par défaut les tours du Vieux-Port.
