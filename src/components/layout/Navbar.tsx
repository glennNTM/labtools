import { useEffect, useState } from 'react'
import { cta, nav } from '@/config/content'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { Logo } from '@/components/ui/Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-line-soft bg-cream/95 backdrop-blur' : 'border-transparent bg-cream'
      }`}
    >
      <Container className="flex h-nav items-center justify-between gap-6">
        <Link href="/" aria-label="LabTools, accueil" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="py-2 font-medium text-slate transition-colors hover:text-navy">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
          </div>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-btn text-navy hover:bg-sand md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} className="size-6" />
          </button>
        </div>
      </Container>

      <div id="menu-mobile" hidden={!open} className="border-t border-line-soft bg-cream md:hidden">
        <Container className="py-4">
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={close} className="block py-3 text-lg font-medium text-navy">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={cta.primary.href} onClick={close} className="mt-4 w-full">
            {cta.primary.label}
          </Button>
        </Container>
      </div>
    </header>
  )
}
