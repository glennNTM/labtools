import { footer } from '@/config/content'
import { site } from '@/config/site'
import { CookieSettingsButton } from '@/components/layout/CookieBanner'
import { BackToTop } from '@/components/ui/BackToTop'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { Logo } from '@/components/ui/Logo'

const linkClass = 'text-slate underline-offset-4 transition-colors hover:text-navy hover:underline'
const titleClass = 'font-mono text-sm tracking-wide text-coral-ink uppercase'
const year = new Date().getFullYear()

export function Footer() {
  const socials = site.socials.filter((social) => social.href)

  return (
    <footer className="border-t border-line-soft bg-sand">
      <Container className="grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <Link href="/" aria-label="LabTools, accueil" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm text-pretty text-slate">{footer.tagline}</p>
          {socials.length > 0 && (
            <ul aria-label={footer.socialTitle} className="mt-6 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (nouvel onglet)`}
                    className="inline-flex size-11 items-center justify-center rounded-btn border border-line-soft bg-cream text-navy transition-colors hover:border-navy"
                  >
                    <Icon name={social.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-labelledby="footer-explore" className="lg:col-span-3">
          <h2 id="footer-explore" className={titleClass}>
            {footer.exploreTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {footer.explore.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className={titleClass}>{footer.contactTitle}</h2>
          {/* TODO(coordonnées) : valeurs à renseigner dans src/config/site.ts */}
          <address className="mt-5 space-y-3 not-italic">
            <p className="flex gap-3 text-slate">
              <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-navy" />
              {site.address}
            </p>
            <p className="flex gap-3">
              <Icon name="mail" className="mt-0.5 size-5 shrink-0 text-navy" />
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-navy" />
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className={linkClass}>
                {site.phone}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-line-soft">
        <Container className="flex flex-col gap-4 py-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="text-slate">
            © {year} {site.name}. {footer.rights}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <nav aria-label={footer.legalTitle}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {footer.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsButton className={`${linkClass} cursor-pointer`} />
                </li>
              </ul>
            </nav>
            <BackToTop label={footer.backToTop} />
          </div>
        </Container>
      </div>
    </footer>
  )
}
