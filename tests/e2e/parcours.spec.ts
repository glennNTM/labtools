import { expect, presetConsent, test } from './fixtures'

// Sans animations : les éléments révélés au scroll par GSAP sont visibles d'emblée.
test.use({ reducedMotion: 'reduce' })

test.beforeEach(async ({ page }) => {
  await presetConsent(page, false)
})

test('l’accueil charge sans erreur et présente toutes les sections', async ({ page, pageErrors }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/LabTools/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  for (const id of ['activites', 'pour-qui', 'methode', 'equipe', 'faq', 'lancer']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await expect(page.locator('#equipe').getByRole('listitem')).toHaveCount(3)
  await expect(page.getByRole('heading', { name: 'L’impact LabTools.' })).toHaveCount(0)
  expect(pageErrors).toEqual([])
})

test('la navigation mène aux sections', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  const menu = page.getByRole('navigation', { name: isMobile ? 'Navigation mobile' : 'Navigation principale' })

  await menu.getByRole('link', { name: 'Équipe' }).click()

  await expect(page).toHaveURL(/#equipe$/)
  await expect(page.getByRole('heading', { name: 'Ceux qui construisent LabTools.' })).toBeInViewport()
})

test('le header tient sur une ligne à toutes les largeurs', async ({ page }) => {
  for (const width of [360, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    const header = page.getByRole('banner')
    expect((await header.boundingBox())?.height, `largeur ${width}px`).toBeLessThanOrEqual(80)
    expect(await header.evaluate((el) => el.scrollWidth <= el.clientWidth), `largeur ${width}px`).toBe(true)
  }
})

test.describe('formulaire « Lancer mon projet »', () => {
  test('signale les erreurs puis propose l’email de contact', async ({ page }) => {
    await page.goto('/#lancer')
    const form = page.locator('#lancer form')

    await form.getByRole('button', { name: 'Lancer mon projet' }).click()
    await expect(form.getByText('Le formulaire contient des erreurs.')).toBeVisible()
    await expect(form.getByLabel('Nom complet')).toBeFocused()

    await form.getByLabel('Nom complet').fill('Awa Diallo')
    await form.getByLabel('Email').fill('awa@exemple.com')
    await form.getByLabel('Vous êtes').selectOption({ index: 1 })
    await form.getByLabel('Votre projet en quelques lignes').fill('Une plateforme de soutien scolaire en ligne.')
    await form.getByLabel(/J’accepte que LabTools/).check()
    await form.getByRole('button', { name: 'Lancer mon projet' }).click()

    // TODO(backend) : remplacer par l'assertion de succès une fois l'envoi branché.
    await expect(form.getByRole('alert')).toContainText('Écrivez-nous directement')
  })
})

test.describe('routes', () => {
  for (const [path, title] of [
    ['/mentions-legales', 'Mentions légales'],
    ['/confidentialite', 'Politique de confidentialité'],
    ['/cookies', 'Politique de cookies'],
  ]) {
    test(`accès direct à ${path}`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(title)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
    })
  }

  test('une URL inconnue affiche la 404', async ({ page }) => {
    await page.goto('/nexiste-pas')
    await expect(page.getByRole('heading', { level: 1, name: 'Cette page n’existe pas.' })).toBeVisible()
  })
})

test.describe('carrousel de témoignages', () => {
  // La lecture automatique est désactivée avec prefers-reduced-motion.
  test.use({ reducedMotion: 'no-preference' })

  test('défile seul et se met en pause', async ({ page }) => {
    await page.goto('/')
    const carousel = page.locator('[aria-roledescription="carrousel"]')
    await carousel.scrollIntoViewIfNeeded()
    await page.mouse.move(0, 0)

    const second = carousel.getByRole('button', { name: 'Afficher le témoignage 2 sur 3' })
    await expect(second).toHaveAttribute('aria-current', 'true', { timeout: 8_000 })

    await carousel.getByRole('button', { name: /Mettre en pause/ }).click()
    await expect(carousel.getByRole('button', { name: /Reprendre/ })).toBeVisible()
  })

  test('ne défile pas seul avec prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const carousel = page.getByRole('region', { name: 'Témoignages' })

    await expect(carousel.getByRole('button', { name: /Reprendre/ })).toBeVisible()
    await page.waitForTimeout(7_000)
    await expect(carousel.getByRole('button', { name: 'Afficher le témoignage 1 sur 3' })).toHaveAttribute('aria-current', 'true')
  })
})
