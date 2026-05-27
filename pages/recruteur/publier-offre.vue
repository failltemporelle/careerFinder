<template>
  <div class="max-w-2xl">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Publier une offre saisonnière</h1>
      <p class="text-gray-500 mt-1">Attirez les meilleurs saisonniers disponibles</p>
    </div>

    <form @submit.prevent="soumettre" class="space-y-5">
      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900">Informations générales</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Intitulé du poste *</label>
          <input v-model="form.titre" type="text" required placeholder="ex: Serveur en restaurant d'altitude" class="input" />
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Établissement / Employeur *</label>
            <input v-model="form.entreprise" type="text" required placeholder="Hôtel Les Neiges, ESF..." class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Localisation *</label>
            <input v-model="form.localisation" type="text" required placeholder="Méribel (73) — Savoie" class="input" />
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Saison *</label>
            <select v-model="form.saison" required class="input">
              <option value="">Choisir...</option>
              <option>Été</option>
              <option>Hiver</option>
              <option>Toute l'année</option>
              <option>Printemps/Automne</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Secteur *</label>
            <select v-model="form.secteur" required class="input">
              <option value="">Choisir...</option>
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
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type de contrat *</label>
            <select v-model="form.typeContrat" required class="input">
              <option value="">Choisir...</option>
              <option>Saisonnier</option>
              <option>CDD</option>
              <option>CDI</option>
              <option>Extras</option>
              <option>Stage</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Niveau requis *</label>
            <select v-model="form.niveauExperience" required class="input">
              <option value="">Choisir...</option>
              <option>Débutant</option>
              <option>Expérimenté</option>
              <option>Confirmé</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rémunération</label>
          <input v-model="form.salaire" type="text" placeholder="ex: 70 – 85 €/jour" class="input" />
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
            <input v-model="form.dateDebut" type="text" placeholder="ex: 1 décembre 2025" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
            <input v-model="form.dateFin" type="text" placeholder="ex: 30 avril 2026" class="input" />
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex items-center gap-2">
            <input id="logement" v-model="form.logementFourni" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
            <label for="logement" class="text-sm text-gray-700">🏠 Logement fourni</label>
          </div>
          <div class="flex items-center gap-2">
            <input id="repas" v-model="form.repas" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
            <label for="repas" class="text-sm text-gray-700">🍽️ Repas inclus</label>
          </div>
        </div>
      </div>

      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900">Description & compétences</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description du poste *</label>
          <textarea v-model="form.description" required rows="4" placeholder="Décrivez le poste, les missions, l'ambiance..." class="input resize-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Compétences / Diplômes requis</label>
          <CompetencePicker
            v-model="form.competencesRequises"
            :secteurs="form.secteur ? [form.secteur as Secteur] : []"
            placeholder="Diplôme d'État, PSE1, Anglais B2..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Avantages</label>
          <div class="flex gap-2 mb-2">
            <input v-model="nouvelAvantage" @keydown.enter.prevent="ajouterAvantage" type="text" placeholder="Forfait ski, prime de saison..." class="input" />
            <button type="button" @click="ajouterAvantage" class="btn-secondary flex-shrink-0">Ajouter</button>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="(av, i) in form.avantages" :key="i" class="badge bg-emerald-50 text-emerald-700">
              {{ av }}<button type="button" @click="form.avantages.splice(i,1)" class="ml-1 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
      </div>

      <div class="flex gap-3 justify-end">
        <NuxtLink to="/recruteur/offres" class="btn-outline">Annuler</NuxtLink>
        <button type="submit" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Publier l'offre
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ContratType, Saison, Secteur, NiveauExperience } from '~/types'

definePageMeta({ layout: 'recruteur' })

const store = useOffresStore()
store.init()

const form = reactive({
  titre: '',
  entreprise: '',
  localisation: '',
  saison: '' as Saison | '',
  secteur: '' as Secteur | '',
  typeContrat: '' as ContratType | '',
  niveauExperience: '' as NiveauExperience | '',
  salaire: '',
  dateDebut: '',
  dateFin: '',
  logementFourni: false,
  repas: false,
  description: '',
  competencesRequises: [] as string[],
  avantages: [] as string[],
  actif: true,
})

const nouvelAvantage = ref('')

function ajouterAvantage() {
  const v = nouvelAvantage.value.trim()
  if (v) { form.avantages.push(v); nouvelAvantage.value = '' }
}

function soumettre() {
  if (!form.saison || !form.secteur || !form.typeContrat || !form.niveauExperience) return
  store.ajouterOffre({
    ...form,
    saison: form.saison as Saison,
    secteur: form.secteur as Secteur,
    typeContrat: form.typeContrat as ContratType,
    niveauExperience: form.niveauExperience as NiveauExperience,
  })
  navigateTo('/recruteur/offres')
}
</script>
