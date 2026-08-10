import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section className="py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Skills</p>

      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        What I build with
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed">
        The MERN stack is where I am most at home, on top of Python and SQL from an earlier
        bootcamp. Anything marked as learning is something I am working on right now, including on
        this site.
      </p>

      <div className="mt-14 space-y-12">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h2 className="border-b border-line pb-3 text-sm font-medium uppercase tracking-[0.15em] text-heading">
              {group.title}
            </h2>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  // Learning ones get a gold outline instead of the plain border.
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                    skill.status === 'learning'
                      ? 'border-accent-soft text-heading'
                      : 'border-line hover:border-accent-soft'
                  }`}
                >
                  {skill.Icon && <skill.Icon className="size-4 opacity-70" />}
                  {skill.name}
                  {skill.status === 'learning' && (
                    <span className="text-xs uppercase tracking-wider text-accent">learning</span>
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
