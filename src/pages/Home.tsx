import { About } from '../components/sections/About';
import { Hero } from '../components/sections/Hero';

// About sits on the landing page deliberately, so a visitor who only
// looks at one screen still learns who this is.
export function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

