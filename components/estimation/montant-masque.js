'use client'

/**
 * ════════════════════════════════════════════════════════════════════════════
 * MASQUAGE DU MONTANT — le visiteur ne voit jamais le prix complet
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Ni avant ni après avoir laissé ses coordonnées. Seule la FIN du nombre se
 * dévoile, de droite à gauche, au fil de la conversation de capture ; les
 * premiers chiffres — les seuls qui portent l'ordre de grandeur — restent
 * floutés jusqu'au bout. Le montant exact est communiqué par le conseiller
 * lors du rappel.
 *
 * LE FLOU N'EST PAS UNE PROTECTION. Un filtre CSS se retire en deux clics dans
 * l'inspecteur, et le chiffre est là, dans le DOM. C'est pourquoi ce module
 * existe : les positions encore masquées sont remplacées, AVANT le rendu, par
 * des chiffres tirés au hasard. Le composant d'affichage ne reçoit donc jamais
 * les chiffres cachés — ni en texte, ni en propriété, ni en attribut. Lire le
 * DOM, le state React ou les props ne rend que des leurres.
 *
 * Les leurres sont tirés uniformément parmi 0-9, SANS exclure le vrai chiffre :
 * les exclure reviendrait à publier, pour chaque position, la liste des neuf
 * valeurs possibles — soit l'inverse du but recherché.
 *
 * Rien ici ne touche au calcul. Le moteur, la route d'API et la demande
 * envoyée au conseiller continuent de porter le vrai prix et la vraie
 * fourchette (voir `finishChat` dans Estimer.jsx).
 * ════════════════════════════════════════════════════════════════════════════
 */

const EST_CHIFFRE = /\d/

/**
 * Nombre de chiffres qui restent cachés quoi qu'il arrive.
 *
 * La moitié du montant, arrondie au supérieur, et jamais moins de deux : sur
 * un prix à six chiffres, trois restent flous — dont le premier, celui qui
 * donnerait la centaine de milliers.
 */
function planchierCache(totalChiffres) {
  return Math.max(2, Math.ceil(totalChiffres / 2))
}

/** Nombre maximal de chiffres dévoilables, depuis la droite. */
export function revelablesMax(totalChiffres) {
  return Math.max(0, totalChiffres - planchierCache(totalChiffres))
}

/**
 * Chiffres nets, depuis la droite, pour un nombre de questions répondues.
 *
 * Une de plus par étape franchie, et jamais au-delà du plafond ci-dessus —
 * y compris une fois la conversation terminée : la fin du parcours ne
 * déverrouille rien.
 */
export function chiffresReveles(etapesFranchies, totalChiffres) {
  const demande = Math.max(0, Math.trunc(etapesFranchies))
  return Math.min(demande, revelablesMax(totalChiffres))
}

/** Nombre de chiffres d'un montant formaté. */
export function compterChiffres(formate) {
  return [...String(formate ?? '')].filter((c) => EST_CHIFFRE.test(c)).length
}

/**
 * Un leurre par position de chiffre, à tirer une fois par montant et à
 * conserver : des leurres retirés à chaque rendu scintilleraient, et la
 * succession des tirages finirait par trahir ce qu'ils recouvrent.
 */
export function tirerLeurres(totalChiffres) {
  return Array.from({ length: totalChiffres }, () =>
    String(Math.floor(Math.random() * 10)),
  )
}

/**
 * Le montant tel qu'il sera rendu : les chiffres autorisés sont les vrais,
 * tous les autres sont leurs leurres. Séparateurs et symbole € sont conservés
 * tels quels — ils ne disent rien du montant.
 */
export function composerMontant(formate, leurres, reveles) {
  const caracteres = [...String(formate ?? '')]
  const total = caracteres.filter((c) => EST_CHIFFRE.test(c)).length
  let rang = -1

  return caracteres
    .map((caractere) => {
      if (!EST_CHIFFRE.test(caractere)) return caractere
      rang += 1
      const visible = total - 1 - rang < reveles
      return visible ? caractere : (leurres[rang] ?? '0')
    })
    .join('')
}
