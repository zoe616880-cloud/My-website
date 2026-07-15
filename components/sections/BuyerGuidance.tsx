import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { blogPosts } from "@/data/blog-posts";
import type { HomeSectionConfig } from "@/data/home-page";
import { homePartClass, homePartStyle } from "@/lib/home-parts";

export function BuyerGuidance({ config }: { config?: HomeSectionConfig }) {
  const featured = blogPosts[0];
  const secondaryPosts = blogPosts.slice(1, 3);

  return (
    <section className={`section resource-section news-layout-${config?.layout || "split"} home-bg-${config?.background || "white"} home-spacing-${config?.spacing || "standard"}`} id="resources">
      <div className="news-watermark" aria-hidden="true">News</div>
      <div className="section-inner">
        <div className={homePartClass(config, "heading", "resource-heading")} style={homePartStyle(config, "heading")}>
          <div>
            <p className="section-index">{config?.eyebrow || "News Center"}</p>
            <h2>{config?.title || "News Overview"}</h2>
          </div>
          <Link href="/news" className="button button-small">
          {config?.buttonLabel || "Read More"}
          </Link>
        </div>
        <div className={homePartClass(config, "news-list", "resource-layout")} style={homePartStyle(config, "news-list")}>
          <article className={homePartClass(config, "featured-news", "resource-featured-card")} style={homePartStyle(config, "featured-news")}>
            <Link href={`/news/${featured.slug}`} className={homePartClass(config, "featured-news-image", "resource-featured-image")} style={homePartStyle(config, "featured-news-image")}>
              <img src="/factory-modern.png" alt={featured.title} />
            </Link>
            <div className="resource-featured-copy">
              <span>{featured.category}</span>
              <h3 className={homePartClass(config, "featured-news-title")} style={homePartStyle(config, "featured-news-title")}>
                <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
              </h3>
              <p className={homePartClass(config, "featured-news-copy")} style={homePartStyle(config, "featured-news-copy")}>{featured.metaDescription}</p>
              <Link href={`/news/${featured.slug}`} className={homePartClass(config, "featured-news-link", "text-link")} style={homePartStyle(config, "featured-news-link")}>
                Read full article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
          <div className={homePartClass(config, "side-news", "resource-side-list")} style={homePartStyle(config, "side-news")}>
            {[featured, ...secondaryPosts].map((post, index) => (
              <article className={homePartClass(config, `side-news-${index + 1}`, "resource-mini-card")} style={homePartStyle(config, `side-news-${index + 1}`)} key={post.slug}>
                <span>{post.category}</span>
                <h3>
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.metaDescription}</p>
                <Link href={`/news/${post.slug}`} className="text-link">
                  Read More <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
