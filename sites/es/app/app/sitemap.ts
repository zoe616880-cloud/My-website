import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/products/bench-scales",
    "/products/floor-scales",
    "/products/mobile-u-shape-scales",
    "/products/animal-special-scales",
    "/news",
    "/about",
    "/request-a-quote",
  ];

  const blogRoutes = blogPosts.map((post) => `/news/${post.slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
      url: `https://www.asiaweighing.com${route}`,
      lastModified: new Date(),
      changeFrequency: route.startsWith("/news/") ? "monthly" : "weekly",
      priority: route === "" ? 1 : route.startsWith("/products/") ? 0.8 : 0.9,
    }));
}
