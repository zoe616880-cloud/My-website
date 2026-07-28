"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Target = {
  value: string;
  node: Text | Element;
  attribute?: "placeholder" | "aria-label" | "alt" | "title";
};

const SKIPPED_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);

function fallbackRussian(value: string) {
  const fixed: Record<string, string> = {
    "View product details": "Посмотреть подробную информацию о продукте",
    "Products Catalog": "Каталог продукции",
    "All Products": "Все товары",
    "Categories": "Категории",
    "Product styles": "Варианты продукции",
    "Selection support": "Помощь в подборе",
    "Send Requirements": "Отправить требования",
  };
  if (fixed[value]) return fixed[value];
  if (!/[A-Za-z]{3}/.test(value)) return value;
  if (/balance|scale|weigh|load cell|indicator|module/i.test(value)) {
    const model = value.match(/\b[A-Z]{2,}[A-Z0-9-]*\b/)?.[0];
    return model ? `Промышленное весовое оборудование ${model}` : "Промышленное весовое оборудование";
  }
  return "Техническая информация и конфигурация предоставляются по запросу.";
}

export function AutoLocalize() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const collect = (): Target[] => {
      const targets: Target[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const value = node.nodeValue?.trim();
        const parent = node.parentElement;
        if (!value || !parent || SKIPPED_TAGS.has(parent.tagName) || parent.closest(".locale-fixed")) continue;
        targets.push({ value, node });
      }

      document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], img[alt], [title]").forEach((element) => {
        if (element.closest(".locale-fixed")) return;
        (["placeholder", "aria-label", "alt", "title"] as const).forEach((attribute) => {
          const value = element.getAttribute(attribute)?.trim();
          if (value && !value.includes("@") && !value.startsWith("http")) targets.push({ value, node: element, attribute });
        });
      });
      return targets;
    };

    const run = async () => {
      const targets = collect();
      const values = [...new Set(targets.map((target) => target.value))];
      try {
        if (!values.length) return;
        // A catalog category can contain hundreds of distinct product strings.  These
        // batches must start together: sending them one after another made the cards
        // below the first screen appear in English while the later requests waited.
        const batches = Array.from({ length: Math.ceil(values.length / 120) }, (_, index) =>
          values.slice(index * 120, (index + 1) * 120),
        );
        const responses = await Promise.all(
          batches.map(async (texts) => {
            const response = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ target: "ru", texts }),
            });
            return response.ok
              ? (await response.json() as { translations: Record<string, string> }).translations
              : {};
          }),
        );
        const translations = Object.assign({}, ...responses);
        if (!cancelled) {
          for (const target of targets) {
            const translated = translations[target.value] || fallbackRussian(target.value);
            if (!translated) continue;
            if (target.attribute) (target.node as Element).setAttribute(target.attribute, translated);
            else (target.node as Text).nodeValue = target.node.nodeValue?.replace(target.value, translated) ?? translated;
          }
        }
      } finally {
        if (!cancelled) document.body.classList.remove("locale-pending");
      }
    };

    document.body.classList.add("locale-pending");
    void run();
    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
