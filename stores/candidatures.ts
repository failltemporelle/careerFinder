import { defineStore } from 'pinia'
import type { Candidature, StatutCandidature } from '~/types'

export const useCandidaturesStore = defineStore('candidatures', {
  state: () => ({
    candidatures: [] as Candidature[],
  }),

  getters: {
    mesCandidatures: (state) =>
      state.candidatures.filter(c => c.candidatId === 'mon-profil'),

    getCandidaturesParOffre: (state) => (offreId: string) =>
      state.candidatures.filter(c => c.offreId === offreId),

    aDejaPostule: (state) => (offreId: string) =>
      state.candidatures.some(c => c.offreId === offreId && c.candidatId === 'mon-profil'),
  },

  actions: {
    init() {
      if (import.meta.client) {
        const stored = localStorage.getItem('cf_candidatures')
        this.candidatures = stored ? JSON.parse(stored) : []
      }
    },

    postuler(offreId: string, lettreMotivation: string) {
      const candidature: Candidature = {
        id: Date.now().toString(),
        offreId,
        candidatId: 'mon-profil',
        lettreMotivation,
        statut: 'envoyée',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.candidatures.push(candidature)
      this._sauvegarder()
      return candidature
    },

    mettreAJourStatut(id: string, statut: StatutCandidature) {
      const c = this.candidatures.find(c => c.id === id)
      if (c) {
        c.statut = statut
        c.updatedAt = new Date().toISOString()
        this._sauvegarder()
      }
    },

    _sauvegarder() {
      if (import.meta.client) {
        localStorage.setItem('cf_candidatures', JSON.stringify(this.candidatures))
      }
    }
  }
})
