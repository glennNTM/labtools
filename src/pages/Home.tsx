import { useReveal } from '@/hooks/useReveal'
import { Activities } from '@/components/landing/Activities'
import { Audience } from '@/components/landing/Audience'
import { Faq } from '@/components/landing/Faq'
import { FinalCta } from '@/components/landing/FinalCta'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { KeyFigures } from '@/components/landing/KeyFigures'
import { MidCta } from '@/components/landing/MidCta'
import { ProblemSolution } from '@/components/landing/ProblemSolution'
import { Testimonials } from '@/components/landing/Testimonials'

export function Home() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <Hero />
      <ProblemSolution />
      <Activities />
      <Audience />
      <HowItWorks />
      <Testimonials />
      <MidCta />
      <KeyFigures />
      <Faq />
      <FinalCta />
      {/* Emplacement analytics : ajouter <Analytics /> ici, chargé uniquement après consentement si nécessaire. */}
    </div>
  )
}
