import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'

const EMAIL = 'ssebastianbusiness@gmail.com'

// Icon is capitalised so it can be used as <Icon /> further down.
const socials = [
  { href: 'https://github.com/SZStanton', label: 'GitHub profile', Icon: LuGithub },
  {
    href: 'https://www.linkedin.com/in/sebastian-stanton-5464b0139',
    label: 'LinkedIn profile',
    Icon: LuLinkedin,
  },
  { href: `mailto:${EMAIL}`, label: 'Email me', Icon: LuMail },
]

export function Footer() {
  // Read on load, so the year never goes stale.
  const year = new Date().getFullYear()

  return (
    <footer className="mt-4">
      {/* Gold rule that fades out at both ends, so the footer is separated
          by something with a bit of character rather than a flat line. */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      {/* Three columns so the tagline sits dead centre, with an empty
          first column balancing the socials. Stacks on small screens. */}
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-6 sm:grid-cols-3 sm:items-center">
        <span className="hidden sm:block" aria-hidden="true" />

        {/* Name is left to the copyright line below, so it appears once here. */}
        <p className="flex items-center justify-center gap-3 text-center text-[0.9375rem]">
          <span className="size-1.5 shrink-0 rotate-45 bg-accent/70" />
          Junior Full-Stack Developer, Cape Town
        </p>

        <ul className="flex items-center justify-center gap-1 sm:justify-end">
          {socials.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                // mailto should not open a tab, the others should.
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label} // no visible text in the link, only an icon
                className="block rounded-md p-2 transition-colors hover:bg-hover hover:text-accent"
              >
                <Icon className="size-[1.125rem]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-6 text-xs opacity-70">
        <p>
          © {year} Sebastian Stanton. Built with React, TypeScript and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
