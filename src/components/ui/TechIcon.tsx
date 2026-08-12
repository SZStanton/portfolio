import type { CSSProperties } from 'react'
import { techStyles } from '../../data/tech'

type TechIconProps = {
  tech: string
  className?: string
  // Set when the icon stands alone with no text next to it.
  label?: string
}

// Hands both colours to CSS as variables and lets the theme pick.
export function TechIcon({ tech, className, label }: TechIconProps) {
  const style = techStyles[tech]
  if (!style) return null

  return (
    <style.Icon
      className={`text-[var(--tech-light)] dark:text-[var(--tech)] ${className ?? ''}`}
      style={
        {
          '--tech': style.color,
          '--tech-light': style.colorLight,
        } as CSSProperties
      }
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
