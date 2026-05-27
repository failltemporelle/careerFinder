<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-8">
            <NuxtLink to="/" class="flex items-center gap-2">
              <span class="text-xl font-bold text-primary-600">Career<span class="text-gray-900"> Finder</span></span>
            </NuxtLink>
            <div class="hidden sm:flex items-center gap-1">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="$route.path.startsWith(item.to) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
              <span class="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              Espace Recruteur
            </span>
            <NuxtLink to="/candidat" class="text-sm text-gray-500 hover:text-gray-700">
              Espace Candidat →
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/recruteur/tableau-de-bord', label: 'Tableau de bord' },
  { to: '/recruteur/recherche', label: 'Rechercher des profils' },
  { to: '/recruteur/offres', label: 'Mes offres' },
  { to: '/recruteur/publier-offre', label: 'Publier une offre' },
]
</script>
