import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { BackToTopButton } from "@/components/BackToTopButton";
import "./globals.css";

const guardrailChunkRecoveryScript = `
(() => {
  if (window.location.pathname !== "/products/guardrail-platform-scale-v3") return;

  const pattern = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|_next\\/static\\/chunks/i;
  let recovering = false;

  const waitForFreshPage = async () => {
    if (recovering) return;
    recovering = true;

    while (true) {
      try {
        const probe = new URL(window.location.href);
        probe.searchParams.set("_probe", String(Date.now()));
        const response = await fetch(probe.toString(), { cache: "no-store" });

        if (response.ok) {
          const nextUrl = new URL(window.location.href);
          nextUrl.searchParams.delete("_probe");
          nextUrl.searchParams.set("_refresh", String(Date.now()));
          window.location.replace(nextUrl.toString());
          return;
        }
      } catch {}

      await new Promise((resolve) => window.setTimeout(resolve, 1500));
    }
  };

  const recover = (value) => {
    if (pattern.test(String(value || ""))) void waitForFreshPage();
  };

  window.addEventListener("error", (event) => {
    const target = event.target;
    const source = target && "src" in target ? target.src : "";
    recover(event.message || (event.error && event.error.message) || source);
  }, true);

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    recover(reason && reason.message ? reason.message : reason);
  });
})();
`;

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
        <Script
          id="guardrail-chunk-recovery"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: guardrailChunkRecoveryScript }}
        />
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
