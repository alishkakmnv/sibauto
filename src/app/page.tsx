import { Calculator } from "@/components/sections/Calculator";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Fleet } from "@/components/sections/Fleet";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Steps } from "@/components/sections/Steps";
import { Trust } from "@/components/sections/Trust";
import { Why } from "@/components/sections/Why";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Calculator />
      <Fleet />
      <Why />
      <Steps />
      <Trust />
      <Services />
      <Faq />
      <ContactCta />
    </>
  );
}
