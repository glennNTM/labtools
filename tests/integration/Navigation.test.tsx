import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { footer, nav } from '@/config/content'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Link } from '@/components/ui/Link'

describe('Navbar', () => {
  it('ouvre le menu mobile, le ferme avec Échap et au clic sur un lien', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' })

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Navigation mobile' })).toBeVisible()

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    const mobile = screen.getByRole('navigation', { name: 'Navigation mobile' })
    await user.click(within(mobile).getByRole('link', { name: nav[0]?.label ?? '' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Footer', () => {
  it('reprend la navigation, le contact et les liens légaux', () => {
    render(<Footer />)
    const explore = screen.getByRole('navigation', { name: footer.exploreTitle })
    const legal = screen.getByRole('navigation', { name: footer.legalTitle })

    expect(within(explore).getAllByRole('link')).toHaveLength(footer.explore.length)
    expect(within(explore).getByRole('link', { name: 'Équipe' })).toHaveAttribute('href', '/#equipe')
    expect(within(legal).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(footer.legal.map((l) => l.href))
    expect(within(legal).getByRole('button', { name: 'Gérer les cookies' })).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} LabTools`))).toBeInTheDocument()
  })

  it('masque les réseaux sociaux sans URL', () => {
    render(<Footer />)
    expect(screen.queryByRole('list', { name: footer.socialTitle })).toBeNull()
  })
})

describe('Link', () => {
  it('navigue côté client vers une route interne', async () => {
    const user = userEvent.setup()
    render(<Link href="/cookies">Cookies</Link>)

    await user.click(screen.getByRole('link'))
    expect(window.location.pathname).toBe('/cookies')
  })

  it('laisse le navigateur gérer les ancres et les clics avec modificateur', () => {
    render(
      <>
        <Link href="/#faq">FAQ</Link>
        <Link href="/cookies">Cookies</Link>
      </>,
    )

    // fireEvent renvoie false si preventDefault() a été appelé.
    expect(fireEvent.click(screen.getByRole('link', { name: 'FAQ' }))).toBe(true)
    expect(fireEvent.click(screen.getByRole('link', { name: 'Cookies' }), { ctrlKey: true })).toBe(true)
    expect(window.location.pathname).toBe('/')
  })
})
