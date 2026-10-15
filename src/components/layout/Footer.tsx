import { footer } from '@/config/content'
import { site } from '@/config/site'
import { BackToTop } from '@/components/ui/BackToTop'
import { Container } from '@/components/ui/Container'
import { Link } from '@/components/ui/Link'
import { Logo } from '@/components/ui/Logo'

const linkClass = 'text-slate underline-offset-4 transition-colors hover:text-navy hover:underline'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = site.socials.filter((social) => social.href)

  return (
    <footer className="border-t border-line-soft bg-sand text-sm">
      <Container className="flex items-center justify-between gap-4 py-6">
        <Link href="/" aria-label="LabTools, accueil">
          <Logo />
        </Link>
        <BackToTop label={footer.backToTop} />
      </Container>

      <div className="border-t border-line-soft">
        <Container className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
          {/* TODO(coordonnées) : valeurs à renseigner dans src/config/site.ts */}
          <address className="flex flex-wrap gap-x-5 gap-y-1.5 not-italic">
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
            <span className="text-slate">{site.phone}</span>
            <span className="text-slate">{site.address}</span>
            {socials.map((social) => (
              <a key={social.label} href={social.href} className={linkClass} rel="noopener noreferrer" target="_blank">
                {social.label}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            ))}
          </address>

          <nav aria-label={footer.legalTitle}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              <li className="text-slate">
                © {year} {site.name}
              </li>
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  )
}
