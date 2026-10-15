import type { CubeFaces, CubeTone } from '@/types/illustration'

/** Couleurs des trois faces visibles d'un cube, dérivées du logo. */
export const cubeTones: Record<CubeTone, CubeFaces> = {
  navy: { top: '#1d4a8a', left: '#082755', right: '#0f3570' },
  coral: { top: '#ffa293', left: '#ff705c', right: '#e85f4b' },
  sun: { top: '#fcdb94', left: '#f9c65d', right: '#e3ae42' },
}
