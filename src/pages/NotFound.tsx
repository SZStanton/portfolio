import { ButtonLink } from '../components/ui/Button'

// Catches any URL that does not match a real page.
export function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col justify-center py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        That page does not exist
      </h1>
      <p className="mt-6 text-xl">The link may be out of date, or the address mistyped.</p>
      <div className="mt-8">
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </section>
  )
}
