import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'
import { testimonials } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

const navButtonClass =
  'inline-flex size-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-cream disabled:cursor-not-allowed disabled:border-line-soft disabled:text-slate disabled:hover:bg-transparent'

/** Durée d'affichage d'un témoignage en lecture automatique. */
const AUTOPLAY_DELAY = 6000

/**
 * Carrousel de témoignages : défilement natif avec accroche (swipe tactile), boutons,
 * points et flèches du clavier.
 * Lecture automatique conforme WCAG 2.2.2 : bouton pause, pause au survol et au focus,
 * arrêt dès que l'utilisateur navigue lui-même, désactivée avec prefers-reduced-motion.
 * TODO(témoignage) : remplacer les placeholders par de vrais témoignages (src/config/content.ts).
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const { items } = testimonials
  const count = items.length
  const rotating = playing && !hovered && !focused && count > 1

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

  // Lecture automatique : le minuteur repart à chaque changement de témoignage.
  useEffect(() => {
    if (!rotating) return
    const timer = window.setTimeout(() => goTo((index + 1) % count), AUTOPLAY_DELAY)
    return () => window.clearTimeout(timer)
  })

  /** Navigation explicite de l'utilisateur : la lecture automatique s'arrête. */
  function show(target: number) {
    setPlaying(false)
    goTo(target)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      show(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      show(index - 1)
    }
  }

  /** « Lecture » relance la rotation même si le focus reste sur le bouton (pattern carrousel WAI-ARIA). */
  function togglePlaying() {
    setPlaying((value) => !value)
    setFocused(false)
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
  }

  return (
    <section aria-labelledby="temoignages-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="temoignages-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
          <div className="flex gap-3" data-reveal>
            <button type="button" className={navButtonClass} onClick={() => show(index - 1)} disabled={index === 0} aria-label={testimonials.previous}>
              <Icon name="arrow-left" className="size-5" />
            </button>
            <button type="button" className={navButtonClass} onClick={() => show(index + 1)} disabled={index === count - 1} aria-label={testimonials.next}>
              <Icon name="arrow-right" className="size-5" />
            </button>
          </div>
        </div>

        {/* Survol et focus ne déclenchent rien : ils suspendent la lecture automatique (WCAG 2.2.2). */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          role="region"
          aria-roledescription="carrousel"
          aria-label={testimonials.eyebrow}
          className="mt-10"
          data-reveal
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        >
          {/* Zone défilante : doit être atteignable et pilotable au clavier (WCAG 2.1.1). */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <ul
            ref={trackRef}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={() => setPlaying(false)}
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
            {count > 1 && (
              <button
                type="button"
                onClick={togglePlaying}
                aria-label={playing ? testimonials.pause : testimonials.play}
                className="mr-3 inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-sand"
              >
                <Icon name={playing ? 'pause' : 'play'} className="size-5" />
              </button>
            )}
            {items.map((item, i) => (
              <button
                key={item.quote}
                type="button"
                onClick={() => show(i)}
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

          <p className="sr-only" aria-live={rotating ? 'off' : 'polite'}>
            {`${testimonials.eyebrow} ${index + 1} ${testimonials.of} ${count}`}
          </p>
        </div>
      </Container>
    </section>
  )
}
