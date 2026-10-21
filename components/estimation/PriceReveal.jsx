'use client'

/**
 * Flou binaire, pas de dégradé : un chiffre est soit net, soit flouté d'une
 * intensité fixe (même valeur forte pour tous les chiffres encore cachés,
 * quelle que soit leur position) — un dégradé laisserait deviner les
 * chiffres presque révélés.
 */
const HIDDEN_BLUR = { mobile: 14, desktop: 22 }
const CLEAR = { mobile: 0, desktop: 0 }

const EST_CHIFFRE = /\d/

/**
 * Flou (mobile, desktop) d'un chiffre donné.
 *
 * Seule la fin du nombre se dévoile : un chiffre est net quand il se trouve à
 * moins de `reveles` positions du bord droit. Les premiers chiffres ne le sont
 * jamais, quelle que soit l'avancée dans la conversation.
 *
 * Le flou n'est ici qu'une mise en scène : les chiffres encore masqués ne sont
 * pas dans ce composant. Ce qu'il floute, ce sont des leurres — voir
 * `montant-masque.js`.
 */
function blurFor(digitIndex, totalDigits, reveles) {
  return totalDigits - 1 - digitIndex < reveles ? CLEAR : HIDDEN_BLUR
}

/**
 * LARGEUR DU MONTANT, en cadratins, d'après son seul nombre de chiffres.
 *
 * C'est ce que la carte a besoin de savoir pour choisir une taille de texte qui
 * tienne (voir `.montant-cadre` dans `estimation.css`) : la largeur d'un texte
 * ne se lit pas en CSS, il faut la lui dire. Relevé en chiffres tabulaires : un
 * chiffre vaut 0,589 cadratin, l'espace fine et le symbole € qui ferment le
 * montant en valent 0,935 à eux deux. Les séparateurs de milliers sont
 * négligés — ils pèsent cinq centièmes chacun, et les ignorer laisse la marge
 * de sécurité du bon côté.
 *
 * Arrondi vers le haut plutôt que juste : une estimation trop large fait un
 * montant un peu plus petit que nécessaire, une estimation trop courte le fait
 * déborder. Les deux erreurs ne se valent pas.
 *
 * Les leurres étant eux aussi des chiffres, la largeur ne bouge pas d'un
 * dévoilement à l'autre : rien ne se recompose à l'écran.
 */
const PAR_CHIFFRE = 0.6
const FERMETURE = 1

export const largeurEnCadratins = (formatted) =>
  PAR_CHIFFRE * [...formatted].filter((char) => EST_CHIFFRE.test(char)).length + FERMETURE

/**
 * Prix affiché chiffre par chiffre, chacun flouté indépendamment et de façon
 * responsive : deux intensités (mobile/desktop) coexistent par caractère via
 * des variables CSS, commutées par la classe `sm:` — pas de doublon de
 * balisage, une seule bascule Tailwind par chiffre. Le flou lui-même transite
 * en douceur (`transition-[filter]`) à chaque changement, plutôt que de sauter
 * instantanément d'une intensité à l'autre.
 *
 * `caracteres` est le montant DÉJÀ MASQUÉ : aux positions encore floutées, il
 * porte des chiffres tirés au hasard, jamais les vrais. Ce composant ne connaît
 * donc pas le montant, et il n'a rien à protéger — il met en forme ce qu'on lui
 * donne. La composition se fait en amont, dans `montant-masque.js`.
 *
 * Seuls les CHIFFRES sont comptés pour repérer les positions — les séparateurs
 * (espaces fines insécables) et le symbole € ne sont jamais flous et ne
 * décalent pas la numérotation.
 *
 * `tailleMax` est le plafond de taille du montant — sa taille d'origine, celle
 * qu'il prend quand la carte est assez large pour la porter. En dessous, la
 * taille est celle qui tient : c'est la carte qui la calcule, à partir de la
 * largeur que ce composant lui déclare (voir `largeurEnCadratins`).
 */
export function PriceReveal({ caracteres, reveles = 0, className = '', tailleMax = '4rem' }) {
  const chars = [...caracteres]
  const totalDigits = chars.filter((char) => EST_CHIFFRE.test(char)).length
  let digitIndex = -1

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        '--montant-largeur': largeurEnCadratins(caracteres),
        '--montant-max': tailleMax,
      }}
    >
      {chars.map((char, i) => {
        if (!EST_CHIFFRE.test(char)) {
          return (
            <span key={i} className="inline-block select-none">
              {char}
            </span>
          )
        }

        digitIndex += 1
        const { mobile, desktop } = blurFor(digitIndex, totalDigits, reveles)

        return (
          <span
            key={i}
            className="inline-block select-none [filter:blur(var(--blur-m))] transition-[filter] duration-500 ease-plan sm:[filter:blur(var(--blur-d))]"
            style={{ '--blur-m': `${mobile}px`, '--blur-d': `${desktop}px` }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
