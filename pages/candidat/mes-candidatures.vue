<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Mes candidatures</h1>
      <p class="text-gray-500 mt-1">{{ mesCandidatures.length }} candidature{{ mesCandidatures.length > 1 ? 's' : '' }}</p>
    </div>

    <div v-if="mesCandidatures.length > 0" class="space-y-4">
      <div
        v-for="cand in mesCandidatures"
        :key="cand.id"
        class="card"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="badge text-xs py-1 px-2.5" :class="statutClass(cand.statut)">{{ cand.statut }}</span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ offreTitre(cand.offreId) }}</h3>
            <p class="text-sm text-primary-600 mt-0.5">{{ offreEntreprise(cand.offreId) }}</p>
            <p class="text-xs text-gray-500 mt-1">Envoyée le {{ formatDate(cand.createdAt) }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <NuxtLink :to="`/candidat/offres/${cand.offreId}`" class="btn-outline text-xs py-1.5 px-3">
              Voir l'offre
            </NuxtLink>
          </div>
        </div>

        <!-- Pipeline statut -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center gap-1">
            <div
              v-for="(etape, i) in etapes"
              :key="etape.key"
              class="flex items-center flex-1"
            >
              <div class="flex flex-col items-center">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                  :class="etapeAtteinte(cand.statut, etape.key)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-400'"
                >
                  <svg v-if="etapeAtteinte(cand.statut, etape.key)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span class="text-xs text-gray-500 mt-1 text-center leading-tight">{{ etape.label }}</span>
              </div>
              <div v-if="i < etapes.length - 1" class="flex-1 h-0.5 mx-1 mb-4" :class="etapeAtteinte(cand.statut, etapes[i + 1].key) ? 'bg-primary-600' : 'bg-gray-200'" />
            </div>
          </div>
        </div>

        <div v-if="cand.lettreMotivation" class="mt-3">
          <button @click="toggle(cand.id)" class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 transition-transform" :class="ouvert.has(cand.id) ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            {{ ouvert.has(cand.id) ? 'Masquer' : 'Voir' }} la lettre de motivation
          </button>
          <p v-if="ouvert.has(cand.id)" class="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">
            {{ cand.lettreMotivation }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-16">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p class="text-gray-500 font-medium">Aucune candidature envoyée</p>
      <NuxtLink to="/candidat/offres" class="btn-primary mt-4 inline-flex">Parcourir les offres</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatutCandidature } from '~/types'

definePageMeta({ layout: 'candidat' })

const offresStore = useOffresStore()
const candidaturesStore = useCandidaturesStore()
offresStore.init()
candidaturesStore.init()

const mesCandidatures = computed(() => candidaturesStore.mesCandidatures)
const ouvert = reactive(new Set<string>())

function toggle(id: string) {
  ouvert.has(id) ? ouvert.delete(id) : ouvert.add(id)
}

const etapes = [
  { key: 'envoyée', label: 'Envoyée' },
  { key: 'vue', label: 'Vue' },
  { key: 'entretien', label: 'Entretien' },
  { key: 'acceptée', label: 'Acceptée' },
] as { key: StatutCandidature; label: string }[]

const ordreEtapes: Record<StatutCandidature, number> = {
  'envoyée': 0,
  'vue': 1,
  'entretien': 2,
  'refusée': 1,
  'acceptée': 3,
}

function etapeAtteinte(statut: StatutCandidature, etapeKey: StatutCandidature) {
  if (statut === 'refusée') return etapeKey === 'envoyée' || etapeKey === 'vue'
  return ordreEtapes[statut] >= ordreEtapes[etapeKey]
}

function offreTitre(offreId: string) {
  return offresStore.getOffreById(offreId)?.titre ?? 'Offre inconnue'
}

function offreEntreprise(offreId: string) {
  return offresStore.getOffreById(offreId)?.entreprise ?? ''
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function statutClass(statut: StatutCandidature) {
  const map: Record<StatutCandidature, string> = {
    'envoyée': 'bg-blue-50 text-blue-700',
    'vue': 'bg-gray-100 text-gray-700',
    'entretien': 'bg-violet-50 text-violet-700',
    'refusée': 'bg-red-50 text-red-700',
    'acceptée': 'bg-emerald-50 text-emerald-700',
  }
  return map[statut] ?? 'bg-gray-100 text-gray-600'
}
</script>
