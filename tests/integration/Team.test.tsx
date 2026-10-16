import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Team } from '@/components/landing/Team'
import type * as ContentModule from '@/config/content'

vi.mock('@/config/content', async (importOriginal) => {
  const content = await importOriginal<typeof ContentModule>()
  return {
    ...content,
    team: {
      ...content.team,
      members: [
        { name: 'Awa Diallo', role: 'CEO', linkedin: 'https://www.linkedin.com/in/awa', photo: '/awa.webp' },
        { name: 'Koffi Mensah', role: 'CTO', linkedin: '' },
        { name: 'Sara Ndiaye', role: 'Responsable incubation' },
      ],
    },
  }
})

describe('Team', () => {
  it('présente chaque membre avec son nom et son rôle', () => {
    render(<Team />)

    const section = screen.getByRole('region', { name: 'Ceux qui construisent LabTools.' })
    const members = within(section).getAllByRole('listitem')
    expect(members).toHaveLength(3)
    expect(within(members[0]).getByRole('heading', { level: 3, name: 'Awa Diallo' })).toBeInTheDocument()
    expect(members[0]).toHaveTextContent('CEO')
  })

  it('affiche la photo si elle est fournie, une silhouette sinon', () => {
    render(<Team />)
    const [withPhoto, withoutPhoto] = screen.getAllByRole('listitem')

    expect(withPhoto.querySelector('img')).toHaveAttribute('src', '/awa.webp')
    expect(withoutPhoto.querySelector('img')).toBeNull()
    expect(withoutPhoto.querySelector('svg[aria-hidden="true"]')).not.toBeNull()
  })

  it('n’affiche « Suivre » que pour les profils LinkedIn renseignés', () => {
    render(<Team />)

    const follow = screen.getAllByRole('link', { name: /Suivre/ })
    expect(follow).toHaveLength(1)
    expect(follow[0]).toHaveAccessibleName('Suivre Awa Diallo sur LinkedIn (nouvel onglet)')
    expect(follow[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/awa')
    expect(follow[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
