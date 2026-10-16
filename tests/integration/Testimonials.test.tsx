import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testimonials } from '@/config/content'
import { Testimonials } from '@/components/landing/Testimonials'
import { setReducedMotion } from '../utils'

const DELAY = 6000
const count = testimonials.items.length
const dot = (n: number) => screen.getByRole('button', { name: `${testimonials.goTo} ${n} ${testimonials.of} ${count}` })
const current = () => screen.getAllByRole('button', { name: new RegExp(testimonials.goTo) }).findIndex((b) => b.hasAttribute('aria-current')) + 1
/** Avance d'un intervalle à la fois : chaque rotation programme la suivante après le rendu. */
async function wait(ms: number) {
  for (let elapsed = 0; elapsed < ms; elapsed += DELAY) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(Math.min(DELAY, ms - elapsed))
    })
  }
}

describe('Testimonials', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    setReducedMotion(false)
  })

  it('fait défiler les témoignages et revient au premier', async () => {
    render(<Testimonials />)
    expect(current()).toBe(1)

    await wait(DELAY)
    expect(current()).toBe(2)

    await wait(DELAY * (count - 1))
    expect(current()).toBe(1)
  })

  it('n’annonce pas les changements automatiques aux lecteurs d’écran', () => {
    render(<Testimonials />)
    expect(screen.getByText(`${testimonials.eyebrow} 1 ${testimonials.of} ${count}`)).toHaveAttribute('aria-live', 'off')
  })

  it('se met en pause avec le bouton dédié, puis reprend', async () => {
    const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) })
    render(<Testimonials />)

    await user.click(screen.getByRole('button', { name: testimonials.pause }))
    await wait(DELAY * 2)
    expect(current()).toBe(1)

    await user.click(screen.getByRole('button', { name: testimonials.play }))
    // Le pointeur quitte le carrousel : seul le survol suspendrait encore la lecture.
    await user.unhover(screen.getByRole('region', { name: testimonials.eyebrow }))
    await wait(DELAY)
    expect(current()).toBe(2)
  })

  it('se suspend au survol', async () => {
    render(<Testimonials />)
    const region = screen.getByRole('region', { name: testimonials.eyebrow })

    fireEvent.mouseEnter(region)
    await wait(DELAY * 2)
    expect(current()).toBe(1)

    fireEvent.mouseLeave(region)
    await wait(DELAY)
    expect(current()).toBe(2)
  })

  it('s’arrête quand l’utilisateur navigue lui-même', async () => {
    const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) })
    render(<Testimonials />)

    await user.click(screen.getByRole('button', { name: testimonials.next }))
    expect(current()).toBe(2)
    expect(screen.getByRole('button', { name: testimonials.play })).toBeInTheDocument()

    await wait(DELAY * 2)
    expect(current()).toBe(2)
  })

  it('se pilote au clavier', async () => {
    const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) })
    render(<Testimonials />)

    screen.getByRole('list').focus()
    await user.keyboard('{ArrowRight}')
    expect(current()).toBe(2)
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(current()).toBe(1)
    expect(screen.getByRole('button', { name: testimonials.previous })).toBeDisabled()
  })

  it('va directement au témoignage choisi', async () => {
    const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) })
    render(<Testimonials />)

    await user.click(dot(count))
    expect(current()).toBe(count)
    expect(screen.getByRole('button', { name: testimonials.next })).toBeDisabled()
  })

  it('ne défile pas seul avec prefers-reduced-motion', async () => {
    setReducedMotion(true)
    render(<Testimonials />)

    expect(screen.getByRole('button', { name: testimonials.play })).toBeInTheDocument()
    await wait(DELAY * 2)
    expect(current()).toBe(1)
  })
})
