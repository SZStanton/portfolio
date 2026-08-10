import { Link } from 'react-router'

// Catches any URL that does not match a real page.
export function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col justify-center py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        That page does not exist
      </h1>
      <p className="mt-6 text-lg">The link may be out of date, or the address mistyped.</p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center rounded-full bg-heading px-6 py-3 font-medium text-surface transition-opacity hover:opacity-85"
      >
        Back to home
      </Link>
    </section>
  )
}
