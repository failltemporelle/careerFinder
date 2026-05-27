import { defineStore } from 'pinia'
import type { Offre } from '~/types'

const OFFRES_MOCK: Offre[] = [
  {
    id: '1',
    titre: 'Moniteur / Monitrice de ski',
    entreprise: 'ESF Méribel',
    localisation: 'Méribel (73) — Savoie',
    typeContrat: 'Saisonnier',
    saison: 'Hiver',
    secteur: 'Ski & Montagne',
    niveauExperience: 'Confirmé',
    salaire: '110 – 130 €/jour',
    dateDebut: '15 décembre 2025',
    dateFin: '15 avril 2026',
    logementFourni: false,
    repas: false,
    description: 'L\'ESF Méribel recrute des moniteurs de ski alpins diplômés pour la saison hiver 2025/2026. Cours collectifs et particuliers, clientèle internationale. Disponibilité week-ends obligatoire.',
    competencesRequises: ['Diplôme d\'État ski alpin', 'Anglais B2', 'Pédagogie', 'Sens du service'],
    avantages: ['Forfait ski offert', 'Tarifs réduits équipement', 'Mutuelle', 'Prime de saison'],
    datePublication: '2025-10-01T09:00:00Z',
    actif: true
  },
  {
    id: '2',
    titre: 'Serveur / Serveuse en restaurant d\'altitude',
    entreprise: 'Le Chalet des Cimes',
    localisation: 'Courchevel 1850 (73) — Savoie',
    typeContrat: 'Saisonnier',
    saison: 'Hiver',
    secteur: 'Restauration',
    niveauExperience: 'Expérimenté',
    salaire: '75 – 90 €/jour',
    dateDebut: '1 décembre 2025',
    dateFin: '30 avril 2026',
    logementFourni: true,
    repas: true,
    description: 'Restaurant gastronomique en station recherche serveurs expérimentés pour la saison hiver. Service midi et soir, clientèle haut de gamme internationale. Logement en chalet partagé fourni.',
    competencesRequises: ['Service en salle', 'Anglais courant', 'Présentation soignée', 'Encaissement'],
    avantages: ['Logement fourni', 'Repas inclus', 'Pourboires', 'Forfait ski week-end'],
    datePublication: '2025-09-15T09:00:00Z',
    actif: true
  },
  {
    id: '3',
    titre: 'Animateur / Animatrice GO Club',
    entreprise: 'Club Med Opio',
    localisation: 'Opio (06) — Alpes-Maritimes',
    typeContrat: 'Saisonnier',
    saison: 'Été',
    secteur: 'Animation',
    niveauExperience: 'Débutant',
    salaire: '60 – 75 €/jour',
    dateDebut: '1 juin 2026',
    dateFin: '15 septembre 2026',
    logementFourni: true,
    repas: true,
    description: 'Club Med recrute des Gentils Organisateurs (GO) pour la saison estivale. Vous animez les activités sportives, culturelles et les soirées. BAFA apprécié. Esprit d\'équipe indispensable.',
    competencesRequises: ['BAFA (apprécié)', 'Animation', 'Esprit d\'équipe', 'Anglais ou espagnol'],
    avantages: ['Logement + repas inclus', 'Formation interne', 'Ambiance internationale', 'Évolution possible'],
    datePublication: '2025-11-01T09:00:00Z',
    actif: true
  },
  {
    id: '4',
    titre: 'Maître-nageur sauveteur (MNS)',
    entreprise: 'Camping Yelloh! Village',
    localisation: 'Agde (34) — Hérault',
    typeContrat: 'Saisonnier',
    saison: 'Été',
    secteur: 'Plage & Mer',
    niveauExperience: 'Expérimenté',
    salaire: '90 – 105 €/jour',
    dateDebut: '1 mai 2026',
    dateFin: '30 septembre 2026',
    logementFourni: true,
    repas: false,
    description: 'Camping 5★ bord de mer recrute un MNS pour surveillance de la piscine et animation aquatique. BEESAN ou BPJEPS AAN obligatoire. Logement individuel fourni sur site.',
    competencesRequises: ['BEESAN ou BPJEPS AAN', 'PSE1 à jour', 'Surveillance aquatique', 'Pédagogie'],
    avantages: ['Logement individuel', 'Cadre exceptionnel', 'Équipe jeune', 'Prime de résultat'],
    datePublication: '2025-12-01T09:00:00Z',
    actif: true
  },
  {
    id: '5',
    titre: 'Réceptionniste hôtel saisonnier',
    entreprise: 'Hôtel Les Flots Bleus',
    localisation: 'Saint-Tropez (83) — Var',
    typeContrat: 'Saisonnier',
    saison: 'Été',
    secteur: 'Hôtellerie',
    niveauExperience: 'Expérimenté',
    salaire: '80 – 95 €/jour',
    dateDebut: '15 avril 2026',
    dateFin: '15 octobre 2026',
    logementFourni: true,
    repas: true,
    description: 'Hôtel 4★ en bord de mer recrute un(e) réceptionniste pour check-in/check-out, gestion des réservations et accueil clientèle internationale. Maîtrise d\'un logiciel hôtelier requise.',
    competencesRequises: ['Accueil clientèle', 'Logiciel hôtelier', 'Anglais C1', 'Français natif'],
    avantages: ['Chambre en résidence', 'Repas du personnel', 'Pourboires', 'Cadre Côte d\'Azur'],
    datePublication: '2025-11-15T09:00:00Z',
    actif: true
  },
  {
    id: '6',
    titre: 'Vendangeur / Aide viticulteur',
    entreprise: 'Domaine Château Margaux',
    localisation: 'Margaux (33) — Gironde',
    typeContrat: 'Saisonnier',
    saison: 'Printemps/Automne',
    secteur: 'Agriculture',
    niveauExperience: 'Débutant',
    salaire: '55 – 65 €/jour',
    dateDebut: '15 septembre 2026',
    dateFin: '15 octobre 2026',
    logementFourni: true,
    repas: true,
    description: 'Grand domaine viticole bordelais recrute vendangeurs pour les récoltes de septembre. Travail en plein air, ambiance conviviale, équipe internationale. Aucune expérience requise, formation sur place.',
    competencesRequises: ['Bonne condition physique', 'Travail en équipe', 'Ponctualité'],
    avantages: ['Hébergement sur domaine', 'Repas cuisinés', 'Ambiance conviviale', 'Dégustation à la fin'],
    datePublication: '2026-06-01T09:00:00Z',
    actif: true
  }
]

export const useOffresStore = defineStore('offres', {
  state: () => ({
    offres: [] as Offre[],
  }),

  getters: {
    getOffreById: (state) => (id: string) =>
      state.offres.find(o => o.id === id),
    offresActives: (state) =>
      state.offres.filter(o => o.actif),
  },

  actions: {
    init() {
      if (import.meta.client) {
        const stored = localStorage.getItem('cf_offres')
        this.offres = stored ? JSON.parse(stored) : OFFRES_MOCK
      }
    },

    ajouterOffre(offre: Omit<Offre, 'id' | 'datePublication'>) {
      const nouvelleOffre: Offre = {
        ...offre,
        id: Date.now().toString(),
        datePublication: new Date().toISOString(),
      }
      this.offres.unshift(nouvelleOffre)
      this._sauvegarder()
      return nouvelleOffre
    },

    toggleActif(id: string) {
      const offre = this.offres.find(o => o.id === id)
      if (offre) { offre.actif = !offre.actif; this._sauvegarder() }
    },

    supprimerOffre(id: string) {
      this.offres = this.offres.filter(o => o.id !== id)
      this._sauvegarder()
    },

    rechercher(filtres: {
      query?: string
      saison?: string
      secteur?: string
      typeContrat?: string
      logementFourni?: boolean
      repas?: boolean
    }) {
      return this.offresActives.filter(o => {
        if (filtres.query) {
          const q = filtres.query.toLowerCase()
          if (![o.titre, o.entreprise, o.localisation, ...o.competencesRequises].some(v => v.toLowerCase().includes(q))) return false
        }
        if (filtres.saison && o.saison !== filtres.saison) return false
        if (filtres.secteur && o.secteur !== filtres.secteur) return false
        if (filtres.typeContrat && o.typeContrat !== filtres.typeContrat) return false
        if (filtres.logementFourni && !o.logementFourni) return false
        if (filtres.repas && !o.repas) return false
        return true
      })
    },

    _sauvegarder() {
      if (import.meta.client) localStorage.setItem('cf_offres', JSON.stringify(this.offres))
    }
  }
})
