<template>
  <div>
    <!-- Badge compact (mode card) -->
    <div v-if="mode === 'badge'" class="flex items-center gap-2">
      <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all" :class="couleurs.bar" :style="{ width: detail.total + '%' }" />
      </div>
      <span class="text-xs font-semibold tabular-nums" :class="couleurs.text">{{ detail.total }}%</span>
    </div>

    <!-- Badge pill -->
    <span v-else-if="mode === 'pill'" class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1" :class="[couleurs.bg, couleurs.text, couleurs.ring]">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ detail.total }}% — {{ label }}
    </span>

    <!-- Détail complet -->
    <div v-else class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="font-semibold text-gray-900">Score de compatibilité</span>
        <span class="text-2xl font-bold" :class="couleurs.text">{{ detail.total }}%</span>
      </div>

      <!-- Barre globale -->
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all" :class="couleurs.bar" :style="{ width: detail.total + '%' }" />
      </div>
      <p class="text-xs font-medium" :class="couleurs.text">{{ label }}</p>

      <!-- Détail par critère -->
      <dl class="space-y-2 mt-3">
        <div v-for="item in criteres" :key="item.label" class="flex items-center justify-between text-xs">
          <dt class="text-gray-500 flex items-center gap-1.5">
            <span>{{ item.emoji }}</span> {{ item.label }}
          </dt>
          <dd class="flex items-center gap-1.5">
            <div class="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" :class="item.ok ? 'bg-emerald-500' : 'bg-gray-300'" :style="{ width: (item.score / item.max * 100) + '%' }" />
            </div>
            <span class="font-semibold tabular-nums" :class="item.ok ? 'text-emerald-600' : 'text-gray-400'">
              {{ item.score }}/{{ item.max }}
            </span>
          </dd>
        </div>
      </dl>

      <!-- Compétences manquantes -->
      <div v-if="detail.competences.missing.length" class="pt-2 border-t border-gray-100">
        <p class="text-xs font-medium text-gray-500 mb-1.5">Compétences non renseignées :</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="c in detail.competences.missing" :key="c" class="badge bg-red-50 text-red-600 text-xs">{{ c }}</span>
        </div>
      </div>

      <!-- Compétences matchées -->
      <div v-if="detail.competences.matched.length" class="pt-2">
        <p class="text-xs font-medium text-gray-500 mb-1.5">Compétences validées :</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="c in detail.competences.matched" :key="c" class="badge bg-emerald-50 text-emerald-700 text-xs">✓ {{ c }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offre, Candidat } from '~/types'
import { calculerCompatibilite, couleurScore, labelScore } from '~/composables/useCompatibilite'

const props = defineProps<{
  offre: Offre
  candidat: Candidat
  mode?: 'badge' | 'pill' | 'detail'
}>()

const detail = computed(() => calculerCompatibilite(props.offre, props.candidat))
const couleurs = computed(() => couleurScore(detail.value.total))
const label = computed(() => labelScore(detail.value.total))

const criteres = computed(() => [
  { label: 'Compétences', emoji: '🛠️', score: detail.value.competences.score, max: 60, ok: detail.value.competences.score > 0 },
  { label: 'Saison', emoji: '📅', score: detail.value.saison.score, max: 20, ok: detail.value.saison.match },
  { label: 'Secteur', emoji: '🏷️', score: detail.value.secteur.score, max: 15, ok: detail.value.secteur.match },
  { label: 'Niveau', emoji: '📈', score: detail.value.niveau.score, max: 5, ok: detail.value.niveau.match },
])
</script>
