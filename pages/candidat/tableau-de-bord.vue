<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        Bonjour{{ candidatsStore.monProfil ? ', ' + candidatsStore.monProfil.prenom : '' }} 👋
      </h1>
      <p class="text-gray-500 mt-1">Votre espace candidat</p>
    </div>

    <!-- Alerte profil incomplet -->
    <div v-if="!candidatsStore.monProfil" class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <p class="text-sm font-medium text-amber-800">Votre profil est incomplet</p>
        <p class="text-sm text-amber-700 mt-0.5">Créez votre profil pour que les recruteurs puissent vous trouver.</p>
        <NuxtLink to="/candidat/profil" class="text-sm font-medium text-amber-800 underline mt-1 inline-block">Compléter mon profil →</NuxtLink>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard :value="offresStore.offresActives.length" label="Offres disponibles" icon-bg="bg-primary-50">
        <template #icon>
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="mesCandidatures.length" label="Candidatures envoyées" icon-bg="bg-violet-50">
        <template #icon>
          <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="entretiens" label="Entretiens" icon-bg="bg-emerald-50">
        <template #icon>
          <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="acceptees" label="Acceptées" icon-bg="bg-amber-50">
        <template #icon>
          <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
      </StatCard>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Offres récentes -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-gray-900">Offres récentes</h2>
          <NuxtLink to="/candidat/offres" class="text-sm text-primary-600 hover:underline">Voir tout</NuxtLink>
        </div>
        <div class="space-y-3">
          <div
            v-for="offre in offresStore.offresActives.slice(0, 4)"
            :key="offre.id"
            class="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ offre.titre }}</p>
              <p class="text-xs text-gray-500">{{ offre.entreprise }} · {{ offre.localisation }}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span v-if="aDejaPostule(offre.id)" class="text-xs text-emerald-600 font-medium">✓</span>
              <NuxtLink :to="`/candidat/offres/${offre.id}`" class="text-xs text-primary-600 hover:underline whitespace-nowrap">Voir →</NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Mes dernières candidatures -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-gray-900">Mes candidatures</h2>
          <NuxtLink to="/candidat/mes-candidatures" class="text-sm text-primary-600 hover:underline">Voir tout</NuxtLink>
        </div>
        <div v-if="mesCandidatures.length > 0" class="space-y-3">
          <div
            v-for="cand in mesCandidatures.slice(0, 4)"
            :key="cand.id"
            class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ offreTitre(cand.offreId) }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(cand.createdAt) }}</p>
            </div>
            <span class="badge text-xs" :class="statutClass(cand.statut)">{{ cand.statut }}</span>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-sm text-gray-400">Aucune candidature envoyée</p>
          <NuxtLink to="/candidat/offres" class="text-sm text-primary-600 hover:underline mt-1 inline-block">Parcourir les offres →</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatutCandidature } from '~/types'

definePageMeta({ layout: 'candidat' })

const offresStore = useOffresStore()
const candidatsStore = useCandidatsStore()
const candidaturesStore = useCandidaturesStore()

offresStore.init()
candidatsStore.init()
candidaturesStore.init()

const mesCandidatures = computed(() => candidaturesStore.mesCandidatures)
const entretiens = computed(() => mesCandidatures.value.filter(c => c.statut === 'entretien').length)
const acceptees = computed(() => mesCandidatures.value.filter(c => c.statut === 'acceptée').length)

function aDejaPostule(offreId: string) {
  return candidaturesStore.aDejaPostule(offreId)
}

function offreTitre(offreId: string) {
  return offresStore.getOffreById(offreId)?.titre ?? 'Offre inconnue'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
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
