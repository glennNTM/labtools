import type { ProjectSubmission } from '@/types/form'
import type { Social } from '@/types/ui'

/**
 * Informations de l'entreprise.
 * TODO(coordonnées) : toutes les valeurs entre crochets sont des
 * placeholders. Les remplacer par les vraies informations avant mise en ligne.
 */
export const site = {
  name: 'LabTools',
  url: 'https://www.labtools.tech',
  email: 'contact@labtools.tech',
  phone: '[+000 00 00 00 00]',
  address: '[Adresse, Ville, Pays]',
  legal: {
    companyName: '[Raison sociale]',
    legalForm: '[Forme juridique]',
    registration: '[N° RCCM ou équivalent]',
    capital: '[Capital social]',
    headOffice: '[Adresse du siège social]',
    publicationDirector: '[Nom du directeur de la publication]',
    host: '[Hébergeur : nom, adresse, contact]',
  },
  /** Seuls les réseaux avec une URL renseignée sont affichés. */
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: '' },
    { label: 'Facebook', icon: 'facebook', href: '' },
    { label: 'Instagram', icon: 'instagram', href: '' },
    { label: 'X', icon: 'x', href: '' },
  ] as Social[],
} as const

/**
 * Envoi du formulaire « Lancer mon projet ».
 * TODO(backend) : brancher ici l'envoi réel (API, Odoo CRM, service de formulaires…).
 * Tant que ce n'est pas fait, l'envoi échoue explicitement et le formulaire
 * affiche une erreur avec l'email de contact : jamais de faux succès.
 *
 * Exemple :
 *   const res = await fetch('/api/projects', { method: 'POST', body: JSON.stringify(data) })
 *   if (!res.ok) throw new Error('SUBMIT_FAILED')
 */
export function submitProject(_data: ProjectSubmission): Promise<void> {
  return Promise.reject(new Error('NOT_CONFIGURED'))
}
