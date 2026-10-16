import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.tsx'],
      restoreMocks: true,
      // Sans ID de mesure, Google Analytics n'est jamais chargé pendant les tests.
      env: { VITE_GA_MEASUREMENT_ID: '' },
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/main.tsx', 'src/**/*.d.ts'],
        reporter: ['text', 'html'],
      },
    },
  }),
)
