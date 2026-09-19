import { skillGroups } from '../../data/skills';
import { SectionHeader } from '../ui/SectionHeader';
import { TechIcon } from '../ui/TechIcon';

export function Toolkit() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="container-page pt-24"
    >
      <SectionHeader
        number="04"
        eyebrow="Toolkit"
        title="What I build with."
        headingId="toolkit-heading"
      />

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        The MERN stack is where I am most at home, on top of Python and SQL from
        an earlier bootcamp. Anything marked as learning is something I am
        working on right now, including on this site.
      </p>

      <div className="mt-10 space-y-7">
        {skillGroups.map(group => (
          <div key={group.title}>
            <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-heading">
              {group.title}
              <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
            </h3>

            <ul className="mt-3.5 flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <li
                  key={skill.name}
                  // group: lets the "learning" tag react to hover/active on the whole pill.
                  // active: covers a finger held down; select-none stops it selecting text.
                  className="group flex select-none items-center gap-2 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-[0.9375rem] transition-colors [-webkit-touch-callout:none] hover:border-accent-soft active:border-accent"
                >
                  {skill.tech && (
                    <TechIcon tech={skill.tech} className="size-4" />
                  )}
                  {skill.name}
                  {skill.status === 'learning' && (
                    // Quiet at rest, but lights up gold on hover to reward the closer look.
                    <span className="text-xs uppercase tracking-wider opacity-50 transition-colors group-hover:text-accent group-hover:opacity-100 group-active:text-accent group-active:opacity-100">
                      learning
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
