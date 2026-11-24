import { Footer } from '@/components/layout/Footer';
import { NavBar } from '@/components/layout/NavBar';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { SHOW_SPLASH } from '@/data/site';

export default function Home() {
  return (
    <div className={SHOW_SPLASH ? 'page' : 'page no-splash'}>
      {SHOW_SPLASH && <SplashScreen />}
      <NavBar />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
