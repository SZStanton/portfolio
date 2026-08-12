import { useState } from 'react'
import { Lightbox } from '../ui/Lightbox'
import { ScrollCue } from '../ui/ScrollCue'
import { SectionLabel } from '../ui/SectionLabel'

// Quick facts, kept beside the prose so the section scans as well as it reads.
const facts = [
  { value: '9 Years', label: 'in fast-paced, high-accuracy admin roles' },
  { value: '2', label: 'HyperionDev bootcamps completed' },
  { value: 'Cape Town', label: 'South Africa' },
]

// The route from admin into development, most recent first.
// Images live in public/, so they are referenced from the site root.
const timeline = [
  {
    period: 'Now',
    title: 'Building and Still Learning',
    detail: 'TypeScript, Tailwind and Docker, picked up on this site and on my own projects.',
    images: [],
  },
  {
    period: '2026',
    title: 'Full Stack Web Developer Bootcamp',
    detail:
      'HyperionDev. JavaScript, React, Node, Express, MongoDB and JWT authentication, across four capstone projects.',
    images: [
      { src: '/full-stack-bootcamp.png', alt: 'HyperionDev Full Stack Web Developer certificate' },
    ],
  },
  {
    period: '2023 to 2024',
    title: 'Software Engineering Bootcamp',
    detail: 'HyperionDev. Python, SQL and SQLite, object-oriented programming, Git and Agile.',
    images: [
      {
        src: '/software-engineering-bootcamp.jpeg',
        alt: 'HyperionDev Software Engineering bootcamp certificate',
      },
    ],
  },
  {
    period: '2023',
    title: 'Started Writing Code',
    detail: 'Python and web development through Sololearn, in my own time alongside full-time work.',
    images: [
      { src: '/python-intermediate.jpg', alt: 'Sololearn Python Intermediate certificate' },
      { src: '/web-development.jpg', alt: 'Sololearn Web Development certificate' },
    ],
  },
  {
    period: '2014 to 2026',
    title: 'Medical Aid Administration',
    detail:
      'Claims assessment, membership administration, then digital live chat at Medscheme. Founding agent on Bonitas’ first live chat system.',
    images: [{ src: '/medscheme.jpeg', alt: 'Medscheme certificate of service' }],
  },
]

export function About() {
  // Which certificate is open full size, if any.
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null)

  return (
    // scroll-mt keeps the heading clear of the sticky header when
    // the hero button jumps down to here.
    <section id="about" className="scroll-mt-20 border-t border-line py-24">
      <SectionLabel>About</SectionLabel>

      <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        From Medical Aid Administration to Full-Stack Development
      </h2>

      {/* Prose takes two thirds, facts sit alongside from medium screens up. */}
      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="space-y-5 text-xl leading-relaxed md:col-span-2">
          <p>
            I spent nine years at Medscheme in medical aid administration, working across claims
            assessment, membership administration and, most recently, digital live chat. It was
            detailed work under time pressure, where being accurate mattered as much as being fast.
          </p>
          <p>
            The thread running through all of it was improving the process rather than just working
            inside it. I was one of the founding agents for Bonitas' first live chat system and
            wrote message templates and standards that were adopted across the team, authored a
            training guide still used to onboard new agents, and helped build a shared
            process-reference tool used company-wide.
          </p>
          <p>
            I moved into development through HyperionDev, first a Software Engineering bootcamp
            covering Python, SQL and object-oriented programming, then a Full Stack Web Developer
            bootcamp in JavaScript, React, Node, Express and MongoDB. I am now looking for a junior
            or graduate developer role, and still learning in the open: this site is where I am
            picking up TypeScript and Tailwind.
          </p>
        </div>

        <dl className="space-y-6">
          {facts.map((fact) => (
            <div key={fact.value} className="border-l-2 border-accent-soft pl-4">
              <dt className="text-2xl font-semibold text-heading">{fact.value}</dt>
              <dd className="mt-1 text-sm">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Hangs on longer than the hero cue, since Experience is right below it. */}
      <ScrollCue
        href="#experience"
        label="Experience"
        fadeAt={280}
        className="mx-auto mt-16 w-fit"
      />

      <div id="experience" className="mt-16 scroll-mt-20">
        <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-heading">
          Experience
          <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
        </h3>

        {/* Gold line down the left, with a diamond marking each step. */}
        <ol className="mt-8 space-y-8 border-l border-line pl-8">
          {timeline.map((entry) => (
            <li key={entry.title} className="relative">
              <span className="absolute -left-[2.3rem] top-1.5 size-2.5 rotate-45 border border-accent bg-surface" />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {entry.period}
              </p>
              <p className="mt-1 text-lg font-medium text-heading">{entry.title}</p>
              <p className="mt-1 leading-relaxed">{entry.detail}</p>

              {entry.images.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {entry.images.map(image => (
                    <li key={image.src}>
                      <button
                        type="button"
                        onClick={() => setOpen(image)}
                        aria-label={`View ${image.alt}`}
                        className="block overflow-hidden rounded-md border border-line bg-surface-raised shadow-card transition-all duration-300 hover:scale-110 hover:border-accent-soft active:scale-110"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="h-36 w-52 object-cover object-top"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>

      {open && <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />}
    </section>
  )
}
