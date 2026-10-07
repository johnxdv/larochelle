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

## La boucle vivante — `scene.mp4`

Arrivé à la dernière image, une boucle vidéo muette prend la place du canvas :
elle **part et revient exactement sur `frame-240.jpg`**, qui lui sert aussi de
poster. Le relais est instantané, sans fondu — les deux montrent la même
image, il n'y a donc rien à masquer. En remontant, la vidéo se met en pause,
se remet à zéro et le canvas reprend la main.

Pour la remplacer : garder une vidéo dont la première et la dernière image
sont la dernière image de la séquence, sinon le relais se verra. Muette,
H.264, et légère — la nôtre fait 864 Ko pour dix secondes en 1280 × 720, ce
qui suffit largement puisqu'elle est redimensionnée en « cover ».

Elle n'est téléchargée que lorsqu'elle peut servir : la balise porte
`preload="none"`, et le composant ne passe à `auto` qu'une fois certain que
l'animation aura lieu — donc jamais sous `prefers-reduced-motion`.

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
