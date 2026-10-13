import { MobileActionBar } from "@/components/mobile-action-bar";
import { Navbar } from "@/components/navbar";
import { TopBar } from "@/components/top-bar";
import { Book } from "@/components/sections/book";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Fleet } from "@/components/sections/fleet";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Fleet />
        <HowItWorks />
        <Reviews />
        <Book />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
