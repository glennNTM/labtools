import { useSyncExternalStore } from 'react'

/**
 * Mini-routeur sans dépendance, basé sur l'History API.
 * En production, l'hébergeur doit renvoyer index.html pour toutes les routes.
 */
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

export function navigate(to: string) {
  window.history.pushState(null, '', to)
  listeners.forEach((listener) => listener())
  window.scrollTo(0, 0)
}

export function usePathname() {
  return useSyncExternalStore(subscribe, () => window.location.pathname.replace(/\/+$/, '') || '/')
}
