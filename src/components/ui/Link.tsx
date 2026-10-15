import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '@/lib/router'

/** Lien interne : les routes sans ancre sont gérées côté client, le reste reste un lien natif. */
export function Link({ href = '/', onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isClientRoute = href.startsWith('/') && !href.includes('#')

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (!isClientRoute || event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(href)
  }

  return <a href={href} onClick={handleClick} {...rest} />
}
