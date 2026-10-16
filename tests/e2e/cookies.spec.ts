import type { Page } from '@playwright/test'
import { CONSENT_KEY, expect, test } from './fixtures'

const banner = (page: Page) => page.getByRole('region', { name: 'Cookies et mesure d’audience' })

test.describe('bandeau cookies et Google Analytics', () => {
  test('aucun appel à Google avant le choix', async ({ page, googleRequests }) => {
    await page.goto('/')
    await expect(banner(page)).toBeVisible()
    await page.waitForLoadState('networkidle')
    expect(googleRequests).toEqual([])
  })

  test('refuser : aucun appel à Google, choix conservé au rechargement', async ({ page, googleRequests }) => {
    await page.goto('/')
    await banner(page).getByRole('button', { name: 'Refuser' }).click()
    await expect(banner(page)).toBeHidden()

    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(banner(page)).toBeHidden()
    expect(googleRequests).toEqual([])
  })

  test('accepter : gtag.js est chargé et la page vue envoyée', async ({ page, googleRequests }) => {
    await page.goto('/')
    await banner(page).getByRole('button', { name: 'Accepter' }).click()
    await expect(banner(page)).toBeHidden()

    await expect.poll(() => googleRequests.some((url) => url.includes('gtag/js?id=G-E2ETEST000'))).toBe(true)
    const pageViews = await page.evaluate(
      () => (window.dataLayer ?? []).filter((args) => (args as IArguments)[1] === 'page_view').length,
    )
    expect(pageViews).toBe(1)
  })

  test('retirer son consentement depuis le pied de page', async ({ page }) => {
    await page.goto('/')
    await banner(page).getByRole('button', { name: 'Accepter' }).click()

    const manage = page.getByRole('contentinfo').getByRole('button', { name: 'Gérer les cookies' })
    await manage.click()
    await expect(banner(page)).toContainText('Choix actuel : mesure d’audience acceptée.')
    await banner(page).getByRole('button', { name: 'Refuser' }).click()

    await expect(manage).toBeFocused()
    const stored = await page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY)
    expect(JSON.parse(stored ?? '{}')).toMatchObject({ analytics: false })
    const disabled: unknown = await page.evaluate((id) => Reflect.get(window, `ga-disable-${id}`) as unknown, 'G-E2ETEST000')
    expect(disabled).toBe(true)
  })
})
