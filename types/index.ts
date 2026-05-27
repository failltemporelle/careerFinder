export type ContratType = 'Saisonnier' | 'CDD' | 'CDI' | 'Extras' | 'Stage'
export type Saison = 'Été' | 'Hiver' | 'Toute l\'année' | 'Printemps/Automne'
export type Secteur = 'Hôtellerie' | 'Restauration' | 'Ski & Montagne' | 'Plage & Mer' | 'Animation' | 'Agriculture' | 'Tourisme' | 'Événementiel'
export type NiveauExperience = 'Débutant' | 'Expérimenté' | 'Confirmé'
export type StatutCandidature = 'envoyée' | 'vue' | 'entretien' | 'refusée' | 'acceptée'

export interface Candidat {
  id: string
  prenom: string
  nom: string
  titre: string
  localisation: string
  email: string
  telephone: string
  niveauExperience: NiveauExperience
  competences: string[]
  saisons: Saison[]
  secteurs: Secteur[]
  disponibilite: string
  pretRelocalisation: boolean
  logementSouhaite: boolean
  salaireJournalier: number | null
  resume: string
  avatar?: string
  createdAt: string
}

export interface Offre {
  id: string
  titre: string
  entreprise: string
  localisation: string
  typeContrat: ContratType
  saison: Saison
  secteur: Secteur
  niveauExperience: NiveauExperience
  salaire: string
  dateDebut: string
  dateFin: string
  logementFourni: boolean
  repas: boolean
  description: string
  competencesRequises: string[]
  avantages: string[]
  datePublication: string
  actif: boolean
}

export interface Candidature {
  id: string
  offreId: string
  candidatId: string
  lettreMotivation: string
  statut: StatutCandidature
  createdAt: string
  updatedAt: string
}
