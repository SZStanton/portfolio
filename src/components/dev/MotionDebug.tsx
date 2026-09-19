import { useEffect, useState } from 'react';

// Temporary. Mounted only on ?debug=motion, to find out why motion is not
// showing up on one machine when it does on another. Delete once that is settled.
export function MotionDebug() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      const html = document.documentElement;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const deco = document.querySelector<HTMLElement>(
        '#home [aria-hidden="true"]',
      );
      const transform = deco ? getComputedStyle(deco).transform : 'no layer';
      const drift =
        transform && transform.startsWith('matrix')
          ? Math.round(parseFloat(transform.split(',')[5]))
          : 0;

      const revealed = document.querySelectorAll('[style*="opacity"]').length;
      const hidden = [
        ...document.querySelectorAll<HTMLElement>('main *'),
      ].filter(el => getComputedStyle(el).opacity === '0').length;

      setLines([
        `reduced motion: ${reduced ? 'ON' : 'off'}${reduced && html.dataset.motionForce !== 'true' ? '  <-- switches everything off' : ''}`,
        `motion forced: ${html.dataset.motionForce === 'true' ? 'yes' : 'no'}`,
        `lenis running: ${html.classList.contains('lenis') ? 'yes' : 'NO'}`,
        `scroll: ${Math.round(window.scrollY)}px`,
        `hero deco drift: ${drift}px  <-- should change as you scroll`,
        `animated elements: ${revealed}`,
        `still hidden: ${hidden}`,
        `build: ${import.meta.env.MODE}`,
      ]);
    };

    read();
    const id = setInterval(read, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 z-[90] rounded-md bg-black/85 px-3 py-2 font-mono text-[11px] leading-5 text-lime-300">
      {lines.map(line => (
        <div key={line.split(':')[0]}>{line}</div>
      ))}
    </div>
  );
}
