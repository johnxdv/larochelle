import handler from '@/lib/estimation/serveur/monaco-adresses.js'
import { executerHandler } from '@/lib/estimation/serveur/adaptateur.js'

// Voir app/api/estimation/route.js : `runtime` et `dynamic` sont retirés,
// `cacheComponents` les refusant, et leurs valeurs par défaut conviennent.
export async function POST(request) {
  return executerHandler(handler, request)
}
