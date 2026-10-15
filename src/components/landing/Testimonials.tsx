import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { testimonials } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

const navButtonClass =
  'inline-flex size-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-cream disabled:cursor-not-allowed disabled:border-line-soft disabled:text-slate disabled:hover:bg-transparent'

/**
 * Carrousel de témoignages : défilement natif avec accroche (swipe tactile), boutons,
 * points et flèches du clavier. Pas de défilement automatique (WCAG 2.2.2).
 * TODO(témoignage) : remplacer les placeholders par de vrais témoignages (src/config/content.ts).
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const { items } = testimonials
  const count = items.length

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  function goTo(target: number) {
    const track = trackRef.current
    if (!track) return
    const next = Math.max(0, Math.min(count - 1, target))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
    setIndex(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  return (
    <section aria-labelledby="temoignages-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="temoignages-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
          <div className="flex gap-3" data-reveal>
            <button type="button" className={navButtonClass} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={testimonials.previous}>
              <Icon name="arrow-left" className="size-5" />
            </button>
            <button type="button" className={navButtonClass} onClick={() => goTo(index + 1)} disabled={index === count - 1} aria-label={testimonials.next}>
              <Icon name="arrow-right" className="size-5" />
            </button>
          </div>
        </div>

        <div aria-roledescription="carrousel" aria-labelledby="temoignages-title" className="mt-10" data-reveal>
          <ul
            ref={trackRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label={`${testimonials.eyebrow} : utilisez les flèches gauche et droite pour naviguer`}
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, i) => (
              <li
                key={item.quote}
                aria-roledescription="témoignage"
                aria-label={`${i + 1} ${testimonials.of} ${count}`}
                aria-hidden={i !== index}
                className="w-full shrink-0 snap-center"
              >
                <figure className="flex h-full flex-col rounded-card border border-line-soft bg-sand p-8 sm:p-12">
                  <Icon name="quote" className="size-10 text-coral-ink" />
                  <blockquote className="mt-6 max-w-3xl text-xl font-medium text-pretty text-navy sm:text-2xl">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-8">
                    {/* Photo à fournir : 48×48, alt = nom de la personne */}
                    <span aria-hidden="true" className="size-12 shrink-0 rounded-full border-2 border-dashed border-slate/40 bg-cream" />
                    <span>
                      <span className="block font-semibold text-navy">{item.name}</span>
                      <span className="block text-sm text-slate">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-1">
            {items.map((item, i) => (
              <button
                key={item.quote}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${testimonials.goTo} ${i + 1} ${testimonials.of} ${count}`}
                aria-current={i === index ? 'true' : undefined}
                className="group inline-flex size-6 items-center justify-center"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-navy' : 'w-2 bg-line group-hover:bg-slate'}`}
                />
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {`${testimonials.eyebrow} ${index + 1} ${testimonials.of} ${count}`}
          </p>
        </div>
      </Container>
    </section>
  )
}
