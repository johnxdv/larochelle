/**
 * Enveloppe Next.js des fonctions serverless d'IMMOVIA.
 *
 * Les gestionnaires `api/estimation.js` et `api/monaco-adresses.js` ont été
 * écrits pour le contrat Vercel « Node » : `req.method`, `req.body` déjà
 * décodé, `res.status().json()`, `res.setHeader()`. Ce fichier reproduit ce
 * contrat au-dessus d'une `Request` standard, sans toucher au gestionnaire —
 * le calcul reste celui d'IMMOVIA, à l'identique.
 */
export async function executerHandler(handler, request) {
  let body = {}
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.json()
    } catch {
      body = {}
    }
  }
  const url = new URL(request.url)
  const req = {
    method: request.method,
    body,
    query: Object.fromEntries(url.searchParams),
    headers: Object.fromEntries(request.headers),
    url: url.pathname + url.search,
  }
  let statut = 200
  let charge = null
  const entetes = new Headers()
  const res = {
    status(code) {
      statut = code
      return res
    },
    setHeader(nom, valeur) {
      entetes.set(nom, String(valeur))
      return res
    },
    json(donnees) {
      charge = donnees
      return res
    },
  }
  await handler(req, res)
  return Response.json(charge, { status: statut, headers: entetes })
}
