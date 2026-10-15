import { useLayoutEffect, useRef } from 'react'
import { cta, hero } from '@/config/content'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HexPattern } from '@/components/ui/HexPattern'
import { Icon } from '@/components/ui/Icon'
import { IsoCubes } from './IsoCubes'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from(root.querySelectorAll('[data-hero]'), {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      <HexPattern className="text-navy/5 mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <Container className="relative grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <p data-hero className="inline-flex max-w-full items-center gap-2 rounded-full border border-line-soft bg-white/70 px-3 py-1.5 font-mono text-[0.6875rem] text-coral-ink uppercase sm:text-sm sm:tracking-wide">
            <span aria-hidden="true" className="size-2 rounded-full bg-coral" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" data-hero className="mt-6 text-display font-semibold text-balance text-navy">
            {hero.title}
          </h1>

          <p data-hero className="mt-6 max-w-xl text-lg text-pretty text-slate sm:text-xl">
            {hero.subtitle}
          </p>

          <ul data-hero className="mt-8 space-y-3">
            {hero.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-navy">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sun">
                  <Icon name="check" className="size-4" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div data-hero className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={cta.primary.href} withArrow>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="secondary">
              {cta.secondary.label}
            </Button>
          </div>

          {/* TODO(chiffres) : preuve sociale à remplacer par un chiffre réel */}
          <div data-hero className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2" aria-hidden="true">
              {['bg-navy', 'bg-coral', 'bg-sun', 'bg-navy-700'].map((bg) => (
                <span key={bg} className={`size-9 rounded-full border-2 border-cream ${bg}`} />
              ))}
            </div>
            <p className="font-mono text-sm text-slate">{hero.proof}</p>
          </div>
        </div>

        {/* Illustration réservée aux grands écrans */}
        <div className="relative hidden lg:block">
          <IsoCubes className="h-auto w-full" />
        </div>
      </Container>
    </section>
  )
}
