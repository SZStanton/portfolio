import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'
import { Link } from 'react-router'
import { pages } from '../../data/navigation'

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

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Small gold diamond, the same deco language as the frame. */}
          <span className="size-1.5 rotate-45 bg-accent/70" />
          <Link
            to="/"
            className="text-[0.9375rem] font-semibold text-heading transition-colors hover:text-accent"
          >
            Sebastian Stanton
          </Link>
        </div>

        {/* A second way to reach every page, without scrolling back up. */}
        <nav>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.9375rem]">
            {pages.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className="transition-colors hover:text-accent">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-1">
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
