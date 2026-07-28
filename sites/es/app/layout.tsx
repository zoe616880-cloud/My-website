import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { BackToTopButton } from "@/components/BackToTopButton";
import { AutoLocalize } from "../components/AutoLocalize";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://es.asiaweighing.localhost:3102"),
  title: {
    default: "Equipos de pesaje industrial | Asia Weighing",
    template: "%s | Asia Weighing",
  },
  description:
    "Básculas industriales, sistemas de pesaje y componentes de un fabricante de Changzhou, China.",
  keywords: [
    "fabricante de básculas industriales", "básculas camioneras", "básculas de plataforma", "celdas de carga",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pesaje industrial para su aplicación",
    description:
      "Equipos de pesaje y soluciones personalizadas para proyectos industriales.",
    type: "website",
    locale: "es_419",
    siteName: "Asia Weighing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="locale-pending">
        <AutoLocalize />
        <Header />
        {children}
        <BackToTopButton />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
