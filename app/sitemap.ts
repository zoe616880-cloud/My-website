import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/products/bench-scales",
    "/products/floor-scales",
    "/products/mobile-u-shape-scales",
    "/products/animal-special-scales",
    "/solutions",
    "/oem-odm",
    "/about",
    "/resources",
    "/request-a-quote",
  ];

  return routes.map((route) => ({
      url: `https://www.asiaweighing.com${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : route.startsWith("/products/") ? 0.8 : 0.9,
    }));
}
