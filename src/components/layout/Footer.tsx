import { LuGithub, LuLinkedin } from 'react-icons/lu'

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
    <footer className="mt-16 border-t border-line">
      {/* Stacked on phones, spread across one row from small screens up. */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-sm sm:flex-row sm:justify-between">
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
    </footer>
  )
}
