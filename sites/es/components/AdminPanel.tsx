"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/blog-posts";
import type { HomePageConfig, HomeSectionConfig } from "@/data/home-page";
import type { Product } from "@/data/products";

type AdminTab = "products" | "blogs" | "home";
type NoticeTone = "info" | "success" | "error";

const emptyProduct: Product = {
  slug: "",
  name: "",
  shortName: "",
  category: "",
  subcategory: "",
  description: "",
  longDescription: "",
  image: "",
  capacities: "",
  materials: "",
  applications: [],
  features: [],
  specifications: [],
  customization: [],
};

const emptyBlog: BlogPost = {
  slug: "",
  title: "",
  seoTitle: "",
  metaDescription: "",
  targetKeyword: "",
  searchIntent: "",
  whyThisBlog: "",
  h1: "",
  category: "Blog",
  intro: [],
  sections: [{ h2: "Main Content", paragraphs: [] }],
  faq: [],
  conclusion: [],
  cta: {
    midArticle: "Send Your Requirements - contact us for a practical recommendation.",
    final: "Get a Quote - send your application details to our team.",
    popup: {
      trigger: "Show after 40% scroll or 30 seconds on page.",
      title: "Need help with your weighing project?",
      copy: "Send your requirements and our team will review a suitable configuration.",
      fields: ["Name - required", "Email - required", "Phone - required", "Application"],
      button: "Send Requirements",
    },
  },
  imagePlans: [],
};

const emptyHomePage: HomePageConfig = { sections: [] };

const sectionNames: Record<HomeSectionConfig["id"], string> = {
  hero: "首页首屏",
  applications: "应用场景",
  products: "产品展示",
  advantages: "核心优势",
  factory: "工厂制造",
  news: "新闻概览",
  partners: "合作伙伴",
};

const layoutOptions = ["default", "grid", "portfolio", "cards", "split", "list", "marquee"] as const;
const backgroundOptions = ["image", "white", "soft", "dark"] as const;
const spacingOptions = ["compact", "standard", "wide"] as const;

const layoutLabels: Record<(typeof layoutOptions)[number], string> = {
  default: "默认布局",
  grid: "网格布局",
  portfolio: "画册布局",
  cards: "卡片布局",
  split: "左右分栏",
  list: "列表布局",
  marquee: "横向滚动",
};

const backgroundLabels: Record<(typeof backgroundOptions)[number], string> = {
  image: "图片背景",
  white: "白色背景",
  soft: "浅色背景",
  dark: "深色背景",
};

const spacingLabels: Record<(typeof spacingOptions)[number], string> = {
  compact: "紧凑",
  standard: "标准",
  wide: "宽松",
};

function linesToArray(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function arrayToLines(value: string[] = []) {
  return value.join("\n");
}

function specsToText(value: Array<[string, string]> = []) {
  return value.map(([label, detail]) => `${label} | ${detail}`).join("\n");
}

function textToSpecs(value: string): Array<[string, string]> {
  return linesToArray(value)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return [label.trim(), rest.join("|").trim()] as [string, string];
    })
    .filter(([label, detail]) => label && detail);
}

function paragraphsToText(value: string[] = []) {
  return value.join("\n\n");
}

function textToParagraphs(value: string) {
  return value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
}

function faqsToText(value: { question: string; answer: string }[] = []) {
  return value.map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function textToFaqs(value: string) {
  return linesToArray(value)
    .map((line) => {
      const [question, ...rest] = line.split("|");
      return { question: question.trim(), answer: rest.join("|").trim() };
    })
    .filter((item) => item.question && item.answer);
}

function makeNotice(message: string, tone: NoticeTone = "info") {
  return { message, tone };
}

function imagesToText(value: string[] = []) {
  return value.join("\n");
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `product-${Date.now()}`;
}

function splitMultiValue(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value !== "string") return [];
  return value.split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean);
}

function parseSpecsValue(value: unknown): Array<[string, string]> {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (Array.isArray(item)) return [String(item[0] || "").trim(), String(item[1] || "").trim()] as [string, string];
        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;
          return [String(record.label || record.name || "").trim(), String(record.detail || record.value || "").trim()] as [string, string];
        }
        return ["", ""] as [string, string];
      })
      .filter(([label, detail]) => label && detail);
  }
  return splitMultiValue(value)
    .map((item) => {
      const separator = item.includes("|") ? "|" : ":";
      const [label, ...rest] = item.split(separator);
      return [label.trim(), rest.join(separator).trim()] as [string, string];
    })
    .filter(([label, detail]) => label && detail);
}

function parseCsvRows(text: string) {
  const rows: string[][] = [];
  let cell = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  const [headers = [], ...body] = rows;
  return body.map((cells) =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      record[header.trim()] = cells[index]?.trim() || "";
      return record;
    }, {}),
  );
}

function field(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function normalizeImportedProduct(raw: Record<string, unknown>, index: number): Product {
  const name = field(raw, ["name", "产品名称", "title"]) || `Imported Product ${index + 1}`;
  const shortName = field(raw, ["shortName", "short_name", "短名称"]) || name;
  const slug = field(raw, ["slug", "URL Slug", "链接名"]) || slugify(name);
  return {
    ...emptyProduct,
    slug,
    name,
    shortName,
    category: field(raw, ["category", "主分类", "parentCategory"]),
    subcategory: field(raw, ["subcategory", "子分类", "childCategory"]),
    description: field(raw, ["description", "简短描述", "summary"]),
    longDescription: field(raw, ["longDescription", "详细描述", "content"]),
    image: field(raw, ["image", "图片", "主图"]),
    capacities: field(raw, ["capacities", "容量范围", "capacity"]),
    materials: field(raw, ["materials", "材质", "material"]),
    applications: splitMultiValue(raw.applications || raw["应用场景"]),
    features: splitMultiValue(raw.features || raw["产品特点"]),
    specifications: parseSpecsValue(raw.specifications || raw["规格参数"]),
    customization: splitMultiValue(raw.customization || raw["可定制项"]),
  };
}

function parseProductImport(text: string, fileName: string) {
  let source: unknown;
  if (fileName.toLowerCase().endsWith(".csv")) {
    source = parseCsvRows(text);
  } else {
    const parsed = JSON.parse(text);
    source = Array.isArray(parsed) ? parsed : parsed.products;
  }
  if (!Array.isArray(source)) throw new Error("文件里没有找到产品列表。");
  return source.map((item, index) => normalizeImportedProduct(item as Record<string, unknown>, index));
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [homePage, setHomePage] = useState<HomePageConfig>(emptyHomePage);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [selectedHomeSection, setSelectedHomeSection] = useState(0);
  const [productDraft, setProductDraft] = useState<Product>(emptyProduct);
  const [blogDraft, setBlogDraft] = useState<BlogPost>(emptyBlog);
  const [homeDraft, setHomeDraft] = useState<HomeSectionConfig | null>(null);
  const [productQuery, setProductQuery] = useState("");
  const [blogQuery, setBlogQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [notice, setNotice] = useState(makeNotice("请输入后台密码，然后加载内容。"));
  const [loading, setLoading] = useState(false);
  const contentLoaded = products.length > 0 || blogs.length > 0 || homePage.sections.length > 0;

  const filteredProducts = useMemo(() => {
    const query = productQuery.trim().toLowerCase();
    return products
      .map((product, index) => ({ product, index }))
      .filter(({ product }) => !query || [product.name, product.slug, product.category, product.subcategory || ""].join(" ").toLowerCase().includes(query));
  }, [productQuery, products]);

  const visibleProductEntries = useMemo(() => {
    if (selectedCategoryFilter === "all") return filteredProducts;
    const [category, subcategory = ""] = selectedCategoryFilter.split("||");
    return filteredProducts.filter(({ product }) => product.category === category && (!subcategory || product.subcategory === subcategory));
  }, [filteredProducts, selectedCategoryFilter]);

  const filteredBlogs = useMemo(() => {
    const query = blogQuery.trim().toLowerCase();
    return blogs
      .map((blog, index) => ({ blog, index }))
      .filter(({ blog }) => !query || [blog.title, blog.slug, blog.category, blog.targetKeyword].join(" ").toLowerCase().includes(query));
  }, [blogQuery, blogs]);

  const orderedHomeSections = useMemo(
    () => homePage.sections.map((section, index) => ({ section, index })).sort((a, b) => a.section.order - b.section.order),
    [homePage.sections],
  );
  const categoryTree = useMemo(() => {
    const tree = new Map<string, { count: number; subcategories: Map<string, number> }>();
    products.forEach((product) => {
      const category = product.category || "未分类";
      if (!tree.has(category)) tree.set(category, { count: 0, subcategories: new Map() });
      const item = tree.get(category);
      if (!item) return;
      item.count += 1;
      if (product.subcategory) item.subcategories.set(product.subcategory, (item.subcategories.get(product.subcategory) || 0) + 1);
    });
    return Array.from(tree, ([category, item]) => ({
      category,
      count: item.count,
      subcategories: Array.from(item.subcategories, ([name, count]) => ({ name, count })),
    }));
  }, [products]);

  const activeTitle = activeTab === "products" ? "产品管理" : activeTab === "blogs" ? "Blog / News 管理" : "Home 页面管理";
  const blogBody = paragraphsToText(blogDraft.sections[0]?.paragraphs || []);

  async function adminFetch(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        "x-admin-password": password,
        ...(options.body instanceof FormData ? {} : { "content-type": "application/json" }),
        ...(options.headers || {}),
      },
    });
  }

  async function readJson(response: Response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.error) {
      throw new Error(data.error || `请求失败：${response.status}`);
    }
    return data;
  }

  async function loadContent() {
    if (!password.trim()) {
      setNotice(makeNotice("请先输入后台密码。", "error"));
      return;
    }
    setLoading(true);
    setNotice(makeNotice("正在加载产品、文章和首页配置..."));
    try {
      const [productsData, blogsData, homeData] = await Promise.all([
        adminFetch("/api/admin/products").then(readJson),
        adminFetch("/api/admin/blogs").then(readJson),
        adminFetch("/api/admin/home").then(readJson),
      ]);
      setProducts(productsData.products || []);
      setBlogs(blogsData.blogPosts || []);
      setHomePage(homeData.homePage || emptyHomePage);
      setSelectedProduct(0);
      setSelectedBlog(0);
      setSelectedHomeSection(0);
      setProductDraft(productsData.products?.[0] || emptyProduct);
      setBlogDraft(blogsData.blogPosts?.[0] || emptyBlog);
      setHomeDraft(homeData.homePage?.sections?.[0] || null);
      setNotice(makeNotice("内容已加载。选择条目后编辑，保存后前台会同步更新。", "success"));
    } catch (error) {
      setNotice(makeNotice(error instanceof Error ? error.message : "内容加载失败。", "error"));
    } finally {
      setLoading(false);
    }
  }

  async function saveContent(type: "products" | "blogs", value: Product[] | BlogPost[]) {
    setLoading(true);
    setNotice(makeNotice(type === "products" ? "正在保存产品..." : "正在保存文章..."));
    try {
      await adminFetch(`/api/admin/${type}`, {
        method: "POST",
        body: JSON.stringify(type === "products" ? { products: value } : { blogPosts: value }),
      }).then(readJson);
      if (type === "products") setProducts(value as Product[]);
      if (type === "blogs") setBlogs(value as BlogPost[]);
      setNotice(makeNotice(type === "products" ? "产品保存成功。" : "文章保存成功。", "success"));
    } catch (error) {
      setNotice(makeNotice(error instanceof Error ? error.message : "保存失败。", "error"));
    } finally {
      setLoading(false);
    }
  }

  async function saveProducts() {
    const next = [...products];
    next[selectedProduct] = productDraft;
    await saveContent("products", next);
  }

  async function saveBlogs() {
    const next = [...blogs];
    next[selectedBlog] = blogDraft;
    await saveContent("blogs", next);
  }

  async function saveHome() {
    if (!homeDraft) {
      setNotice(makeNotice("请先选择一个首页板块。", "error"));
      return;
    }
    const nextSections = [...homePage.sections];
    nextSections[selectedHomeSection] = homeDraft;
    const nextHomePage = { sections: nextSections };
    setLoading(true);
    setNotice(makeNotice("正在保存 Home 页面配置..."));
    try {
      await adminFetch("/api/admin/home", { method: "POST", body: JSON.stringify({ homePage: nextHomePage }) }).then(readJson);
      setHomePage(nextHomePage);
      setNotice(makeNotice("Home 页面配置已保存。", "success"));
    } catch (error) {
      setNotice(makeNotice(error instanceof Error ? error.message : "Home 页面保存失败。", "error"));
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(file: File, target: "product" | "home", onUploaded: (path: string) => void) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target", target);
    setLoading(true);
    setNotice(makeNotice("正在上传图片..."));
    try {
      const data = await adminFetch("/api/admin/upload", { method: "POST", body: formData }).then(readJson);
      onUploaded(data.path);
      setNotice(makeNotice(`图片已上传：${data.path}`, "success"));
    } catch (error) {
      setNotice(makeNotice(error instanceof Error ? error.message : "图片上传失败。", "error"));
    } finally {
      setLoading(false);
    }
  }

  async function importProductsFile(file: File) {
    if (!password.trim()) {
      setNotice(makeNotice("请先登录后台再导入产品。", "error"));
      return;
    }
    setLoading(true);
    setNotice(makeNotice("正在读取产品文件..."));
    try {
      const imported = parseProductImport(await file.text(), file.name);
      if (!imported.length) throw new Error("文件里没有可导入的产品。");
      const next = [...products];
      imported.forEach((product) => {
        const existingIndex = next.findIndex((item) => item.slug === product.slug);
        if (existingIndex >= 0) {
          next[existingIndex] = product;
        } else {
          next.push(product);
        }
      });
      await saveContent("products", next);
      const firstIndex = next.findIndex((item) => item.slug === imported[0].slug);
      setSelectedProduct(firstIndex >= 0 ? firstIndex : 0);
      setProductDraft(next[firstIndex] || next[0] || emptyProduct);
      setSelectedCategoryFilter("all");
      setNotice(makeNotice(`已导入并保存 ${imported.length} 个产品。重复链接名会自动更新原产品。`, "success"));
    } catch (error) {
      setNotice(makeNotice(error instanceof Error ? error.message : "产品文件导入失败。", "error"));
    } finally {
      setLoading(false);
    }
  }

  function chooseProduct(index: number) {
    setSelectedProduct(index);
    setProductDraft(products[index] || emptyProduct);
  }

  function chooseProductFilter(filter: string) {
    setSelectedCategoryFilter(filter);
    const [category, subcategory = ""] = filter.split("||");
    const firstMatchingIndex = filter === "all"
      ? 0
      : products.findIndex((product) => product.category === category && (!subcategory || product.subcategory === subcategory));

    if (firstMatchingIndex >= 0) chooseProduct(firstMatchingIndex);
  }

  function chooseBlog(index: number) {
    setSelectedBlog(index);
    setBlogDraft(blogs[index] || emptyBlog);
  }

  function chooseHomeSection(index: number) {
    setSelectedHomeSection(index);
    setHomeDraft(homePage.sections[index] || null);
  }

  function addProduct() {
    const [category, subcategory = ""] = selectedCategoryFilter === "all" ? ["", ""] : selectedCategoryFilter.split("||");
    const next = { ...emptyProduct, slug: "new-product", name: "New Product", shortName: "New Product", category, subcategory };
    setProducts([...products, next]);
    setSelectedProduct(products.length);
    setProductDraft(next);
  }

  function deleteProduct() {
    if (!products.length) return;
    const next = products.filter((_, index) => index !== selectedProduct);
    const nextIndex = Math.max(0, selectedProduct - 1);
    setProducts(next);
    setSelectedProduct(nextIndex);
    setProductDraft(next[nextIndex] || emptyProduct);
    setNotice(makeNotice("产品已从编辑列表移除，点击保存产品后才会写入文件。"));
  }

  function addBlog() {
    const next = { ...emptyBlog, slug: "new-blog-post", title: "New Blog Post", h1: "New Blog Post", seoTitle: "New Blog Post" };
    setBlogs([...blogs, next]);
    setSelectedBlog(blogs.length);
    setBlogDraft(next);
  }

  function deleteBlog() {
    if (!blogs.length) return;
    const next = blogs.filter((_, index) => index !== selectedBlog);
    const nextIndex = Math.max(0, selectedBlog - 1);
    setBlogs(next);
    setSelectedBlog(nextIndex);
    setBlogDraft(next[nextIndex] || emptyBlog);
    setNotice(makeNotice("文章已从编辑列表移除，点击保存文章后才会写入文件。"));
  }

  function updateHomeDraft(nextDraft: HomeSectionConfig) {
    setHomeDraft(nextDraft);
    const nextSections = [...homePage.sections];
    nextSections[selectedHomeSection] = nextDraft;
    setHomePage({ sections: nextSections });
  }

  function logout() {
    setProducts([]);
    setBlogs([]);
    setHomePage(emptyHomePage);
    setSelectedProduct(0);
    setSelectedBlog(0);
    setSelectedHomeSection(0);
    setProductDraft(emptyProduct);
    setBlogDraft(emptyBlog);
    setHomeDraft(null);
    setProductQuery("");
    setBlogQuery("");
    setSelectedCategoryFilter("all");
    setNotice(makeNotice("已退出后台。"));
  }

  if (!contentLoaded) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card">
          <div className="admin-login-brand">
            <span>Asia Weighing Admin</span>
            <h1>网站后台</h1>
            <p>登录后管理产品、新闻文章和首页内容。</p>
          </div>
          <div className="admin-login-form">
            <label>
              后台密码
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    loadContent();
                  }
                }}
                type="password"
                placeholder="输入 ADMIN_PASSWORD"
              />
            </label>
            <button type="button" onClick={loadContent} disabled={loading}>
              {loading ? "正在登录" : "进入后台"}
            </button>
          </div>
          <div className={`admin-login-notice admin-note-${notice.tone}`}>
            <strong>{notice.tone === "success" ? "完成" : notice.tone === "error" ? "需要处理" : "提示"}</strong>
            <p>{notice.message}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell admin-loaded">
      <header className="admin-app-header">
        <div>
          <span>Asia Weighing Admin</span>
          <strong>网站后台</strong>
        </div>
        <nav className="admin-app-nav" aria-label="后台模块">
          <button className={activeTab === "products" ? "active" : ""} type="button" onClick={() => setActiveTab("products")}>产品</button>
          <button className={activeTab === "blogs" ? "active" : ""} type="button" onClick={() => setActiveTab("blogs")}>Blog / News</button>
          <button className={activeTab === "home" ? "active" : ""} type="button" onClick={() => setActiveTab("home")}>Home 页面</button>
        </nav>
        <div className="admin-app-actions">
          <button type="button" onClick={loadContent} disabled={loading}>{loading ? "同步中" : "重新加载"}</button>
          <button type="button" onClick={logout}>退出</button>
        </div>
      </header>

      <section className="admin-main">
        <div className="admin-topbar">
          <div>
            <p>Content Control</p>
            <h2>{activeTitle}</h2>
          </div>
          <span>{products.length} 个产品 · {blogs.length} 篇文章 · {homePage.sections.length} 个首页板块</span>
        </div>
        <div className={`admin-workspace-notice admin-note-${notice.tone}`}>
          <strong>{notice.tone === "success" ? "完成" : notice.tone === "error" ? "需要处理" : "状态"}</strong>
          <p>{notice.message}</p>
        </div>

        {activeTab === "products" ? (
          <div className="admin-form-layout">
            <aside className="admin-list admin-product-sidebar">
              <div className="admin-product-tools">
                <button type="button" onClick={addProduct}>新增产品</button>
                <label>
                  批量导入
                  <input type="file" accept=".json,.csv,application/json,text/csv" onChange={(event) => event.target.files?.[0] && importProductsFile(event.target.files[0])} />
                </label>
              </div>
              <input className="admin-list-search" value={productQuery} onChange={(event) => setProductQuery(event.target.value)} placeholder="搜索产品名称或分类" />
              <div className="admin-category-tree">
                <button className={selectedCategoryFilter === "all" ? "active" : ""} type="button" onClick={() => chooseProductFilter("all")}>
                  <span>全部产品</span>
                  <small>{products.length}</small>
                </button>
                {categoryTree.map((item) => (
                  <div key={item.category}>
                    <button className={selectedCategoryFilter === item.category ? "active" : ""} type="button" onClick={() => chooseProductFilter(item.category)}>
                      <span>{item.category}</span>
                      <small>{item.count}</small>
                    </button>
                    {item.subcategories.map((subcategory) => (
                      <button
                        className={selectedCategoryFilter === `${item.category}||${subcategory.name}` ? "active" : ""}
                        key={`${item.category}-${subcategory.name}`}
                        type="button"
                        onClick={() => chooseProductFilter(`${item.category}||${subcategory.name}`)}
                      >
                        <span>{subcategory.name}</span>
                        <small>{subcategory.count}</small>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <p className="admin-list-title">当前分类产品</p>
              {visibleProductEntries.map(({ product, index }) => (
                <button className={index === selectedProduct ? "active" : ""} key={`${product.slug}-${index}`} type="button" onClick={() => chooseProduct(index)}>
                  <span>{product.name || "未命名产品"}</span>
                  <small>{product.subcategory || product.category || "未分类"}</small>
                </button>
              ))}
            </aside>
            <section className="admin-form-card">
              <div className="admin-form-grid">
                <label>产品名称<input value={productDraft.name} onChange={(event) => setProductDraft({ ...productDraft, name: event.target.value })} /></label>
                <label>短名称<input value={productDraft.shortName} onChange={(event) => setProductDraft({ ...productDraft, shortName: event.target.value })} /></label>
                <label>主分类<input value={productDraft.category} onChange={(event) => setProductDraft({ ...productDraft, category: event.target.value })} /></label>
                <label>子分类<input value={productDraft.subcategory || ""} onChange={(event) => setProductDraft({ ...productDraft, subcategory: event.target.value })} /></label>
                <label>容量范围<input value={productDraft.capacities} onChange={(event) => setProductDraft({ ...productDraft, capacities: event.target.value })} /></label>
                <label>材质<input value={productDraft.materials} onChange={(event) => setProductDraft({ ...productDraft, materials: event.target.value })} /></label>
                <label className="wide">产品主图路径<input value={productDraft.image} onChange={(event) => setProductDraft({ ...productDraft, image: event.target.value })} /></label>
                <label className="wide">上传主图<input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0], "product", (path) => setProductDraft({ ...productDraft, image: path }))} /></label>
                <label className="wide">简短描述<textarea rows={3} value={productDraft.description} onChange={(event) => setProductDraft({ ...productDraft, description: event.target.value })} /></label>
                <label className="wide">详细描述<textarea rows={5} value={productDraft.longDescription} onChange={(event) => setProductDraft({ ...productDraft, longDescription: event.target.value })} /></label>
              </div>
              <details className="admin-advanced-panel">
                <summary>高级内容（链接名、规格、特点、应用场景）</summary>
                <div className="admin-form-grid">
                  <label className="wide">产品链接名<input value={productDraft.slug} onChange={(event) => setProductDraft({ ...productDraft, slug: event.target.value })} /></label>
                  <label>应用场景（一行一个）<textarea rows={5} value={arrayToLines(productDraft.applications)} onChange={(event) => setProductDraft({ ...productDraft, applications: linesToArray(event.target.value) })} /></label>
                  <label>产品特点（一行一个）<textarea rows={5} value={arrayToLines(productDraft.features)} onChange={(event) => setProductDraft({ ...productDraft, features: linesToArray(event.target.value) })} /></label>
                  <label className="wide">规格参数（格式：参数 | 内容）<textarea rows={6} value={specsToText(productDraft.specifications)} onChange={(event) => setProductDraft({ ...productDraft, specifications: textToSpecs(event.target.value) })} /></label>
                  <label className="wide">可定制项（一行一个）<textarea rows={5} value={arrayToLines(productDraft.customization)} onChange={(event) => setProductDraft({ ...productDraft, customization: linesToArray(event.target.value) })} /></label>
                </div>
              </details>
              <details className="admin-advanced-panel admin-category-manager">
                <summary>分类参考</summary>
                <p>产品页左侧导航会根据“主分类”和“子分类”自动生成。要新增分类，直接在当前产品里填写新的主分类或子分类并保存。</p>
                <div>
                  {categoryTree.map((item) => (
                    <span key={item.category}>
                      <b>{item.category}</b>
                      {item.subcategories.length ? ` / ${item.subcategories.map((subcategory) => subcategory.name).join("、")}` : " / 无子级"}
                    </span>
                  ))}
                </div>
              </details>
              <div className="admin-actions">
                <button type="button" onClick={saveProducts} disabled={loading || !productDraft.slug}>保存产品</button>
                <button className="admin-danger" type="button" onClick={deleteProduct} disabled={loading || !products.length}>删除当前产品</button>
                <a href={`/products/${productDraft.slug || ""}`} target="_blank" rel="noreferrer">预览产品</a>
              </div>
            </section>
          </div>
        ) : activeTab === "blogs" ? (
          <div className="admin-form-layout">
            <aside className="admin-list">
              <button type="button" onClick={addBlog}>新增文章</button>
              <input className="admin-list-search" value={blogQuery} onChange={(event) => setBlogQuery(event.target.value)} placeholder="搜索标题、分类、关键词" />
              {filteredBlogs.map(({ blog, index }) => (
                <button className={index === selectedBlog ? "active" : ""} key={`${blog.slug}-${index}`} type="button" onClick={() => chooseBlog(index)}>
                  {blog.title || "未命名文章"}
                </button>
              ))}
            </aside>
            <section className="admin-form-card">
              <div className="admin-form-grid">
                <label>文章标题<input value={blogDraft.title} onChange={(event) => setBlogDraft({ ...blogDraft, title: event.target.value, h1: event.target.value })} /></label>
                <label>URL Slug<input value={blogDraft.slug} onChange={(event) => setBlogDraft({ ...blogDraft, slug: event.target.value })} /></label>
                <label>分类<input value={blogDraft.category} onChange={(event) => setBlogDraft({ ...blogDraft, category: event.target.value })} /></label>
                <label>目标关键词<input value={blogDraft.targetKeyword} onChange={(event) => setBlogDraft({ ...blogDraft, targetKeyword: event.target.value })} /></label>
                <label className="wide">SEO Title<input value={blogDraft.seoTitle} onChange={(event) => setBlogDraft({ ...blogDraft, seoTitle: event.target.value })} /></label>
                <label className="wide">Meta Description<textarea rows={3} value={blogDraft.metaDescription} onChange={(event) => setBlogDraft({ ...blogDraft, metaDescription: event.target.value })} /></label>
                <label className="wide">文章简介（段落之间空一行）<textarea rows={5} value={paragraphsToText(blogDraft.intro)} onChange={(event) => setBlogDraft({ ...blogDraft, intro: textToParagraphs(event.target.value) })} /></label>
                <label className="wide">正文内容（段落之间空一行）<textarea rows={12} value={blogBody} onChange={(event) => setBlogDraft({ ...blogDraft, sections: [{ h2: "Main Content", paragraphs: textToParagraphs(event.target.value) }] })} /></label>
                <label className="wide">FAQ（格式：问题 | 答案）<textarea rows={6} value={faqsToText(blogDraft.faq)} onChange={(event) => setBlogDraft({ ...blogDraft, faq: textToFaqs(event.target.value) })} /></label>
                <label className="wide">结论（段落之间空一行）<textarea rows={4} value={paragraphsToText(blogDraft.conclusion)} onChange={(event) => setBlogDraft({ ...blogDraft, conclusion: textToParagraphs(event.target.value) })} /></label>
              </div>
              <div className="admin-actions">
                <button type="button" onClick={saveBlogs} disabled={loading || !blogDraft.slug}>保存文章</button>
                <button className="admin-danger" type="button" onClick={deleteBlog} disabled={loading || !blogs.length}>删除当前文章</button>
                <a href={`/news/${blogDraft.slug || ""}`} target="_blank" rel="noreferrer">预览文章</a>
              </div>
            </section>
          </div>
        ) : (
          <div className="admin-form-layout admin-home-simple-layout">
            <aside className="admin-list">
              {orderedHomeSections.map(({ section, index }) => (
                <button className={index === selectedHomeSection ? "active" : ""} key={section.id} type="button" onClick={() => chooseHomeSection(index)}>
                  {section.order}. {sectionNames[section.id]}
                </button>
              ))}
            </aside>
            <section className="admin-form-card">
              {homeDraft ? (
                <>
                  <div className="admin-home-summary">
                    <strong>{sectionNames[homeDraft.id]}</strong>
                    <span>编辑板块文案和基础展示方式。更细的组件位置仍会保留原配置。</span>
                  </div>
                  <div className="admin-form-grid">
                    <label>显示这个板块<select value={homeDraft.enabled ? "true" : "false"} onChange={(event) => updateHomeDraft({ ...homeDraft, enabled: event.target.value === "true" })}><option value="true">显示</option><option value="false">隐藏</option></select></label>
                    <label>排序数字<input type="number" value={homeDraft.order} onChange={(event) => updateHomeDraft({ ...homeDraft, order: Number(event.target.value) || 0 })} /></label>
                    <label>布局<select value={homeDraft.layout} onChange={(event) => updateHomeDraft({ ...homeDraft, layout: event.target.value as HomeSectionConfig["layout"] })}>{layoutOptions.map((option) => <option value={option} key={option}>{layoutLabels[option]}</option>)}</select></label>
                    <label>背景<select value={homeDraft.background} onChange={(event) => updateHomeDraft({ ...homeDraft, background: event.target.value as HomeSectionConfig["background"] })}>{backgroundOptions.map((option) => <option value={option} key={option}>{backgroundLabels[option]}</option>)}</select></label>
                    <label>间距<select value={homeDraft.spacing} onChange={(event) => updateHomeDraft({ ...homeDraft, spacing: event.target.value as HomeSectionConfig["spacing"] })}>{spacingOptions.map((option) => <option value={option} key={option}>{spacingLabels[option]}</option>)}</select></label>
                    <label>小标题<input value={homeDraft.eyebrow} onChange={(event) => updateHomeDraft({ ...homeDraft, eyebrow: event.target.value })} /></label>
                    <label className="wide">主标题<textarea rows={2} value={homeDraft.title} onChange={(event) => updateHomeDraft({ ...homeDraft, title: event.target.value })} /></label>
                    <label className="wide">说明文字<textarea rows={4} value={homeDraft.copy} onChange={(event) => updateHomeDraft({ ...homeDraft, copy: event.target.value })} /></label>
                    <label className="wide">按钮文字<input value={homeDraft.buttonLabel} onChange={(event) => updateHomeDraft({ ...homeDraft, buttonLabel: event.target.value })} /></label>
                    <label className="wide">主图片路径<input value={homeDraft.image || ""} onChange={(event) => updateHomeDraft({ ...homeDraft, image: event.target.value })} /></label>
                    <label className="wide">上传并替换主图片<input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0], "home", (path) => updateHomeDraft({ ...homeDraft, image: path }))} /></label>
                    <label className="wide">多图列表（一行一个路径，用于应用卡片、产品轮播、工厂图、合作伙伴 Logo）<textarea rows={8} value={imagesToText(homeDraft.images)} onChange={(event) => updateHomeDraft({ ...homeDraft, images: linesToArray(event.target.value) })} /></label>
                    <label className="wide">上传并追加到多图列表<input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0], "home", (path) => updateHomeDraft({ ...homeDraft, images: [...(homeDraft.images || []), path] }))} /></label>
                  </div>
                  <div className="admin-actions"><button type="button" onClick={saveHome} disabled={loading}>保存 Home 页面</button><a href="/" target="_blank" rel="noreferrer">打开首页</a></div>
                </>
              ) : <p>请先选择一个 Home 板块。</p>}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
