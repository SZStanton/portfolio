import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { pages } from '../data/navigation';

// Swipes change page on touch devices, which have no pointer for the arrows.

// Distance a finger must travel before it counts; long enough that reading-drift will not navigate.
const DISTANCE = 90;

// Horizontal must clearly beat vertical, or a slanted scroll would navigate.
const DIRECTION_RATIO = 1.6;

export function useSwipeNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    function onStart(event: TouchEvent) {
      // More than one finger is a pinch or a zoom, not a swipe.
      if (event.touches.length !== 1) return;
      tracking = true;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }

    function onEnd(event: TouchEvent) {
      if (!tracking) return;
      tracking = false;

      // The lightbox locks body scroll while open, so swipes are ignored then.
      if (document.body.style.overflow === 'hidden') return;

      const touch = event.changedTouches[0];
      const movedX = touch.clientX - startX;
      const movedY = touch.clientY - startY;

      if (Math.abs(movedX) < DISTANCE) return;
      if (Math.abs(movedX) < Math.abs(movedY) * DIRECTION_RATIO) return;

      const index = pages.findIndex(page => page.to === pathname);
      if (index === -1) return;

      // Dragging left pulls the next page in, the way a carousel reads.
      const next = pages[movedX < 0 ? index + 1 : index - 1];
      if (next) navigate(next.to);
    }

    // passive, since this handler never blocks the scroll it reads.
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [pathname, navigate]);
}
