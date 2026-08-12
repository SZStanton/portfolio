import { LuChevronDown, LuExternalLink, LuGithub, LuTriangleAlert } from 'react-icons/lu'
import type { Project, ProjectKind } from '../../types'
import { TechIcon } from '../ui/TechIcon'

// Record means every kind has to have a label, so adding one to the
// type without labelling it fails the build.
const kindLabels: Record<ProjectKind, string> = {
  'full-stack': 'Full stack',
  'front-end': 'Front end',
  database: 'Database',
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs transition-colors hover:border-accent-soft active:border-accent"
        >
          <TechIcon tech={tech} className="size-3.5" />
          {tech}
        </li>
      ))}
    </ul>
  )
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 transition-colors hover:text-accent active:text-accent"
      >
        <LuGithub className="size-4" />
        Code
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-medium text-accent transition-opacity hover:opacity-75 active:opacity-75"
        >
          <LuExternalLink className="size-4" />
          Live demo
        </a>
      )}
    </div>
  )
}

// The four capstones. Everything in the data gets shown.
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface-raised transition-colors hover:border-accent-soft active:border-accent">
      {/* Gold rule along the top, brighter on hover. */}
      <span className="h-0.5 w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent transition-opacity group-hover:opacity-100 sm:opacity-70" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs uppercase tracking-[0.15em]">{kindLabels[project.kind]}</span>
          {project.capstone && (
            <span className="rounded-full border border-accent-soft px-2.5 py-0.5 text-xs uppercase tracking-wider text-accent">
              Capstone
            </span>
          )}
        </div>

        <h3 className="mt-3 text-2xl font-semibold text-heading">{project.title}</h3>

        <p className="mt-3 leading-relaxed">{project.description}</p>

        {project.features && (
          <ul className="mt-5 space-y-2 text-[0.9375rem]">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                {/* Small gold diamond instead of a bullet. */}
                <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent/70" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {project.knownIssue && (
          <p className="mt-5 flex gap-3 rounded-lg bg-hover p-4 text-sm">
            <LuTriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" />
            {project.knownIssue}
          </p>
        )}

        {project.futureImprovements && (
          // Folded away by default, since it is the least important part.
          <details className="group/more mt-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-heading transition-colors hover:text-accent">
              <LuChevronDown className="size-4 transition-transform group-open/more:rotate-180" />
              What I would add next
            </summary>
            <ul className="mt-3 space-y-2 pl-6 text-[0.9375rem]">
              {project.futureImprovements.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-6">
          <StackTags stack={project.stack} />
        </div>

        {/* mt-auto pins the links to the bottom so they line up across cards. */}
        <div className="mt-auto pt-6">
          <Links project={project} />
        </div>
      </div>
    </article>
  )
}

// The rest. Same information, minus the feature lists.
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-line p-6 transition-colors hover:border-accent-soft active:border-accent">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs uppercase tracking-[0.15em]">{kindLabels[project.kind]}</span>
        {project.capstone && (
          <span className="rounded-full border border-accent-soft px-2.5 py-0.5 text-xs uppercase tracking-wider text-accent">
            Capstone
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-semibold text-heading">{project.title}</h3>

      <p className="mt-3 text-[0.9375rem] leading-relaxed">{project.description}</p>

      {project.knownIssue && (
        <p className="mt-4 border-l-2 border-accent-soft pl-3 text-sm">{project.knownIssue}</p>
      )}

      <div className="mt-5">
        <StackTags stack={project.stack} />
      </div>

      <div className="mt-auto pt-6">
        <Links project={project} />
      </div>
    </article>
  )
}
