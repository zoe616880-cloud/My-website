import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.asiaweighing.com"),
  title: {
    default: "Industrial Weighing Scale Manufacturer | Asia Weighing",
    template: "%s | Asia Weighing",
  },
  description:
    "Custom bench scales, floor scales and industrial weighing systems from a source manufacturer in Changzhou, China.",
  keywords: [
    "industrial weighing scale manufacturer",
    "bench scale manufacturer",
    "floor scale manufacturer",
    "OEM weighing scale",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Industrial Weighing, Built Around Your Application",
    description:
      "Custom bench scales, floor scales and industrial weighing systems for importers, distributors, contractors and EPC projects.",
    type: "website",
    locale: "en_US",
    siteName: "Asia Weighing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; padding: 0; font-family: sans-serif; color: #162a3d; line-height: 1.6; }
          .site-header { background: #ffffff !important; border-bottom: 1px solid #d9e3eb !important; position: sticky !important; top: 0 !important; z-index: 1000 !important; }
          .header-inner { max-width: 1240px !important; margin: 0 auto !important; height: 82px !important; display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 0 24px !important; }
          .brand img { width: 176px !important; height: 48px !important; object-fit: contain !important; }
          .desktop-nav { display: flex !important; gap: 28px !important; list-style: none !important; margin: 0 !important; padding: 0 !important; }
          .desktop-nav a, .desktop-nav button { color: #263a4d !important; text-decoration: none !important; font-weight: 700 !important; font-size: 14px !important; border: none !important; background: none !important; cursor: pointer !important; }
          .hero { padding: 120px 24px !important; background: linear-gradient(90deg, #0b2138 0%, #07518d 100%) !important; color: white !important; text-align: left !important; }
          .hero-inner { max-width: 1240px !important; margin: 0 auto !important; }
          .hero h1 { font-size: 58px !important; margin: 0 0 24px 0 !important; line-height: 1.1 !important; max-width: 700px !important; }
          .hero p { font-size: 18px !important; color: #d6e4ef !important; max-width: 600px !important; }
          .button { display: inline-flex !important; height: 50px !important; align-items: center !important; padding: 0 28px !important; background: #0b69b2 !important; color: white !important; border-radius: 2px !important; text-decoration: none !important; font-weight: 800 !important; border: none !important; }
          .button-outline { background: transparent !important; border: 1px solid white !important; }
          .utility-bar { background: #0b2138 !important; color: #c4d4e1 !important; font-size: 12px !important; padding: 8px 24px !important; }
          .utility-inner { max-width: 1240px !important; margin: 0 auto !important; display: flex !important; justify-content: space-between !important; }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}

