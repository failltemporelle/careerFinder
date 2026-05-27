<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <p class="text-gray-500 mt-1">Bienvenue dans votre espace recruteur</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard :value="offresStore.offresActives.length" label="Offres actives" icon-bg="bg-primary-50">
        <template #icon>
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="candidatsStore.candidats.length" label="Candidats disponibles" icon-bg="bg-emerald-50">
        <template #icon>
          <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="totalCandidatures" label="Candidatures reçues" icon-bg="bg-violet-50">
        <template #icon>
          <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
      </StatCard>

      <StatCard :value="offresStore.offres.length" label="Total des offres" icon-bg="bg-amber-50">
        <template #icon>
          <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </template>
      </StatCard>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Dernières offres -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-gray-900">Vos dernières offres</h2>
          <NuxtLink to="/recruteur/offres" class="text-sm text-primary-600 hover:underline">Voir tout</NuxtLink>
        </div>
        <div class="space-y-3">
          <div
            v-for="offre in offresStore.offres.slice(0, 4)"
            :key="offre.id"
            class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ offre.titre }}</p>
              <p class="text-xs text-gray-500">{{ offre.localisation }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">{{ candidaturesParOffre(offre.id) }} cand.</span>
              <span :class="offre.actif ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'" class="badge">
                {{ offre.actif ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          <p v-if="offresStore.offres.length === 0" class="text-sm text-gray-400 text-center py-4">
            Aucune offre publiée
          </p>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="card">
        <h2 class="font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div class="space-y-3">
          <NuxtLink to="/recruteur/publier-offre" class="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-colors group">
            <div class="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Publier une nouvelle offre</p>
              <p class="text-xs text-gray-500">Rédigez et mettez en ligne votre annonce</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/recruteur/recherche" class="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-colors group">
            <div class="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Rechercher des candidats</p>
              <p class="text-xs text-gray-500">Explorez {{ candidatsStore.candidats.length }} profils disponibles</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'recruteur' })

const offresStore = useOffresStore()
const candidatsStore = useCandidatsStore()
const candidaturesStore = useCandidaturesStore()

offresStore.init()
candidatsStore.init()
candidaturesStore.init()

const totalCandidatures = computed(() => candidaturesStore.candidatures.length)

function candidaturesParOffre(offreId: string) {
  return candidaturesStore.getCandidaturesParOffre(offreId).length
}
</script>
