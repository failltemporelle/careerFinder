import type { Secteur } from '~/types'

export const COMPETENCES_PAR_SECTEUR: Record<Secteur, string[]> = {
  'Ski & Montagne': [
    'Ski alpin', 'Ski de fond', 'Snowboard', 'Télémark',
    'Diplôme d\'État ski alpin', 'Brevet d\'État ski alpin', 'ESF',
    'Secourisme piste (PSE1)', 'ANENA (avalanche)', 'Pisteur secouriste',
    'Pédagogie enfants', 'Anglais B2', 'Allemand B1', 'Russe',
    'Ski de randonnée', 'Ski hors-piste',
  ],
  'Restauration': [
    'Service en salle', 'Chef de rang', 'Commis de salle',
    'Barman', 'Mixologie', 'Sommelier', 'Œnologie',
    'Encaissement / Caisse', 'Logiciel caisse',
    'Mise en place', 'Plonge', 'Commis de cuisine',
    'HACCP', 'Normes d\'hygiène', 'Découpe / Tranchage',
    'Anglais B2', 'Service gastronomique', 'Restauration rapide',
  ],
  'Hôtellerie': [
    'Réception hôtelière', 'Check-in / Check-out', 'Conciergerie',
    'Opera PMS', 'Fols', 'Protel', 'Logiciel hôtelier',
    'Facturation', 'Gestion des réservations',
    'Étages / Femme de chambre', 'Gouvernante', 'Lingerie',
    'Service en chambre', 'Accueil clientèle',
    'Anglais C1', 'Espagnol B2', 'Italien B2', 'Mandarin',
    'Hôtellerie de luxe (4★/5★)',
  ],
  'Plage & Mer': [
    'BEESAN', 'BPJEPS AAN', 'MNS', 'BNSSA',
    'PSE1 à jour', 'PSE2', 'Premiers secours',
    'Surveillance aquatique', 'Natation sportive',
    'Voile', 'Planche à voile', 'Kitesurf', 'Kayak de mer',
    'Plongée sous-marine', 'Jet-ski (BPJEPS)', 'Stand-up paddle',
    'Secours en mer', 'Anglais B2',
  ],
  'Animation': [
    'BAFA', 'BAFD', 'BPJEPS',
    'PSC1 / PSC2', 'Premiers secours',
    'Mini-club (3-6 ans)', 'Animation enfants (6-12 ans)', 'Ados',
    'Animation sportive', 'Aquagym', 'Zumba',
    'Spectacles / Soirées', 'Théâtre', 'Musique',
    'Anglais B2', 'Espagnol B2',
    'Jeux de plein air', 'Activités manuelles', 'Cuisine créative',
  ],
  'Agriculture': [
    'Vendange manuelle', 'Vendange mécanique', 'Taille de vigne',
    'Ébourgeonnage', 'Cave viticole',
    'Cueillette fruits', 'Maraîchage', 'Arboriculture',
    'Conduite d\'engins agricoles', 'CACES', 'Tracteur',
    'Tri / Conditionnement', 'Manutention', 'Bonne condition physique',
    'Travail en extérieur',
  ],
  'Tourisme': [
    'Guide touristique', 'Accompagnateur de voyages',
    'Billetterie', 'Visite commentée', 'Conférencier',
    'Anglais C1', 'Espagnol C1', 'Allemand B2', 'Japonais', 'Mandarin',
    'Culture locale', 'Histoire de l\'art',
    'Randonnée pédestre', 'VTT guidé', 'Patrimoine naturel',
    'Permis côtier', 'Excursions en mer',
  ],
  'Événementiel': [
    'Montage / Démontage', 'Logistique événementielle',
    'Accueil public', 'Hôtesse / Steward',
    'Sécurité / Sûreté', 'SSIAP 1', 'Vigile',
    'Son / Éclairage', 'Régie', 'Scénographie',
    'Manutention lourde', 'CACES nacelle',
    'Billetterie / Contrôle d\'accès', 'Relations publiques',
    'Anglais B2',
  ],
}

export const TOUTES_COMPETENCES = Object.values(COMPETENCES_PAR_SECTEUR).flat()

export function competencesPourSecteurs(secteurs: Secteur[]): string[] {
  if (!secteurs.length) return TOUTES_COMPETENCES
  const set = new Set<string>()
  secteurs.forEach(s => COMPETENCES_PAR_SECTEUR[s]?.forEach(c => set.add(c)))
  return Array.from(set)
}
