import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, Factory, Gauge, Mail, MessageCircle } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/data/blog-posts";

const publishedDates: Record<string, string> = {
  "industrial-floor-scale-buying-guide": "October 24, 2024",
  "bench-scale-vs-floor-scale": "October 18, 2024",
  "stainless-vs-painted-steel-industrial-scales": "October 12, 2024",
};

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "News, blog articles and practical industrial weighing knowledge from Asia Weighing.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <main className="news-page detail-page-theme">
        <section className="news-index-section">
          <div className="inner-heading news-index-heading">
            <h2>News Center</h2>
            <span>
              Built around the questions buyers ask before sending specifications,
              drawings and quotation requirements.
            </span>
          </div>
          <div className="news-content-layout">
            <div className="blog-grid news-blog-grid">
              {blogPosts.map((post, index) => (
                <article className="blog-card news-article-card" key={post.slug}>
                  <div className="news-card-visual" aria-hidden="true">
                    {index === 0 ? <Factory size={38} /> : index === 1 ? <Gauge size={38} /> : <ClipboardList size={38} />}
                  </div>
                  <div className="news-card-meta">
                    <small>{post.category}</small>
                    <time dateTime={publishedDates[post.slug]}>{publishedDates[post.slug]}</time>
                  </div>
                  <span>0{index + 1}</span>
                  <h3>{post.title}</h3>
                  <p>{post.metaDescription}</p>
                  <Link href={`/news/${post.slug}`}>
                    Read article <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>

            <aside className="news-sidebar" aria-label="News sidebar">
              <div className="news-side-panel news-search-panel">
                <h3>Search articles</h3>
                <label>
                  <span className="sr-only">Keyword</span>
                  <input type="search" placeholder="Keyword..." />
                </label>
              </div>
              <div className="news-side-panel">
                <h3>Trending topics</h3>
                <div className="topic-list">
                  <Link href="/news/industrial-floor-scale-buying-guide">Floor scale installation</Link>
                  <Link href="/news/bench-scale-vs-floor-scale">Bench vs floor scale</Link>
                  <Link href="/news/stainless-vs-painted-steel-industrial-scales">Stainless steel selection</Link>
                  <Link href="/products?category=load-cells-sensors">Load cells and sensors</Link>
                </div>
              </div>
              <div className="news-side-panel news-subscribe-panel">
                <Mail size={22} />
                <h3>Scale your knowledge</h3>
                <p>Get practical weighing notes and product updates for export projects.</p>
                <input type="email" placeholder="Work email" />
                <Link href="/request-a-quote">Subscribe <ArrowRight size={15} /></Link>
              </div>
              <div className="news-side-panel news-consult-panel">
                <MessageCircle size={24} />
                <h3>Technical questions?</h3>
                <p>Send your load, size and application details. We will help match the right system.</p>
                <Link href="/request-a-quote">Consult an expert <ArrowRight size={15} /></Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
