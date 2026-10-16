import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
/** ID factice : les requêtes vers Google sont interceptées dans les tests (voir tests/e2e/fixtures.ts). */
export const E2E_GA_ID = 'G-E2ETEST000'

/**
 * Tests E2E sur le build de production servi par `vite preview`.
 * Déboguer dans le navigateur : `bun run test:e2e:ui` (mode UI) ou `bun run test:e2e:debug` (inspecteur pas à pas).
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'fr-FR',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `bun run build && bun run preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { VITE_GA_MEASUREMENT_ID: E2E_GA_ID },
  },
})
