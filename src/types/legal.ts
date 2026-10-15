import type { ReactNode } from 'react'

export type LegalSection = {
  title: string
  content: ReactNode
}

export type LegalLayoutProps = {
  title: string
  updatedAt?: string
  sections: LegalSection[]
}
