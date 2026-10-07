import handler from '@/lib/estimation/serveur/estimation.js'
import { executerHandler } from '@/lib/estimation/serveur/adaptateur.js'

// Moteur d'estimation, servi tel quel.
//
// `runtime = 'nodejs'` et `dynamic = 'force-dynamic'` ont été retirés : ce
// projet active `cacheComponents`, qui les refuse. Ils ne manquent pas — Node
// est le runtime par défaut, et un handler de route n'est jamais prérendu.
export const maxDuration = 60

export async function POST(request) {
  return executerHandler(handler, request)
}

export async function GET(request) {
  return executerHandler(handler, request)
}
