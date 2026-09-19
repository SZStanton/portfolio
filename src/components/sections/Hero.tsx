import { m } from 'motion/react';
import type { CSSProperties } from 'react';
import { LuArrowRight, LuDownload } from 'react-icons/lu';
import { useHeroParallax, useParallax } from '../../hooks/useParallax';
import cv from '../../assets/docs/sebastian-stanton-cv.pdf';
import portraitDark from '../../assets/images/portrait-dark.webp';
import portraitLight from '../../assets/images/portrait-light.webp';
import { DecoLayer } from '../deco/DecoLayer';
import { Skyline } from '../deco/Skyline';
import { Sunburst } from '../deco/Sunburst';
import { RevealGroup, RevealItem } from '../motion/Reveal';
import { RevealWords } from '../motion/RevealWords';
import { ButtonAnchor } from '../ui/Button';
import { TechIcon } from '../ui/TechIcon';

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
  const drift = useHeroParallax();

  return (
    <section
      id="home"
      // svh, not vh, since mobile toolbars change the visible height; 5rem clears the navbar.
      className="relative isolate flex min-h-[var(--hero-min)] flex-col justify-center overflow-clip pb-0 pt-10 [--figure:min(58vw,52svh)] sm:pt-20 side:py-20"
    >
      <DecoLayer speed={70}>
        <Sunburst />
      </DecoLayer>

      <HeroBackdrop />

      <m.div
        style={drift}
        // The figure's band plus the smallest gap allowed above its head, since
        // it no longer takes up room in the flow.
        className="container-page relative z-10 flex flex-1 flex-col pb-[calc(var(--figure)+2rem)] side:pb-0"
      >
        {/* Stacked, spare height collects above the copy, so the tech row keeps a
            fixed distance from the head below it. Side by side there is no figure
            underneath, so it goes back to sitting in the middle. */}
        <div className="mt-auto side:my-auto">
          {/* Leaves the right of the row to the figure, which needs more of it
            at tablet width than it does once the row is wider. */}
          <div className="side:max-w-[76%] wide:max-w-[64%]">
            <RevealGroup gap={0.08}>
              <RevealItem className="flex items-center gap-2 text-sm">
                {/* Two stacked circles: the lower one pings outwards, the solid one stays. */}
                <span className="relative flex size-2">
                  {/* Decorative, so it stops for anyone asking for less motion. */}
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Open to Junior Developer Roles
              </RevealItem>

              {/* Sized off the viewport rather than a step scale, so the name
                stays on one line from 320px up. Narrower rule once the figure
                takes the right of the row and the copy only has 64%. */}
              <h1 className="mt-6 text-[clamp(1.75rem,calc(12vw-8px),4rem)] font-semibold tracking-tight text-heading wide:text-[clamp(1.75rem,calc(57px+0.73vw),5.5rem)]">
                <RevealWords text="Sebastian Stanton" gap={0.09} />
              </h1>

              {/* Tech names lifted to heading colour so a skim picks up the stack; {' '} keeps real spaces JSX would drop. */}
              <RevealItem className="mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl side:text-xl wide:text-2xl">
                {/* Broken after 'with' so the stack always starts its own line. */}
                Junior Full-Stack Developer building with
                <br />
                <span className="text-heading">React</span>,{' '}
                <span className="text-heading">Node</span> and{' '}
                <span className="text-heading">MongoDB</span>.
              </RevealItem>

              <RevealItem className="mt-3 text-sm">
                Cape Town, South Africa
              </RevealItem>

              {/* Tighter buttons while the row is shared with the figure; the CV
                one drops to a second line when even that does not fit. */}
              <RevealItem className="mt-10 flex flex-wrap items-center gap-2.5">
                <ButtonAnchor href="#projects">
                  View my work
                  {/* group is on the button, so the arrow moves on any hover of it. */}
                  <LuArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </ButtonAnchor>
                <ButtonAnchor href="#contact" variant="secondary">
                  Get in touch
                </ButtonAnchor>
                {/* Forces the wrap, so CV sits under View my work below laptop.
                  It rejoins the row at lg, where the figure has pulled clear. */}
                <div className="basis-full lg:hidden" />
                {/* The built file is fingerprinted, so `download` gives it a proper name. */}
                <ButtonAnchor
                  href={cv}
                  variant="secondary"
                  download="sebastian-stanton-cv.pdf"
                >
                  <LuDownload className="size-4" />
                  CV
                </ButtonAnchor>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Muted until hovered, when the brand colour appears; keeps the hero calm. */}
          <RevealGroup
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-16 side:mt-10 wide:mt-16"
            gap={0.05}
            as="ul"
          >
            {techs.map(name => (
              <RevealItem as="li" key={name} title={name} move="pop">
                <TechIcon
                  tech={name}
                  label={name}
                  className="size-6 opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 active:scale-110 active:opacity-100 wide:size-7"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </m.div>
    </section>
  );
}

// The ridge and the figure share one transform, or the figure lifts off the
// mountain on scroll. Outside DecoLayer, since the ridge paints at full strength.
function HeroBackdrop() {
  const { ref, style } = useParallax(14);

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      style={style}
      className="pointer-events-none absolute inset-0 -z-10 text-deco-ink"
    >
      {/* Wider than the phone screen and pulled left, so the ridge keeps its
          proportions instead of being squashed into a zigzag. */}
      <Skyline className="absolute inset-x-0 -bottom-12 ml-[-12%] h-56 w-[124%] xs:h-64 sm:ml-0 sm:h-[21rem] sm:w-full" />

      {/* After the ridge, so the figure stands in front of the mountain rather
          than being cut off by it. */}
      {/* 110% of the hero always clears the 6rem navbar gap, so that and 52vw
          are the two that bite. */}
      <HeroPhoto className="absolute inset-y-0 right-[-4%] hidden bg-right-bottom side:block side:w-[62%] side:bg-[length:auto_min(calc(100%-6rem),52vw)]" />
      {/* Below the side-by-side breakpoint the figure sits under the copy, sized
          off the width with a height cap for short windows. */}
      <HeroPhoto className="absolute inset-x-0 bottom-0 h-[var(--figure)] bg-contain bg-bottom side:hidden" />
    </m.div>
  );
}

// The cut-out portrait, one file per theme. A background image rather than two
// <img> tags, so only the active theme's file downloads.
function HeroPhoto({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          '--portrait-light': `url(${portraitLight})`,
          '--portrait-dark': `url(${portraitDark})`,
        } as CSSProperties
      }
      className={`pointer-events-none bg-[image:var(--portrait-light)] bg-no-repeat dark:bg-[image:var(--portrait-dark)] ${className ?? ''}`}
    />
  );
}
