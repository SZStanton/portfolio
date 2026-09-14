import { useState, type CSSProperties } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router';
import { ProjectPager } from '../components/layout/ProjectPager';
import { Links, StackTags } from '../components/sections/ProjectCard';
import { Lightbox } from '../components/ui/Lightbox';
import { SectionLabel } from '../components/ui/SectionLabel';
import { caseStudies } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProjectArrowKeys } from '../hooks/useProjectArrowKeys';
import { useWarmBackends } from '../hooks/useWarmBackends';
import { NotFound } from './NotFound';

function Prose({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold tracking-tight text-heading">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-xl leading-relaxed">
        {body.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function CaseStudy() {
  const { id } = useParams();
  const index = caseStudies.findIndex(project => project.id === id);
  const project = caseStudies[index];

  // Falls back rather than going unset, because this component owns the title
  // even when it hands off to NotFound below.
  useDocumentTitle(project?.title ?? 'Page not found');
  useProjectArrowKeys(index);
  // Anyone reading this far is the visitor most likely to click a live demo.
  useWarmBackends(Boolean(project));

  const [enlarged, setEnlarged] = useState<string | null>(null);

  // Rendered in place rather than redirected, so the bad URL stays visible.
  if (!project?.caseStudy) return <NotFound />;

  const { caseStudy, screenshot } = project;

  const openLightbox = () => {
    if (!screenshot) return;
    const dark = document.documentElement.classList.contains('dark');
    setEnlarged(dark ? screenshot.dark : screenshot.light);
  };

  return (
    <article className="container-page pb-24 pt-16">
      <Link
        to="/#projects"
        className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-accent active:text-accent"
      >
        <LuArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to projects
      </Link>

      <div className="mt-8">
        <SectionLabel>Case Study</SectionLabel>
      </div>

      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        {project.title}
      </h1>

      <p className="mt-5 max-w-2xl text-xl leading-relaxed text-heading">
        {caseStudy.tagline}
      </p>

      <div className="mt-8">
        <StackTags stack={project.stack} />
      </div>

      <div className="mt-6">
        <Links project={project} />
      </div>

      {screenshot && (
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`View a larger screenshot of ${project.title}`}
          style={
            {
              '--shot-light': `url(${screenshot.light})`,
              '--shot-dark': `url(${screenshot.dark})`,
              '--shot-ratio': String(screenshot.ratio),
            } as CSSProperties
          }
          // Loads eagerly on purpose: this is the largest thing on the page, so
          // deferring it would only delay the paint everything else waits on.
          className="mt-10 aspect-[var(--shot-ratio)] w-full overflow-hidden rounded-xl border border-line bg-hover bg-[image:var(--shot-light)] bg-cover bg-left-top bg-no-repeat shadow-card dark:bg-[image:var(--shot-dark)]"
        />
      )}

      <Prose heading="The problem" body={caseStudy.problem} />
      <Prose heading="How I built it" body={caseStudy.approach} />

      {caseStudy.decisions && (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-heading">
            Decisions
          </h2>
          <ul className="mt-6 space-y-6">
            {caseStudy.decisions.map(decision => (
              <li
                key={decision.title}
                className="border-l-2 border-accent-soft pl-5"
              >
                <h3 className="font-semibold text-heading">{decision.title}</h3>
                <p className="mt-2 leading-relaxed">{decision.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Prose heading="What I learned" body={caseStudy.learned} />

      {enlarged && (
        <Lightbox
          src={enlarged}
          alt={`Screenshot of ${project.title}`}
          liveUrl={project.liveUrl}
          onClose={() => setEnlarged(null)}
        />
      )}

      <ProjectPager index={index} />
    </article>
  );
}
