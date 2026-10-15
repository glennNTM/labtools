import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '@/lib/gsap'

/**
 * Animations d'apparition au scroll, appliquées dans le conteneur retourné :
 * - [data-reveal]         : l'élément apparaît en fondu vers le haut
 * - [data-reveal-stagger] : ses enfants directs apparaissent en cascade
 * Les éléments sont visibles par défaut : sans JS ou avec prefers-reduced-motion, rien n'est masqué.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]', root).forEach((group) => {
        gsap.from(group.children, {
          y: 32,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return ref
}
