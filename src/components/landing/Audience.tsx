import { audience } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { HexPattern } from '@/components/ui/HexPattern'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Audience() {
  return (
    <section id="pour-qui" aria-labelledby="pour-qui-title" className="on-dark relative overflow-hidden bg-navy py-20 sm:py-28">
      <HexPattern className="text-white/4" />
      <Container className="relative">
        <SectionHeading id="pour-qui-title" index="02" eyebrow={audience.eyebrow} title={audience.title} intro={audience.intro} dark />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {audience.items.map((item) => (
            <li key={item.title} className="bg-navy p-8 transition-colors duration-300 hover:bg-navy-800">
              <Icon name={item.icon} className="size-8 text-sun" />
              <h3 className="mt-6 text-xl font-semibold text-cream">{item.title}</h3>
              <p className="mt-2 text-mist">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
