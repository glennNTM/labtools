export type CubeTone = 'navy' | 'coral' | 'sun'

export type CubeFaces = { top: string; left: string; right: string }

/** Cube de l'illustration isométrique, en coordonnées de grille. */
export type Cube = { x: number; y: number; z: number; tone: CubeTone; float?: boolean }
