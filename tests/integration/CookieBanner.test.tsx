import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { cookieBanner } from '@/config/content'
import { CONSENT_KEY, saveConsent } from '@/lib/consent'
import { disableGoogleAnalytics, loadGoogleAnalytics, trackPageView } from '@/lib/analytics'
import App from '@/App'

vi.mock('@/lib/analytics', () => ({
  GA_MEASUREMENT_ID: 'G-TEST000000',
  loadGoogleAnalytics: vi.fn(),
  disableGoogleAnalytics: vi.fn(),
  trackPageView: vi.fn(),
  trackEvent: vi.fn(),
}))

const banner = () => screen.queryByRole('region', { name: cookieBanner.title })
const storedChoice = () => (JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null') as { analytics: boolean } | null)?.analytics

describe('bandeau cookies', () => {
  it('s’affiche au premier passage sans charger Google Analytics', () => {
    render(<App />)
    expect(banner()).toBeInTheDocument()
    expect(loadGoogleAnalytics).not.toHaveBeenCalled()
  })

  it('donne le même poids visuel à « Refuser » et « Accepter » (CNIL)', () => {
    render(<App />)
    const refuse = screen.getByRole('button', { name: cookieBanner.refuse })
    const accept = screen.getByRole('button', { name: cookieBanner.accept })
    expect(refuse.className).toBe(accept.className)
  })

  it('« Accepter » enregistre le choix et charge Google Analytics avec la page vue', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: cookieBanner.accept }))

    expect(banner()).not.toBeInTheDocument()
    expect(storedChoice()).toBe(true)
    expect(loadGoogleAnalytics).toHaveBeenCalledWith('G-TEST000000')
    expect(trackPageView).toHaveBeenCalledWith('/', document.title)
  })

  it('« Refuser » enregistre le choix sans charger Google Analytics', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: cookieBanner.refuse }))

    expect(banner()).not.toBeInTheDocument()
    expect(storedChoice()).toBe(false)
    expect(loadGoogleAnalytics).not.toHaveBeenCalled()
  })

  it('ne s’affiche plus une fois le choix fait', () => {
    act(() => saveConsent(false))
    render(<App />)
    expect(banner()).not.toBeInTheDocument()
  })

  it('se rouvre depuis le pied de page et retire le consentement', async () => {
    act(() => saveConsent(true))
    const user = userEvent.setup()
    render(<App />)
    const manage = within(screen.getByRole('contentinfo')).getByRole('button', { name: cookieBanner.manage })

    await user.click(manage)
    expect(banner()).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: cookieBanner.title })).toHaveFocus()
    expect(screen.getByText(cookieBanner.current.accepted)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: cookieBanner.refuse }))
    expect(banner()).not.toBeInTheDocument()
    expect(manage).toHaveFocus()
    expect(storedChoice()).toBe(false)
    expect(disableGoogleAnalytics).toHaveBeenCalledWith('G-TEST000000')
  })

  it('envoie une page vue à chaque changement de route', async () => {
    act(() => saveConsent(true))
    const user = userEvent.setup()
    render(<App />)
    const legal = screen.getByRole('navigation', { name: 'Informations légales' })

    await user.click(within(legal).getByRole('link', { name: 'Mentions légales' }))

    expect(trackPageView).toHaveBeenLastCalledWith('/mentions-legales', 'Mentions légales | LabTools')
  })
})
