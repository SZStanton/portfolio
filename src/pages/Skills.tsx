import { SectionLabel } from '../components/ui/SectionLabel'
import { TechIcon } from '../components/ui/TechIcon'
import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section className="pb-24 pt-16">
      <SectionLabel>Skills</SectionLabel>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        What I Build With
      </h1>

      <p className="mt-5 max-w-2xl text-xl leading-relaxed">
        The MERN stack is where I am most at home, on top of Python and SQL from an earlier
        bootcamp. Anything marked as learning is something I am working on right now, including on
        this site.
      </p>

      <div className="mt-9 space-y-7">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-heading">
              {group.title}
              <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
            </h2>

            <ul className="mt-3.5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  // active: covers a finger held on the chip. select-none and
                  // touch-callout stop that press selecting the text instead.
                  className="flex select-none items-center gap-2 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-[0.9375rem] transition-colors [-webkit-touch-callout:none] hover:border-accent-soft active:border-accent"
                >
                  {skill.tech && <TechIcon tech={skill.tech} className="size-4" />}
                  {skill.name}
                  {skill.status === 'learning' && (
                    // Deliberately quiet. This is a footnote, not a headline.
                    <span className="text-xs uppercase tracking-wider opacity-50">learning</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
