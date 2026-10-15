import { useLayoutEffect, useRef } from 'react'
import { activities, cta } from '@/config/content'
import { site } from '@/config/site'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent('Demande de devis - Développement sur mesure')}`

/**
 * Desktop (≥ 1024px) : la section est épinglée et les cartes entrent une à une
 * de la droite vers la gauche au fil du scroll.
 * Mobile/tablette : cartes empilées avec une apparition simple.
 * prefers-reduced-motion : aucune animation, les cartes sont affichées telles quelles.
 */
export function Activities() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-activity-card]', section)
      const progress = section.querySelector('[data-activity-progress]')

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          // Si la section dépasse la hauteur d'écran, on l'épingle par le bas pour que les cartes restent entières.
          start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
          end: () => `+=${cards.length * window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card) => {
        tl.fromTo(
          card,
          // Décalage d'une largeur d'écran : chaque carte part hors champ à droite, quelle que soit sa colonne.
          { x: () => window.innerWidth, autoAlpha: 0, rotate: 2 },
          { x: 0, autoAlpha: 1, rotate: 0, duration: 1 },
        )
      })
      if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0)
      // Courte pause en fin de séquence avant de libérer la section.
      tl.to({}, { duration: 0.3 })
    })

    mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
      gsap.utils.toArray<HTMLElement>('[data-activity-card]', section).forEach((card) => {
        gsap.from(card, {
          y: 32,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="activites"
      aria-labelledby="activites-title"
      className="overflow-hidden py-20 sm:py-28 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pt-[calc(var(--spacing-nav)+1.5rem)] lg:pb-10"
    >
      <Container>
        <div className="flex items-end justify-between gap-8">
          <SectionHeading id="activites-title" index="01" eyebrow={activities.eyebrow} title={activities.title} intro={activities.intro} />
          <div aria-hidden="true" className="mb-2 hidden h-0.5 w-40 shrink-0 bg-line-soft lg:block">
            <div data-activity-progress className="h-full origin-left bg-coral" />
          </div>
        </div>

        <ul className="mt-14 grid gap-6 lg:mt-8 lg:grid-cols-3">
          {activities.items.map((item, index) => (
            <li
              key={item.title}
              data-activity-card
              className="group relative flex flex-col rounded-card border border-line-soft bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-sun">
                  <Icon name={item.icon} className="size-7" />
                </span>
                <span aria-hidden="true" className="font-mono text-sm text-slate">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-navy lg:mt-5 lg:text-xl">{item.title}</h3>
              <p className="mt-3 text-slate">{item.description}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-6 lg:mt-5 lg:space-y-2 lg:pt-5">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-navy">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-coral-ink" />
                    {point}
                  </li>
                ))}
              </ul>

              {item.withQuote && (
                <a
                  href={quoteHref}
                  className="mt-6 inline-flex min-h-11 lg:mt-4 items-center gap-2 self-start font-semibold text-coral-ink underline underline-offset-4 hover:text-navy"
                >
                  {cta.quote.label}
                  <Icon name="arrow-right" className="size-5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
