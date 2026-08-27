import { LuArrowRight, LuDownload } from 'react-icons/lu';
import cv from '../../assets/docs/sebastian-stanton-cv.pdf';
import photo from '../../assets/images/photo.jpg';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { ScrollCue } from '../ui/ScrollCue';
import { TechIcon } from '../ui/TechIcon';

// Flip true once the real cut-out photo replaces assets/images/photo.jpg.
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
      // svh, not vh, since mobile toolbars change the visible height; 5rem clears the navbar.
      className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20"
    >
      {/* Side by side from lg up, stacked below it; single column without the photo. */}
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

          {/* Drops a step at lg when the photo takes half the row, to avoid an awkward break. */}
          <h1
            className={`mt-6 text-5xl font-semibold tracking-tight text-heading ${
              SHOW_PHOTO ? 'sm:text-6xl' : 'sm:text-7xl'
            }`}
          >
            Sebastian Stanton
          </h1>

          {/* Tech names lifted to heading colour so a skim picks up the stack; {' '} keeps real spaces JSX would drop. */}
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
            {/* The built file is fingerprinted, so `download` gives it a proper name. */}
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

      {/* Muted until hovered, when the brand colour appears; keeps the hero calm. */}
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

      {/* Sits at the foot of the first screen and clears as soon as the page moves. */}
      <ScrollCue
        href="#about"
        label="About Me"
        className="absolute inset-x-0 bottom-2 mx-auto w-fit"
      />
    </section>
  );
}

// Built for a cut-out photo; the gold glow gives it something to sit on.
// Sized by the column width, not fixed pixels, so it scales with the browser.
function HeroPhoto() {
  return (
    // isolate keeps the glow's negative z-index inside this box, instead of
    // escaping to the root and painting behind the page gradient.
    <div className="relative isolate mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
      {/* Sits behind the figure, hence the negative z and aria-hidden. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--accent)_0%,transparent_65%)] opacity-20 blur-2xl"
      />
      <img
        src={photo}
        // Decorative here: the name beside it already says who this is.
        alt=""
        // object-bottom keeps the figure grounded as it scales, instead of drifting up.
        className="h-auto w-full object-contain object-bottom"
      />
    </div>
  );
}
