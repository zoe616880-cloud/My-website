import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { BackToTopButton } from "@/components/BackToTopButton";
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
    "custom weighing scale",
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
      </head>
      <body>
        <Header />
        {children}
        <BackToTopButton />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
