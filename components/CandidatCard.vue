<template>
  <div class="card hover:shadow-md transition-shadow cursor-pointer group">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
        {{ candidat.avatar || initiales }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {{ candidat.prenom }} {{ candidat.nom }}
            </h3>
            <p class="text-sm text-gray-600 mt-0.5">{{ candidat.titre }}</p>
          </div>
          <span class="badge flex-shrink-0" :class="niveauClass">{{ candidat.niveauExperience }}</span>
        </div>

        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ candidat.localisation }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Dispo : {{ candidat.disponibilite }}
          </span>
          <span v-if="candidat.logementSouhaite" class="text-amber-600">🏠 Logement souhaité</span>
        </div>

        <div class="flex flex-wrap gap-1.5 mt-2">
          <span v-for="s in candidat.saisons" :key="s" class="badge text-xs" :class="saisonClass(s)">
            {{ saisonEmoji(s) }} {{ s }}
          </span>
          <span v-for="sec in candidat.secteurs.slice(0, 2)" :key="sec" class="badge bg-gray-100 text-gray-600 text-xs">{{ sec }}</span>
        </div>

        <div class="flex flex-wrap gap-1.5 mt-2">
          <span v-for="comp in candidat.competences.slice(0, 4)" :key="comp" class="badge bg-primary-50 text-primary-700 text-xs">{{ comp }}</span>
          <span v-if="candidat.competences.length > 4" class="badge bg-gray-100 text-gray-500 text-xs">+{{ candidat.competences.length - 4 }}</span>
        </div>
      </div>
    </div>

    <p class="text-sm text-gray-600 mt-3 line-clamp-2">{{ candidat.resume }}</p>

    <!-- Score de compatibilité si offre fournie -->
    <div v-if="offre" class="mt-3 pt-3 border-t border-gray-100">
      <CompatibiliteScore :offre="offre" :candidat="candidat" mode="badge" />
    </div>

    <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <span v-if="candidat.salaireJournalier" class="text-sm font-medium text-gray-700">
        ~{{ candidat.salaireJournalier }} €/jour
      </span>
      <span v-else class="text-sm text-gray-400">Salaire à définir</span>
      <button class="btn-secondary text-xs py-1.5 px-3">Voir le profil</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Candidat, Saison, Offre } from '~/types'

const props = defineProps<{ candidat: Candidat; offre?: Offre }>()

const initiales = computed(() => `${props.candidat.prenom[0]}${props.candidat.nom[0]}`)

const niveauClass = computed(() => ({
  'Débutant': 'bg-blue-50 text-blue-700',
  'Expérimenté': 'bg-emerald-50 text-emerald-700',
  'Confirmé': 'bg-violet-50 text-violet-700',
}[props.candidat.niveauExperience] ?? 'bg-gray-100 text-gray-600'))

function saisonClass(s: Saison) {
  return { 'Été': 'bg-amber-50 text-amber-700', 'Hiver': 'bg-cyan-50 text-cyan-700', 'Toute l\'année': 'bg-emerald-50 text-emerald-700', 'Printemps/Automne': 'bg-violet-50 text-violet-700' }[s] ?? 'bg-gray-100 text-gray-600'
}
function saisonEmoji(s: Saison) {
  return { 'Été': '☀️', 'Hiver': '❄️', 'Toute l\'année': '🌿', 'Printemps/Automne': '🍂' }[s] ?? ''
}
</script>
