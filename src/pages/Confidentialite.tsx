import { site } from '@/config/site'
import { LegalLayout } from './LegalLayout'

/** TODO(légal) : stub à faire rédiger par un professionnel du droit. */
export function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      sections={[
        { title: 'Responsable du traitement', content: <p>{site.legal.companyName}, {site.legal.headOffice}</p> },
        {
          title: 'Données collectées',
          content: (
            <p>
              Via le formulaire « Lancer mon projet » : nom, email, profil, description du projet. [À COMPLÉTER]
            </p>
          ),
        },
        { title: 'Finalités et base légale', content: <p>[À COMPLÉTER]</p> },
        { title: 'Durée de conservation', content: <p>[À COMPLÉTER]</p> },
        { title: 'Destinataires et sous-traitants', content: <p>[À COMPLÉTER : hébergeur, outil de réception des formulaires…]</p> },
        {
          title: 'Services tiers',
          content: (
            <p>
              Les polices de caractères sont chargées depuis Google Fonts, ce qui transmet l’adresse IP du visiteur à
              Google. [À COMPLÉTER]
            </p>
          ),
        },
        {
          title: 'Vos droits',
          content: (
            <p>
              [À COMPLÉTER] Pour exercer vos droits :{' '}
              <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                {site.email}
              </a>
            </p>
          ),
        },
      ]}
    />
  )
}
