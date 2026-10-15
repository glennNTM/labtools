import { LegalLayout } from './LegalLayout'

/** TODO(légal) : stub. À mettre à jour si des outils de mesure d'audience ou des traceurs sont ajoutés. */
export function Cookies() {
  return (
    <LegalLayout
      title="Politique de cookies"
      sections={[
        {
          title: 'Cookies utilisés',
          content: <p>À la date de publication, ce site ne dépose aucun cookie de mesure d’audience ni de publicité. [À CONFIRMER]</p>,
        },
        { title: 'Gestion de vos préférences', content: <p>[À COMPLÉTER]</p> },
      ]}
    />
  )
}
