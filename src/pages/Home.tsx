import { FanDivider } from '../components/deco/FanDivider';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Hero } from '../components/sections/Hero';
import { MoreProjects } from '../components/sections/MoreProjects';
import { Toolkit } from '../components/sections/Toolkit';
import { Projects } from '../components/sections/Projects';
import { BackToTop } from '../components/ui/BackToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// The whole site in one scroll, work first so the evidence lands before the story.
export function Home() {
  // No argument, so the home page keeps the full site title.
  useDocumentTitle();

  return (
    <>
      <Hero />
      <Projects />
      <FanDivider className="container-page" />
      <MoreProjects />
      <About />
      <Toolkit />
      <Contact />
      <BackToTop />
    </>
  );
}
