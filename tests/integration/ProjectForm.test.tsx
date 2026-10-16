import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { form } from '@/config/content'
import { site, submitProject } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import { ProjectForm } from '@/components/landing/ProjectForm'
import type * as SiteModule from '@/config/site'

vi.mock('@/config/site', async (importOriginal) => ({
  ...(await importOriginal<typeof SiteModule>()),
  submitProject: vi.fn(),
}))
vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const submit = vi.mocked(submitProject)

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(form.fields.name.label), 'Awa Diallo')
  await user.type(screen.getByLabelText(form.fields.email.label), 'awa@exemple.com')
  await user.selectOptions(screen.getByLabelText(form.fields.profile.label), form.fields.profile.options[0] ?? '')
  await user.type(screen.getByLabelText(form.fields.project.label), 'Une plateforme de soutien scolaire en ligne.')
  await user.click(screen.getByLabelText(form.fields.consent.label))
}

describe('ProjectForm', () => {
  beforeEach(() => {
    submit.mockReset()
  })

  it('signale les erreurs et place le focus sur le premier champ invalide', async () => {
    const user = userEvent.setup()
    render(<ProjectForm />)

    await user.click(screen.getByRole('button', { name: form.submit }))

    expect(screen.getByText(form.errorSummary)).toBeInTheDocument()
    const name = screen.getByLabelText(form.fields.name.label)
    expect(name).toHaveFocus()
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription(form.fields.name.error)
    expect(screen.getByLabelText(form.fields.project.label)).toHaveAccessibleDescription(
      `${form.fields.project.hint} ${form.fields.project.error}`,
    )
    expect(submit).not.toHaveBeenCalled()
  })

  it('place le focus sur le champ suivant en erreur une fois le premier corrigé', async () => {
    const user = userEvent.setup()
    render(<ProjectForm />)

    await user.type(screen.getByLabelText(form.fields.name.label), 'Awa')
    await user.click(screen.getByRole('button', { name: form.submit }))

    expect(screen.getByLabelText(form.fields.email.label)).toHaveFocus()
    expect(screen.getByLabelText(form.fields.name.label)).not.toHaveAttribute('aria-invalid')
  })

  it('envoie le projet, confirme et mesure la conversion', async () => {
    submit.mockResolvedValue()
    const user = userEvent.setup()
    render(<ProjectForm />)

    await fillValid(user)
    await user.click(screen.getByRole('button', { name: form.submit }))

    expect(await screen.findByRole('status')).toHaveTextContent(form.success)
    expect(submit).toHaveBeenCalledWith({
      name: 'Awa Diallo',
      email: 'awa@exemple.com',
      profile: form.fields.profile.options[0],
      project: 'Une plateforme de soutien scolaire en ligne.',
    })
    expect(trackEvent).toHaveBeenCalledWith('generate_lead', { profile: form.fields.profile.options[0] })
  })

  it('désactive le bouton pendant l’envoi', async () => {
    submit.mockReturnValue(new Promise(() => undefined))
    const user = userEvent.setup()
    render(<ProjectForm />)

    await fillValid(user)
    await user.click(screen.getByRole('button', { name: form.submit }))

    expect(screen.getByRole('button', { name: form.submitting })).toBeDisabled()
  })

  it('propose l’email de contact si l’envoi échoue', async () => {
    submit.mockRejectedValue(new Error('NOT_CONFIGURED'))
    const user = userEvent.setup()
    render(<ProjectForm />)

    await fillValid(user)
    await user.click(screen.getByRole('button', { name: form.submit }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(form.failure)
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute('href', `mailto:${site.email}`)
    expect(trackEvent).not.toHaveBeenCalled()
  })
})
