import { form } from '@/config/content'
import type { ProjectFormErrors, ProjectSubmission } from '@/types/form'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PROJECT_MIN_LENGTH = 20
export const PROJECT_MAX_LENGTH = 500

/** Valide le formulaire « Lancer mon projet » : une entrée par champ en erreur. */
export function validateProject(data: ProjectSubmission, consent: boolean): ProjectFormErrors {
  const errors: ProjectFormErrors = {}
  if (!data.name.trim()) errors.name = form.fields.name.error
  if (!EMAIL.test(data.email.trim())) errors.email = form.fields.email.error
  if (!data.profile) errors.profile = form.fields.profile.error
  if (data.project.trim().length < PROJECT_MIN_LENGTH) errors.project = form.fields.project.error
  if (!consent) errors.consent = form.fields.consent.error
  return errors
}
