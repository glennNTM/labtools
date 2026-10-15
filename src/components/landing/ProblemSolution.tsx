import { problemSolution } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ProblemSolution() {
  const { items, problemLabel, solutionLabel } = problemSolution
  return (
    <section aria-labelledby="constat-title" className="bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading id="constat-title" index="00" eyebrow={problemSolution.eyebrow} title={problemSolution.title} intro={problemSolution.intro} />

        <div className="mt-14 hidden grid-cols-2 gap-6 px-6 font-mono text-sm tracking-wide uppercase md:grid" aria-hidden="true">
          <p className="text-slate">{problemLabel}</p>
          <p className="text-coral-ink">{solutionLabel}</p>
        </div>

        <ul className="mt-6 space-y-4 md:mt-4" data-reveal-stagger>
          {items.map((item) => (
            <li key={item.problem} className="grid overflow-hidden rounded-card bg-white shadow-card md:grid-cols-2">
              <div className="flex gap-4 p-6">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-slate">
                  <Icon name="close" className="size-4" />
                </span>
                <p className="text-slate">
                  <span className="sr-only">{problemLabel} : </span>
                  {item.problem}
                </p>
              </div>
              <div className="flex gap-4 border-t border-line-soft bg-cream p-6 md:border-t-0 md:border-l">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-coral text-navy">
                  <Icon name="check" className="size-4" />
                </span>
                <p className="font-medium text-navy">
                  <span className="sr-only">{solutionLabel} : </span>
                  {item.solution}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
