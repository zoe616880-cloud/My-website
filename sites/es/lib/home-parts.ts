import type { CSSProperties } from "react";
import type { HomePartConfig, HomeSectionConfig } from "@/data/home-page";

type PreviewHomeSectionConfig = HomeSectionConfig & {
  previewPart?: string;
};

export function getHomePart(section: HomeSectionConfig | undefined, id: string): HomePartConfig | undefined {
  return section?.parts?.find((part) => part.id === id);
}

export function homePartClass(section: HomeSectionConfig | undefined, id: string, className = "") {
  const part = getHomePart(section, id);
  const previewSection = section as PreviewHomeSectionConfig | undefined;
  return [
    "home-part",
    `home-part-${id}`,
    previewSection?.previewPart === id ? "home-part-admin-selected" : "",
    part?.enabled === false ? "home-part-hidden" : "",
    className,
  ].filter(Boolean).join(" ");
}

export function homePartStyle(section: HomeSectionConfig | undefined, id: string): CSSProperties {
  const part = getHomePart(section, id);

  if (!part) {
    return {};
  }

  return {
    width: part.width !== 100 ? `${part.width}%` : undefined,
    minHeight: part.height > 0 ? `${part.height}px` : undefined,
    opacity: part.opacity / 100,
    textAlign: part.align,
    zIndex: part.z,
    transform: `translate(${part.x}px, ${part.y}px) scale(${part.scale / 100})`,
    transformOrigin: part.align === "right" ? "right center" : part.align === "center" ? "center center" : "left center",
  };
}
