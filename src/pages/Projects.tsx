import { ProjectCard } from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

// Split once here rather than filtering twice further down.
const featured = projects.filter((project) => project.group === 'featured')
const other = projects.filter((project) => project.group === 'other')

export function Projects() {
  return (
    <section className="py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Work</p>

      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        Projects
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed">
        Built across two HyperionDev bootcamps and on my own time. Where something is unfinished or
        does not work yet, it says so.
      </p>

      <h2 className="mt-16 border-b border-line pb-3 text-sm font-medium uppercase tracking-[0.15em] text-heading">
        Featured
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h2 className="mt-16 border-b border-line pb-3 text-sm font-medium uppercase tracking-[0.15em] text-heading">
        Also worth a look
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {other.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
