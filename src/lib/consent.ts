import { useSyncExternalStore } from 'react'
import type { Consent, ConsentState } from '@/types/consent'

/**
 * Consentement aux traceurs non essentiels (mesure d'audience), sans dépendance.
 * Le choix est conservé dans le localStorage et redemandé après 6 mois (recommandation CNIL),
 * ou quand CONSENT_VERSION change (nouvel outil, nouvelle finalité).
 */
export const CONSENT_KEY = 'labtools-consent'
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 182

const listeners = new Set<() => void>()
let state: ConsentState = { consent: load(), editing: false }

function load(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as Partial<Consent>
    if (typeof value.analytics !== 'boolean' || typeof value.date !== 'number') return null
    if (value.version !== CONSENT_VERSION || Date.now() - value.date > CONSENT_MAX_AGE) return null
    return { analytics: value.analytics, date: value.date, version: value.version }
  } catch {
    return null
  }
}

function emit(next: ConsentState) {
  state = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Synchronise les onglets ouverts en parallèle.
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY) refreshConsent()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function saveConsent(analytics: boolean) {
  const consent: Consent = { analytics, date: Date.now(), version: CONSENT_VERSION }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour la session.
  }
  emit({ consent, editing: false })
}

/** Rouvre le bandeau pour modifier un choix déjà fait. */
export function editConsent() {
  emit({ ...state, editing: true })
}

/** Relit le choix depuis le stockage. */
export function refreshConsent() {
  emit({ consent: load(), editing: false })
}

export function useConsent() {
  return useSyncExternalStore(subscribe, () => state)
}
