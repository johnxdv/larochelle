'use server'

/**
 * ════════════════════════════════════════════════════════════════════════════
 * Soumission de TOUS les formulaires du site — point unique, à brancher plus tard
 * ════════════════════════════════════════════════════════════════════════════
 * Formulaires concernés : contact, contact depuis une fiche bien (avec la
 * référence du bien), récupération du contact en fin d'estimation, calculateur
 * de plus-value. Chacun appelle `soumettreFormulaire(type, données)`.
 *
 * AUJOURD'HUI : les données sont validées (mêmes règles que l'ancien site), puis
 * la fonction répond comme si l'envoi avait réussi. Rien n'est envoyé ni
 * enregistré, et rien n'est écrit dans les journaux hormis le type de demande.
 *
 * POUR BRANCHER L'ENVOI : remplacer le bloc « Envoi » ci-dessous par l'appel au
 * service retenu (e-mail transactionnel, CRM, back-office de l'agence…). C'est le
 * seul endroit à modifier ; les formulaires n'ont pas à changer. L'ancien site
 * protégeait le contact et les fiches par un reCAPTCHA Google : à rétablir au
 * moment du branchement (clé à fournir), un champ piège anti-robot est déjà en
 * place.
 * ════════════════════════════════════════════════════════════════════════════
 */

export type TypeFormulaire = 'contact' | 'bien' | 'estimation' | 'plus-value'

export type ResultatFormulaire = { ok: true; message: string } | { ok: false; message: string; erreurs: Record<string, string> }

type Donnees = Record<string, string | number | boolean | null | undefined>

const TEL = /^0[1-9]([-. ]?[0-9]{2}){4}$/
const MAIL = /^[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/

const texte = (v: unknown) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim())

function valider(type: TypeFormulaire, d: Donnees) {
  const erreurs: Record<string, string> = {}
  const requis = (champ: string, message: string) => {
    if (!texte(d[champ])) erreurs[champ] = message
  }
  const telephone = (champ: string) => {
    const t = texte(d[champ])
    if (t && !TEL.test(t)) erreurs[champ] = 'Veuillez saisir un numéro de téléphone valide.'
  }
  const mail = (champ: string) => {
    const m = texte(d[champ])
    if (m && !MAIL.test(m)) erreurs[champ] = 'Veuillez saisir un mail valide'
  }

  switch (type) {
    case 'contact':
      requis('nom', 'Veuillez saisir votre nom et prénom.')
      requis('telephone', 'Veuillez saisir votre numéro de téléphone.')
      requis('email', 'Veuillez saisir votre adresse mail.')
      requis('demande', 'Veuillez saisir votre demande.')
      telephone('telephone')
      mail('email')
      if (d.consentement !== true && d.consentement !== 'on') erreurs.consentement = 'Votre accord est nécessaire pour traiter votre demande.'
      break
    case 'bien':
      requis('nom', 'Veuillez saisir votre nom et prénom.')
      requis('telephone', 'Veuillez saisir votre numéro de téléphone.')
      requis('message', 'Veuillez saisir votre message.')
      requis('reference', 'Référence du bien manquante.')
      telephone('telephone')
      if (d.consentement !== true && d.consentement !== 'on') erreurs.consentement = 'Votre accord est nécessaire pour traiter votre demande.'
      break
    case 'estimation': {
      // Mêmes règles que la conversation de fin d'estimation (EstimationChatPanel),
      // qui accepte aussi les numéros étrangers (Monaco, Luxembourg) : 6 à 15 chiffres.
      if (texte(d.prenom).length < 2) erreurs.prenom = 'Merci d’indiquer votre prénom.'
      const chiffres = texte(d.telephone).replace(/\D/g, '')
      if (chiffres.length < 6 || chiffres.length > 15) erreurs.telephone = 'Merci d’indiquer un numéro de téléphone valide.'
      requis('creneau', 'Merci de choisir un créneau de rappel.')
      break
    }
    case 'plus-value':
      requis('prixVente', 'Le prix de vente est obligatoire')
      requis('anneeAcquisition', "L'année d'acquisition est obligatoire")
      requis('prixAchat', "Le prix d'achat est obligatoire")
      requis('travaux', 'Le montant des travaux est obligatoire')
      requis('email', "L'adresse mail est obligatoire")
      mail('email')
      break
  }
  return erreurs
}

const CONFIRMATIONS: Record<TypeFormulaire, string> = {
  contact: 'Votre demande a bien été prise en compte. Un conseiller d’Ashley Immobilier vous recontacte sous 24 h ouvrées.',
  bien: 'Votre message a bien été pris en compte. Le conseiller en charge de ce bien vous recontacte dans les meilleurs délais.',
  estimation: 'Vos coordonnées ont bien été prises en compte. Un conseiller d’Ashley Immobilier vous rappelle au créneau choisi.',
  'plus-value': 'Votre demande a bien été prise en compte. Nous vous contacterons dans les plus brefs délais.',
}

export async function soumettreFormulaire(type: TypeFormulaire, donnees: Donnees): Promise<ResultatFormulaire> {
  // Une action serveur est un point d'entrée public : le type est contrôlé ici.
  if (!Object.hasOwn(CONFIRMATIONS, type)) return { ok: false, message: 'Demande inconnue.', erreurs: {} }
  // Champ piège : invisible pour les visiteurs, rempli par les robots.
  if (texte(donnees.siteWeb)) return { ok: true, message: CONFIRMATIONS[type] }

  const erreurs = valider(type, donnees)
  if (Object.keys(erreurs).length) {
    return { ok: false, message: 'Merci de remplir les champs obligatoires *', erreurs }
  }

  // ── Envoi ──────────────────────────────────────────────────────────────
  // Non branché pour l'instant (voir l'en-tête de ce fichier). Rien n'est
  // transmis ni conservé : seul le type de demande est noté dans les journaux.
  console.info(`[formulaires] demande « ${type} » reçue — envoi non branché`)
  // ───────────────────────────────────────────────────────────────────────

  return { ok: true, message: CONFIRMATIONS[type] }
}

/** État renvoyé aux formulaires HTML : le résultat, et les valeurs saisies pour les réafficher en cas d'erreur. */
export type EtatFormulaire = (ResultatFormulaire & { valeurs: Record<string, string> }) | null

/**
 * Même soumission, pour un `<form action>` piloté par `useActionState` : le
 * formulaire fonctionne ainsi aussi sans JavaScript.
 */
export async function soumettreDepuisFormulaire(type: TypeFormulaire, _etat: EtatFormulaire, formulaire: FormData): Promise<EtatFormulaire> {
  const valeurs: Record<string, string> = {}
  for (const [cle, valeur] of formulaire.entries()) {
    if (typeof valeur === 'string' && !cle.startsWith('$ACTION')) valeurs[cle] = valeur
  }
  const resultat = await soumettreFormulaire(type, valeurs)
  return { ...resultat, valeurs: resultat.ok ? {} : valeurs }
}
