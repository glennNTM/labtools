import { keyFigures } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** TODO(chiffres) : valeurs [X] à remplacer par des données réelles (src/config/content.ts). */
export function KeyFigures() {
  return (
    <section aria-labelledby="chiffres-title" className="on-dark bg-navy py-20 sm:py-24">
      <Container>
        <SectionHeading id="chiffres-title" index="04" eyebrow={keyFigures.eyebrow} title={keyFigures.title} dark />
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" data-reveal-stagger>
          {keyFigures.items.map((item) => (
            <div key={item.label} className="flex flex-col-reverse border-l-2 border-sun pl-5">
              <dt className="mt-2 text-mist">{item.label}</dt>
              <dd className="font-mono text-4xl font-semibold text-sun sm:text-5xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
