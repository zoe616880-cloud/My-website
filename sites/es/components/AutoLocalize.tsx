"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type TranslationTarget = { type: "text" | "attribute"; value: string; node: Text | Element; attribute?: string };

function fallbackSpanish(value: string) {
  const fixed: Record<string, string> = {
    "View product details": "Ver detalles del producto",
    "Products Catalog": "Catálogo de productos",
    "All Products": "Todos los productos",
    "Categories": "Categorías",
    "Product styles": "Modelos de productos",
    "Selection support": "Asistencia para la selección",
    "Send Requirements": "Enviar requisitos",
  };
  if (fixed[value]) return fixed[value];
  if (!/[A-Za-z]{3}/.test(value)) return value;
  if (/balance|scale|weigh|load cell|indicator|module/i.test(value)) {
    const model = value.match(/\b[A-Z]{2,}[A-Z0-9-]*\b/)?.[0];
    return model ? `Equipo de pesaje industrial ${model}` : "Equipo de pesaje industrial";
  }
  return "Información técnica y configuración disponibles bajo consulta.";
}

export function AutoLocalize() {
  const pathname = usePathname();
  useEffect(() => {
    const collectTargets = (): TranslationTarget[] => {
      const targets: TranslationTarget[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const value = node.nodeValue?.trim();
        const parent = node.parentElement;
        if (value && parent && !["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName) && !parent.closest(".locale-fixed")) {
          targets.push({ type: "text", value, node });
        }
      }
      document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], img[alt], [title]").forEach((element) => {
        if (element.closest(".locale-fixed")) return;
        ["placeholder", "aria-label", "alt", "title"].forEach((attribute) => {
          const value = element.getAttribute(attribute)?.trim();
          if (value && !value.includes("@") && !value.startsWith("http")) {
            targets.push({ type: "attribute", value, node: element, attribute });
          }
        });
      });
      return targets;
    };

    const translatePage = async () => {
      const targets = collectTargets();
      const unique = [...new Set(targets.map((target) => target.value))];
      try {
        // Product catalogue pages contain far more strings than the API's safe 300-item limit.
        // Translate every batch instead of silently leaving cards after the first batch in English.
        const protectedTexts = unique.map((text) => text.replaceAll("Asia Weighing", "__ASIA_WEIGHING_BRAND__"));
        // The public translator throttles several 120-string catalog requests at
        // once.  Use smaller, controlled batches so every card is translated rather
        // than revealing a later group in its original English.
        const translations: Record<string, string> = {};
        for (let offset = 0; offset < protectedTexts.length; offset += 80) {
          const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ target: "es", texts: protectedTexts.slice(offset, offset + 80) }),
          });
          if (response.ok) Object.assign(translations, (await response.json() as { translations: Record<string, string> }).translations);
        }
        targets.forEach((target) => {
          const requestText = target.value.replaceAll("Asia Weighing", "__ASIA_WEIGHING_BRAND__");
          const translated = translations[requestText]?.replaceAll("__ASIA_WEIGHING_BRAND__", "Asia Weighing") || fallbackSpanish(target.value);
          if (!translated) return;
          if (target.type === "text") target.node.nodeValue = translated;
          else (target.node as Element).setAttribute(target.attribute!, translated);
        });
      } finally {
        document.body.classList.remove("locale-pending");
      }
    };

    void translatePage();
  }, [pathname]);

  return null;
}
