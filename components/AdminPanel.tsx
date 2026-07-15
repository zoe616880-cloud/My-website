"use client";

import { useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/data/blog-posts";
import type { HomePageConfig, HomePartConfig, HomeSectionConfig } from "@/data/home-page";
import type { Product } from "@/data/products";

type AdminTab = "products" | "blogs" | "home";

const emptyProduct: Product = {
  slug: "",
  name: "",
  shortName: "",
  category: "",
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

const sectionNames: Record<HomeSectionConfig["id"], string> = {
  hero: "Banner 首屏",
  applications: "应用场景",
  products: "产品展示",
  advantages: "我们的优势",
  factory: "工厂制造",
  news: "新闻概览",
  partners: "合作商",
};

const layoutOptions = ["default", "grid", "portfolio", "cards", "split", "list", "marquee"] as const;
const backgroundOptions = ["image", "white", "soft", "dark"] as const;
const spacingOptions = ["compact", "standard", "wide"] as const;

const layoutOptionLabels: Record<(typeof layoutOptions)[number], string> = {
  default: "默认布局",
  grid: "宫格排列",
  portfolio: "画册布局",
  cards: "卡片布局",
  split: "左右结构",
  list: "列表布局",
  marquee: "横向滚动",
};

const backgroundOptionLabels: Record<(typeof backgroundOptions)[number], string> = {
  image: "图片背景",
  white: "白色背景",
  soft: "浅色背景",
  dark: "深色背景",
};

const spacingOptionLabels: Record<(typeof spacingOptions)[number], string> = {
  compact: "紧凑",
  standard: "标准",
  wide: "宽松",
};

const emptyHomePage: HomePageConfig = { sections: [] };

const sectionPartDefaults: Record<HomeSectionConfig["id"], Array<Pick<HomePartConfig, "id" | "label">>> = {
  hero: [
    { id: "eyebrow", label: "小标题" },
    { id: "title", label: "主标题" },
    { id: "copy", label: "说明文字" },
    { id: "buttons", label: "按钮组" },
    { id: "primary-button", label: "主按钮" },
    { id: "secondary-button", label: "副按钮" },
    { id: "proof", label: "底部卖点" },
    { id: "proof-1", label: "卖点1" },
    { id: "proof-2", label: "卖点2" },
    { id: "proof-3", label: "卖点3" },
  ],
  applications: [
    { id: "heading", label: "标题区" },
    { id: "cards", label: "全部应用卡片" },
    { id: "app-1-card", label: "应用1卡片" },
    { id: "app-1-image", label: "应用1图片" },
    { id: "app-1-icon", label: "应用1图标" },
    { id: "app-1-title", label: "应用1标题" },
    { id: "app-1-copy", label: "应用1描述" },
    { id: "app-1-link", label: "应用1链接" },
    { id: "app-2-card", label: "应用2卡片" },
    { id: "app-2-image", label: "应用2图片" },
    { id: "app-2-icon", label: "应用2图标" },
    { id: "app-2-title", label: "应用2标题" },
    { id: "app-2-copy", label: "应用2描述" },
    { id: "app-2-link", label: "应用2链接" },
    { id: "app-3-card", label: "应用3卡片" },
    { id: "app-3-image", label: "应用3图片" },
    { id: "app-3-icon", label: "应用3图标" },
    { id: "app-3-title", label: "应用3标题" },
    { id: "app-3-copy", label: "应用3描述" },
    { id: "app-3-link", label: "应用3链接" },
    { id: "app-4-card", label: "应用4卡片" },
    { id: "app-4-image", label: "应用4图片" },
    { id: "app-4-icon", label: "应用4图标" },
    { id: "app-4-title", label: "应用4标题" },
    { id: "app-4-copy", label: "应用4描述" },
    { id: "app-4-link", label: "应用4链接" },
  ],
  products: [
    { id: "intro", label: "标题区" },
    { id: "product-1", label: "产品1卡片" },
    { id: "product-1-image", label: "产品1图片" },
    { id: "product-1-label", label: "产品1名称" },
    { id: "product-2", label: "产品2卡片" },
    { id: "product-2-image", label: "产品2图片" },
    { id: "product-2-label", label: "产品2名称" },
    { id: "product-3", label: "产品3卡片" },
    { id: "product-3-image", label: "产品3图片" },
    { id: "product-3-label", label: "产品3名称" },
    { id: "product-4", label: "产品4卡片" },
    { id: "product-4-image", label: "产品4图片" },
    { id: "product-4-label", label: "产品4名称" },
    { id: "button", label: "查看全部按钮" },
  ],
  advantages: [
    { id: "copy-block", label: "左侧文案" },
    { id: "cards", label: "全部优势卡片" },
    { id: "advantage-1-card", label: "优势1卡片" },
    { id: "advantage-1-icon", label: "优势1图标" },
    { id: "advantage-1-title", label: "优势1标题" },
    { id: "advantage-1-copy", label: "优势1描述" },
    { id: "advantage-2-card", label: "优势2卡片" },
    { id: "advantage-2-icon", label: "优势2图标" },
    { id: "advantage-2-title", label: "优势2标题" },
    { id: "advantage-2-copy", label: "优势2描述" },
    { id: "advantage-3-card", label: "优势3卡片" },
    { id: "advantage-3-icon", label: "优势3图标" },
    { id: "advantage-3-title", label: "优势3标题" },
    { id: "advantage-3-copy", label: "优势3描述" },
    { id: "advantage-4-card", label: "优势4卡片" },
    { id: "advantage-4-icon", label: "优势4图标" },
    { id: "advantage-4-title", label: "优势4标题" },
    { id: "advantage-4-copy", label: "优势4描述" },
  ],
  factory: [
    { id: "image", label: "工厂图片" },
    { id: "copy-block", label: "右侧文案" },
    { id: "points", label: "要点列表" },
    { id: "factory-point-1", label: "工厂要点1" },
    { id: "factory-point-2", label: "工厂要点2" },
    { id: "factory-point-3", label: "工厂要点3" },
  ],
  news: [
    { id: "heading", label: "新闻标题" },
    { id: "featured-news", label: "主新闻卡片" },
    { id: "featured-news-image", label: "主新闻图片" },
    { id: "featured-news-title", label: "主新闻标题" },
    { id: "featured-news-copy", label: "主新闻描述" },
    { id: "featured-news-link", label: "主新闻链接" },
    { id: "side-news", label: "右侧新闻列表" },
    { id: "side-news-1", label: "右侧新闻1" },
    { id: "side-news-2", label: "右侧新闻2" },
  ],
  partners: [
    { id: "heading", label: "合作商标题" },
    { id: "logos", label: "Logo 轮播" },
    { id: "partner-1-logo", label: "Logo 1" },
    { id: "partner-2-logo", label: "Logo 2" },
    { id: "partner-3-logo", label: "Logo 3" },
    { id: "partner-4-logo", label: "Logo 4" },
    { id: "partner-5-logo", label: "Logo 5" },
    { id: "partner-6-logo", label: "Logo 6" },
    { id: "partner-7-logo", label: "Logo 7" },
    { id: "partner-8-logo", label: "Logo 8" },
  ],
};

function createHomePart(id: string, label: string, index: number): HomePartConfig {
  return {
    id,
    label,
    enabled: true,
    x: 0,
    y: 0,
    width: 100,
    height: 0,
    scale: 100,
    z: index + 1,
    opacity: 100,
    align: "left",
  };
}

function ensureSectionParts(section: HomeSectionConfig): HomeSectionConfig {
  const savedParts = section.parts || [];
  const defaults = sectionPartDefaults[section.id] || [];
  const parts = defaults.map((part, index) => ({
    ...createHomePart(part.id, part.label, index),
    ...savedParts.find((savedPart) => savedPart.id === part.id),
    label: part.label,
  }));

  return { ...section, parts };
}

function normalizeHomePage(homePage: HomePageConfig): HomePageConfig {
  return { sections: homePage.sections.map(ensureSectionParts) };
}

function linesToArray(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function arrayToLines(value: string[]) {
  return value.join("\n");
}

function specsToText(value: Array<[string, string]>) {
  return value.map(([label, detail]) => `${label} | ${detail}`).join("\n");
}

function textToSpecs(value: string): Array<[string, string]> {
  return linesToArray(value).map((line) => {
    const [label, ...rest] = line.split("|");
    return [label.trim(), rest.join("|").trim()] as [string, string];
  }).filter(([label, detail]) => label && detail);
}

function paragraphsToText(value: string[]) {
  return value.join("\n\n");
}

function textToParagraphs(value: string) {
  return value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
}

function faqsToText(value: { question: string; answer: string }[]) {
  return value.map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function textToFaqs(value: string) {
  return linesToArray(value).map((line) => {
    const [question, ...rest] = line.split("|");
    return { question: question.trim(), answer: rest.join("|").trim() };
  }).filter((item) => item.question && item.answer);
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
  const [selectedHomePart, setSelectedHomePart] = useState(0);
  const [productDraft, setProductDraft] = useState<Product>(emptyProduct);
  const [blogDraft, setBlogDraft] = useState<BlogPost>(emptyBlog);
  const [homeDraft, setHomeDraft] = useState<HomeSectionConfig | null>(null);
  const [homePreviewKey, setHomePreviewKey] = useState(0);
  const [homePreviewMode, setHomePreviewMode] = useState<"desktop" | "mobile">("desktop");
  const homePreviewRef = useRef<HTMLIFrameElement | null>(null);
  const [status, setStatus] = useState("请输入后台密码，然后加载内容。");
  const [loading, setLoading] = useState(false);

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

  async function loadContent() {
    if (!password.trim()) {
      setStatus("请先输入后台密码。");
      return;
    }

    setLoading(true);
    setStatus("正在加载内容...");

    try {
      const [productsResponse, blogsResponse, homeResponse] = await Promise.all([
        adminFetch("/api/admin/products"),
        adminFetch("/api/admin/blogs"),
        adminFetch("/api/admin/home"),
      ]);
      const productsData = await productsResponse.json();
      const blogsData = await blogsResponse.json();
      const homeData = await homeResponse.json();

      if (productsData.error || blogsData.error || homeData.error) {
        setStatus("密码不正确，请检查后重试。");
        return;
      }

      setProducts(productsData.products);
      setBlogs(blogsData.blogPosts);
      const normalizedHomePage = normalizeHomePage(homeData.homePage);
      setHomePage(normalizedHomePage);
      setSelectedProduct(0);
      setSelectedBlog(0);
      setSelectedHomeSection(0);
      setSelectedHomePart(0);
      setProductDraft(productsData.products[0] || emptyProduct);
      setBlogDraft(blogsData.blogPosts[0] || emptyBlog);
      setHomeDraft(normalizedHomePage.sections[0] || null);
      setStatus("内容已加载。现在可以像表单一样编辑，完成后点击保存。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "内容加载失败。");
    } finally {
      setLoading(false);
    }
  }

  function chooseProduct(index: number) {
    setSelectedProduct(index);
    setProductDraft(products[index] || emptyProduct);
  }

  function chooseBlog(index: number) {
    setSelectedBlog(index);
    setBlogDraft(blogs[index] || emptyBlog);
  }

  function chooseHomeSection(index: number) {
    setSelectedHomeSection(index);
    setHomeDraft(homePage.sections[index] || null);
    setSelectedHomePart(0);
  }

  function getHomePageWithDraft(draft = homeDraft) {
    if (!draft) {
      return homePage;
    }

    const nextSections = [...homePage.sections];
    nextSections[selectedHomeSection] = draft;
    return { sections: nextSections };
  }

  function updateHomeDraft(nextDraft: HomeSectionConfig) {
    const normalizedDraft = ensureSectionParts(nextDraft);
    setHomeDraft(normalizedDraft);
    setHomePage(getHomePageWithDraft(normalizedDraft));
  }

  function updateHomePart(nextPart: HomePartConfig) {
    if (!homeDraft) {
      return;
    }

    const parts = [...(homeDraft.parts || [])];
    parts[selectedHomePart] = nextPart;
    updateHomeDraft({ ...homeDraft, parts });
  }

  function moveHomeSection(direction: -1 | 1) {
    const currentHomePage = getHomePageWithDraft();
    const ordered = currentHomePage.sections
      .map((section, index) => ({ section, index }))
      .sort((a, b) => a.section.order - b.section.order);
    const currentPosition = ordered.findIndex((item) => item.index === selectedHomeSection);
    const targetPosition = currentPosition + direction;

    if (currentPosition < 0 || targetPosition < 0 || targetPosition >= ordered.length) {
      return;
    }

    const nextOrdered = [...ordered];
    [nextOrdered[currentPosition], nextOrdered[targetPosition]] = [nextOrdered[targetPosition], nextOrdered[currentPosition]];
    const nextSections = nextOrdered.map((item, index) => ({ ...item.section, order: index + 1 }));

    setHomePage({ sections: nextSections });
    setSelectedHomeSection(targetPosition);
    setHomeDraft(nextSections[targetPosition]);
    setSelectedHomePart(0);
  }

  function addProduct() {
    const next = { ...emptyProduct, slug: "new-product", name: "New Product", shortName: "New Product" };
    setProducts([...products, next]);
    setSelectedProduct(products.length);
    setProductDraft(next);
  }

  function addBlog() {
    const next = { ...emptyBlog, slug: "new-blog-post", title: "New Blog Post", h1: "New Blog Post", seoTitle: "New Blog Post" };
    setBlogs([...blogs, next]);
    setSelectedBlog(blogs.length);
    setBlogDraft(next);
  }

  async function uploadImage(file: File, target: "product" | "blog") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target", target);

    setStatus("正在上传图片...");
    const response = await adminFetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await response.json();

    if (data.error) {
      setStatus(data.error);
      return;
    }

    if (target === "product") {
      setProductDraft({ ...productDraft, image: data.path });
    }

    setStatus(`图片已上传：${data.path}`);
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
      setStatus("请先选择一个 Home 板块。");
      return;
    }

    const nextHomePage = getHomePageWithDraft();

    setLoading(true);
    setStatus("正在保存 Home 页面配置...");

    try {
      const response = await adminFetch("/api/admin/home", {
        method: "POST",
        body: JSON.stringify({ homePage: nextHomePage }),
      });
      const data = await response.json();

      if (data.error) {
        setStatus(data.error);
        return;
      }

      setHomePage(nextHomePage);
      setHomePreviewKey((key) => key + 1);
      setStatus("Home 页面配置已保存。前台首页会按新的顺序、文案和布局渲染。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Home 页面配置保存失败。");
    } finally {
      setLoading(false);
    }
  }

  async function saveContent(type: "products" | "blogs", value: Product[] | BlogPost[]) {
    setLoading(true);
    setStatus(`正在保存${type === "products" ? "产品" : "博客"}...`);

    try {
      const response = await adminFetch(`/api/admin/${type}`, {
        method: "POST",
        body: JSON.stringify(type === "products" ? { products: value } : { blogPosts: value }),
      });
      const data = await response.json();

      if (data.error) {
        setStatus(data.error);
        return;
      }

      if (type === "products") {
        setProducts(value as Product[]);
      } else {
        setBlogs(value as BlogPost[]);
      }

      setStatus("保存成功。重新构建或重新部署后，前台页面会更新。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setLoading(false);
    }
  }

  const blogBody = paragraphsToText(blogDraft.sections[0]?.paragraphs || []);
  const activeTitle =
    activeTab === "products"
      ? "产品上传 / 编辑"
      : activeTab === "blogs"
        ? "Blog / News 上传 / 编辑"
        : "Home 页面布局 / 文案";
  const contentLoaded = products.length > 0 || blogs.length > 0 || homePage.sections.length > 0;
  const currentHomePart = homeDraft?.parts?.[selectedHomePart] || null;
  const homePreviewUrl = `/?adminPreview=${homePreviewKey}`;

  function syncPreviewHighlight() {
    const previewDocument = homePreviewRef.current?.contentDocument;

    if (!previewDocument) {
      return;
    }

    previewDocument
      .querySelectorAll(".home-section-admin-selected")
      .forEach((element) => element.classList.remove("home-section-admin-selected"));
    previewDocument
      .querySelectorAll(".home-part-admin-selected")
      .forEach((element) => element.classList.remove("home-part-admin-selected"));

    if (!homeDraft) {
      return;
    }

    const sectionElement = previewDocument.querySelector(`[data-home-section="${homeDraft.id}"]`);
    sectionElement?.classList.add("home-section-admin-selected");
    sectionElement?.querySelector(`.home-part-${currentHomePart?.id}`)?.classList.add("home-part-admin-selected");
  }

  useEffect(() => {
    syncPreviewHighlight();
    const previewDocument = homePreviewRef.current?.contentDocument;
    const previewWindow = homePreviewRef.current?.contentWindow;

    if (!previewDocument || !previewWindow || !homeDraft || !currentHomePart) {
      return;
    }

    const activePart = currentHomePart;
    const selectedElement = previewDocument.querySelector<HTMLElement>(`.home-part-${activePart.id}`);

    if (!selectedElement) {
      return;
    }

    const draggableElement = selectedElement;
    draggableElement.classList.add("home-part-admin-draggable");

    function handlePointerDown(event: PointerEvent) {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startY = event.clientY;
      const initialX = activePart.x;
      const initialY = activePart.y;
      let nextX = initialX;
      let nextY = initialY;

      previewDocument?.body.classList.add("admin-preview-dragging");

      function handlePointerMove(moveEvent: PointerEvent) {
        nextX = Math.round(initialX + moveEvent.clientX - startX);
        nextY = Math.round(initialY + moveEvent.clientY - startY);
        draggableElement.style.transform = `translate(${nextX}px, ${nextY}px) scale(${activePart.scale / 100})`;
      }

      function handlePointerUp() {
        previewDocument?.body.classList.remove("admin-preview-dragging");
        previewWindow?.removeEventListener("pointermove", handlePointerMove);
        previewWindow?.removeEventListener("pointerup", handlePointerUp);
        updateHomePart({ ...activePart, x: nextX, y: nextY });
      }

      previewWindow?.addEventListener("pointermove", handlePointerMove);
      previewWindow?.addEventListener("pointerup", handlePointerUp);
    }

    draggableElement.addEventListener("pointerdown", handlePointerDown);

    return () => {
      draggableElement.classList.remove("home-part-admin-draggable");
      draggableElement.removeEventListener("pointerdown", handlePointerDown);
    };
  });

  return (
    <main className={`admin-shell${contentLoaded ? " admin-loaded" : ""}`}>
      <section className="admin-sidebar">
        <div className="admin-brand">
          <span>Asia Weighing</span>
          <h1>网站后台</h1>
          {!contentLoaded ? <p>用表单管理产品、新闻和首页排版，不需要编辑代码。</p> : null}
        </div>
        <div className="admin-login-controls">
          <label>
            后台密码
            <input
              type="password"
              value={password}
              placeholder="默认：admin123"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="button" onClick={loadContent} disabled={loading || !password}>
            {contentLoaded ? "重新加载" : "加载内容"}
          </button>
        </div>
        {!contentLoaded ? <div className="admin-note">
          <strong>发布说明</strong>
          <p>保存后数据会写入项目文件。静态页面需要重新构建或重新部署后才会在前台更新。</p>
        </div> : null}
      </section>

      <section className="admin-main">
        <div className="admin-topbar">
          <div>
            <p>内容管理</p>
            <h2>{activeTitle}</h2>
          </div>
          <span>{status}</span>
        </div>

        <div className="admin-tabs">
          <button className={activeTab === "products" ? "active" : ""} type="button" onClick={() => setActiveTab("products")}>产品</button>
          <button className={activeTab === "blogs" ? "active" : ""} type="button" onClick={() => setActiveTab("blogs")}>Blog / News</button>
          <button className={activeTab === "home" ? "active" : ""} type="button" onClick={() => setActiveTab("home")}>Home 页面</button>
        </div>

        {activeTab === "home" ? (
          <div className="admin-form-layout admin-home-layout">
            <aside className="admin-home-sections">
              <div className="admin-panel-heading">
                <span>页面板块</span>
                <strong>拖动感先用上移 / 下移实现，顺序保存后首页同步。</strong>
              </div>
              <div className="admin-home-section-list">
                {homePage.sections
                  .map((section, index) => ({ section, index }))
                  .sort((a, b) => a.section.order - b.section.order)
                  .map(({ section, index }) => (
                    <button
                      className={index === selectedHomeSection ? "active" : ""}
                      key={section.id}
                      type="button"
                      onClick={() => chooseHomeSection(index)}
                    >
                      <span>{section.order}</span>
                      <strong>{sectionNames[section.id]}</strong>
                      <em>{section.enabled ? "显示中" : "已隐藏"}</em>
                    </button>
                  ))}
              </div>
              <div className="admin-home-move">
                <button type="button" onClick={() => moveHomeSection(-1)} disabled={!homeDraft}>上移</button>
                <button type="button" onClick={() => moveHomeSection(1)} disabled={!homeDraft}>下移</button>
              </div>
              {homeDraft?.parts?.length ? (
                <div className="admin-home-parts">
                  <div className="admin-panel-heading">
                    <span>当前板块部件</span>
                    <strong>选中部件后，可单独调整位置、尺寸和显示。</strong>
                  </div>
                  <div className="admin-home-part-list">
                    {homeDraft.parts.map((part, index) => (
                      <button
                        className={index === selectedHomePart ? "active" : ""}
                        key={part.id}
                        type="button"
                        onClick={() => setSelectedHomePart(index)}
                      >
                        <strong>{part.label}</strong>
                        <em>{part.enabled ? "显示" : "隐藏"}</em>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>

            <section className="admin-home-preview">
              <div className="admin-preview-toolbar">
                <div>
                  <span>实时预览</span>
                  <strong>保存后自动刷新首页效果</strong>
                </div>
                <div className="admin-preview-actions">
                  <button className={homePreviewMode === "desktop" ? "active" : ""} type="button" onClick={() => setHomePreviewMode("desktop")}>电脑</button>
                  <button className={homePreviewMode === "mobile" ? "active" : ""} type="button" onClick={() => setHomePreviewMode("mobile")}>手机</button>
                  <button type="button" onClick={() => setHomePreviewKey((key) => key + 1)}>刷新</button>
                </div>
              </div>
              <div className={`admin-preview-frame ${homePreviewMode}`}>
                <iframe ref={homePreviewRef} key={homePreviewKey} src={homePreviewUrl} title="Home 页面预览" onLoad={syncPreviewHighlight} />
              </div>
            </section>

            <section className="admin-home-settings">
              {homeDraft ? (
                <>
                  <div className="admin-home-summary">
                    <strong>{sectionNames[homeDraft.id]}</strong>
                    <span>现在可以调整个板块，也可以调当前板块里的单个部件。</span>
                  </div>
                  {currentHomePart ? (
                    <div className="admin-part-editor">
                      <div className="admin-part-editor-title">
                        <span>正在编辑部件</span>
                        <strong>{currentHomePart.label}</strong>
                      </div>
                      <div className="admin-form-grid">
                        <label>
                          显示这个部件
                          <select
                            value={currentHomePart.enabled ? "true" : "false"}
                            onChange={(event) => updateHomePart({ ...currentHomePart, enabled: event.target.value === "true" })}
                          >
                            <option value="true">显示</option>
                            <option value="false">隐藏</option>
                          </select>
                        </label>
                        <label>
                          文字对齐
                          <select
                            value={currentHomePart.align}
                            onChange={(event) => updateHomePart({ ...currentHomePart, align: event.target.value as HomePartConfig["align"] })}
                          >
                            <option value="left">左对齐</option>
                            <option value="center">居中</option>
                            <option value="right">右对齐</option>
                          </select>
                        </label>
                        <label>
                          左右移动：{currentHomePart.x}px
                          <input type="range" min="-300" max="300" value={currentHomePart.x} onChange={(event) => updateHomePart({ ...currentHomePart, x: Number(event.target.value) })} />
                        </label>
                        <label>
                          上下移动：{currentHomePart.y}px
                          <input type="range" min="-220" max="220" value={currentHomePart.y} onChange={(event) => updateHomePart({ ...currentHomePart, y: Number(event.target.value) })} />
                        </label>
                        <label>
                          宽度：{currentHomePart.width}%
                          <input type="range" min="20" max="160" value={currentHomePart.width} onChange={(event) => updateHomePart({ ...currentHomePart, width: Number(event.target.value) })} />
                        </label>
                        <label>
                          最小高度：{currentHomePart.height}px
                          <input type="range" min="0" max="700" value={currentHomePart.height} onChange={(event) => updateHomePart({ ...currentHomePart, height: Number(event.target.value) })} />
                        </label>
                        <label>
                          缩放：{currentHomePart.scale}%
                          <input type="range" min="50" max="160" value={currentHomePart.scale} onChange={(event) => updateHomePart({ ...currentHomePart, scale: Number(event.target.value) })} />
                        </label>
                        <label>
                          透明度：{currentHomePart.opacity}%
                          <input type="range" min="0" max="100" value={currentHomePart.opacity} onChange={(event) => updateHomePart({ ...currentHomePart, opacity: Number(event.target.value) })} />
                        </label>
                        <label>
                          层级
                          <input type="number" value={currentHomePart.z} onChange={(event) => updateHomePart({ ...currentHomePart, z: Number(event.target.value) || 1 })} />
                        </label>
                        <button className="admin-reset-part" type="button" onClick={() => updateHomePart(createHomePart(currentHomePart.id, currentHomePart.label, selectedHomePart))}>
                          重置这个部件
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="admin-form-grid">
                    <label>
                      显示这个板块
                      <select
                        value={homeDraft.enabled ? "true" : "false"}
                        onChange={(event) => updateHomeDraft({ ...homeDraft, enabled: event.target.value === "true" })}
                      >
                        <option value="true">显示</option>
                        <option value="false">隐藏</option>
                      </select>
                    </label>
                    <label>
                      排序数字
                      <input
                        type="number"
                        value={homeDraft.order}
                        onChange={(event) => updateHomeDraft({ ...homeDraft, order: Number(event.target.value) || 0 })}
                      />
                    </label>
                    <label>
                      布局
                      <select
                        value={homeDraft.layout}
                        onChange={(event) => updateHomeDraft({ ...homeDraft, layout: event.target.value as HomeSectionConfig["layout"] })}
                      >
                        {layoutOptions.map((option) => (
                          <option value={option} key={option}>{layoutOptionLabels[option]}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      背景
                      <select
                        value={homeDraft.background}
                        onChange={(event) => updateHomeDraft({ ...homeDraft, background: event.target.value as HomeSectionConfig["background"] })}
                      >
                        {backgroundOptions.map((option) => (
                          <option value={option} key={option}>{backgroundOptionLabels[option]}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      间距
                      <select
                        value={homeDraft.spacing}
                        onChange={(event) => updateHomeDraft({ ...homeDraft, spacing: event.target.value as HomeSectionConfig["spacing"] })}
                      >
                        {spacingOptions.map((option) => (
                          <option value={option} key={option}>{spacingOptionLabels[option]}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      小标题
                      <input value={homeDraft.eyebrow} onChange={(event) => updateHomeDraft({ ...homeDraft, eyebrow: event.target.value })} />
                    </label>
                    <label className="wide">
                      主标题
                      <textarea rows={2} value={homeDraft.title} onChange={(event) => updateHomeDraft({ ...homeDraft, title: event.target.value })} />
                    </label>
                    <label className="wide">
                      说明文字
                      <textarea rows={4} value={homeDraft.copy} onChange={(event) => updateHomeDraft({ ...homeDraft, copy: event.target.value })} />
                    </label>
                    <label className="wide">
                      按钮文字
                      <input value={homeDraft.buttonLabel} onChange={(event) => updateHomeDraft({ ...homeDraft, buttonLabel: event.target.value })} />
                    </label>
                  </div>
                  <div className="admin-actions">
                    <button type="button" onClick={saveHome} disabled={loading}>保存并刷新预览</button>
                    <a href="/" target="_blank" rel="noreferrer">预览首页</a>
                  </div>
                </>
              ) : (
                <p>请先加载内容，再选择一个 Home 板块。</p>
              )}
            </section>
          </div>
        ) : activeTab === "products" ? (
          <div className="admin-form-layout">
            <aside className="admin-list">
              <button type="button" onClick={addProduct}>新增产品</button>
              {products.map((product, index) => (
                <button className={index === selectedProduct ? "active" : ""} key={`${product.slug}-${index}`} type="button" onClick={() => chooseProduct(index)}>
                  {product.name || "未命名产品"}
                </button>
              ))}
            </aside>
            <section className="admin-form-card">
              <div className="admin-form-grid">
                <label>产品名称<input value={productDraft.name} onChange={(event) => setProductDraft({ ...productDraft, name: event.target.value })} /></label>
                <label>短名称<input value={productDraft.shortName} onChange={(event) => setProductDraft({ ...productDraft, shortName: event.target.value })} /></label>
                <label>URL Slug<input value={productDraft.slug} onChange={(event) => setProductDraft({ ...productDraft, slug: event.target.value })} /></label>
                <label>分类<input value={productDraft.category} onChange={(event) => setProductDraft({ ...productDraft, category: event.target.value })} /></label>
                <label>容量范围<input value={productDraft.capacities} onChange={(event) => setProductDraft({ ...productDraft, capacities: event.target.value })} /></label>
                <label>材质<input value={productDraft.materials} onChange={(event) => setProductDraft({ ...productDraft, materials: event.target.value })} /></label>
                <label className="wide">产品主图路径<input value={productDraft.image} onChange={(event) => setProductDraft({ ...productDraft, image: event.target.value })} /></label>
                <label className="wide">上传主图<input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0], "product")} /></label>
                <label className="wide">简短描述<textarea rows={3} value={productDraft.description} onChange={(event) => setProductDraft({ ...productDraft, description: event.target.value })} /></label>
                <label className="wide">详细描述<textarea rows={5} value={productDraft.longDescription} onChange={(event) => setProductDraft({ ...productDraft, longDescription: event.target.value })} /></label>
                <label>应用场景（一行一个）<textarea rows={6} value={arrayToLines(productDraft.applications)} onChange={(event) => setProductDraft({ ...productDraft, applications: linesToArray(event.target.value) })} /></label>
                <label>产品特点（一行一个）<textarea rows={6} value={arrayToLines(productDraft.features)} onChange={(event) => setProductDraft({ ...productDraft, features: linesToArray(event.target.value) })} /></label>
                <label>规格参数（一行一个，格式：参数 | 内容）<textarea rows={7} value={specsToText(productDraft.specifications)} onChange={(event) => setProductDraft({ ...productDraft, specifications: textToSpecs(event.target.value) })} /></label>
                <label>可定制项（一行一个）<textarea rows={7} value={arrayToLines(productDraft.customization)} onChange={(event) => setProductDraft({ ...productDraft, customization: linesToArray(event.target.value) })} /></label>
              </div>
              <div className="admin-actions">
                <button type="button" onClick={saveProducts} disabled={loading || !productDraft.slug}>保存产品</button>
                <a href={`/products/${productDraft.slug || ""}`} target="_blank" rel="noreferrer">预览产品</a>
              </div>
            </section>
          </div>
        ) : (
          <div className="admin-form-layout">
            <aside className="admin-list">
              <button type="button" onClick={addBlog}>新增博客</button>
              {blogs.map((blog, index) => (
                <button className={index === selectedBlog ? "active" : ""} key={`${blog.slug}-${index}`} type="button" onClick={() => chooseBlog(index)}>
                  {blog.title || "未命名博客"}
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
                <label className="wide">FAQ（一行一个，格式：问题 | 答案）<textarea rows={6} value={faqsToText(blogDraft.faq)} onChange={(event) => setBlogDraft({ ...blogDraft, faq: textToFaqs(event.target.value) })} /></label>
                <label className="wide">结论（段落之间空一行）<textarea rows={4} value={paragraphsToText(blogDraft.conclusion)} onChange={(event) => setBlogDraft({ ...blogDraft, conclusion: textToParagraphs(event.target.value) })} /></label>
              </div>
              <div className="admin-actions">
                <button type="button" onClick={saveBlogs} disabled={loading || !blogDraft.slug}>保存博客</button>
                <a href={`/news/${blogDraft.slug || ""}`} target="_blank" rel="noreferrer">预览博客</a>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
