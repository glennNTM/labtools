import { useEffect } from 'react'

/** Titre de page et `noindex` optionnel, restaurés quand la page est quittée. */
export function usePageMeta(title: string, noindex = false) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    let robots: HTMLMetaElement | null = null
    if (noindex) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex'
      document.head.appendChild(robots)
    }

    return () => {
      document.title = previousTitle
      robots?.remove()
    }
  }, [title, noindex])
}
