import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Container } from './components/ui/Primitives';
import { BackgroundLayer } from './components/decor/BackgroundLayer';
import { ScrollProgress } from './components/decor/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Stack } from './components/sections/Stack';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';

/**
 * Page order is this list. Each section owns its own anchor id, which the
 * navbar's scroll-spy reads from data/profile.js — so reordering here and in
 * `navLinks` is all a rearrangement takes.
 *
 * Both decor layers are fixed and never intercept pointer events:
 * BackgroundLayer sits behind the page and ScrollProgress pins to the top edge.
 */
export default function App() {
  return (
    <>
      <BackgroundLayer />
      <ScrollProgress />
      <Navbar />

      <Container as="main">
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Work />
        <Contact />
      </Container>

      <Footer />
    </>
  );
}
