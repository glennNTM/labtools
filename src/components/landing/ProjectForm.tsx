import { useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { form } from '@/config/content'
import { site, submitProject } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { PROJECT_MAX_LENGTH, validateProject } from '@/utils/validateProject'
import type {
  ProjectFormErrors as Errors,
  ProjectFormField as Field,
  ProjectFormStatus as Status,
  ProjectSubmission,
} from '@/types/form'

const ORDER: Field[] = ['name', 'email', 'profile', 'project', 'consent']

const inputClass =
  'mt-2 block w-full rounded-btn border border-line bg-white px-4 py-3 text-navy placeholder:text-slate aria-invalid:border-coral-ink aria-invalid:ring-1 aria-invalid:ring-coral-ink'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-coral-ink">
      <Icon name="close" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  )
}

export function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = (name: keyof ProjectSubmission) => {
      const value = formData.get(name)
      return typeof value === 'string' ? value : ''
    }
    const data: ProjectSubmission = {
      name: text('name'),
      email: text('email'),
      profile: text('profile'),
      project: text('project'),
    }
    const nextErrors = validateProject(data, formData.get('consent') === 'on')
    setErrors(nextErrors)

    const firstInvalid = ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitProject(data)
      setStatus('success')
      trackEvent('generate_lead', { profile: data.profile })
      formRef.current?.reset()
    } catch {
      setStatus('error')
    }
  }

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(' ') || undefined

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card bg-white p-8 text-navy shadow-lift">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-sun">
          <Icon name="check" className="size-6" />
        </span>
        <p className="mt-4 text-lg font-medium">{form.success}</p>
      </div>
    )
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="rounded-card bg-white p-6 shadow-lift sm:p-8">
      <div aria-live="polite">
        {hasErrors && (
          <p className="mb-6 rounded-btn border border-coral-ink bg-cream p-4 text-sm font-medium text-coral-ink">
            {form.errorSummary}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="mb-6 rounded-btn border border-coral-ink bg-cream p-4 text-sm text-navy">
            {form.failure}{' '}
            <a href={`mailto:${site.email}`} className="font-semibold break-all text-coral-ink underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-medium text-navy">
            {form.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="font-medium text-navy">
            {form.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="profile" className="font-medium text-navy">
          {form.fields.profile.label}
        </label>
        <div className="relative">
          <select
            id="profile"
            name="profile"
            defaultValue=""
            className={`${inputClass} appearance-none pr-12`}
            aria-invalid={errors.profile ? true : undefined}
            aria-describedby={describedBy('profile')}
          >
            <option value="" disabled>
              {form.fields.profile.placeholder}
            </option>
            {form.fields.profile.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Icon name="chevron" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-navy" />
        </div>
        <FieldError id="profile-error" message={errors.profile} />
      </div>

      <div className="mt-5">
        <label htmlFor="project" className="font-medium text-navy">
          {form.fields.project.label}
        </label>
        <p id="project-hint" className="mt-1 text-sm text-slate">
          {form.fields.project.hint}
        </p>
        <textarea
          id="project"
          name="project"
          rows={4}
          maxLength={PROJECT_MAX_LENGTH}
          className={`${inputClass} resize-y`}
          aria-invalid={errors.project ? true : undefined}
          aria-describedby={describedBy('project', 'project-hint')}
        />
        <FieldError id="project-error" message={errors.project} />
      </div>

      <div className="mt-5">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 size-5 shrink-0 accent-navy"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent', 'consent-privacy')}
          />
          <label htmlFor="consent" className="text-sm text-navy">
            {form.fields.consent.label}
          </label>
        </div>
        <p id="consent-privacy" className="mt-2 pl-8 text-sm text-slate">
          <Link href="/confidentialite" className="underline underline-offset-2 hover:text-navy">
            {form.privacyLink}
          </Link>
        </p>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-coral px-6 py-3 font-semibold text-navy transition-colors hover:bg-coral-hover disabled:cursor-wait disabled:bg-disabled"
      >
        {status === 'submitting' ? form.submitting : form.submit}
        {status !== 'submitting' && <Icon name="arrow-right" className="size-5" />}
      </button>
    </form>
  )
}
