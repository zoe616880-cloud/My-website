import type { Metadata } from "next";
import { GuardrailProductPageV3 } from "@/components/GuardrailProductPageV3";

export const metadata: Metadata = {
  title: "Guardrail Platform Scale — Concept 3",
  description:
    "Interactive Guardrail Platform Scale product page with video, technical data, applications, FAQs and buyer guides.",
  robots: { index: false, follow: false },
};

export default function GuardrailPlatformScaleV3Page() {
  return <GuardrailProductPageV3 />;
}
