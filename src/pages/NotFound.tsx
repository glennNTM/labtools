import { usePageMeta } from '@/hooks/usePageMeta'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function NotFound() {
  usePageMeta('Page introuvable | LabTools', true)
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-mono text-sm text-coral-ink">Erreur 404</p>
      <h1 className="mt-4 text-title font-semibold text-navy">Cette page n’existe pas.</h1>
      <p className="mt-4 text-slate">Le lien est peut-être erroné, ou la page a été déplacée.</p>
      <Button href="/" className="mt-10">
        Retour à l’accueil
      </Button>
    </Container>
  )
}
