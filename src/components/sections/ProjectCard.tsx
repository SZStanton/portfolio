import { useState, type CSSProperties } from 'react';
import {
  LuCheck,
  LuExternalLink,
  LuGithub,
  LuTriangleAlert,
} from 'react-icons/lu';
import type { Project, ProjectKind } from '../../types';
import { Lightbox } from '../ui/Lightbox';
import { TechIcon } from '../ui/TechIcon';

// Record requires a label per kind, so an unlabelled one fails the build.
const kindLabels: Record<ProjectKind, string> = {
  'full-stack': 'Full Stack',
  'front-end': 'Front End',
  database: 'Database',
};

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map(tech => (
        <li
          key={tech}
          // select-none and touch-callout stop a press selecting the text.
          className="flex select-none items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs transition-colors [-webkit-touch-callout:none] hover:border-accent-soft active:border-accent"
        >
          <TechIcon tech={tech} className="size-3.5" />
          {tech}
        </li>
      ))}
    </ul>
  );
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
          Live Demo
        </a>
      )}
    </div>
  );
}

// Background image, not <img>, so only the active theme's file downloads.
function Screenshot({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  if (!project.screenshot) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View a larger screenshot of ${project.title}`}
      style={
        {
          '--shot-light': `url(${project.screenshot.light})`,
          '--shot-dark': `url(${project.screenshot.dark})`,
          '--shot-ratio': String(project.screenshot.ratio),
        } as CSSProperties
      }
      /* Stacked: the box takes the image's ratio, so cover crops nothing.
         Beside the text: cover crops to the card height, masked at the edge.
         Hover: expands over the full card on purpose, covering the links. */
      className="aspect-[var(--shot-ratio)] w-full shrink-0 overflow-hidden bg-[image:var(--shot-light)] bg-cover bg-left-top bg-no-repeat [mask-image:linear-gradient(to_bottom,black_80%,transparent)] dark:bg-[image:var(--shot-dark)] lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-[42%] lg:transition-[width] lg:duration-700 lg:ease-out lg:[mask-image:linear-gradient(to_right,black_80%,transparent)] lg:hover:z-20 lg:hover:w-full lg:hover:[mask-image:none]"
    />
  );
}

// The four capstones. Everything in the data gets shown.
export function FeaturedProjectCard({ project }: { project: Project }) {
  // Chosen at click time, since the theme cannot change before the box opens.
  const [enlarged, setEnlarged] = useState<string | null>(null);

  const openLightbox = () => {
    if (!project.screenshot) return;
    const dark = document.documentElement.classList.contains('dark');
    setEnlarged(dark ? project.screenshot.dark : project.screenshot.light);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface-raised shadow-card transition-colors hover:border-accent-soft active:border-accent">
      {/* Gold rule along the top, brighter on hover. */}
      <span className="h-0.5 w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent transition-opacity group-hover:opacity-100 sm:opacity-70" />

      {/* Screenshot beside the text once there is room for it. */}
      <div className="relative flex flex-1 flex-col">
        {project.screenshot && (
          <Screenshot project={project} onOpen={openLightbox} />
        )}

        {/* Margin clears the panel; relative keeps the text above it as it widens. */}
        <div
          className={`relative flex flex-1 flex-col p-6 sm:p-7 ${
            project.screenshot ? 'lg:ml-[42%] lg:p-8' : ''
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs uppercase tracking-[0.15em]">
              {kindLabels[project.kind]}
            </span>
            {project.capstone && (
              <span className="rounded-full border border-accent-soft px-2.5 py-0.5 text-xs uppercase tracking-wider text-accent">
                Capstone
              </span>
            )}
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-heading">
            {project.title}
          </h3>

          <p className="mt-3 leading-relaxed">{project.description}</p>

          {project.features && (
            <ul className="mt-5 space-y-2 text-[0.9375rem]">
              {project.features.map(feature => (
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

          {/* Always open: a collapsible resized the card and the panel beside it. */}
          {project.futureImprovements && (
            <div className="mt-5">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-heading">
                Improvements
              </p>
              <ul className="mt-3 space-y-2 text-[0.9375rem]">
                {project.futureImprovements.map(item => (
                  <li key={item.text} className="flex gap-3">
                    {item.done ? (
                      <LuCheck className="mt-1 size-4 shrink-0 text-success" />
                    ) : (
                      <span className="mt-2 size-1.5 shrink-0 rotate-45 border border-accent/70" />
                    )}
                    <span
                      className={item.done ? 'line-through opacity-60' : ''}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <StackTags stack={project.stack} />
          </div>

          {/* mt-auto pins the links to the bottom of the column. */}
          <div className="mt-auto pt-6">
            <Links project={project} />
          </div>
        </div>
      </div>

      {enlarged && (
        <Lightbox
          src={enlarged}
          alt={`Screenshot of ${project.title}`}
          liveUrl={project.liveUrl}
          onClose={() => setEnlarged(null)}
        />
      )}
    </article>
  );
}

// The rest. Same information, minus the feature lists.
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-surface-raised p-6 shadow-card transition-colors hover:border-accent-soft active:border-accent">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.15em]">
          {kindLabels[project.kind]}
        </span>
        {project.capstone && (
          <span className="rounded-full border border-accent-soft px-2.5 py-0.5 font-display text-xs font-semibold uppercase tracking-wider text-accent">
            Capstone
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-semibold text-heading">
        {project.title}
      </h3>

      <p className="mt-3 text-[0.9375rem] leading-relaxed">
        {project.description}
      </p>

      {project.knownIssue && (
        <p className="mt-4 border-l-2 border-accent-soft pl-3 text-sm">
          {project.knownIssue}
        </p>
      )}

      <div className="mt-5">
        <StackTags stack={project.stack} />
      </div>

      <div className="mt-auto pt-6">
        <Links project={project} />
      </div>
    </article>
  );
}
