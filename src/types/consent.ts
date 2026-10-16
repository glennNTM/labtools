/** Choix de l'utilisateur sur les traceurs non essentiels. */
export type Consent = {
  analytics: boolean
  /** Horodatage du choix (ms), pour le redemander à expiration. */
  date: number
  version: number
}

export type ConsentState = {
  consent: Consent | null
  /** Bandeau rouvert depuis « Gérer les cookies ». */
  editing: boolean
}
