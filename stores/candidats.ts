import { defineStore } from 'pinia'
import type { Candidat } from '~/types'

const CANDIDATS_MOCK: Candidat[] = [
  {
    id: '1',
    prenom: 'Lucas',
    nom: 'Morel',
    titre: 'Serveur / Barman — Stations de ski',
    localisation: 'Grenoble, France',
    email: 'lucas.morel@email.com',
    telephone: '06 11 22 33 44',
    niveauExperience: 'Expérimenté',
    competences: ['Service en salle', 'Barman', 'Encaissement', 'Gestion du stress', 'Anglais B2'],
    saisons: ['Hiver', 'Été'],
    secteurs: ['Restauration', 'Hôtellerie'],
    disponibilite: 'Décembre 2025',
    pretRelocalisation: true,
    logementSouhaite: true,
    salaireJournalier: 80,
    resume: '4 saisons en station (Méribel, Les 2 Alpes). Habitué aux services rapides en altitude, ambiance internationale. Permis B + véhicule.',
    avatar: 'LM',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: '2',
    prenom: 'Emma',
    nom: 'Vidal',
    titre: 'Animatrice / GO Club Vacances',
    localisation: 'Montpellier, France',
    email: 'emma.vidal@email.com',
    telephone: '06 22 33 44 55',
    niveauExperience: 'Confirmé',
    competences: ['Animation enfants', 'BAFA', 'Mini-club', 'Spectacles', 'Espagnol C1'],
    saisons: ['Été', 'Toute l\'année'],
    secteurs: ['Animation', 'Tourisme'],
    disponibilite: 'Juin 2026',
    pretRelocalisation: true,
    logementSouhaite: true,
    salaireJournalier: 65,
    resume: '3 étés en club vacances (Club Med, Pierre & Vacances). BAFA + PSC1. Spécialisée mini-club 4-12 ans et animation soirées.',
    avatar: 'EV',
    createdAt: '2025-01-12T09:30:00Z'
  },
  {
    id: '3',
    prenom: 'Théo',
    nom: 'Blanc',
    titre: 'Moniteur de ski — ESF',
    localisation: 'Annecy, France',
    email: 'theo.blanc@email.com',
    telephone: '06 33 44 55 66',
    niveauExperience: 'Confirmé',
    competences: ['Ski alpin', 'Ski de fond', 'Pédagogie', 'Anglais C1', 'Allemand B1'],
    saisons: ['Hiver'],
    secteurs: ['Ski & Montagne'],
    disponibilite: 'Décembre 2025',
    pretRelocalisation: true,
    logementSouhaite: false,
    salaireJournalier: 120,
    resume: 'Diplôme d\'État ski alpin. 5 hivers à Chamonix et Val-d\'Isère. Cours collectifs et particuliers, toutes nationalités.',
    avatar: 'TB',
    createdAt: '2025-01-15T14:00:00Z'
  },
  {
    id: '4',
    prenom: 'Camille',
    nom: 'Faure',
    titre: 'Maître-nageur MNS — Plage & Piscine',
    localisation: 'Marseille, France',
    email: 'camille.faure@email.com',
    telephone: '06 44 55 66 77',
    niveauExperience: 'Expérimenté',
    competences: ['Surveillance aquatique', 'BEESAN', 'PSE1', 'Natation sportive', 'Anglais B2'],
    saisons: ['Été'],
    secteurs: ['Plage & Mer'],
    disponibilite: 'Juin 2026',
    pretRelocalisation: true,
    logementSouhaite: true,
    salaireJournalier: 95,
    resume: 'BEESAN + PSE1. 4 saisons sur plages surveillées (Côte d\'Azur, Languedoc). Habilitation premiers secours à jour.',
    avatar: 'CF',
    createdAt: '2025-01-18T11:00:00Z'
  },
  {
    id: '5',
    prenom: 'Sofia',
    nom: 'Renard',
    titre: 'Réceptionniste Hôtel — Saisons Été/Hiver',
    localisation: 'Lyon, France',
    email: 'sofia.renard@email.com',
    telephone: '06 55 66 77 88',
    niveauExperience: 'Expérimenté',
    competences: ['Accueil clientèle', 'Logiciel hôtelier', 'Facturation', 'Anglais C1', 'Italien B2'],
    saisons: ['Été', 'Hiver'],
    secteurs: ['Hôtellerie', 'Tourisme'],
    disponibilite: 'Immédiate',
    pretRelocalisation: true,
    logementSouhaite: true,
    salaireJournalier: 85,
    resume: '3 ans de saisons hôtelières (4★ et 5★). Maîtrise Opera PMS et Fols. Polyvalente nuit/jour, trilingue.',
    avatar: 'SR',
    createdAt: '2025-01-20T16:00:00Z'
  },
  {
    id: '6',
    prenom: 'Romain',
    nom: 'Gauthier',
    titre: 'Commis de cuisine saisonnier',
    localisation: 'Bordeaux, France',
    email: 'romain.gauthier@email.com',
    telephone: '06 66 77 88 99',
    niveauExperience: 'Débutant',
    competences: ['Préparation culinaire', 'HACCP', 'Plonge', 'Mise en place', 'Rapidité'],
    saisons: ['Été', 'Hiver', 'Printemps/Automne'],
    secteurs: ['Restauration'],
    disponibilite: 'Immédiate',
    pretRelocalisation: true,
    logementSouhaite: true,
    salaireJournalier: 60,
    resume: 'CAP Cuisine. Cherche à accumuler les saisons pour apprendre. Motivé, ponctuel, grande mobilité géographique acceptée.',
    avatar: 'RG',
    createdAt: '2025-01-22T10:30:00Z'
  }
]

export const useCandidatsStore = defineStore('candidats', {
  state: () => ({
    candidats: [] as Candidat[],
    monProfil: null as Candidat | null,
  }),

  getters: {
    getCandidatById: (state) => (id: string) =>
      state.candidats.find(c => c.id === id),
  },

  actions: {
    init() {
      if (import.meta.client) {
        const stored = localStorage.getItem('cf_candidats')
        this.candidats = stored ? JSON.parse(stored) : CANDIDATS_MOCK

        const profil = localStorage.getItem('cf_mon_profil')
        if (profil) this.monProfil = JSON.parse(profil)
      }
    },

    sauvegarderProfil(profil: Omit<Candidat, 'id' | 'createdAt'> & { id?: string }) {
      if (!this.monProfil) {
        this.monProfil = { ...profil, id: 'mon-profil', createdAt: new Date().toISOString() }
      } else {
        this.monProfil = { ...this.monProfil, ...profil }
      }
      if (import.meta.client) {
        localStorage.setItem('cf_mon_profil', JSON.stringify(this.monProfil))
      }
    },

    rechercher(filtres: {
      query?: string
      saison?: string
      secteur?: string
      niveauExperience?: string
      pretRelocalisation?: boolean
      logementSouhaite?: boolean
    }) {
      return this.candidats.filter(c => {
        if (filtres.query) {
          const q = filtres.query.toLowerCase()
          if (![c.prenom, c.nom, c.titre, ...c.competences].some(v => v.toLowerCase().includes(q))) return false
        }
        if (filtres.saison && !c.saisons.includes(filtres.saison as any)) return false
        if (filtres.secteur && !c.secteurs.includes(filtres.secteur as any)) return false
        if (filtres.niveauExperience && c.niveauExperience !== filtres.niveauExperience) return false
        if (filtres.pretRelocalisation && !c.pretRelocalisation) return false
        if (filtres.logementSouhaite && !c.logementSouhaite) return false
        return true
      })
    }
  }
})
