import { afterEach, describe, expect, it } from 'vitest'
import { disableGoogleAnalytics, loadGoogleAnalytics, trackEvent } from '@/lib/analytics'

const ID = 'G-TEST000000'
const gaScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')
const calls = () => (window.dataLayer ?? []).map((args) => Array.from(args as ArrayLike<unknown>))

afterEach(() => {
  gaScripts().forEach((script) => script.remove())
  delete window.gtag
  delete window.dataLayer
})

describe('Google Analytics', () => {
  it('ne charge rien sans ID de mesure', () => {
    loadGoogleAnalytics('')
    expect(gaScripts()).toHaveLength(0)
    expect(window.gtag).toBeUndefined()
  })

  it('charge gtag.js une seule fois, sans signaux publicitaires', () => {
    loadGoogleAnalytics(ID)
    loadGoogleAnalytics(ID)

    expect(gaScripts()).toHaveLength(1)
    expect(gaScripts()[0].getAttribute('src')).toContain(`id=${ID}`)
    expect(calls()[0]).toEqual([
      'consent',
      'default',
      { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ])
    expect(calls()).toContainEqual([
      'config',
      ID,
      expect.objectContaining({ send_page_view: false, allow_google_signals: false }),
    ])
  })

  it('coupe la collecte et supprime les cookies au retrait du consentement', () => {
    loadGoogleAnalytics(ID)
    document.cookie = '_ga=GA1.1.123; path=/'
    document.cookie = '_ga_TEST000000=GS1.1.456; path=/'
    document.cookie = 'autre=garde; path=/'

    disableGoogleAnalytics(ID)

    expect(Reflect.get(window, `ga-disable-${ID}`)).toBe(true)
    expect(calls().at(-1)).toEqual(['consent', 'update', { analytics_storage: 'denied' }])
    expect(document.cookie).toBe('autre=garde')
  })

  it('réactive la collecte si le consentement est redonné', () => {
    loadGoogleAnalytics(ID)
    disableGoogleAnalytics(ID)
    loadGoogleAnalytics(ID)

    expect(Reflect.get(window, `ga-disable-${ID}`)).toBe(false)
    expect(calls().at(-1)).toEqual(['consent', 'update', { analytics_storage: 'granted' }])
  })

  it('ignore les événements tant que Google Analytics n’est pas chargé', () => {
    expect(() => trackEvent('generate_lead')).not.toThrow()
    expect(window.dataLayer).toBeUndefined()
  })
})
