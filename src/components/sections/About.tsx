// Quick facts, kept beside the prose so the section scans as well as it reads.
const facts = [
  { value: '9 years', label: 'in fast-paced, high-accuracy admin roles' },
  { value: '2', label: 'HyperionDev bootcamps completed' },
  { value: 'Cape Town', label: 'South Africa' },
]

export function About() {
  return (
    <section id="about" className="border-t border-line py-24">
      {/* Letterspaced gold label above the heading, the first real deco touch. */}
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">About</p>

      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        From medical aid administration to full-stack development
      </h2>

      {/* Prose takes two thirds, facts sit alongside from medium screens up. */}
      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-2">
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
    </section>
  )
}
