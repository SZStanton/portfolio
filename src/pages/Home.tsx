import { About } from '../components/sections/About';
import { Hero } from '../components/sections/Hero';
import { BackToTop } from '../components/ui/BackToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// About sits on the landing page, so a one-screen visitor still learns who this is.
export function Home() {
  // No argument, so the home page keeps the full site title.
  useDocumentTitle();

  return (
    <>
      <Hero />
      <About />
      <BackToTop />
    </>
  );
}
