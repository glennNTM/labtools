import { CookieSettingsButton } from '@/components/layout/CookieBanner'
import { LegalLayout } from './LegalLayout'

/** TODO(légal) : stub à faire valider (transfert de données hors UE, sous-traitant Google). */
export function Cookies() {
  return (
    <LegalLayout
      title="Politique de cookies"
      sections={[
        {
          title: 'Cookies utilisés',
          content: (
            <>
              <p>Ce site ne dépose aucun cookie publicitaire.</p>
              <p>
                Avec votre accord uniquement, Google Analytics 4 (Google Ireland Ltd) dépose les cookies <code>_ga</code> et{' '}
                <code>_ga_*</code> pour mesurer l’audience du site : pages consultées, provenance des visites, envoi du
                formulaire. Durée de vie : 13 mois maximum. Les signaux publicitaires Google sont désactivés.
              </p>
              <p>Si vous refusez, ou retirez votre accord, aucun script Google n’est chargé et ces cookies sont supprimés.</p>
            </>
          ),
        },
        {
          title: 'Gestion de vos préférences',
          content: (
            <>
              <p>
                Votre choix est conservé 6 mois, puis vous est de nouveau demandé. Vous pouvez le modifier à tout moment.
              </p>
              <CookieSettingsButton className="mt-4 inline-flex min-h-11 items-center rounded-btn border-2 border-navy px-5 font-semibold text-navy transition-colors hover:bg-navy hover:text-cream" />
            </>
          ),
        },
      ]}
    />
  )
}
