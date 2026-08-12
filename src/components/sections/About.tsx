// Quick facts, kept beside the prose so the section scans as well as it reads.
const facts = [
  { value: '9 Years', label: 'in fast-paced, high-accuracy admin roles' },
  { value: '2', label: 'HyperionDev bootcamps completed' },
  { value: 'Cape Town', label: 'South Africa' },
]

// The route from admin into development, most recent first.
const timeline = [
  {
    period: 'Now',
    title: 'Building and Still Learning',
    detail: 'TypeScript, Tailwind and Docker, picked up on this site and on my own projects.',
  },
  {
    period: '2026',
    title: 'Full Stack Web Developer Bootcamp',
    detail:
      'HyperionDev. JavaScript, React, Node, Express, MongoDB and JWT authentication, across four capstone projects.',
  },
  {
    period: '2023 to 2024',
    title: 'Software Engineering Bootcamp',
    detail: 'HyperionDev. Python, SQL and SQLite, object-oriented programming, Git and Agile.',
  },
  {
    period: '2023',
    title: 'Started Writing Code',
    detail: 'Python and web development through Sololearn, in my own time alongside full-time work.',
  },
  {
    period: '2014 to 2026',
    title: 'Medical Aid Administration',
    detail:
      'Claims assessment, membership administration, then digital live chat at Medscheme. Founding agent on Bonitas’ first live chat system.',
  },
]

export function About() {
  return (
    <section id="about" className="border-t border-line py-24">
      {/* Letterspaced gold label above the heading, the first real deco touch. */}
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">About</p>

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

      <div className="mt-20">
        <h3 className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-heading">
          How I Got Here
          <span className="h-px flex-1 bg-gradient-to-r from-accent-soft to-transparent" />
        </h3>

        {/* Gold line down the left, with a diamond marking each step. */}
        <ol className="mt-8 space-y-8 border-l border-line pl-8">
          {timeline.map((entry) => (
            <li key={entry.title} className="relative">
              <span className="absolute -left-[2.3rem] top-1.5 size-2.5 rotate-45 border border-accent bg-surface" />
              <p className="text-xs uppercase tracking-[0.15em] text-accent">{entry.period}</p>
              <p className="mt-1 text-lg font-medium text-heading">{entry.title}</p>
              <p className="mt-1 leading-relaxed">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
