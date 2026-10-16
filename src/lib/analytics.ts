/**
 * Google Analytics 4 (gtag.js), chargé uniquement après consentement (voir components/layout/Analytics.tsx).
 * L'ID de mesure vient de VITE_GA_MEASUREMENT_ID : sans ID, rien n'est chargé (développement, tests).
 */
type Gtag = (...args: unknown[]) => void

declare global {
  // Fusion de déclarations avec le type global Window : une interface est nécessaire.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? ''

/** Durée de vie maximale des cookies de mesure d'audience recommandée par la CNIL : 13 mois. */
const COOKIE_EXPIRES = 60 * 60 * 24 * 395

function gtag(...args: unknown[]) {
  window.gtag?.(...args)
}

export function loadGoogleAnalytics(id: string) {
  if (!id) return
  Reflect.set(window, `ga-disable-${id}`, false)

  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? []
    const dataLayer = window.dataLayer
    // gtag.js attend l'objet `arguments`, pas un tableau.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments)
    }
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    gtag('js', new Date())
    // Les pages vues sont envoyées à la main : le site navigue côté client.
    gtag('config', id, { send_page_view: false, cookie_expires: COOKIE_EXPIRES, allow_google_signals: false })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
  } else {
    gtag('consent', 'update', { analytics_storage: 'granted' })
  }
}

/** Retrait du consentement : coupe la collecte et supprime les cookies _ga déjà déposés. */
export function disableGoogleAnalytics(id: string) {
  if (!id) return
  Reflect.set(window, `ga-disable-${id}`, true)
  gtag('consent', 'update', { analytics_storage: 'denied' })

  const domains = ['', window.location.hostname, `.${window.location.hostname.replace(/^www\./, '')}`]
  document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim() ?? '')
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
      })
    })
}

export function trackPageView(path: string, title: string) {
  gtag('event', 'page_view', { page_path: path, page_title: title, page_location: window.location.href })
}

/** Événement personnalisé ; sans effet si Google Analytics n'est pas chargé. */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  gtag('event', name, params)
}
