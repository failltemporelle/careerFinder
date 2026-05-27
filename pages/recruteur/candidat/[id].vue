<template>
  <div v-if="candidat">
    <div class="mb-6">
      <NuxtLink to="/recruteur/recherche" class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour à la recherche
      </NuxtLink>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Profil principal -->
      <div class="lg:col-span-2 space-y-5">
        <div class="card">
          <div class="flex items-start gap-5">
            <div class="w-20 h-20 rounded-2xl bg-primary-100 text-primary-700 font-bold text-xl flex items-center justify-center flex-shrink-0">
              {{ candidat.avatar || initiales }}
            </div>
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">{{ candidat.prenom }} {{ candidat.nom }}</h1>
                  <p class="text-primary-600 font-medium mt-0.5">{{ candidat.titre }}</p>
                </div>
                <span class="badge text-sm py-1 px-3" :class="niveauClass">
                  {{ candidat.niveauExperience }}
                </span>
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {{ candidat.localisation }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Disponible {{ candidat.disponibilite.toLowerCase() }}
                </span>
                <span v-if="candidat.pretRelocalisation" class="flex items-center gap-1.5 text-emerald-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Ouvert à la mobilité
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="font-semibold text-gray-900 mb-3">À propos</h2>
          <p class="text-gray-600 leading-relaxed">{{ candidat.resume }}</p>
        </div>

        <div class="card">
          <h2 class="font-semibold text-gray-900 mb-3">Compétences</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="comp in candidat.competences"
              :key="comp"
              class="badge bg-primary-50 text-primary-700 text-sm py-1 px-3"
            >
              {{ comp }}
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar contact -->
      <div class="space-y-4">
        <div class="card">
          <h3 class="font-semibold text-gray-900 mb-4">Informations</h3>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-gray-500">Email</dt>
              <dd class="font-medium text-gray-900 mt-0.5">{{ candidat.email }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">Téléphone</dt>
              <dd class="font-medium text-gray-900 mt-0.5">{{ candidat.telephone }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">Disponibilité</dt>
              <dd class="font-medium text-gray-900 mt-0.5">{{ candidat.disponibilite }}</dd>
            </div>
            <div v-if="candidat.salaireSouhaite">
              <dt class="text-gray-500">Prétention salariale</dt>
              <dd class="font-medium text-gray-900 mt-0.5">{{ candidat.salaireSouhaite.toLocaleString('fr-FR') }} €/an</dd>
            </div>
          </dl>
        </div>

        <div class="card bg-primary-50 border-primary-100">
          <p class="text-sm text-primary-700 font-medium mb-3">Contacter ce candidat</p>
          <a :href="`mailto:${candidat.email}`" class="btn-primary w-full">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Envoyer un email
          </a>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="card text-center py-16">
    <p class="text-gray-500">Candidat introuvable.</p>
    <NuxtLink to="/recruteur/recherche" class="btn-primary mt-4 inline-flex">Retour à la recherche</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'recruteur' })

const route = useRoute()
const store = useCandidatsStore()
store.init()

const candidat = computed(() => store.getCandidatById(route.params.id as string))
const initiales = computed(() => candidat.value ? `${candidat.value.prenom[0]}${candidat.value.nom[0]}` : '')

const niveauClass = computed(() => ({
  'Junior': 'bg-blue-50 text-blue-700',
  'Confirmé': 'bg-emerald-50 text-emerald-700',
  'Senior': 'bg-violet-50 text-violet-700',
  'Expert': 'bg-amber-50 text-amber-700',
}[candidat.value?.niveauExperience ?? ''] ?? 'bg-gray-100 text-gray-600'))
</script>
