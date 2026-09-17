import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import PopularServices from "../components/Landing/PopularServices";
import HowItWorks from "../components/Landing/HowItWorks";
import Stats from "../components/Landing/Stats";
import CTA from "../components/Landing/CTA";
import Footer from "../components/Landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularServices />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}