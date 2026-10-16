/** Simule `prefers-reduced-motion` (jsdom n'implémente pas matchMedia). */
export function setReducedMotion(reduce: boolean) {
  window.matchMedia = (query: string) => ({
    matches: query.includes('no-preference') ? !reduce : query.includes('reduce') && reduce,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })
}

/** Place l'application sur une route avant le rendu. */
export function visit(path: string) {
  window.history.replaceState(null, '', path)
}
