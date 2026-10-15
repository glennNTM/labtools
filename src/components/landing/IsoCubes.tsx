import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { cubeTones as tones } from '@/lib/isometric'
import type { Cube } from '@/types/illustration'

// Composition « construction par blocs » : une base, une tour qui monte, des blocs en suspension.
const cubes: Cube[] = [
  { x: 0, y: 0, z: 0, tone: 'navy' },
  { x: 1, y: 0, z: 0, tone: 'navy' },
  { x: 2, y: 0, z: 0, tone: 'navy' },
  { x: 0, y: 1, z: 0, tone: 'navy' },
  { x: 1, y: 1, z: 0, tone: 'navy' },
  { x: 2, y: 1, z: 0, tone: 'coral' },
  { x: 0, y: 2, z: 0, tone: 'navy' },
  { x: 1, y: 2, z: 0, tone: 'navy' },
  { x: 0, y: 0, z: 1, tone: 'navy' },
  { x: 1, y: 0, z: 1, tone: 'navy' },
  { x: 0, y: 1, z: 1, tone: 'coral' },
  { x: 0, y: 0, z: 2, tone: 'navy' },
  { x: 1, y: 0, z: 2, tone: 'sun' },
  { x: 0, y: 0, z: 3, tone: 'coral' },
  { x: 3, y: 2, z: 1.6, tone: 'sun', float: true },
  { x: 3, y: 0, z: 2.2, tone: 'navy', float: true },
]

const SIZE = 60
const COS = Math.cos(Math.PI / 6)

function project(x: number, y: number, z: number) {
  return [(x - y) * SIZE * COS, (x + y) * SIZE * 0.5 - z * SIZE] as const
}

function face(points: [number, number, number][]) {
  return points.map(([x, y, z]) => project(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ')
}

// Cadre calculé une fois pour toute la composition : le SVG a un ratio fixe, donc aucun CLS.
const corners = cubes.flatMap(({ x, y, z }) =>
  [0, 1].flatMap((dx) => [0, 1].flatMap((dy) => [0, 1].map((dz) => project(x + dx, y + dy, z + dz)))),
)
const PAD = 24
const minX = Math.min(...corners.map(([px]) => px)) - PAD
const minY = Math.min(...corners.map(([, py]) => py)) - PAD
const width = Math.max(...corners.map(([px]) => px)) + PAD - minX
const height = Math.max(...corners.map(([, py]) => py)) + PAD - minY

const ordered = [...cubes].sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z))

/** Illustration décorative du hero, animée à l'arrivée (désactivée si prefers-reduced-motion). */
export function IsoCubes({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    const svg = ref.current
    if (!svg) return

    const mm = gsap.matchMedia()
    // L'illustration n'est affichée qu'à partir de lg : inutile d'animer un élément masqué.
    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      const blocks = svg.querySelectorAll('[data-cube]')
      const floating = svg.querySelectorAll('[data-float]')
      gsap
        .timeline({ delay: 0.15 })
        .from(blocks, { y: -80, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 })
        .to(floating, { y: -12, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6 })
    })
    return () => mm.revert()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ordered.map((cube) => {
        const { x, y, z, tone, float } = cube
        const color = tones[tone]
        return (
          <g
            key={`${x}-${y}-${z}`}
            data-cube
            {...(float ? { 'data-float': '' } : {})}
            stroke="#fbf7f0"
            strokeWidth={1.5}
            strokeLinejoin="round"
          >
            <polygon
              points={face([
                [x, y + 1, z],
                [x + 1, y + 1, z],
                [x + 1, y + 1, z + 1],
                [x, y + 1, z + 1],
              ])}
              fill={color.left}
            />
            <polygon
              points={face([
                [x + 1, y, z],
                [x + 1, y + 1, z],
                [x + 1, y + 1, z + 1],
                [x + 1, y, z + 1],
              ])}
              fill={color.right}
            />
            <polygon
              points={face([
                [x, y, z + 1],
                [x + 1, y, z + 1],
                [x + 1, y + 1, z + 1],
                [x, y + 1, z + 1],
              ])}
              fill={color.top}
            />
          </g>
        )
      })}
    </svg>
  )
}
