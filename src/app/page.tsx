import type { Metadata } from "next";
import { Advantages } from "@/components/Advantages";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Calculator } from "@/components/Calculator";
import { Contacts } from "@/components/Contacts";
import { Faq } from "@/components/Faq";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Ticker } from "@/components/Ticker";
import { buildFaqJsonLd, seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    title: seo.title,
    description: seo.description,
  },
};

const faqJsonLd = buildFaqJsonLd();

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="inhalt">
        <Hero />
        <Ticker />
        <Services />
        <Calculator />
        <Advantages />
        <BeforeAfter />
        <Process />
        <Stats />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <FloatingActions />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
