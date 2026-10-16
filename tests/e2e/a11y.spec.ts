import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect, presetConsent, test } from './fixtures'

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/** Violations WCAG 2.2 AA, résumées (règle, éléments, message) pour un échec lisible. */
async function audit(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG)
    // Le mot-symbole du logo est un logotype : exempté du ratio de contraste (WCAG 1.4.3).
    .exclude('[data-logotype]')
    .analyze()
  return violations.map((violation) => ({
    rule: violation.id,
    nodes: violation.nodes.map((node) => `${node.target.join(' ')} : ${node.failureSummary ?? ''}`),
  }))
}

// Animations coupées : axe analyse l'état final, pas un élément en cours d'apparition.
test.use({ reducedMotion: 'reduce' })

test('accueil avec le bandeau cookies', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('region', { name: 'Cookies et mesure d’audience' })).toBeVisible()

  expect(await audit(page)).toEqual([])
})

for (const path of ['/', '/mentions-legales', '/confidentialite', '/cookies', '/nexiste-pas']) {
  test(`${path} respecte WCAG 2.2 AA`, async ({ page }) => {
    await presetConsent(page, false)
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    expect(await audit(page)).toEqual([])
  })
}
