<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-amber-50 flex flex-col">
    <header class="px-6 py-5">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <span class="text-2xl font-bold text-primary-600">Career<span class="text-gray-900"> Finder</span></span>
        <span class="text-sm text-gray-500 hidden sm:block">Plateforme emploi saisonnier</span>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 py-16">
      <div class="max-w-4xl w-full text-center">
        <div class="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
          <span class="text-base">⛷️</span>
          Emplois saisonniers — Été · Hiver · Toute l'année
        </div>

        <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Trouvez votre<br />
          <span class="text-primary-600">saison idéale</span>
        </h1>

        <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Stations de ski, clubs vacances, plages, hôtels, vendanges…
          Career Finder connecte employeurs saisonniers et candidats disponibles.
        </p>

        <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <NuxtLink
            to="/recruteur"
            class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-200 text-left"
          >
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors duration-200">
              <svg class="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">Je suis employeur</h2>
            <p class="text-gray-500 text-sm leading-relaxed">
              Publiez vos offres saisonnières, recherchez des profils disponibles et gérez vos recrutements.
            </p>
            <div class="mt-4 flex items-center gap-2 text-primary-600 text-sm font-medium">
              Espace employeur
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/candidat"
            class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-emerald-200 transition-all duration-200 text-left"
          >
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-200">
              <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">Je cherche une saison</h2>
            <p class="text-gray-500 text-sm leading-relaxed">
              Créez votre profil, parcourez les offres et postulez aux saisons qui vous correspondent.
            </p>
            <div class="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
              Espace saisonnier
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Secteurs -->
        <div class="flex flex-wrap justify-center gap-2 mt-12">
          <span v-for="s in secteurs" :key="s" class="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
            <span>{{ s.emoji }}</span> {{ s.label }}
          </span>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mt-10 text-center">
          <div><p class="text-3xl font-bold text-gray-900">6+</p><p class="text-sm text-gray-500 mt-1">Offres actives</p></div>
          <div class="w-px bg-gray-200 hidden sm:block" />
          <div><p class="text-3xl font-bold text-gray-900">6+</p><p class="text-sm text-gray-500 mt-1">Saisonniers disponibles</p></div>
          <div class="w-px bg-gray-200 hidden sm:block" />
          <div><p class="text-3xl font-bold text-gray-900">100%</p><p class="text-sm text-gray-500 mt-1">Gratuit</p></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const secteurs = [
  { emoji: '⛷️', label: 'Ski & Montagne' },
  { emoji: '🏖️', label: 'Plage & Mer' },
  { emoji: '🏨', label: 'Hôtellerie' },
  { emoji: '🍽️', label: 'Restauration' },
  { emoji: '🎪', label: 'Animation' },
  { emoji: '🍇', label: 'Agriculture' },
  { emoji: '✈️', label: 'Tourisme' },
  { emoji: '🎉', label: 'Événementiel' },
]
</script>
