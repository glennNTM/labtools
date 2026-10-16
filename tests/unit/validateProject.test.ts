import { describe, expect, it } from 'vitest'
import { form } from '@/config/content'
import { validateProject } from '@/utils/validateProject'

const valid = {
  name: 'Awa Diallo',
  email: 'awa@exemple.com',
  profile: 'Étudiant·e',
  project: 'Une application pour réserver des cours de soutien scolaire.',
}

describe('validateProject', () => {
  it('ne renvoie aucune erreur pour une saisie valide', () => {
    expect(validateProject(valid, true)).toEqual({})
  })

  it('signale chaque champ manquant', () => {
    const errors = validateProject({ name: '', email: '', profile: '', project: '' }, false)
    expect(errors).toEqual({
      name: form.fields.name.error,
      email: form.fields.email.error,
      profile: form.fields.profile.error,
      project: form.fields.project.error,
      consent: form.fields.consent.error,
    })
  })

  it('ignore les espaces autour du nom et du projet', () => {
    const errors = validateProject({ ...valid, name: '   ', project: `   ${'a'.repeat(19)}   ` }, true)
    expect(Object.keys(errors)).toEqual(['name', 'project'])
  })

  it('accepte un projet de 20 caractères exactement', () => {
    expect(validateProject({ ...valid, project: 'a'.repeat(20) }, true)).toEqual({})
  })

  it.each(['awa', 'awa@', 'awa@exemple', 'awa@exemple.c', 'awa diallo@exemple.com'])('refuse l’email « %s »', (email) => {
    expect(validateProject({ ...valid, email }, true)).toHaveProperty('email')
  })

  it.each(['awa@exemple.com', ' awa@exemple.com ', 'a.b+c@sous.domaine.africa'])('accepte l’email « %s »', (email) => {
    expect(validateProject({ ...valid, email }, true)).toEqual({})
  })
})
