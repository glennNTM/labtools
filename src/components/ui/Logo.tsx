import mark from '@/assets/logo-sans-nom.svg'

/** Symbole du logo + mot-symbole « labtools » aux couleurs de la marque (logotype : exempté du ratio de contraste). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={mark} alt="" width={252} height={330} className="h-9 w-auto" />
      <span className="text-2xl font-semibold tracking-tight" aria-hidden="true">
        <span className="text-navy">lab</span>
        <span className="text-coral">tools</span>
      </span>
    </span>
  )
}
