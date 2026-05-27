<template>
  <div class="card hover:shadow-md transition-shadow group">
    <div class="flex flex-wrap gap-2 mb-2">
      <span class="badge text-xs" :class="saisonClass">{{ saisonEmoji }} {{ offre.saison }}</span>
      <span class="badge bg-gray-100 text-gray-700 text-xs">{{ offre.secteur }}</span>
      <span class="badge text-xs" :class="contratClass">{{ offre.typeContrat }}</span>
    </div>

    <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-base leading-snug">
      {{ offre.titre }}
    </h3>
    <p class="text-sm font-medium text-primary-600 mt-0.5">{{ offre.entreprise }}</p>

    <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ offre.localisation }}
      </span>
      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ offre.dateDebut }} → {{ offre.dateFin }}
      </span>
      <span class="flex items-center gap-1 font-medium text-gray-700">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ offre.salaire }}
      </span>
    </div>

    <!-- Avantages logement/repas -->
    <div class="flex gap-2 mt-2">
      <span v-if="offre.logementFourni" class="badge bg-amber-50 text-amber-700 text-xs">🏠 Logement fourni</span>
      <span v-if="offre.repas" class="badge bg-emerald-50 text-emerald-700 text-xs">🍽️ Repas inclus</span>
    </div>

    <p class="text-sm text-gray-600 mt-3 line-clamp-2">{{ offre.description }}</p>

    <div class="flex flex-wrap gap-1.5 mt-3">
      <span v-for="comp in offre.competencesRequises.slice(0, 3)" :key="comp" class="badge bg-primary-50 text-primary-700 text-xs">{{ comp }}</span>
      <span v-if="offre.competencesRequises.length > 3" class="badge bg-gray-100 text-gray-500 text-xs">+{{ offre.competencesRequises.length - 3 }}</span>
    </div>

    <!-- Score de compatibilité si profil fourni -->
    <div v-if="candidat" class="mt-3 pt-3 border-t border-gray-100">
      <CompatibiliteScore :offre="offre" :candidat="candidat" mode="badge" />
    </div>

    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
      <div v-if="dejaPostule" class="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Candidature envoyée
      </div>
      <div v-else />
      <slot name="actions">
        <NuxtLink :to="`/candidat/offres/${offre.id}`" class="btn-primary text-xs py-1.5 px-3">
          Voir l'offre
        </NuxtLink>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offre, Candidat } from '~/types'

const props = defineProps<{ offre: Offre; dejaPostule?: boolean; candidat?: Candidat }>()

const saisonClass = computed(() => ({
  'Été': 'bg-amber-50 text-amber-700',
  'Hiver': 'bg-cyan-50 text-cyan-700',
  'Toute l\'année': 'bg-emerald-50 text-emerald-700',
  'Printemps/Automne': 'bg-violet-50 text-violet-700',
}[props.offre.saison] ?? 'bg-gray-100 text-gray-600'))

const saisonEmoji = computed(() => ({
  'Été': '☀️', 'Hiver': '❄️', 'Toute l\'année': '🌿', 'Printemps/Automne': '🍂'
}[props.offre.saison] ?? ''))

const contratClass = computed(() => ({
  'Saisonnier': 'bg-primary-50 text-primary-700',
  'CDD': 'bg-amber-50 text-amber-700',
  'CDI': 'bg-emerald-50 text-emerald-700',
  'Extras': 'bg-gray-100 text-gray-700',
  'Stage': 'bg-blue-50 text-blue-700',
}[props.offre.typeContrat] ?? 'bg-gray-100 text-gray-600'))
</script>
