import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary'

// Small caps and wide letter spacing, which suits the deco look better
// than sentence case. The offset gold outline appears on hover.
const base =
  'group inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium uppercase tracking-[0.15em] outline-offset-[3px] transition-all duration-200 hover:-translate-y-0.5 hover:outline hover:outline-1 hover:outline-accent/60 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-heading text-surface',
  secondary: 'border border-line text-heading hover:border-accent-soft',
}

function styles(variant: Variant, className?: string) {
  return `${base} ${variants[variant]} ${className ?? ''}`
}

type LinkProps = {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
}

export function ButtonLink({ to, variant = 'primary', className, children }: LinkProps) {
  return (
    <Link to={to} className={styles(variant, className)}>
      {children}
    </Link>
  )
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className, children, ...rest }: Props) {
  return (
    <button className={styles(variant, className)} {...rest}>
      {children}
    </button>
  )
}
