import { finalCta } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { HexPattern } from '@/components/ui/HexPattern'
import { Icon } from '@/components/ui/Icon'
import { ProjectForm } from './ProjectForm'

export function FinalCta() {
  return (
    <section id="lancer" aria-labelledby="lancer-title" className="on-dark relative overflow-hidden bg-navy py-20 sm:py-28">
      <HexPattern className="text-white/4" />
      <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="lg:sticky lg:top-28" data-reveal>
          <p className="flex items-center gap-3 font-mono text-sm tracking-wide text-coral uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-coral" />
            {finalCta.eyebrow}
          </p>
          <h2 id="lancer-title" className="mt-4 text-title font-semibold text-balance text-cream">
            {finalCta.title}
          </h2>
          <p className="mt-6 text-lg text-mist">{finalCta.description}</p>
          <p className="mt-8 inline-flex items-center gap-3 font-medium text-cream">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-sun text-navy">
              <Icon name="check" className="size-4" />
            </span>
            {finalCta.objection}
          </p>
        </div>

        {/* Le formulaire est sur carte blanche : son focus revient au bleu nuit */}
        <div className="[--focus-color:var(--color-navy)]" data-reveal>
          <ProjectForm />
        </div>
      </Container>
    </section>
  )
}
