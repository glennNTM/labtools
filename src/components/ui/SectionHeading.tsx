import type { SectionHeadingProps } from '@/types/ui'

/** En-tête de section : étiquette monospace, titre H2 (référencé par aria-labelledby) et intro. */
export function SectionHeading({ id, eyebrow, title, intro, index, dark = false, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`} data-reveal>
      <p
        className={`flex items-center gap-3 font-mono text-sm tracking-wide uppercase ${centered ? 'justify-center' : ''} ${dark ? 'text-coral' : 'text-coral-ink'}`}
      >
        {index && <span aria-hidden="true">{index}</span>}
        <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-coral' : 'bg-coral-ink'}`} />
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-4 text-title font-semibold text-balance ${dark ? 'text-cream' : 'text-navy'}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg text-pretty ${dark ? 'text-mist' : 'text-slate'}`}>{intro}</p>}
    </div>
  )
}
