import { useEffect } from 'react';

const SITE = 'Sebastian Stanton';

// Sets the tab title per page; otherwise every route keeps index.html's title.
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE}`
      : `${SITE} | Junior Full-Stack Developer`;
  }, [title]);
}
