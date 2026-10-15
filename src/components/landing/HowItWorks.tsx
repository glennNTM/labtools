import { howItWorks } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function HowItWorks() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="methode-title" index="03" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal-stagger>
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-navy bg-cream font-mono text-lg font-semibold text-navy">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {index < howItWorks.steps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 border-t-2 border-dashed border-line md:block" />
                )}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-slate">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
