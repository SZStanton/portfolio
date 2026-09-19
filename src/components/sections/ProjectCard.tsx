import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import {
  LuExternalLink,
  LuArrowRight,
  LuGithub,
  LuTriangleAlert,
} from 'react-icons/lu';
import { useNearViewport } from '../../hooks/useNearViewport';
import type { Project, ProjectKind } from '../../types';
import { Lightbox } from '../ui/Lightbox';
import { TechIcon } from '../ui/TechIcon';

// Record requires a label per kind, so an unlabelled one fails the build.
const kindLabels: Record<ProjectKind, string> = {
  'full-stack': 'Full Stack',
  'front-end': 'Front End',
  database: 'Database',
};

export function StackTags({ stack }: { stack: string[] }) {
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

export function Links({ project }: { project: Project }) {
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
      {project.caseStudy && (
        <Link
          to={`/projects/${project.id}`}
          className="group inline-flex items-center gap-2 transition-colors hover:text-accent active:text-accent"
        >
          Case study
          <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
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
  // A CSS background never lazy-loads, so the urls are withheld until the card
  // is nearly on screen. bg-hover fills the box meanwhile so nothing flashes.
  const [ref, near] = useNearViewport<HTMLButtonElement>();

  if (!project.screenshot) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`View a larger screenshot of ${project.title}`}
      style={
        {
          ...(near && {
            '--shot-light': `url(${project.screenshot.light})`,
            '--shot-dark': `url(${project.screenshot.dark})`,
          }),
          '--shot-ratio': String(project.screenshot.ratio),
        } as CSSProperties
      }
      /* Stacked: the box takes the image's ratio, so cover crops nothing.
         Beside the text: cover crops to the card height, masked at the edge.
         Hover: expands over the full card on purpose, covering the links.
         z-20 is permanent, not on hover: it cannot be transitioned, so dropping
         it on mouse-out let the text paint through the shrinking image. */
      className="aspect-[var(--shot-ratio)] w-full shrink-0 overflow-hidden bg-hover bg-[image:var(--shot-light)] bg-cover bg-left-top bg-no-repeat [mask-image:linear-gradient(to_bottom,black_80%,transparent)] dark:bg-[image:var(--shot-dark)] lg:absolute lg:inset-y-0 lg:left-0 lg:z-20 lg:aspect-auto lg:w-[42%] lg:transition-[width] lg:duration-700 lg:ease-out lg:[mask-image:linear-gradient(to_right,black_80%,transparent)] lg:hover:w-full lg:hover:[mask-image:none]"
    />
  );
}

// The featured projects. Everything in the data gets shown.
export function FeaturedProjectCard({ project }: { project: Project }) {
  // Chosen at click time, since the theme cannot change before the box opens.
  const [enlarged, setEnlarged] = useState<string | null>(null);

  const openLightbox = () => {
    if (!project.screenshot) return;
    const dark = document.documentElement.classList.contains('dark');
    setEnlarged(dark ? project.screenshot.dark : project.screenshot.light);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line-accent bg-surface-raised shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent-soft hover:shadow-lift active:translate-y-0 active:border-accent">
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
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-heading transition-colors group-hover:text-accent">
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
    <article className="group flex flex-col rounded-xl border border-line bg-surface-raised p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent-soft hover:shadow-lift active:translate-y-0 active:border-accent">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.15em]">
          {kindLabels[project.kind]}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold text-heading transition-colors group-hover:text-accent">
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
