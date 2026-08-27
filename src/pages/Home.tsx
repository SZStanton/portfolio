import { About } from '../components/sections/About';
import { Hero } from '../components/sections/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// About sits on the landing page deliberately, so a visitor who only
// looks at one screen still learns who this is.
export function Home() {
  // No argument, so the home page keeps the full site title.
  useDocumentTitle();

  return (
    <>
      <Hero />
      <About />
    </>
  );
}
