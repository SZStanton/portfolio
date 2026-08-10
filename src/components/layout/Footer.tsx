import { LuGithub, LuLinkedin } from 'react-icons/lu'
import { Link } from 'react-router'
import { pages } from '../../data/navigation'

// Icon is capitalised so it can be used as <Icon /> further down.
const socials = [
  {
    href: 'https://github.com/SZStanton',
    label: 'GitHub profile',
    Icon: LuGithub,
  },
  {
    href: 'https://www.linkedin.com/in/sebastian-stanton-5464b0139',
    label: 'LinkedIn profile',
    Icon: LuLinkedin,
  },
]

export function Footer() {
  // Read on load, so the year never goes stale.
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link to="/" className="font-semibold text-heading transition-colors hover:opacity-70">
              Sebastian Stanton
            </Link>
            <p className="mt-2 text-sm">Junior full-stack developer, Cape Town</p>
          </div>

          {/* A second way to reach every page, without scrolling back up. */}
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {pages.map((page) => (
                <li key={page.to}>
                  <Link to={page.to} className="transition-colors hover:text-accent">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Stacked on phones, spread across one row from small screens up. */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-6 text-sm sm:flex-row sm:justify-between">
          <p>© {year} Sebastian Stanton</p>

          <ul className="flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label} // no visible text in the link, only an icon
                  className="block rounded-md p-2 transition-colors hover:bg-hover hover:text-heading"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-center sm:text-right">Built with React, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
