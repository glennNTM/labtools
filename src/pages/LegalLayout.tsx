import { useEffect, useRef } from 'react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container } from '@/components/ui/Container'
import { Link } from '@/components/ui/Link'
import type { LegalLayoutProps } from '@/types/legal'

/**
 * Gabarit des pages légales provisoires.
 * Ces pages sont en noindex tant que leur contenu n'a pas été rédigé par un professionnel du droit.
 */
export function LegalLayout({ title, updatedAt = '[À COMPLÉTER]', sections }: LegalLayoutProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  usePageMeta(`${title} | LabTools`, true)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <Link href="/" className="font-mono text-sm text-slate underline underline-offset-4 hover:text-navy">
        Retour à l’accueil
      </Link>

      <h1 ref={headingRef} tabIndex={-1} className="mt-6 text-title font-semibold text-navy">
        {title}
      </h1>

      <div role="note" className="mt-8 rounded-btn border-2 border-coral-ink bg-white p-5 text-navy">
        <p className="font-semibold">Page provisoire</p>
        <p className="mt-1 text-slate">
          Contenu à faire rédiger par un professionnel du droit. Ce gabarit n’a aucune valeur juridique.
        </p>
      </div>

      <p className="mt-8 font-mono text-sm text-slate">Dernière mise à jour : {updatedAt}</p>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold text-navy">{section.title}</h2>
            <div className="mt-3 space-y-2 text-slate">{section.content}</div>
          </section>
        ))}
      </div>
    </Container>
  )
}
