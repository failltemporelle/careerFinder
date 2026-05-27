<template>
  <div class="max-w-2xl">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Mon profil saisonnier</h1>
      <p class="text-gray-500 mt-1">Visible par les employeurs qui cherchent des saisonniers</p>
    </div>

    <form @submit.prevent="sauvegarder" class="space-y-5">
      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900">Informations personnelles</h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input v-model="form.prenom" type="text" required class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input v-model="form.nom" type="text" required class="input" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre / Métier saisonnier *</label>
          <input v-model="form.titre" type="text" required placeholder="ex: Serveur en station de ski" class="input" />
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input v-model="form.email" type="email" required class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input v-model="form.telephone" type="tel" placeholder="06 XX XX XX XX" class="input" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Localisation actuelle *</label>
          <input v-model="form.localisation" type="text" required placeholder="Lyon, France" class="input" />
        </div>
      </div>

      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900">Disponibilités & préférences</h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Niveau d'expérience *</label>
            <select v-model="form.niveauExperience" required class="input">
              <option value="">Choisir...</option>
              <option>Débutant</option>
              <option>Expérimenté</option>
              <option>Confirmé</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Disponible à partir de *</label>
            <input v-model="form.disponibilite" type="text" required placeholder="ex: Décembre 2025" class="input" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Saisons recherchées</label>
          <div class="flex flex-wrap gap-2">
            <label v-for="s in saisonsOptions" :key="s.value" class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" :value="s.value" v-model="form.saisons" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <span class="text-sm text-gray-700">{{ s.emoji }} {{ s.value }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Secteurs d'activité</label>
          <div class="flex flex-wrap gap-2">
            <label v-for="sec in secteursOptions" :key="sec" class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" :value="sec" v-model="form.secteurs" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
              <span class="text-sm text-gray-700">{{ sec }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prétention journalière (€/jour)</label>
          <input v-model.number="form.salaireJournalier" type="number" min="0" placeholder="80" class="input" />
        </div>

        <div class="flex gap-6">
          <div class="flex items-center gap-2">
            <input id="mobilite" v-model="form.pretRelocalisation" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
            <label for="mobilite" class="text-sm text-gray-700">Grande mobilité géographique</label>
          </div>
          <div class="flex items-center gap-2">
            <input id="logement" v-model="form.logementSouhaite" type="checkbox" class="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
            <label for="logement" class="text-sm text-gray-700">Logement souhaité</label>
          </div>
        </div>
      </div>

      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900">Présentation & compétences</h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Présentation *</label>
          <textarea v-model="form.resume" required rows="4" placeholder="Décrivez vos saisons précédentes, vos spécialités, vos diplômes..." class="input resize-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Compétences / Diplômes</label>
          <CompetencePicker
            v-model="form.competences"
            :secteurs="form.secteurs"
            placeholder="BAFA, Anglais B2, PSE1, Service en salle..."
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Sauvegarder mon profil
        </button>
      </div>
    </form>

    <div v-if="sauvegarde" class="fixed bottom-6 right-6 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Profil sauvegardé !
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NiveauExperience, Saison, Secteur } from '~/types'

definePageMeta({ layout: 'candidat' })

const store = useCandidatsStore()
store.init()

const sauvegarde = ref(false)

const saisonsOptions = [
  { value: 'Été' as Saison, emoji: '☀️' },
  { value: 'Hiver' as Saison, emoji: '❄️' },
  { value: 'Toute l\'année' as Saison, emoji: '🌿' },
  { value: 'Printemps/Automne' as Saison, emoji: '🍂' },
]

const secteursOptions: Secteur[] = [
  'Hôtellerie', 'Restauration', 'Ski & Montagne', 'Plage & Mer',
  'Animation', 'Agriculture', 'Tourisme', 'Événementiel'
]

const form = reactive({
  prenom: '', nom: '', titre: '', email: '', telephone: '',
  localisation: '', niveauExperience: '' as NiveauExperience | '',
  disponibilite: '', saisons: [] as Saison[], secteurs: [] as Secteur[],
  salaireJournalier: null as number | null,
  pretRelocalisation: false, logementSouhaite: false,
  resume: '', competences: [] as string[],
})

onMounted(() => {
  if (store.monProfil) {
    const p = store.monProfil
    Object.assign(form, {
      prenom: p.prenom, nom: p.nom, titre: p.titre, email: p.email,
      telephone: p.telephone, localisation: p.localisation,
      niveauExperience: p.niveauExperience, disponibilite: p.disponibilite,
      saisons: [...(p.saisons ?? [])], secteurs: [...(p.secteurs ?? [])],
      salaireJournalier: p.salaireJournalier, pretRelocalisation: p.pretRelocalisation,
      logementSouhaite: p.logementSouhaite ?? false, resume: p.resume,
      competences: [...p.competences],
    })
  }
})

function sauvegarder() {
  if (!form.niveauExperience) return
  store.sauvegarderProfil({
    ...form,
    niveauExperience: form.niveauExperience as NiveauExperience,
    avatar: `${form.prenom[0]}${form.nom[0]}`.toUpperCase(),
    salaireSouhaite: null,
  })
  sauvegarde.value = true
  setTimeout(() => { sauvegarde.value = false }, 3000)
}
</script>
