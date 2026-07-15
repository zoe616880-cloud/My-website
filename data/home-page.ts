import homePageData from "./home-page.json";

export type HomeSectionId =
  | "hero"
  | "applications"
  | "products"
  | "advantages"
  | "factory"
  | "news"
  | "partners";

export type HomeLayout =
  | "default"
  | "grid"
  | "portfolio"
  | "cards"
  | "split"
  | "list"
  | "marquee";

export type HomeBackground = "image" | "white" | "soft" | "dark";
export type HomeSpacing = "compact" | "standard" | "wide";
export type HomePartAlign = "left" | "center" | "right";

export type HomePartConfig = {
  id: string;
  label: string;
  enabled: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  z: number;
  opacity: number;
  align: HomePartAlign;
};

export type HomeSectionConfig = {
  id: HomeSectionId;
  enabled: boolean;
  order: number;
  eyebrow: string;
  title: string;
  copy: string;
  buttonLabel: string;
  layout: HomeLayout;
  background: HomeBackground;
  spacing: HomeSpacing;
  parts?: HomePartConfig[];
};

export type HomePageConfig = {
  sections: HomeSectionConfig[];
};

export const homePageConfig = homePageData as HomePageConfig;

export function getHomeSection(id: HomeSectionId) {
  return homePageConfig.sections.find((section) => section.id === id);
}
