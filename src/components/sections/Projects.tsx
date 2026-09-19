import { projects } from '../../data/projects';
import { useNearViewport } from '../../hooks/useNearViewport';
import { useWarmBackends } from '../../hooks/useWarmBackends';
import { Reveal } from '../motion/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { FeaturedProjectCard } from './ProjectCard';

// Filtered once at module scope rather than on every render.
const featured = projects.filter(project => project.group === 'featured');

export function Projects() {
  // Only wake the Render backends once someone scrolls this far, not on every visit.
  const [ref, near] = useNearViewport<HTMLElement>();
  useWarmBackends(near);

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-heading"
      // Clipped, so nothing revealing itself can widen the page on a phone.
      className="container-page overflow-x-clip pt-16"
    >
      <SectionHeader
        number="01"
        eyebrow="Projects"
        title="Featured Projects"
        headingId="projects-heading"
      />

      <Reveal className="mt-6">
        <p className="measure-text text-xl leading-relaxed">
          Each of these is live, with its own domain, API and database.
        </p>
      </Reveal>

      {/* One per row, full width, so each gets room for its screenshot. */}
      {/* A trigger per card, not one for the group: the group is taller than the
          screen, so all three used to move while you were still on the first. */}
      <div className="mt-10 grid gap-6">
        {featured.map(project => (
          <Reveal key={project.id}>
            <FeaturedProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
