import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { refreshConsent } from '@/lib/consent'
import { setReducedMotion } from './utils'

// API absentes de jsdom.
window.scrollTo = vi.fn() as typeof window.scrollTo
Element.prototype.scrollTo = vi.fn() as typeof Element.prototype.scrollTo
Element.prototype.scrollIntoView = vi.fn()
// GSAP lit matchMedia dès l'import des modules.
setReducedMotion(true)

beforeEach(() => {
  // Par défaut, animations réduites : GSAP n'anime rien et le carrousel ne défile pas seul.
  setReducedMotion(true)
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = `${cookie.split('=')[0]?.trim() ?? ''}=; Max-Age=0; path=/`
  })
  refreshConsent()
  window.history.replaceState(null, '', '/')
  vi.useRealTimers()
})
