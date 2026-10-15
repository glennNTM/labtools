import type { IconName } from '@/types/icon'
import type { IconProps } from '@/types/ui'

const paths: Record<IconName, readonly string[]> = {
  'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'arrow-up': ['M12 19V5', 'M6 11l6-6 6 6'],
  check: ['M5 12.5l4.5 4.5L19 7'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  plus: ['M12 5v14', 'M5 12h14'],
  chevron: ['M6 9l6 6 6-6'],
  quote: ['M10 7H6a2 2 0 0 0-2 2v4h6V7z', 'M10 13c0 2.5-1.5 4-4 4.5', 'M20 7h-4a2 2 0 0 0-2 2v4h6V7z', 'M20 13c0 2.5-1.5 4-4 4.5'],
  incubator: ['M12 2.5l8.25 4.75v9.5L12 21.5l-8.25-4.75v-9.5z', 'M12 8l3.5 2v4L12 16l-3.5-2v-4z'],
  code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  framework: ['M12 3l9 5-9 5-9-5z', 'M3 12l9 5 9-5', 'M3 16l9 5 9-5'],
  student: ['M2 9l10-5 10 5-10 5z', 'M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5', 'M22 9v6'],
  briefcase: [
    'M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
    'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
    'M3 13h18',
  ],
  compass: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M15.5 8.5l-2 5-5 2 2-5z'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7v5l3 2'],
  mail: ['M4 6h16v12H4z', 'M4 7l8 6 8-6'],
}

/** Icône SVG inline, décorative par défaut (le texte voisin porte le sens). */
export function Icon({ name, className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
