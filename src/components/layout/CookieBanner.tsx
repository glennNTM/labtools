import { useEffect, useRef } from 'react'
import { cookieBanner } from '@/config/content'
import { editConsent, saveConsent, useConsent } from '@/lib/consent'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'

const buttonClass =
  'inline-flex min-h-11 flex-1 items-center justify-center rounded-btn border-2 border-navy px-5 font-semibold transition-colors sm:flex-none'

/**
 * Bandeau de consentement, non bloquant.
 * « Refuser » et « Accepter » ont le même poids visuel (exigence CNIL).
 */
export function CookieBanner() {
  const { consent, editing } = useConsent()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const visible = editing || consent === null

  // Rouvert depuis « Gérer les cookies » : on y place le focus, puis on le rend au bouton d'origine.
  useEffect(() => {
    if (!editing) return
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    titleRef.current?.focus()
  }, [editing])

  function choose(analytics: boolean) {
    saveConsent(analytics)
    returnFocusRef.current?.focus()
    returnFocusRef.current = null
  }

  if (!visible) return null

  return (
    <section aria-labelledby="cookies-title" className="pointer-events-none fixed inset-x-0 bottom-0 z-60 p-3 sm:p-6">
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-card border border-line-soft bg-white p-5 shadow-lift sm:flex sm:items-center sm:gap-8 sm:p-6">
        <div className="flex-1">
          <h2 ref={titleRef} id="cookies-title" tabIndex={-1} className="flex items-center gap-2 font-semibold text-navy">
            <Icon name="cookie" className="size-5 text-coral-ink" />
            {cookieBanner.title}
          </h2>
          <p className="mt-2 text-sm text-slate">
            {cookieBanner.text}{' '}
            <Link href="/cookies" className="font-medium text-navy underline underline-offset-2">
              {cookieBanner.learnMore}
            </Link>
          </p>
          {consent && (
            <p className="mt-2 text-sm font-medium text-navy">
              {consent.analytics ? cookieBanner.current.accepted : cookieBanner.current.refused}
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-3 sm:mt-0 sm:shrink-0">
          <button type="button" onClick={() => choose(false)} className={`${buttonClass} text-navy hover:bg-sand`}>
            {cookieBanner.refuse}
          </button>
          <button type="button" onClick={() => choose(true)} className={`${buttonClass} text-navy hover:bg-sand`}>
            {cookieBanner.accept}
          </button>
        </div>
      </div>
    </section>
  )
}

/** Rouvre le bandeau (pied de page, page Cookies). */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={editConsent} className={className}>
      {cookieBanner.manage}
    </button>
  )
}
