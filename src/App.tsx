import { useCallback, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Menus from "./components/Menus";
import Reviews from "./components/Reviews";
import Services from "./components/Services";
import Toast from "./components/Toast";
import TrustStrip from "./components/TrustStrip";
import { comingSoonToast, socials } from "./content";

const instagramUrl = socials.find((social) => social.id === "instagram")?.url ?? undefined;

export default function App() {
  // Name of the coming-soon platform whose toast is showing, if any.
  const [toastPlatform, setToastPlatform] = useState<string | null>(null);
  const closeToast = useCallback(() => setToastPlatform(null), []);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <Menus />
        <HowItWorks />
        <Gallery />
        <Reviews />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer onComingSoon={setToastPlatform} />
      <FloatingWhatsApp hidden={toastPlatform !== null} />

      <Toast open={toastPlatform !== null} onClose={closeToast} closeLabel={comingSoonToast.closeLabel} resetKey={toastPlatform}>
        {comingSoonToast.before}
        {toastPlatform}
        {comingSoonToast.middle}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gold-light underline underline-offset-2"
        >
          {comingSoonToast.linkLabel}
        </a>
        {comingSoonToast.after}
      </Toast>
    </>
  );
}
