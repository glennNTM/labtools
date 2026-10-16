import { useEffect } from 'react'
import { disableGoogleAnalytics, GA_MEASUREMENT_ID, loadGoogleAnalytics, trackPageView } from '@/lib/analytics'
import { usePathname } from '@/lib/router'

/**
 * Mesure d'audience (Google Analytics 4).
 * Monté uniquement après consentement (voir App.tsx) : aucun script n'est chargé ailleurs.
 * Démonté au retrait du consentement : la collecte est coupée et les cookies supprimés.
 * Changer d'outil ou de finalité : mettre à jour la page Cookies et CONSENT_VERSION.
 */
export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    loadGoogleAnalytics(GA_MEASUREMENT_ID)
    return () => disableGoogleAnalytics(GA_MEASUREMENT_ID)
  }, [])

  // Monté après la page : son titre (usePageMeta) est déjà en place.
  useEffect(() => {
    trackPageView(pathname, document.title)
  }, [pathname])

  return null
}
