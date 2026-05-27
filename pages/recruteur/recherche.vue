<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Rechercher des saisonniers</h1>
      <p class="text-gray-500 mt-1">{{ resultats.length }} profil{{ resultats.length > 1 ? 's' : '' }} trouvé{{ resultats.length > 1 ? 's' : '' }}</p>
    </div>

    <div class="grid lg:grid-cols-4 gap-6">
      <aside class="lg:col-span-1">
        <div class="card space-y-5 sticky top-24">
          <h2 class="font-semibold text-gray-900 text-sm uppercase tracking-wide">Filtres</h2>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Recherche</label>
            <input v-model="filtres.query" type="text" placeholder="Nom, titre, compétence..." class="input" />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Saison</label>
            <select v-model="filtres.saison" class="input">
              <option value="">Toutes saisons</option>
              <option>Été</option>
              <option>Hiver</option>
              <option>Toute l'année</option>
              <option>Printemps/Automne</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Secteur</label>
            <select v-model="filtres.secteur" class="input">
              <option value="">Tous secteurs</option>
              <option>Hôtellerie</option>
              <option>Restauration</option>
              <option>Ski & Montagne</option>
              <option>Plage & Mer</option>
              <option>Animation</option>
              <option>Agriculture</option>
              <option>Tourisme</option>
              <option>Événementiel</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Expérience</label>
            <select v-model="filtres.niveauExperience" class="input">
              <option value="">Tous niveaux</option>
              <option>Débutant</option>
              <option>Expérimenté</option>
              <option>Confirmé</option>
            </select>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <input id="mobilite" v-model="filtres.pretRelocalisation" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <label for="mobilite" class="text-sm text-gray-700">Mobilité acceptée</label>
            </div>
            <div class="flex items-center gap-2">
              <input id="logement" v-model="filtres.logementSouhaite" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <label for="logement" class="text-sm text-gray-700">Cherche logement</label>
            </div>
          </div>

          <button @click="reinitialiser" class="btn-outline w-full text-xs">Réinitialiser</button>
        </div>
      </aside>

      <div class="lg:col-span-3">
        <div v-if="resultats.length > 0" class="grid sm:grid-cols-2 gap-4">
          <NuxtLink v-for="candidat in resultats" :key="candidat.id" :to="`/recruteur/candidat/${candidat.id}`">
            <CandidatCard :candidat="candidat" />
          </NuxtLink>
        </div>
        <div v-else class="card text-center py-16">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-gray-500 font-medium">Aucun saisonnier trouvé</p>
          <p class="text-sm text-gray-400 mt-1">Essayez de modifier vos critères</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'recruteur' })

const store = useCandidatsStore()
store.init()

const filtres = reactive({
  query: '',
  saison: '',
  secteur: '',
  niveauExperience: '',
  pretRelocalisation: false,
  logementSouhaite: false,
})

const resultats = computed(() => store.rechercher({
  query: filtres.query || undefined,
  saison: filtres.saison || undefined,
  secteur: filtres.secteur || undefined,
  niveauExperience: filtres.niveauExperience || undefined,
  pretRelocalisation: filtres.pretRelocalisation || undefined,
  logementSouhaite: filtres.logementSouhaite || undefined,
}))

function reinitialiser() {
  Object.assign(filtres, { query: '', saison: '', secteur: '', niveauExperience: '', pretRelocalisation: false, logementSouhaite: false })
}
</script>
