import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { nav } from '@/config/content'
import App from '@/App'
import { visit } from '../utils'

describe('App', () => {
  it('affiche l’accueil et chaque ancre de navigation pointe vers une section existante', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const item of nav) {
      const id = item.href.split('#')[1] ?? ''
      expect(document.getElementById(id), item.href).not.toBeNull()
    }
  })

  it('n’affiche plus la section des chiffres clés', () => {
    render(<App />)
    expect(document.getElementById('chiffres-title')).toBeNull()
  })

  it.each([
    ['/mentions-legales', 'Mentions légales'],
    ['/confidentialite/', 'Politique de confidentialité'],
    ['/cookies', 'Politique de cookies'],
  ])('affiche %s en noindex', (path, title) => {
    visit(path)
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: new RegExp(title, 'i') })).toHaveFocus()
    expect(document.title).toMatch(/\| LabTools$/)
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  it('affiche la 404 pour une route inconnue', () => {
    visit('/inconnue')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Cette page n’existe pas.' })).toBeInTheDocument()
    expect(document.title).toBe('Page introuvable | LabTools')
  })

  it('navigue côté client vers une page légale puis revient en arrière', async () => {
    const user = userEvent.setup()
    render(<App />)
    const legal = screen.getByRole('navigation', { name: 'Informations légales' })

    await user.click(within(legal).getByRole('link', { name: 'Cookies' }))
    expect(window.location.pathname).toBe('/cookies')
    expect(screen.getByRole('heading', { level: 1, name: 'Politique de cookies' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Retour à l’accueil' }))
    expect(window.location.pathname).toBe('/')
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
  })
})
