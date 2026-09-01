import { useState } from 'react';
// Imported, not in public, so Vite fingerprints them and a missing file fails the build.
import fullStackBootcamp from '../../assets/images/full-stack-bootcamp.jpg';
import medscheme from '../../assets/images/medscheme.jpeg';
import pythonDeveloper from '../../assets/images/python-developer.jpg';
import softwareEngineeringBootcamp from '../../assets/images/software-engineering-bootcamp.jpeg';
import webDevelopment from '../../assets/images/web-development.jpg';
import { CertificateStack, type Certificate } from '../ui/CertificateStack';
import { Lightbox } from '../ui/Lightbox';
import { ScrollCue } from '../ui/ScrollCue';
import { SectionLabel } from '../ui/SectionLabel';

// Quick facts, kept beside the prose so the section scans as well as it reads.
const facts = [
  {
    value: '9 Years',
    label: 'in fast-paced, high-accuracy, customer-first roles',
  },
  { value: '2', label: 'HyperionDev bootcamps completed' },
  { value: 'Cape Town', label: 'South Africa' },
];

// The route from admin into development, most recent first.
const timeline = [
  {
    period: 'Aug 2026 to Present',
    title: 'Independent Developer',
    detail:
      "Since August 2026, I've been building full time, developing and maintaining projects primarily with JavaScript, React, Node.js, Express, MongoDB and Bootstrap. I am expanding my skills by learning TypeScript and Tailwind CSS, and am using them on this portfolio. My featured projects are deployed using Vercel, Render and MongoDB Atlas.",
    images: [],
  },
  {
    period: 'Mar 2026 to Jul 2026',
    title: 'Full Stack Web Developer Bootcamp',
    detail:
      'HyperionDev. Studied JavaScript, React, Node.js, Express, MongoDB, automated testing and JWT authentication across four capstone projects and several smaller projects while working full time. Built full-stack applications using REST APIs, React Hooks, routing, form validation, responsive design and accessible interfaces.',
    images: [
      {
        src: fullStackBootcamp,
        alt: 'HyperionDev Full Stack Web Developer certificate',
        portrait: true,
      },
    ],
  },
  {
    period: 'Dec 2023 to May 2024',
    title: 'Software Engineering Bootcamp',
    detail:
      'HyperionDev. Python, SQL and SQLite, object-oriented programming, Git and Agile, with Sphinx for documentation. This was where I developed a stronger foundation in programming and software engineering principles.',
    images: [
      {
        src: softwareEngineeringBootcamp,
        alt: 'HyperionDev Software Engineering bootcamp certificate',
      },
    ],
  },
  {
    period: 'May 2023 to Dec 2023',
    title: 'Started Writing Code',
    detail:
      'Completed Python courses and studied HTML, CSS and JavaScript through Sololearn in my own time alongside full-time work. I started with Python before moving towards JavaScript because building for the browser felt more visual, immediate and interactive, which suited my artistic side.',
    // Web development sits in front, Python behind it.
    images: [
      {
        src: webDevelopment,
        alt: 'Sololearn Web Development certificate',
        label: 'Web Development certificate',
      },
      {
        src: pythonDeveloper,
        alt: 'Sololearn Python Developer certificate',
        label: 'Python Developer certificate',
      },
    ],
  },
  {
    period: 'Aug 2017 to Jul 2026',
    title: 'Medical Aid Administration',
    detail:
      'Nine years in medical aid administration, progressing from call agent to back-office support and then digital live chat, where I began learning coding in my free time. I was a founding agent on Bonitas’ first live chat system, where I developed the message templates and process standards the team went on to adopt. I also helped identify problems with the system and worked with the development team and management to find solutions.',
    images: [
      {
        src: medscheme,
        alt: 'Medscheme certificate of service',
        portrait: true,
      },
    ],
  },
];

export function About() {
  // Which certificate is open full size, if any.
  const [open, setOpen] = useState<Certificate | null>(null);

  return (
    // scroll-mt keeps the heading clear of the sticky header when jumped to.
    <section id="about" className="scroll-mt-20 border-t border-line py-24">
      <SectionLabel>About</SectionLabel>

      <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        From Medical Aid Administration to Full-Stack Development
      </h2>

      {/* Prose takes two thirds, facts sit alongside from medium screens up. */}
      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="space-y-5 text-xl leading-relaxed md:col-span-2">
          <p>
            I spent nine years at Medscheme in medical aid administration,
            working across claims assessment, membership administration and,
            most recently, digital live chat. It was detailed work under time
            pressure, where being accurate mattered as much as being fast.
          </p>
          <p>
            The thread running through all of it was improving the process
            rather than just working inside it. I was one of the founding agents
            for Bonitas’ first live chat system and wrote message templates and
            standards that were adopted across the team, authored a training
            guide still used to onboard new agents, and helped build a shared
            process-reference tool used company-wide.
          </p>
          <p>
            I moved into development through HyperionDev, first a Software
            Engineering bootcamp covering Python, SQL and object-oriented
            programming, then a Full Stack Web Developer bootcamp in JavaScript,
            React, Node, Express and MongoDB. I am now looking for a junior or
            graduate developer role, and still learning in the open: this site
            is where I am picking up TypeScript and Tailwind.
          </p>
        </div>

        <dl className="space-y-6">
          {facts.map(fact => (
            <div
              key={fact.value}
              className="border-l-2 border-accent-soft pl-4"
            >
              <dt className="text-2xl font-semibold text-heading">
                {fact.value}
              </dt>
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
        <ol className="mt-8 space-y-6 border-l border-line pl-8">
          {timeline.map(entry => (
            // Text left, certificates right from medium screens up.
            <li
              key={entry.title}
              className="relative md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8"
            >
              <span className="absolute -left-[2.3rem] top-1.5 size-2.5 rotate-45 border border-accent bg-surface" />

              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  {entry.period}
                </p>
                <p className="mt-1 text-lg font-medium text-heading">
                  {entry.title}
                </p>
                <p className="mt-1 leading-relaxed">{entry.detail}</p>
              </div>

              {entry.images.length > 0 && (
                <div className="mt-4 md:mt-0">
                  <CertificateStack images={entry.images} onOpen={setOpen} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {open && (
        <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
