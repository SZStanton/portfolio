import { useEffect, useState } from 'react';
import { LuCheck, LuCopy, LuX } from 'react-icons/lu';

type Props = {
  value: string;
  label: string;
};

type State = 'idle' | 'copied' | 'failed';

// Copies a value and confirms it briefly. Saves anyone the select-and-copy
// dance, which is friction on the one action the page is asking for.
export function CopyButton({ value, label }: Props) {
  const [state, setState] = useState<State>('idle');

  // Clears the confirmation, and cancels itself if the component goes
  // away first so it cannot set state on something unmounted.
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
      /*
       * Refused, usually an insecure context or a denied permission.
       * Say so rather than doing nothing, otherwise the visitor pastes
       * whatever was on the clipboard before and thinks it worked.
       */
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
