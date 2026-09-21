import { About } from './About';
import { Contact } from './Contact';
import { Experience } from './Experience';
import { Hero } from './Hero';
import { Skills } from './Skills';
import { Work } from './Work';

/**
 * The whole document, in the order it reads.
 *
 * Each child owns the section id the nav points at, so this list is also the
 * scroll order: SECTIONS in `constants/navigation.ts` names the same six
 * anchors and must stay in step with it.
 *
 * It is a component rather than six children of `page.tsx` because the order
 * is a fact about the document, not about the route — the route's job is to
 * carry the canonical URL and the share card, and nothing else (R1).
 */
export function DocumentScreen() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
