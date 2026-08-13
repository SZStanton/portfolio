import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

/*
 * Catches a crash anywhere below it. Without one, React unmounts the whole
 * tree on an error and the visitor gets a blank white page.
 *
 * Has to be a class. Hooks cannot do this, there is no function equivalent.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Shows up in the browser console and in Vercel's logs.
    console.error('Something crashed', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="grid min-h-svh place-items-center px-6 text-center">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Error
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-heading">
            Something went wrong
          </h1>
          <p className="mt-4">
            Sorry about that. Reloading the page usually sorts it.
          </p>
          {/* A plain link, not a router one, so it works even if
              routing is what broke. */}
          <a
            href="/"
            className="mt-8 inline-flex rounded-sm bg-heading px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.15em] text-surface"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }
}
