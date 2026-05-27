import type { Offre, Candidat } from '~/types'

export interface ScoreDetail {
  total: number
  competences: { score: number; max: number; matched: string[]; missing: string[] }
  saison: { score: number; match: boolean }
  secteur: { score: number; match: boolean }
  niveau: { score: number; match: boolean }
}

const POIDS = { competences: 60, saison: 20, secteur: 15, niveau: 5 }

function normalise(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}

function competencesMatchent(a: string, b: string) {
  const na = normalise(a)
  const nb = normalise(b)
  return na === nb || na.includes(nb) || nb.includes(na)
}

const ORDRE_NIVEAU = { 'Débutant': 0, 'Expérimenté': 1, 'Confirmé': 2 } as const

export function calculerCompatibilite(offre: Offre, candidat: Candidat): ScoreDetail {
  // --- Compétences ---
  const required = offre.competencesRequises
  let matched: string[] = []
  let missing: string[] = []

  if (required.length > 0) {
    for (const req of required) {
      const trouve = candidat.competences.some(c => competencesMatchent(c, req))
      if (trouve) matched.push(req)
      else missing.push(req)
    }
  }

  const scoreComp = required.length > 0
    ? Math.round((matched.length / required.length) * POIDS.competences)
    : Math.round(POIDS.competences * 0.5) // pas de prérequis → score neutre

  // --- Saison ---
  const saisonOk = candidat.saisons?.includes(offre.saison) ?? false
  const scoreSaison = saisonOk ? POIDS.saison : 0

  // --- Secteur ---
  const secteurOk = candidat.secteurs?.includes(offre.secteur) ?? false
  const scoreSecteur = secteurOk ? POIDS.secteur : 0

  // --- Niveau ---
  const niveauCandidatVal = ORDRE_NIVEAU[candidat.niveauExperience] ?? 0
  const niveauOffreVal = ORDRE_NIVEAU[offre.niveauExperience] ?? 0
  const niveauOk = niveauCandidatVal >= niveauOffreVal
  const scoreNiveau = niveauOk ? POIDS.niveau : 0

  const total = Math.min(scoreComp + scoreSaison + scoreSecteur + scoreNiveau, 100)

  return {
    total,
    competences: { score: scoreComp, max: POIDS.competences, matched, missing },
    saison: { score: scoreSaison, match: saisonOk },
    secteur: { score: scoreSecteur, match: secteurOk },
    niveau: { score: scoreNiveau, match: niveauOk },
  }
}

export function couleurScore(score: number) {
  if (score >= 80) return { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', bar: 'bg-emerald-500' }
  if (score >= 55) return { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200', bar: 'bg-amber-500' }
  return { bg: 'bg-gray-50', text: 'text-gray-500', ring: 'ring-gray-200', bar: 'bg-gray-300' }
}

export function labelScore(score: number) {
  if (score >= 80) return 'Excellent match'
  if (score >= 60) return 'Bon match'
  if (score >= 40) return 'Match partiel'
  return 'Faible match'
}
