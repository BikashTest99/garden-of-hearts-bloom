import HeroSection from '@/components/wedding/HeroSection';
import BlessingSection from '@/components/wedding/BlessingSection';
import HolyUnionSection from '@/components/wedding/HolyUnionSection';
import ConstellationSection from '@/components/wedding/ConstellationSection';
import VenueSection from '@/components/wedding/VenueSection';
import WishesSection from '@/components/wedding/WishesSection';
import RSVPSection from '@/components/wedding/RSVPSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import MusicPlayer from '@/components/wedding/MusicPlayer';
import Footer from '@/components/wedding/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Salmon & Dr. Silpina | Wedding Invitation - February 7, 2025</title>
        <meta name="description" content="Join us in celebrating the holy union of Salmon and Dr. Silpina. February 7, 2025 in Pokhara, Nepal. You are cordially invited to witness our beautiful journey begin." />
        <meta name="keywords" content="wedding, invitation, Salmon, Silpina, Pokhara, Nepal, February 2025" />
        <meta property="og:title" content="Salmon & Dr. Silpina's Wedding Invitation" />
        <meta property="og:description" content="You are invited to the wedding celebration of Salmon and Dr. Silpina on February 7, 2025 in Pokhara, Nepal." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <main className="overflow-x-hidden">
        <HeroSection />
        <BlessingSection />
        <HolyUnionSection />
        <ConstellationSection />
        <VenueSection />
        <WishesSection />
        <RSVPSection />
        <CountdownSection />
        <Footer />
        <MusicPlayer />
      </main>
    </>
  );
};

export default Index;
