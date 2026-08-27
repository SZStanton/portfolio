import { useEffect, useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';

type Props = {
  value: string;
  label: string;
};

// Copies a value and confirms it briefly. Saves anyone the select-and-copy
// dance, which is friction on the one action the page is asking for.
export function CopyButton({ value, label }: Props) {
  const [copied, setCopied] = useState(false);

  // Clears the confirmation, and cancels itself if the component goes
  // away first so it cannot set state on something unmounted.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Refused, usually an insecure context or a permissions prompt.
      // The address is on screen anyway, so there is nothing to recover.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="rounded-md p-2 transition-colors hover:bg-hover hover:text-accent active:text-accent"
    >
      {copied ? (
        <LuCheck className="size-4 text-success" />
      ) : (
        <LuCopy className="size-4" />
      )}
    </button>
  );
}
