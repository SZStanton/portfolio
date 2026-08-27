import { useEffect, useState } from 'react';
import { LuCheck, LuCopy, LuX } from 'react-icons/lu';

type Props = {
  value: string;
  label: string;
};

type State = 'idle' | 'copied' | 'failed';

// Copies a value and confirms it briefly, skipping the select-and-copy dance.
export function CopyButton({ value, label }: Props) {
  const [state, setState] = useState<State>('idle');

  // Clears the confirmation; cancels first if the component unmounts.
  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      // Reported rather than ignored, so a stale clipboard paste isn't mistaken for success.
      setState('failed');
    }
  };

  const message =
    state === 'copied'
      ? `${label} copied`
      : state === 'failed'
        ? `Could not copy, select the ${label.toLowerCase()} instead`
        : `Copy ${label}`;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={message}
      title={message}
      className="rounded-md p-2 transition-colors hover:bg-hover hover:text-accent active:text-accent"
    >
      {state === 'copied' && <LuCheck className="size-4 text-success" />}
      {state === 'failed' && <LuX className="size-4 text-danger" />}
      {state === 'idle' && <LuCopy className="size-4" />}
      {/* Announced to screen readers when it changes. */}
      <span className="sr-only" aria-live="polite">
        {state === 'idle' ? '' : message}
      </span>
    </button>
  );
}
