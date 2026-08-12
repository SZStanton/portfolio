import { CompactProjectCard, FeaturedProjectCard } from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

// Split once here rather than filtering twice further down.
const featured = projects.filter((project) => project.group === 'featured')
const other = projects.filter((project) => project.group === 'other')

// Small stats row, worked out from the data so it cannot go stale.
const stats = [
  { value: projects.length, label: 'projects' },
  { value: projects.filter((p) => p.capstone).length, label: 'bootcamp capstones' },
  { value: projects.filter((p) => p.kind === 'full-stack').length, label: 'full stack' },
]

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-heading">
      {children}
      <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
    </h2>
  )
}

export function Projects() {
  return (
    <section className="py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Work</p>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        Projects
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        Built across two HyperionDev bootcamps and on my own time. Where something is unfinished or
        does not work yet, it says so.
      </p>

      <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-3xl font-semibold text-accent">{stat.value}</dt>
            <dd className="mt-1 text-sm uppercase tracking-wider">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16">
        <SectionHeading>Featured</SectionHeading>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading>Also worth a look</SectionHeading>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {other.map((project) => (
            <CompactProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
