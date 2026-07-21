import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/data/products";
import type { BlogPost } from "@/data/blog-posts";
import type { HomePageConfig } from "@/data/home-page";

const root = process.cwd();
const productsPath = path.join(root, "data", "products.ts");
const blogsPath = path.join(root, "data", "blog-posts.ts");
const homePagePath = path.join(root, "data", "home-page.json");

export function isAdminAuthorized(request: Request) {
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  return request.headers.get("x-admin-password") === expected;
}

export async function writeProductsFile(products: Product[]) {
  const content = `export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  subcategory?: string;
  description: string;
  longDescription: string;
  image: string;
  capacities: string;
  materials: string;
  applications: string[];
  features: string[];
  specifications: Array<[string, string]>;
  customization: string[];
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
`;

  await fs.writeFile(productsPath, content, "utf8");
}

export async function writeBlogsFile(blogPosts: BlogPost[]) {
  const content = `export type BlogImagePlan = {
  purpose: string;
  insertAfter: string;
  caption: string;
  alt: string;
  prompt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  targetKeyword: string;
  searchIntent: string;
  whyThisBlog: string;
  h1: string;
  category: string;
  intro: string[];
  sections: {
    h2: string;
    paragraphs: string[];
    h3?: { title: string; paragraphs: string[] }[];
  }[];
  faq: { question: string; answer: string }[];
  conclusion: string[];
  cta: {
    midArticle: string;
    final: string;
    popup: {
      trigger: string;
      title: string;
      copy: string;
      fields: string[];
      button: string;
    };
  };
  imagePlans: BlogImagePlan[];
};

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
`;

  await fs.writeFile(blogsPath, content, "utf8");
}

export async function writeHomePageFile(homePage: HomePageConfig) {
  await fs.writeFile(homePagePath, `${JSON.stringify(homePage, null, 2)}\n`, "utf8");
}
