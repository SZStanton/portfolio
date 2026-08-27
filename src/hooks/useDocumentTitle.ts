import { useEffect } from 'react';

const SITE = 'Sebastian Stanton';

// Sets the browser tab title for a page. Without this every route keeps
// the one title from index.html, so tabs, bookmarks and search results
// for /projects and /contact are indistinguishable.
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE}`
      : `${SITE} | Junior Full-Stack Developer`;
  }, [title]);
}
