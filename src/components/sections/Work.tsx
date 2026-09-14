import { projects } from '../../data/projects';
import { useNearViewport } from '../../hooks/useNearViewport';
import { useWarmBackends } from '../../hooks/useWarmBackends';
import { SectionHeader } from '../ui/SectionHeader';
import { FeaturedProjectCard } from './ProjectCard';

// Filtered once at module scope rather than on every render.
const featured = projects.filter(project => project.group === 'featured');

export function Work() {
  // Only wake the Render backends once someone scrolls this far, not on every visit.
  const [ref, near] = useNearViewport<HTMLElement>('600px');
  useWarmBackends(near);

  return (
    <section
      ref={ref}
      id="work"
      aria-labelledby="work-heading"
      className="container-page scroll-mt-20 pt-16"
    >
      <SectionHeader
        number="01"
        eyebrow="Selected Work"
        title="Full-stack apps, built and deployed."
        headingId="work-heading"
      />

      <p className="mt-6 max-w-2xl text-xl leading-relaxed">
        Each of these runs on its own domain with its own API and database.
        Where something is unfinished or does not work yet, it says so.
      </p>

      {/* One per row, full width, so each gets room for its screenshot. */}
      <div className="mt-10 grid gap-6">
        {featured.map(project => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
