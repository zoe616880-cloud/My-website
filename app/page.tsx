import { HomeScrollMotion } from "@/components/HomeScrollMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { faqs } from "@/data/site-data";
import type { ReactElement } from "react";
import { Hero } from "@/components/sections/Hero";
import { ApplicationSelector } from "@/components/sections/ApplicationSelector";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SystemConfig } from "@/components/sections/SystemConfig";
import { QualityManufacturing } from "@/components/sections/QualityManufacturing";
import { BuyerGuidance } from "@/components/sections/BuyerGuidance";
import { FAQAndQuote } from "@/components/sections/FAQAndQuote";
import type { HomeSectionConfig, HomeSectionId } from "@/data/home-page";
import { readHomePageConfig } from "@/lib/home-page-content";

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

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const previewSection = getSearchValue(resolvedSearchParams.previewSection);
  const previewPart = getSearchValue(resolvedSearchParams.previewPart);
  const homePageConfig = await readHomePageConfig();
  const sectionRenderers: Record<HomeSectionId, (section: HomeSectionConfig) => ReactElement> = {
    hero: (section) => <Hero config={section} />,
    applications: (section) => <ApplicationSelector config={section} />,
    products: (section) => <ProductShowcase config={section} />,
    advantages: (section) => <SystemConfig config={section} />,
    factory: (section) => <QualityManufacturing config={section} />,
    news: (section) => <BuyerGuidance config={section} />,
    partners: (section) => <FAQAndQuote config={section} />,
  };
  const homeSections = [...homePageConfig.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

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
      <main className="home-main">
        <HomeScrollMotion />
        {homeSections.map((section) => {
          const isPreviewSection = previewSection === section.id;
          const sectionForRender = isPreviewSection && previewPart ? { ...section, previewPart } : section;

          return (
            <div
              className={`home-editable-section${isPreviewSection ? " home-section-admin-selected" : ""}`}
              data-home-section={section.id}
              key={section.id}
            >
              {sectionRenderers[section.id](sectionForRender)}
            </div>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
