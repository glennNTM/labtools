import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

export const CONSENT_KEY = 'labtools-consent'
const GOOGLE = /https:\/\/(www\.googletagmanager\.com|[\w.-]*google-analytics\.com)\//

type Fixtures = {
  /** Requêtes envoyées à Google (bloquées : aucun trafic réel pendant les tests). */
  googleRequests: string[]
  /** Erreurs JavaScript et console de la page. */
  pageErrors: string[]
}

export const test = base.extend<Fixtures>({
  googleRequests: async ({ page }, use) => {
    const requests: string[] = []
    await page.route(GOOGLE, async (route) => {
      requests.push(route.request().url())
      await route.fulfill({ status: 200, contentType: 'text/javascript', body: '' })
    })
    await use(requests)
  },
  pageErrors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await use(errors)
  },
})

/** Enregistre un choix de cookies avant le chargement, pour les tests qui ne portent pas sur le bandeau. */
export async function presetConsent(page: Page, analytics: boolean) {
  await page.addInitScript(
    ([key, value]) => localStorage.setItem(key, value),
    [CONSENT_KEY, JSON.stringify({ analytics, date: Date.now(), version: 1 })] as const,
  )
}

export { expect }
