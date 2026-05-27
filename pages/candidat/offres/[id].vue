<template>
  <div v-if="offre">
    <NuxtLink to="/candidat/offres" class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour aux offres
    </NuxtLink>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-5">
        <div class="card">
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="badge text-sm py-1 px-3" :class="saisonClass">{{ saisonEmoji }} {{ offre.saison }}</span>
            <span class="badge bg-gray-100 text-gray-700 text-sm py-1 px-3">{{ offre.secteur }}</span>
            <span class="badge text-sm py-1 px-3" :class="niveauClass">{{ offre.niveauExperience }}</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">{{ offre.titre }}</h1>
          <p class="text-primary-600 font-semibold text-lg mt-1">{{ offre.entreprise }}</p>

          <div class="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {{ offre.localisation }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ offre.dateDebut }} → {{ offre.dateFin }}
            </span>
            <span class="flex items-center gap-1.5 font-medium text-gray-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ offre.salaire }}
            </span>
          </div>

          <div class="flex gap-2 mt-3">
            <span v-if="offre.logementFourni" class="badge bg-amber-50 text-amber-700">🏠 Logement fourni</span>
            <span v-if="offre.repas" class="badge bg-emerald-50 text-emerald-700">🍽️ Repas inclus</span>
            <span class="badge bg-primary-50 text-primary-700">{{ offre.typeContrat }}</span>
          </div>
        </div>

        <div class="card">
          <h2 class="font-semibold text-gray-900 mb-3">Description du poste</h2>
          <p class="text-gray-600 leading-relaxed">{{ offre.description }}</p>
        </div>

        <div class="card">
          <h2 class="font-semibold text-gray-900 mb-3">Compétences & diplômes requis</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="comp in offre.competencesRequises" :key="comp" class="badge bg-primary-50 text-primary-700 text-sm py-1 px-3">{{ comp }}</span>
          </div>
        </div>

        <div v-if="offre.avantages.length" class="card">
          <h2 class="font-semibold text-gray-900 mb-3">Avantages</h2>
          <ul class="space-y-1.5">
            <li v-for="av in offre.avantages" :key="av" class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ av }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Sidebar postuler -->
      <div class="space-y-4">
        <!-- Score de compatibilité -->
        <div v-if="monProfil" class="card">
          <h3 class="font-semibold text-gray-900 mb-3">Votre compatibilité</h3>
          <CompatibiliteScore :offre="offre" :candidat="monProfil" mode="detail" />
        </div>
        <div v-else class="card bg-amber-50 border-amber-200 text-sm text-amber-800">
          <p class="font-medium mb-1">Connaître votre compatibilité ?</p>
          <p class="text-amber-700">
            <NuxtLink to="/candidat/profil" class="underline font-medium">Complétez votre profil</NuxtLink> pour voir votre score avec cette offre.
          </p>
        </div>

        <div v-if="dejaPostule" class="card bg-emerald-50 border-emerald-200">
          <div class="flex items-center gap-2 text-emerald-700 font-medium mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Candidature envoyée
          </div>
          <p class="text-sm text-emerald-600">Vous avez déjà postulé à cette offre.</p>
          <NuxtLink to="/candidat/mes-candidatures" class="text-sm font-medium text-emerald-700 underline mt-2 inline-block">Suivre mes candidatures →</NuxtLink>
        </div>

        <div v-else class="card">
          <h3 class="font-semibold text-gray-900 mb-1">Postuler à cette saison</h3>
          <p class="text-sm text-gray-500 mb-4">Présentez-vous brièvement et dites pourquoi vous êtes disponible.</p>
          <form @submit.prevent="postuler" class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Message de motivation *</label>
              <textarea v-model="lettreMotivation" required rows="6" placeholder="Bonjour, je suis disponible dès le… et intéressé(e) par ce poste car…" class="input resize-none text-sm" />
            </div>
            <button type="submit" class="btn-primary w-full">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Envoyer ma candidature
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="card text-center py-16">
    <p class="text-gray-500">Offre introuvable.</p>
    <NuxtLink to="/candidat/offres" class="btn-primary mt-4 inline-flex">Retour aux offres</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'candidat' })

const route = useRoute()
const offresStore = useOffresStore()
const candidaturesStore = useCandidaturesStore()
const candidatsStore = useCandidatsStore()
offresStore.init()
candidaturesStore.init()
candidatsStore.init()

const monProfil = computed(() => candidatsStore.monProfil ?? null)

const offre = computed(() => offresStore.getOffreById(route.params.id as string))
const dejaPostule = computed(() => candidaturesStore.aDejaPostule(route.params.id as string))
const lettreMotivation = ref('')

function postuler() {
  if (!lettreMotivation.value.trim()) return
  candidaturesStore.postuler(route.params.id as string, lettreMotivation.value)
  lettreMotivation.value = ''
}

const saisonClass = computed(() => ({
  'Été': 'bg-amber-50 text-amber-700',
  'Hiver': 'bg-cyan-50 text-cyan-700',
  'Toute l\'année': 'bg-emerald-50 text-emerald-700',
  'Printemps/Automne': 'bg-violet-50 text-violet-700',
}[offre.value?.saison ?? ''] ?? 'bg-gray-100 text-gray-600'))

const saisonEmoji = computed(() => ({
  'Été': '☀️', 'Hiver': '❄️', 'Toute l\'année': '🌿', 'Printemps/Automne': '🍂'
}[offre.value?.saison ?? ''] ?? ''))

const niveauClass = computed(() => ({
  'Débutant': 'bg-blue-50 text-blue-700',
  'Expérimenté': 'bg-emerald-50 text-emerald-700',
  'Confirmé': 'bg-violet-50 text-violet-700',
}[offre.value?.niveauExperience ?? ''] ?? 'bg-gray-100 text-gray-600'))
</script>
