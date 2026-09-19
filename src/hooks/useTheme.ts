import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// dark goes on <html>, outside React's root, so the class is the single source of
// truth and every useTheme() reads the same value rather than its own copy.
const listeners = new Set<() => void>();

// The script in index.html already worked this out, so just read it back.
function current(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const root = document.documentElement;

  // Without this every transition animates old palette to new, reading as a flash.
  root.classList.add('no-transitions');
  root.classList.toggle('dark', theme === 'dark');

  // Saved so the choice survives a refresh and the index.html script can read it.
  localStorage.setItem('theme', theme);

  // Put transitions back once the new colours have been painted.
  requestAnimationFrame(() => root.classList.remove('no-transitions'));

  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Another tab on the same origin switched, so this one follows.
  const fromOtherDocument = (event: StorageEvent) => {
    const next = event.newValue;
    if (event.key !== 'theme') return;
    if (next !== 'light' && next !== 'dark') return;
    if (next !== current()) apply(next);
  };

  window.addEventListener('storage', fromOtherDocument);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', fromOtherDocument);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => 'light');

  return {
    theme,
    toggleTheme: () => apply(theme === 'dark' ? 'light' : 'dark'),
  };
}
