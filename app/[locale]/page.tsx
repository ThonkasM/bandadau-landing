import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Facts } from '@/components/sections/Facts';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Marquee } from '@/components/sections/Marquee';
import { PublicEvents } from '@/components/sections/PublicEvents';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Facts />
        <PublicEvents />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
