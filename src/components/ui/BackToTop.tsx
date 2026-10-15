import { Icon } from './Icon'

/** Remonte en haut de page et replace le focus sur le logo de la navbar (navigation clavier). */
export function BackToTop({ label }: { label: string }) {
  function handleClick() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-btn border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
    >
      {label}
      <Icon name="arrow-up" className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5" />
    </button>
  )
}
