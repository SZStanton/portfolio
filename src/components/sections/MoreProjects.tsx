import { projects } from '../../data/projects';
import { RevealGroup, RevealItem } from '../motion/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { CompactProjectCard } from './ProjectCard';

const other = projects.filter(project => project.group === 'other');

export function MoreProjects() {
  return (
    <section
      id="more-projects"
      aria-labelledby="more-projects-heading"
      className="container-page"
    >
      <SectionHeader
        number="02"
        eyebrow="More Projects"
        title="Earlier & Smaller Projects"
        headingId="more-projects-heading"
      />

      {/* Cards cascade down the grid on the same gap the skills use. */}
      <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2" gap={0.13}>
        {other.map(project => (
          <RevealItem key={project.id}>
            <CompactProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
