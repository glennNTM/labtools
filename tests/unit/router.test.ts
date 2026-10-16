import { describe, expect, it } from 'vitest'
import { normalizePath } from '@/lib/router'

describe('normalizePath', () => {
  it.each([
    ['/', '/'],
    ['', '/'],
    ['//', '/'],
    ['/cookies', '/cookies'],
    ['/cookies/', '/cookies'],
    ['/mentions-legales///', '/mentions-legales'],
  ])('%s → %s', (input, expected) => {
    expect(normalizePath(input)).toBe(expected)
  })
})
