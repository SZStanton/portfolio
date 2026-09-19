import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStill } from './useStill';

import type Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// The running instance, so a modal can pause scrolling without reaching for
// body overflow, which Lenis fights and which shifts the page as the bar goes.
let instance: Lenis | null = null;

// How long a jump takes, in seconds. The cap means longer trips move faster.
const SHORT_HOP = 0.85;
const PER_SCREEN = 0.24;
const LONGEST = 1.7;

const paceFor = (screens: number) =>
  Math.min(LONGEST, SHORT_HOP + PER_SCREEN * screens);

// Nudges a landing back into place while images above are still loading and
// shifting the layout. Gives up as soon as the reader touches the wheel.
let releaseHold: (() => void) | null = null;

// Any of these means the reader has taken over, so the hold lets go.
const TAKEOVER = ['wheel', 'touchstart', 'keydown'];

// A section can ask to land further down the page than the rest with
// data-land-offset, in pixels. Contact uses it to sit better in the window.
function landOffset(target: HTMLElement) {
  return Number(target.dataset.landOffset) || 0;
}

function holdPosition(target: HTMLElement) {
  // A hold left over from the last landing would drag the new one back.
  releaseHold?.();

  const wanted =
    (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0) - landOffset(target);
  const until = performance.now() + 1500;
  let timer = 0;

  const stop = () => {
    window.clearTimeout(timer);
    for (const event of TAKEOVER) window.removeEventListener(event, stop);
    if (releaseHold === stop) releaseHold = null;
  };

  const check = () => {
    const drift = target.getBoundingClientRect().top - wanted;

    // Dragging the scrollbar fires none of the events above, so anything this
    // far out is the reader moving rather than the layout settling.
    if (Math.abs(drift) > 300) return stop();

    if (Math.abs(drift) > 2) {
      instance?.scrollTo(target, {
        immediate: true,
        force: true,
        offset: landOffset(target),
      });
    }

    if (performance.now() < until) timer = window.setTimeout(check, 120);
    else stop();
  };

  for (const event of TAKEOVER) {
    window.addEventListener(event, stop, { once: true, passive: true });
  }

  timer = window.setTimeout(check, 120);
  releaseHold = stop;
}

// Scrolls to a section, choosing the pace from how far away it is. Returns false
// if there is no such section, so a caller can leave the click alone.
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  releaseHold?.();

  const duration = paceFor(
    Math.abs(target.getBoundingClientRect().top) / window.innerHeight,
  );

  if (!instance) {
    // No behaviour named, so index.css decides and reduced motion still wins.
    target.scrollIntoView();
    return true;
  }

  // Offset is only the section's own nudge. Lenis already honours
  // scroll-padding-top, so the navbar height would land it twice as far down.
  // lock holds the wheel off until it arrives; force covers Lenis left stopped.
  instance.scrollTo(target, {
    offset: landOffset(target),
    duration,
    lock: true,
    force: true,
    // Only once it has arrived, or the hold would cut a long scroll short.
    onComplete: () => holdPosition(target),
  });

  return true;
}

// Jumping with a plain scrollIntoView leaves Lenis holding the old position, and
// it writes that back on the next frame, which undoes the jump.
export function jumpTo(target: HTMLElement) {
  if (!instance) {
    target.scrollIntoView({ behavior: 'instant' });
    return;
  }

  // A deep link lands before images above have loaded, so this is where the
  // settling matters most. force, or a jump during a locked scroll is dropped.
  instance.scrollTo(target, {
    immediate: true,
    force: true,
    offset: landOffset(target),
  });
  holdPosition(target);
}

// Used on route changes, where the new page has to start at the top.
export function jumpToTop() {
  releaseHold?.();

  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Smooth all the way back to the top, at the same pace a section jump would use.
export function scrollToTop() {
  releaseHold?.();

  if (!instance) {
    // No behaviour named, so index.css decides and reduced motion still wins.
    window.scrollTo({ top: 0 });
    return;
  }

  instance.scrollTo(0, {
    duration: paceFor(window.scrollY / window.innerHeight),
    lock: true,
    force: true,
  });
}

// Called by anything that opens over the page, like the lightbox.
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
    return;
  }

  // No Lenis, so fall back to the plain version. scrollbar-gutter keeps the
  // page from jumping sideways when the bar disappears.
  document.body.style.overflow = locked ? 'hidden' : '';
}

// Owns every in-page link, and adds weighted momentum on top unless the visitor
// asked for less motion.
export function useSmoothScroll() {
  const still = useStill();
  const navigate = useNavigate();

  // Outside the Lenis effect, so a reduced-motion visitor still gets the pace,
  // the hash and the focus move rather than a bare browser jump.
  useEffect(() => {
    // Every in-page link, not just the navbar, so the hero buttons, the scroll
    // cue and the footer all behave the same way.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      if (!id) return;

      if (!scrollToId(id)) return;
      event.preventDefault();

      // The router has to see the hash change, or the URL never updates and
      // focus is left on the link instead of moving into the section.
      navigate(`#${id}`);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  useEffect(() => {
    if (still) return;

    let lenis: Lenis | null = null;
    let frame = 0;
    let dropped = false;

    // CSS smooth scrolling fights Lenis for the same scroll position.
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    // Loaded on demand, so the case studies and anyone on reduced motion never
    // download the momentum library at all.
    void import('lenis').then(({ default: Lenis }) => {
      if (dropped) return;

      // anchors is off: Lenis would scroll every #id click at one fixed speed,
      // and the pace here follows the distance instead.
      // wheelMultiplier above 1 covers a little more page per notch of the wheel.
      lenis = new Lenis({
        duration: 1.05,
        anchors: false,
        wheelMultiplier: 1.2,
      });
      instance = lenis;

      frame = requestAnimationFrame(function loop(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      });
    });

    return () => {
      dropped = true;
      cancelAnimationFrame(frame);
      instance = null;
      lenis?.destroy();
      html.style.scrollBehavior = previous;
    };
  }, [still]);
}
