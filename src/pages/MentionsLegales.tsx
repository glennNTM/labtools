import { site } from '@/config/site'
import { LegalLayout } from './LegalLayout'

/** TODO(légal) : stub. Les informations viennent de src/config/site.ts. */
export function MentionsLegales() {
  const { legal } = site
  return (
    <LegalLayout
      title="Mentions légales"
      sections={[
        {
          title: 'Éditeur du site',
          content: (
            <>
              <p>
                {legal.companyName}, {legal.legalForm} au capital de {legal.capital}
              </p>
              <p>Siège social : {legal.headOffice}</p>
              <p>Immatriculation : {legal.registration}</p>
              <p>
                Contact : <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>, {site.phone}
              </p>
            </>
          ),
        },
        { title: 'Directeur de la publication', content: <p>{legal.publicationDirector}</p> },
        { title: 'Hébergement', content: <p>{legal.host}</p> },
        { title: 'Propriété intellectuelle', content: <p>[À COMPLÉTER]</p> },
        { title: 'Responsabilité', content: <p>[À COMPLÉTER]</p> },
      ]}
    />
  )
}
