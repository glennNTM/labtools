import type { ButtonProps, ButtonVariant } from '@/types/ui'
import { Icon } from './Icon'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-coral text-navy hover:bg-coral-hover',
  secondary: 'border-2 border-navy text-navy hover:bg-navy hover:text-cream',
  dark: 'bg-navy text-cream hover:bg-navy-800',
  'ghost-dark': 'border-2 border-mist/60 text-cream hover:border-cream hover:bg-cream/10',
}

/** Lien stylé en bouton : la page ne navigue que par ancres et liens. */
export function Button({ href, variant = 'primary', withArrow = false, className = '', children, ...rest }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-btn px-6 py-3 text-base font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && (
        <Icon name="arrow-right" className="size-5 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
      )}
    </a>
  )
}
