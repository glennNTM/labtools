import { cta, midCta } from '@/config/content'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HexPattern } from '@/components/ui/HexPattern'

export function MidCta() {
  return (
    <section aria-labelledby="mid-cta-title" className="relative overflow-hidden bg-coral">
      <HexPattern className="text-navy/8" />
      <Container className="relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between" >
        <div data-reveal>
          <h2 id="mid-cta-title" className="max-w-xl text-3xl font-semibold text-balance text-navy sm:text-4xl">
            {midCta.title}
          </h2>
          <p className="mt-3 font-mono text-sm text-navy">{midCta.objection}</p>
        </div>
        <Button href={cta.primary.href} variant="dark" withArrow className="shrink-0" data-reveal>
          {cta.primary.label}
        </Button>
      </Container>
    </section>
  )
}
