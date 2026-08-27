import {
  CompactProjectCard,
  FeaturedProjectCard,
} from '../components/sections/ProjectCard';
import { SectionLabel } from '../components/ui/SectionLabel';
import { projects } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWarmBackends } from '../hooks/useWarmBackends';

// Split once here rather than filtering twice further down.
const featured = projects.filter(project => project.group === 'featured');
const other = projects.filter(project => project.group === 'other');

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-heading">
      {children}
      <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
    </h2>
  );
}

export function Projects() {
  useDocumentTitle('Projects');
  // Wakes the sleeping Render backends behind the live demos.
  useWarmBackends();

  return (
    <section className="pb-24 pt-16">
      <SectionLabel>Work</SectionLabel>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        Projects
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        Full-stack web apps, front-end builds and command-line tools, most of
        them still being improved. Where something is unfinished or does not
        work yet, it says so.
      </p>

      <div className="mt-14">
        <SectionHeading>Featured</SectionHeading>
        {/* One per row, full width, so each gets room for its screenshot. */}
        <div className="mt-6 grid gap-6">
          {featured.map(project => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading>Also Worth a Look</SectionHeading>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {other.map(project => (
            <CompactProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
