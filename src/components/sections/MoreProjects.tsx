import { projects } from '../../data/projects';
import { SectionHeader } from '../ui/SectionHeader';
import { CompactProjectCard } from './ProjectCard';

const other = projects.filter(project => project.group === 'other');

export function MoreProjects() {
  return (
    <section
      id="more-projects"
      aria-labelledby="more-projects-heading"
      className="container-page scroll-mt-20"
    >
      <SectionHeader
        number="02"
        eyebrow="More Projects"
        title="Earlier work and smaller builds."
        headingId="more-projects-heading"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {other.map(project => (
          <CompactProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
