# Séquence de l'intro au défilement

Ce dossier contient la séquence d'images lue sur un canvas par l'intro de la
page d'accueil (`components/intro-defilement.tsx`).

## Nommage

`frame-001.jpg`, `frame-002.jpg`, … — trois chiffres, à partir de 1, sans
trou dans la numérotation.

Le nombre d'images n'est écrit nulle part : il est **compté à la compilation**
par `components/intro-accueil.tsx`, qui lit ce dossier. Ajouter ou retirer des
images suffit, il n'y a aucun réglage à mettre à jour.

## Remplacer la séquence

```bash
rm public/intro/frame-*.jpg
ffmpeg -i intro.mp4 -vf "fps=24,scale=1920:-2" -q:v 4 public/intro/frame-%03d.jpg
```

Repères utiles :

- **Nombre d'images** — entre 120 et 300. Au-delà, le poids total pèse sur les
  connexions mobiles ; en deçà, le défilement paraît saccadé.
- **Largeur** — 1920 px suffit : les images sont dessinées sur un canvas, qui
  les recadre en « cover ». Viser 100 à 150 Ko par image.
- **Première et dernière image** — ce sont les deux plus vues : la première
  s'affiche au chargement sous l'accroche, la dernière reste à l'écran à la fin
  de l'animation et sert de repli sous `prefers-reduced-motion`. Les choisir
  comme deux photographies à part entière.

## Durée de l'animation

La hauteur du couloir de défilement est fixée par la classe `h-[320vh]` de la
section, dans `components/intro-defilement.tsx` : il faut trois écrans et demi
de défilement pour traverser la section. Les repères qui décident du moment où
le texte s'efface et revient sont rassemblés dans `REPERES`, côté
`lib/intro.ts`.

## Chargement

La première image est posée dans le HTML (`fetchPriority="high"`) : elle
s'affiche immédiatement. Les autres sont téléchargées en arrière-plan, six à la
fois. Tant qu'une image n'est pas arrivée, le canvas affiche la plus proche
déjà chargée — le défilement n'attend jamais.
