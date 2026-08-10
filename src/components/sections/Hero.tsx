import { LuArrowRight } from 'react-icons/lu'
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
} from 'react-icons/si'

// The tech worth showing at a glance, before anyone scrolls.
const techs = [
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React', Icon: SiReact },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Python', Icon: SiPython },
]

export function Hero() {
  return (
    <section
      id="home"
      /* Roughly a full screen minus the navbar, so it fills the view
         on load without pushing the next section too far down. */
      className="flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20"
    >
      <p className="flex items-center gap-2 text-sm">
        {/* Small dot that quietly pulses, to draw the eye without shouting. */}
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
        Open to junior developer roles
      </p>

      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-heading sm:text-7xl">
        Sebastian Stanton
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl">
        Junior full-stack developer building with{' '}
        <span className="text-heading">React</span>,{' '}
        <span className="text-heading">Node</span> and{' '}
        <span className="text-heading">MongoDB</span>.
      </p>

      <p className="mt-3 text-sm">Cape Town, South Africa</p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-heading px-6 py-3 font-medium text-surface transition-opacity hover:opacity-85"
        >
          View my work
          <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-hover hover:text-heading"
        >
          Get in touch
        </a>
      </div>

      {/* Logo strip. Muted until hovered, so it reads as texture rather than clutter. */}
      <ul className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-4">
        {techs.map(({ name, Icon }) => (
          <li key={name} title={name}>
            <Icon
              className="size-7 opacity-40 transition-opacity hover:opacity-100"
              aria-label={name}
              role="img"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
