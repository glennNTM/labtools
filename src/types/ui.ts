import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { IconName } from './icon'

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost-dark'

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: ButtonVariant
  withArrow?: boolean
  children: ReactNode
}

export type IconProps = {
  name: IconName
  className?: string
}

export type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  intro?: string
  index?: string
  dark?: boolean
  align?: 'left' | 'center'
}

export type Social = {
  label: string
  icon: IconName
  href: string
}
