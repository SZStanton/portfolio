import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

// The dark class goes on <html>, which sits outside React's root, so it
// has to be set directly. Doing it in an effect keeps that out of render.

// The script in index.html already worked this out, so just read it back.
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Without this every transition on the page animates from the old
    // palette to the new one, which reads as a flash.
    root.classList.add('no-transitions');
    root.classList.toggle('dark', theme === 'dark');

    // Saved so the choice survives a refresh and the index.html script can read it.
    localStorage.setItem('theme', theme);

    // Put transitions back once the new colours have been painted.
    const frame = requestAnimationFrame(() =>
      root.classList.remove('no-transitions'),
    );
    return () => cancelAnimationFrame(frame);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
