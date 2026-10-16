import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE,
  CONSENT_VERSION,
  editConsent,
  refreshConsent,
  saveConsent,
  useConsent,
} from '@/lib/consent'

function store(value: unknown) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(value))
  refreshConsent()
}

describe('consentement', () => {
  it('est absent au premier passage', () => {
    const { result } = renderHook(() => useConsent())
    expect(result.current).toEqual({ consent: null, editing: false })
  })

  it('enregistre le choix et notifie les composants', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_000)
    const { result } = renderHook(() => useConsent())

    act(() => saveConsent(true))

    expect(result.current.consent).toEqual({ analytics: true, date: 1_000, version: CONSENT_VERSION })
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? '')).toEqual(result.current.consent)
  })

  it('relit un choix valide', () => {
    store({ analytics: false, date: Date.now(), version: CONSENT_VERSION })
    const { result } = renderHook(() => useConsent())
    expect(result.current.consent?.analytics).toBe(false)
  })

  it('redemande le choix après 6 mois', () => {
    store({ analytics: true, date: Date.now() - CONSENT_MAX_AGE - 1, version: CONSENT_VERSION })
    const { result } = renderHook(() => useConsent())
    expect(result.current.consent).toBeNull()
  })

  it('redemande le choix quand la version change', () => {
    store({ analytics: true, date: Date.now(), version: CONSENT_VERSION - 1 })
    const { result } = renderHook(() => useConsent())
    expect(result.current.consent).toBeNull()
  })

  it.each(['pas du json', { analytics: 'oui', date: 1 }, null])('ignore une valeur corrompue (%s)', (value) => {
    localStorage.setItem(CONSENT_KEY, typeof value === 'string' ? value : JSON.stringify(value))
    refreshConsent()
    const { result } = renderHook(() => useConsent())
    expect(result.current.consent).toBeNull()
  })

  it('rouvre puis referme le bandeau', () => {
    const { result } = renderHook(() => useConsent())
    act(() => saveConsent(true))
    act(() => editConsent())
    expect(result.current.editing).toBe(true)
    act(() => saveConsent(false))
    expect(result.current).toMatchObject({ editing: false, consent: { analytics: false } })
  })
})
