<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Mes offres</h1>
        <p class="text-gray-500 mt-1">{{ store.offres.length }} offre{{ store.offres.length > 1 ? 's' : '' }} publiée{{ store.offres.length > 1 ? 's' : '' }}</p>
      </div>
      <NuxtLink to="/recruteur/publier-offre" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nouvelle offre
      </NuxtLink>
    </div>

    <div v-if="store.offres.length > 0" class="space-y-4">
      <div
        v-for="offre in store.offres"
        :key="offre.id"
        class="card"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="badge" :class="offre.actif ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'">
                {{ offre.actif ? 'Active' : 'Inactive' }}
              </span>
              <span class="badge bg-gray-100 text-gray-700">{{ offre.typeContrat }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 text-lg">{{ offre.titre }}</h3>
            <div class="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-sm text-gray-500">
              <span>{{ offre.localisation }}</span>
              <span>{{ offre.salaire }}</span>
              <span>Publiée le {{ formatDate(offre.datePublication) }}</span>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2">
              <span v-for="comp in offre.competencesRequises.slice(0, 4)" :key="comp" class="badge bg-primary-50 text-primary-700">{{ comp }}</span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
            <span class="text-sm text-gray-500 whitespace-nowrap">
              {{ candidaturesParOffre(offre.id) }} candidature{{ candidaturesParOffre(offre.id) > 1 ? 's' : '' }}
            </span>
            <button
              @click="store.toggleActif(offre.id)"
              class="btn-outline text-xs py-1.5 px-3"
            >
              {{ offre.actif ? 'Désactiver' : 'Activer' }}
            </button>
            <button
              @click="confirmerSuppression(offre.id)"
              class="text-xs px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-16">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-500 font-medium">Aucune offre publiée</p>
      <NuxtLink to="/recruteur/publier-offre" class="btn-primary mt-4 inline-flex">Publier ma première offre</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'recruteur' })

const store = useOffresStore()
const candidaturesStore = useCandidaturesStore()
store.init()
candidaturesStore.init()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function candidaturesParOffre(offreId: string) {
  return candidaturesStore.getCandidaturesParOffre(offreId).length
}

function confirmerSuppression(id: string) {
  if (confirm('Supprimer cette offre ? Cette action est irréversible.')) {
    store.supprimerOffre(id)
  }
}
</script>
