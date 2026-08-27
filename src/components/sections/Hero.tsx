import { LuArrowRight, LuDownload } from 'react-icons/lu';
import cv from '../../assets/docs/sebastian-stanton-cv.pdf';
import photo from '../../assets/images/photo.jpg';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { ScrollCue } from '../ui/ScrollCue';
import { TechIcon } from '../ui/TechIcon';

/*
 * Flip to true once the real cut-out photo replaces assets/images/photo.jpg.
 * The two column layout below only appears when this is on, so the hero
 * stays as it was until the picture is ready.
 */
const SHOW_PHOTO = false;

// Names key into data/tech.ts, where the logos and colours live.
const techs = [
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'Python',
];

export function Hero() {
  return (
    <section
      id="home"
      // svh over vh because mobile toolbars change the visible height.
      // The 5rem leaves room for the navbar.
      className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20"
    >
      {/* Text and photo sit side by side from the large breakpoint up, and
          stack below it. Without the photo it stays a single column. */}
      <div
        className={
          SHOW_PHOTO
            ? 'grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16'
            : ''
        }
      >
        <div>
          <p className="flex items-center gap-2 text-sm">
            {/* Two stacked circles: the lower one pings outwards, the solid one stays. */}
            <span className="relative flex size-2">
              {/* Decorative, so it stops for anyone asking for less motion. */}
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to Junior Developer Roles
          </p>

          {/* Drops a step at large sizes when the photo takes half the row,
              so the name does not break awkwardly. */}
          <h1
            className={`mt-6 text-5xl font-semibold tracking-tight text-heading ${
              SHOW_PHOTO ? 'sm:text-6xl' : 'sm:text-7xl'
            }`}
          >
            Sebastian Stanton
          </h1>

          {/* Tech names lifted to heading colour so a skim picks up the stack.
              The {' '} are real spaces, which JSX would otherwise drop at line ends. */}
          <p className="mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl">
            Junior Full-Stack Developer building with{' '}
            <span className="text-heading">React</span>,{' '}
            <span className="text-heading">Node</span> and{' '}
            <span className="text-heading">MongoDB</span>.
          </p>

          <p className="mt-3 text-sm">Cape Town, South Africa</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink to="/projects">
              View my work
              {/* group is on the button, so the arrow moves on any hover of it. */}
              <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
            {/* The built file name is fingerprinted, so download names it. */}
            <ButtonAnchor
              href={cv}
              variant="secondary"
              download="sebastian-stanton-cv.pdf"
            >
              <LuDownload className="size-4" />
              CV
            </ButtonAnchor>
          </div>
        </div>

        {SHOW_PHOTO && <HeroPhoto />}
      </div>

      {/* Muted until hovered, when the brand colour comes up. Keeps the
          hero calm while still rewarding a bit of curiosity. */}
      <ul className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-4">
        {techs.map(name => (
          <li key={name} title={name}>
            <TechIcon
              tech={name}
              label={name}
              className="size-7 opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 active:scale-110 active:opacity-100"
            />
          </li>
        ))}
      </ul>

      {/* Sits at the foot of the first screen and clears out as soon as
          the page moves, since by then it has done its job. */}
      <ScrollCue
        href="#about"
        label="About Me"
        className="absolute inset-x-0 bottom-2 mx-auto w-fit"
      />
    </section>
  );
}

/*
 * Built for a cut-out photo with no background of its own.
 *
 * The gold glow behind gives the figure something to sit on, since a
 * floating cut-out with nothing behind it looks like a mistake. Sizing is
 * driven by the column width, so it scales with the browser rather than
 * being pinned to fixed pixels.
 */
function HeroPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
      {/* Sits behind the figure, hence the negative z and aria-hidden. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--accent)_0%,transparent_65%)] opacity-20 blur-2xl"
      />
      <img
        src={photo}
        // Decorative here: the name beside it already says who this is.
        alt=""
        // object-bottom so the figure stands on the base of the box as it
        // scales, rather than drifting up and cropping at the feet.
        className="h-auto w-full object-contain object-bottom"
      />
    </div>
  );
}
