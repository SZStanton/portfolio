import type { CSSProperties } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router'
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
} from 'react-icons/si'

// Brand logos come from react-icons/si, interface icons from /lu.
// Keeping that split stops the site mixing drawing styles.
// Two colours each: the brand one for dark mode, a deeper mix for light.
// Express has no colour because its brand black vanishes in dark mode.
const techs = [
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e', colorLight: '#9a8100' },
  { name: 'React', Icon: SiReact, color: '#61dafb', colorLight: '#0b7f9e' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#7cc35f', colorLight: '#3f7a32' },
  { name: 'Express', Icon: SiExpress },
  { name: 'MongoDB', Icon: SiMongodb, color: '#5cc063', colorLight: '#2f7a35' },
  { name: 'Python', Icon: SiPython, color: '#4b9fd5', colorLight: '#2d6389' },
]

export function Hero() {
  return (
    <section
      id="home"
      // svh over vh because mobile toolbars change the visible height.
      // The 5rem leaves room for the navbar.
      className="flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20"
    >
      <p className="flex items-center gap-2 text-sm">
        {/* Two stacked circles: the lower one pings outwards, the solid one stays. */}
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Open to junior developer roles
      </p>

      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-heading sm:text-7xl">
        Sebastian Stanton
      </h1>

      {/* Tech names lifted to heading colour so a skim picks up the stack.
          The {' '} are real spaces, which JSX would otherwise drop at line ends. */}
      <p className="mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl">
        Junior full-stack developer building with{' '}
        <span className="text-heading">React</span>,{' '}
        <span className="text-heading">Node</span> and{' '}
        <span className="text-heading">MongoDB</span>.
      </p>

      <p className="mt-3 text-sm">Cape Town, South Africa</p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {/* group lets the arrow react to the whole button being hovered. */}
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-full bg-heading px-6 py-3 font-medium text-surface transition-opacity hover:opacity-85"
        >
          View my work
          <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-hover hover:text-heading"
        >
          Get in touch
        </Link>
      </div>

      {/* Muted until hovered, when the brand colour comes up. Keeps the
          hero calm while still rewarding a bit of curiosity. */}
      <ul className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-4">
        {techs.map(({ name, Icon, color, colorLight }) => (
          <li key={name} title={name}>
            <Icon
              className="size-7 text-[var(--tech-light)] opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 active:scale-110 active:opacity-100 dark:text-[var(--tech)]"
              style={
                {
                  '--tech': color,
                  '--tech-light': colorLight ?? color,
                } as CSSProperties
              }
              aria-label={name}
              role="img"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
