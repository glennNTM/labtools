import { faq } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id="faq-title" index="05" eyebrow={faq.eyebrow} title={faq.title} />

        <div className="divide-y divide-line-soft border-y border-line-soft" data-reveal-stagger>
          {faq.items.map((item) => (
            <details key={item.question} className="group py-2">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-lg font-medium text-navy [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-transform duration-200 group-open:rotate-45">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="pb-4 pr-12 text-slate">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
