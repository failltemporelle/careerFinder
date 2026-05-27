<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Offres saisonnières</h1>
      <p class="text-gray-500 mt-1">{{ resultats.length }} offre{{ resultats.length > 1 ? 's' : '' }} disponible{{ resultats.length > 1 ? 's' : '' }}</p>
    </div>

    <div class="grid lg:grid-cols-4 gap-6">
      <aside class="lg:col-span-1">
        <div class="card space-y-5 sticky top-24">
          <h2 class="font-semibold text-gray-900 text-sm uppercase tracking-wide">Filtres</h2>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Recherche</label>
            <input v-model="filtres.query" type="text" placeholder="Titre, lieu, compétence..." class="input" />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Saison</label>
            <select v-model="filtres.saison" class="input">
              <option value="">Toutes saisons</option>
              <option>☀️ Été</option>
              <option>❄️ Hiver</option>
              <option>🌿 Toute l'année</option>
              <option>🍂 Printemps/Automne</option>
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

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <input id="logement" v-model="filtres.logementFourni" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <label for="logement" class="text-sm text-gray-700">🏠 Logement fourni</label>
            </div>
            <div class="flex items-center gap-2">
              <input id="repas" v-model="filtres.repas" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <label for="repas" class="text-sm text-gray-700">🍽️ Repas inclus</label>
            </div>
          </div>

          <button @click="reinitialiser" class="btn-outline w-full text-xs">Réinitialiser</button>
        </div>
      </aside>

      <div class="lg:col-span-3">
        <div v-if="resultats.length > 0" class="grid sm:grid-cols-2 gap-4">
          <OffreCard
            v-for="offre in resultats"
            :key="offre.id"
            :offre="offre"
            :deja-postule="candidaturesStore.aDejaPostule(offre.id)"
            :candidat="candidatsStore.monProfil ?? undefined"
          />
        </div>
        <div v-else class="card text-center py-16">
          <p class="text-3xl mb-3">⛷️</p>
          <p class="text-gray-500 font-medium">Aucune offre trouvée</p>
          <p class="text-sm text-gray-400 mt-1">Essayez de modifier vos critères</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'candidat' })

const offresStore = useOffresStore()
const candidaturesStore = useCandidaturesStore()
const candidatsStore = useCandidatsStore()
offresStore.init()
candidaturesStore.init()
candidatsStore.init()

const filtres = reactive({ query: '', saison: '', secteur: '', logementFourni: false, repas: false })

const resultats = computed(() => offresStore.rechercher({
  query: filtres.query || undefined,
  saison: filtres.saison || undefined,
  secteur: filtres.secteur || undefined,
  logementFourni: filtres.logementFourni || undefined,
  repas: filtres.repas || undefined,
}))

function reinitialiser() {
  Object.assign(filtres, { query: '', saison: '', secteur: '', logementFourni: false, repas: false })
}
</script>
