/** Données envoyées par le formulaire « Lancer mon projet ». */
export type ProjectSubmission = {
  name: string
  email: string
  profile: string
  project: string
}

export type ProjectFormField = keyof ProjectSubmission | 'consent'

export type ProjectFormErrors = Partial<Record<ProjectFormField, string>>

export type ProjectFormStatus = 'idle' | 'submitting' | 'success' | 'error'
