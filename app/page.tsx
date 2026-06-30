import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { faqs } from "@/data/site-data";
import { Hero } from "@/components/sections/Hero";
import { TrustRail } from "@/components/sections/TrustRail";
import { ApplicationSelector } from "@/components/sections/ApplicationSelector";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { CustomProcess } from "@/components/sections/CustomProcess";
import { SystemConfig } from "@/components/sections/SystemConfig";
import { IndustryBand } from "@/components/sections/IndustryBand";
import { QualityManufacturing } from "@/components/sections/QualityManufacturing";
import { BuyerGuidance } from "@/components/sections/BuyerGuidance";
import { FAQAndQuote } from "@/components/sections/FAQAndQuote";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Changzhou Asia Weighing Apparatus Co., Ltd.",
  alternateName: "Asia Weighing",
  foundingDate: "2006",
  email: "ida@asiaweigh.com",
  telephone: "+86 13775237471",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Changzhou",
    addressRegion: "Jiangsu",
    addressCountry: "CN",
  },
  url: "https://www.asiaweighing.com",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <TrustRail />
        <ApplicationSelector />
        <ProductShowcase />
        <CustomProcess />
        <SystemConfig />
        <IndustryBand />
        <QualityManufacturing />
        <BuyerGuidance />
        <FAQAndQuote />
      </main>
      <SiteFooter />
    </>
  );
}
