import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Problem } from '@/components/sections/Problem';
import { PublicEvents } from '@/components/sections/PublicEvents';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <PublicEvents />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
