import { describe, expect, it } from 'vitest'
import { faq, footer, form, nav, team } from '@/config/content'
import { site } from '@/config/site'

describe('contenu', () => {
  it('n’a pas de doublon dans la navigation, la FAQ ni les options du formulaire', () => {
    for (const list of [nav.map((i) => i.href), footer.explore.map((i) => i.href), faq.items.map((i) => i.question), form.fields.profile.options]) {
      expect(new Set(list).size).toBe(list.length)
    }
  })

  it('présente les 3 membres de l’équipe', () => {
    expect(team.members).toHaveLength(3)
  })
})

/**
 * Garde de mise en ligne : lancer `RELEASE=1 bun run test` avant de publier.
 * Échoue tant qu'il reste des placeholders ([…], domaines .example).
 */
describe.runIf(process.env.RELEASE)('mise en ligne', () => {
  const placeholder = /\[[^\]]+\]|\.example\b/

  it('les coordonnées et informations légales sont renseignées', () => {
    expect(JSON.stringify(site)).not.toMatch(placeholder)
  })

  it('l’équipe est renseignée', () => {
    expect(JSON.stringify(team)).not.toMatch(placeholder)
  })
})
