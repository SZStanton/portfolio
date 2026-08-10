import { LuExternalLink, LuGithub } from 'react-icons/lu'
import type { Project, ProjectKind } from '../../types'

// Record means every ProjectKind must have a label here, so adding a
// kind without labelling it fails the build.
const kindLabels: Record<ProjectKind, string> = {
  'full-stack': 'Full stack',
  'front-end': 'Front end',
  database: 'Database',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-lg border border-line p-6 transition-colors hover:border-accent-soft">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs uppercase tracking-[0.15em]">{kindLabels[project.kind]}</span>
        {project.capstone && (
          <span className="rounded-full border border-accent-soft px-2.5 py-0.5 text-xs uppercase tracking-wider text-accent">
            Capstone
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-semibold text-heading">{project.title}</h3>

      <p className="mt-3 leading-relaxed">{project.description}</p>

      {/* Stated plainly rather than hidden, which reads better than pretending. */}
      {project.knownIssue && (
        <p className="mt-4 border-l-2 border-line pl-3 text-sm">{project.knownIssue}</p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-hover px-3 py-1 text-xs">
            {tech}
          </li>
        ))}
      </ul>

      {/* mt-auto pins the links to the bottom, so they line up across
          cards of different heights in the same row. */}
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <LuGithub className="size-4" />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <LuExternalLink className="size-4" />
            Live demo
          </a>
        )}
      </div>
    </article>
  )
}
