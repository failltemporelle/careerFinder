<template>
  <div class="space-y-3">
    <!-- Saisie libre + suggestions -->
    <div class="relative" ref="containerRef">
      <div class="flex gap-2">
        <div class="relative flex-1">
          <input
            v-model="recherche"
            @focus="ouvert = true"
            @keydown.enter.prevent="ajouterRecherche"
            @keydown.escape="ouvert = false"
            type="text"
            :placeholder="placeholder"
            class="input pr-8"
          />
          <svg v-if="recherche" @click="recherche = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <button type="button" @click="ajouterRecherche" class="btn-secondary flex-shrink-0">Ajouter</button>
      </div>

      <!-- Dropdown suggestions -->
      <div
        v-if="ouvert && suggestions.length"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto"
      >
        <button
          v-for="comp in suggestions"
          :key="comp"
          type="button"
          @mousedown.prevent="selectionner(comp)"
          class="w-full text-left px-3 py-2 text-sm hover:bg-primary-50 hover:text-primary-700 flex items-center justify-between gap-2"
          :class="selected.includes(comp) ? 'text-primary-600 bg-primary-50' : 'text-gray-700'"
        >
          {{ comp }}
          <svg v-if="selected.includes(comp)" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Suggestions rapides par secteur -->
    <div v-if="suggestionRapides.length && !recherche" class="flex flex-wrap gap-1.5">
      <button
        v-for="comp in suggestionRapides.slice(0, 12)"
        :key="comp"
        type="button"
        @click="selectionner(comp)"
        class="text-xs px-2.5 py-1 rounded-full border transition-colors"
        :class="selected.includes(comp)
          ? 'bg-primary-600 text-white border-primary-600'
          : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
      >
        {{ comp }}
      </button>
    </div>

    <!-- Badges sélectionnés -->
    <div v-if="selected.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="comp in selected"
        :key="comp"
        class="badge bg-primary-50 text-primary-700 gap-1 pr-1 text-xs"
      >
        {{ comp }}
        <button type="button" @click="retirer(comp)" class="hover:text-red-500 ml-0.5 font-bold">×</button>
      </span>
    </div>
    <p v-else class="text-xs text-gray-400">Aucune compétence sélectionnée</p>
  </div>
</template>

<script setup lang="ts">
import type { Secteur } from '~/types'
import { competencesPourSecteurs, COMPETENCES_PAR_SECTEUR } from '~/utils/competences'

const props = defineProps<{
  modelValue: string[]
  secteurs?: Secteur[]
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [val: string[]] }>()

const selected = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const recherche = ref('')
const ouvert = ref(false)

// Suggestions filtrées par la saisie
const pool = computed(() =>
  props.secteurs?.length
    ? competencesPourSecteurs(props.secteurs)
    : Object.values(COMPETENCES_PAR_SECTEUR).flat()
)

const suggestions = computed(() => {
  const q = recherche.value.toLowerCase().trim()
  if (!q) return pool.value.filter(c => !selected.value.includes(c)).slice(0, 20)
  return pool.value.filter(c =>
    c.toLowerCase().includes(q) && !selected.value.includes(c)
  ).slice(0, 15)
})

// Suggestions rapides = les 12 premières du pool non sélectionnées
const suggestionRapides = computed(() =>
  pool.value.filter(c => !selected.value.includes(c))
)

function selectionner(comp: string) {
  if (!selected.value.includes(comp)) {
    emit('update:modelValue', [...selected.value, comp])
  } else {
    retirer(comp)
  }
  recherche.value = ''
  ouvert.value = false
}

function ajouterRecherche() {
  const v = recherche.value.trim()
  if (!v) return
  const existe = pool.value.find(c => c.toLowerCase() === v.toLowerCase())
  selectionner(existe ?? v)
}

function retirer(comp: string) {
  emit('update:modelValue', selected.value.filter(c => c !== comp))
}

// Fermer le dropdown en cliquant ailleurs
onMounted(() => {
  document.addEventListener('click', () => { ouvert.value = false })
})
</script>
