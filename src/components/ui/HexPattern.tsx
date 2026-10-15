import { useId } from 'react'

/** Trame d'hexagones reprise du logo, purement décorative. */
export function HexPattern({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
          <path
            d="M28 0l28 16.17v32.33L28 64.67 0 48.5V16.17zM28 64.67v32.33M0 97V80.83M56 97V80.83"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
