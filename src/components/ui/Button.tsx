import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary'

// The outline is always there but transparent, so hover only animates its
// colour. Adding it on hover instead made it fade in from the text colour.
const base =
  'group inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.15em] outline outline-1 outline-offset-[3px] outline-transparent transition-all duration-200 hover:-translate-y-0.5 hover:outline-accent/60 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50'

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

type AnchorProps = {
  href: string
  variant?: Variant
  className?: string
  children: ReactNode
  // true to just download, or a string to set the saved file name.
  download?: boolean | string
}

// For same-page anchors and file downloads, where a router Link is wrong.
export function ButtonAnchor({
  href,
  variant = 'primary',
  className,
  children,
  download,
}: AnchorProps) {
  return (
    <a href={href} download={download} className={styles(variant, className)}>
      {children}
    </a>
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
