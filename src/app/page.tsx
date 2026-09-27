import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Advantages } from '@/components/sections/Advantages';
import { Audiences } from '@/components/sections/Audiences';
import { History } from '@/components/sections/History';
import { Partners } from '@/components/sections/Partners';
import { Team } from '@/components/sections/Team';
import { News } from '@/components/sections/News';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <a href="#about" className="visuallyHidden">
        Перейти к содержанию
      </a>

      <Header />

      <main>
        <Hero />
        <Advantages />
        <Audiences />
        <History />
        <Partners />
        <Team />
        <News />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
